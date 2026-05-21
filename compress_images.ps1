param(
    [string]$RepoPath = "C:\Users\Anubha\Documents\GitHub\anubhaparashar.github.io",
    [int]$MaxDimension = 2000,
    [int]$JpegQuality = 5,
    [int]$WebpQuality = 78
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: ffmpeg not found. Install it first using: winget install Gyan.FFmpeg"
    exit 1
}

$RepoPath = (Resolve-Path -LiteralPath $RepoPath).Path
$TimeStamp = Get-Date -Format "yyyyMMdd_HHmmss"
$ReportDir = Join-Path $RepoPath "_file_audit"
New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null

$ImageExtensions = @(".jpg", ".jpeg", ".png", ".webp")
$ScaleFilter = "scale='if(gt(max(iw,ih),$MaxDimension),if(gt(iw,ih),$MaxDimension,-2),iw)':'if(gt(max(iw,ih),$MaxDimension),if(gt(iw,ih),-2,$MaxDimension),ih)'"

$Files = Get-ChildItem -Path $RepoPath -Recurse -File |
    Where-Object {
        $_.FullName -notmatch "\\\.git\\" -and
        $_.FullName -notmatch "\\_file_audit\\" -and
        $ImageExtensions -contains $_.Extension.ToLower()
    }

Write-Host "Repo: $RepoPath"
Write-Host "Images found: $($Files.Count)"
Write-Host "Max dimension: $MaxDimension px"

$Processed = @()
$Skipped = @()

foreach ($File in $Files) {
    $Ext = $File.Extension.ToLower()
    $RelativePath = $File.FullName.Substring($RepoPath.Length + 1)
    $TempOutput = "$($File.FullName).codex-tmp$Ext"

    if (Test-Path -LiteralPath $TempOutput) {
        Remove-Item -LiteralPath $TempOutput -Force
    }

    Write-Host "Compressing: $RelativePath"

    try {
        if ($Ext -eq ".jpg" -or $Ext -eq ".jpeg") {
            ffmpeg -hide_banner -loglevel error -y -i "$($File.FullName)" -vf $ScaleFilter -q:v $JpegQuality "$TempOutput"
        }
        elseif ($Ext -eq ".png") {
            ffmpeg -hide_banner -loglevel error -y -i "$($File.FullName)" -vf $ScaleFilter -compression_level 9 -pred mixed "$TempOutput"
        }
        elseif ($Ext -eq ".webp") {
            ffmpeg -hide_banner -loglevel error -y -i "$($File.FullName)" -vf $ScaleFilter -quality $WebpQuality "$TempOutput"
        }

        if (-not (Test-Path -LiteralPath $TempOutput)) {
            throw "No output file was created"
        }

        $NewFile = Get-Item -LiteralPath $TempOutput
        if ($NewFile.Length -lt $File.Length) {
            Move-Item -LiteralPath $TempOutput -Destination $File.FullName -Force
            $Processed += [PSCustomObject]@{
                OriginalSizeKB = [math]::Round($File.Length / 1KB, 1)
                NewSizeKB = [math]::Round($NewFile.Length / 1KB, 1)
                SavedKB = [math]::Round(($File.Length - $NewFile.Length) / 1KB, 1)
                RelativePath = $RelativePath
            }
        }
        else {
            Remove-Item -LiteralPath $TempOutput -Force
            $Skipped += [PSCustomObject]@{
                Reason = "Compressed output was not smaller"
                SizeKB = [math]::Round($File.Length / 1KB, 1)
                RelativePath = $RelativePath
            }
        }
    }
    catch {
        if (Test-Path -LiteralPath $TempOutput) {
            Remove-Item -LiteralPath $TempOutput -Force
        }
        $Skipped += [PSCustomObject]@{
            Reason = $_.Exception.Message
            SizeKB = [math]::Round($File.Length / 1KB, 1)
            RelativePath = $RelativePath
        }
        Write-Host "Skipped: $RelativePath"
    }
}

$ProcessedCsv = Join-Path $ReportDir "compressed_images_$TimeStamp.csv"
$SkippedCsv = Join-Path $ReportDir "skipped_images_$TimeStamp.csv"

$Processed | Sort-Object SavedKB -Descending | Export-Csv $ProcessedCsv -NoTypeInformation
$Skipped | Export-Csv $SkippedCsv -NoTypeInformation

$OriginalTotal = ($Processed | Measure-Object OriginalSizeKB -Sum).Sum
$NewTotal = ($Processed | Measure-Object NewSizeKB -Sum).Sum
$SavedTotal = ($Processed | Measure-Object SavedKB -Sum).Sum

Write-Host ""
Write-Host "DONE."
Write-Host "Compressed images: $($Processed.Count)"
Write-Host "Skipped images: $($Skipped.Count)"
Write-Host "Compressed original total KB: $([math]::Round($OriginalTotal, 1))"
Write-Host "Compressed new total KB: $([math]::Round($NewTotal, 1))"
Write-Host "Saved KB: $([math]::Round($SavedTotal, 1))"
Write-Host "Compressed report: $ProcessedCsv"
Write-Host "Skipped report: $SkippedCsv"
