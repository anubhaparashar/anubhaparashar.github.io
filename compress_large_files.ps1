param(
    [string]$RepoPath = "C:\Users\Anubha\Documents\GitHub\anubhaparashar.github.io",
    [int]$TargetMB = 24
)

$ErrorActionPreference = "Stop"

$VideoExtensions = @(".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v")

$RepoPath = (Resolve-Path $RepoPath).Path
$ParentPath = Split-Path $RepoPath -Parent
$TimeStamp = Get-Date -Format "yyyyMMdd_HHmmss"

$ReportDir = Join-Path $RepoPath "_file_audit"
$BackupDir = Join-Path $ParentPath "large_file_backup_$TimeStamp"

New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null

Write-Host "Repo: $RepoPath"
Write-Host "Backup folder: $BackupDir"
Write-Host "Target size: $TargetMB MB"

# Check FFmpeg
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: ffmpeg not found. Install it first using: winget install Gyan.FFmpeg"
    exit 1
}

if (-not (Get-Command ffprobe -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: ffprobe not found. Install FFmpeg first."
    exit 1
}

# Collect all files except .git and audit folder
$Files = Get-ChildItem -Path $RepoPath -Recurse -File |
    Where-Object {
        $_.FullName -notmatch "\\\.git\\" -and
        $_.FullName -notmatch "\\_file_audit\\"
    }

# Report all files
$AllFilesReport = $Files |
    Select-Object `
        @{Name="SizeMB";Expression={[math]::Round($_.Length / 1MB, 2)}},
        @{Name="RelativePath";Expression={$_.FullName.Substring($RepoPath.Length + 1)}},
        FullName |
    Sort-Object SizeMB -Descending

$AllFilesCsv = Join-Path $ReportDir "all_files_$TimeStamp.csv"
$AllFilesReport | Export-Csv $AllFilesCsv -NoTypeInformation

# Large files report
$LargeFiles = $Files | Where-Object { $_.Length -gt ($TargetMB * 1MB) }

$LargeFilesCsv = Join-Path $ReportDir "large_files_over_${TargetMB}MB_$TimeStamp.csv"
$LargeFiles |
    Select-Object `
        @{Name="SizeMB";Expression={[math]::Round($_.Length / 1MB, 2)}},
        @{Name="Extension";Expression={$_.Extension}},
        @{Name="RelativePath";Expression={$_.FullName.Substring($RepoPath.Length + 1)}},
        FullName |
    Sort-Object SizeMB -Descending |
    Export-Csv $LargeFilesCsv -NoTypeInformation

Write-Host ""
Write-Host "All files report saved:"
Write-Host $AllFilesCsv
Write-Host ""
Write-Host "Large files report saved:"
Write-Host $LargeFilesCsv
Write-Host ""

$Processed = @()
$Skipped = @()

foreach ($File in $LargeFiles) {
    $Ext = $File.Extension.ToLower()
    $RelativePath = $File.FullName.Substring($RepoPath.Length + 1)

    if ($VideoExtensions -notcontains $Ext) {
        Write-Host "SKIP non-video: $RelativePath"
        $Skipped += [PSCustomObject]@{
            Reason = "Not a supported video file"
            SizeMB = [math]::Round($File.Length / 1MB, 2)
            RelativePath = $RelativePath
        }
        continue
    }

    Write-Host ""
    Write-Host "Compressing video: $RelativePath"

    # Backup original outside repo
    $BackupFile = Join-Path $BackupDir $RelativePath
    $BackupFileDir = Split-Path $BackupFile -Parent
    New-Item -ItemType Directory -Force -Path $BackupFileDir | Out-Null
    Copy-Item $File.FullName $BackupFile -Force

    # Get video duration
    $DurationText = ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 "$($File.FullName)"
    $Duration = [double]$DurationText

    if ($Duration -le 0) {
        Write-Host "Could not read duration, skipped: $RelativePath"
        $Skipped += [PSCustomObject]@{
            Reason = "Could not read video duration"
            SizeMB = [math]::Round($File.Length / 1MB, 2)
            RelativePath = $RelativePath
        }
        continue
    }

    # Calculate bitrate for target size
    $TargetBytes = $TargetMB * 1024 * 1024
    $TotalBitrateKbps = [math]::Floor(($TargetBytes * 8) / $Duration / 1000)

    # Reserve audio bitrate
    $AudioKbps = 96
    $VideoKbps = $TotalBitrateKbps - $AudioKbps

    if ($VideoKbps -lt 250) {
        $AudioKbps = 64
        $VideoKbps = $TotalBitrateKbps - $AudioKbps
    }

    if ($VideoKbps -lt 150) {
        Write-Host "Video too long for good 24MB compression, using minimum bitrate."
        $VideoKbps = 150
        $AudioKbps = 48
    }

    $TempOutput = "$($File.FullName).compressed.mp4"

    ffmpeg -y -i "$($File.FullName)" `
        -c:v libx264 `
        -b:v "${VideoKbps}k" `
        -maxrate "${VideoKbps}k" `
        -bufsize "$($VideoKbps * 2)k" `
        -preset medium `
        -pix_fmt yuv420p `
        -c:a aac `
        -b:a "${AudioKbps}k" `
        -movflags +faststart `
        "$TempOutput"

    if (-not (Test-Path $TempOutput)) {
        Write-Host "Compression failed: $RelativePath"
        $Skipped += [PSCustomObject]@{
            Reason = "FFmpeg output not created"
            SizeMB = [math]::Round($File.Length / 1MB, 2)
            RelativePath = $RelativePath
        }
        continue
    }

    $NewSizeMB = [math]::Round((Get-Item $TempOutput).Length / 1MB, 2)

    # Replace original video
    Remove-Item $File.FullName -Force

    # If original was not mp4, convert filename to .mp4
    if ($Ext -eq ".mp4") {
        Move-Item $TempOutput $File.FullName -Force
        $NewRelativePath = $RelativePath
    }
    else {
        $NewPath = [System.IO.Path]::ChangeExtension($File.FullName, ".mp4")
        Move-Item $TempOutput $NewPath -Force
        $NewRelativePath = $NewPath.Substring($RepoPath.Length + 1)
    }

    Write-Host "Done: $NewRelativePath -> $NewSizeMB MB"

    $Processed += [PSCustomObject]@{
        OriginalSizeMB = [math]::Round($File.Length / 1MB, 2)
        NewSizeMB = $NewSizeMB
        OldPath = $RelativePath
        NewPath = $NewRelativePath
        BackupPath = $BackupFile
    }
}

$ProcessedCsv = Join-Path $ReportDir "compressed_videos_$TimeStamp.csv"
$SkippedCsv = Join-Path $ReportDir "skipped_large_files_$TimeStamp.csv"

$Processed | Export-Csv $ProcessedCsv -NoTypeInformation
$Skipped | Export-Csv $SkippedCsv -NoTypeInformation

Write-Host ""
Write-Host "DONE."
Write-Host "Compressed videos report:"
Write-Host $ProcessedCsv
Write-Host ""
Write-Host "Skipped large files report:"
Write-Host $SkippedCsv
Write-Host ""
Write-Host "Original files backup is here:"
Write-Host $BackupDir