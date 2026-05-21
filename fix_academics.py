import re

path = "C:/Users/Anubha/Documents/GitHub/anubhaparashar.github.io/academics.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

def gi(fp, alt, cert=''):
    c = ('gal-item ' + cert).strip()
    return '                <a href="' + fp + '" class="' + c + '"><img loading="lazy" src="' + fp + '" alt="' + alt + '"><div class="gal-overlay"><i class="fa fa-search-plus"></i></div></a>\n'

# 1. Highlight 20180911_110652 in FV02 Rijeka
html = html.replace(
    'coratia/20180911_110652.jpg" class="gal-item">',
    'coratia/20180911_110652.jpg" class="gal-item cert-a">')

# 2. W05 IIT Delhi - add missing 20170625_113522.jpg before 114408
old = '                <a href="img/blog/academic/2. workshops/34. IIT delhi workshop/20170625_114408.jpg"'
new = gi('img/blog/academic/2. workshops/34. IIT delhi workshop/20170625_113522.jpg','IIT Delhi Workshop') + '                <a href="img/blog/academic/2. workshops/34. IIT delhi workshop/20170625_114408.jpg"'
html = html.replace(old, new, 1)

# 3. FV03 Physics Day - add 5 more after IMG20220712122006
fv3b = 'img/blog/academic/4. faculty visits/29. physics day/'
fv3x = ''.join([gi(fv3b+f,'Physics Day 2022') for f in ['IMG20220712122019.jpg','IMG20220712122025.jpg','IMG20220712122033.jpg','IMG20220712122039.jpg','IMG20220712122050.jpg']])
anchor = gi(fv3b+'IMG20220712122006.jpg','Physics Day 2022')
sep = '              </div>\n            </div>\n          </div>\n\n          <!-- FV 04'
html = html.replace(anchor + sep, anchor + fv3x + sep, 1)

# 4. FV04 IT Day Jaipur - add 32 more after 20180321_105455
fv4b = 'img/blog/academic/4. faculty visits/3. IT day jaipur/'
fv4_files = ['20180321_105511.jpg','20180321_114915.jpg','20180321_115030.jpg','20180321_115034.jpg',
    '20180321_124422.jpg','20180321_133833.jpg','20180321_133836.jpg','20180321_133840.jpg',
    '20180321_133848.jpg','20180321_133904.jpg','20180321_133922.jpg','20180321_133924.jpg',
    '20180321_133927.jpg','20180321_133929.jpg','20180321_133930.jpg','20180321_134113.jpg',
    '20180321_134125.jpg','20180321_134812.jpg','20180321_134815.jpg','20180321_135456.jpg',
    '20180321_135502.jpg','20180321_141157.jpg','20180321_141452.jpg','20180321_141615.jpg',
    '20180321_144009.jpg','20180321_144021.jpg','20180321_144033.jpg','20180321_144037.jpg',
    '20180321_144259.jpg','IMG20230320174938.jpg','IMG20230320174945.jpg','IMG20230320174948.jpg']
fv4x = ''.join([gi(fv4b+f,'IT Day Jaipur 2018') for f in fv4_files])
anchor = gi(fv4b+'20180321_105455.jpg','IT Day Jaipur 2018')
sep = '              </div>\n            </div>\n          </div>\n\n          <!-- FV 05'
html = html.replace(anchor + sep, anchor + fv4x + sep, 1)
html = html.replace('40+ Photos &amp; Videos</span>', '40 Photos</span>', 1)

# 5. FV05 Robotics Fair - add 18 more after 20170318_135806
fv5b = 'img/blog/academic/4. faculty visits/35. robotics fair/'
fv5_files = ['20170318_135812.jpg','20170318_140030.jpg','20170318_140033.jpg','20170318_140209.jpg',
    '20170319_141535.jpg','20170319_141540.jpg','20170319_141541.jpg','20170319_141544.jpg',
    '20170319_141546.jpg','20170319_141552.jpg','20170319_141555.jpg','20170319_141722.jpg',
    '20170319_141726(0).jpg','20170319_141726.jpg','20170319_141825.jpg',
    '20170319_143313.jpg','20170319_144408.jpg','20170319_154955.jpg']
fv5x = ''.join([gi(fv5b+f,'Robotics Fair 2017') for f in fv5_files])
anchor = gi(fv5b+'20170318_135806.jpg','Robotics Fair 2017')
sep = '              </div>\n            </div>\n          </div>\n\n          <!-- FV 06'
html = html.replace(anchor + sep, anchor + fv5x + sep, 1)
html = html.replace('26 Photos &amp; Videos</span>', '26 Photos</span>', 1)

# 6. FV06 MUJ Stall - add 26 more after 20180927_153928
fv6b = 'img/blog/academic/4. faculty visits/4. IT day and muj stall/'
fv6_files = ['20180927_153942.jpg','20180927_153955.jpg','20180927_155031.jpg','20180927_155038.jpg',
    '20180927_155058.jpg','20180927_155107.jpg','20180928_114619.jpg','20180928_124540.jpg',
    '20180928_153025.jpg','20180928_153055.jpg','20180928_153102.jpg','20180928_153103.jpg',
    '20180928_153108.jpg','20180928_153541.jpg','20180928_153549.jpg','20180928_153635.jpg',
    '20180928_153649.jpg','20180928_153714.jpg','20180928_153716.jpg',
    'IMG-20180925-WA0010.jpeg','IMG-20180926-WA0057.jpg','IMG-20180927-WA0008.jpg',
    'IMG-20180927-WA0010.jpg','IMG-20180927-WA0017.jpg','IMG-20180927-WA0019.jpg','IMG-20180928-WA0012.jpg']
fv6x = ''.join([gi(fv6b+f,'IT Day MUJ Stall 2018') for f in fv6_files])
anchor = gi(fv6b+'20180927_153928.jpg','IT Day MUJ Stall 2018')
sep = '              </div>\n            </div>\n          </div>\n\n        </div><!-- /acad-facultyvisits -->'
html = html.replace(anchor + sep, anchor + fv6x + sep, 1)
html = html.replace('34 Photos &amp; Videos</span>', '34 Photos</span>', 1)

# 7. EV02 Vikram Award - add 19 more after IMG_5645
ev2b = 'img/blog/academic/5. Events done/11. Vikram award/'
ev2_files = ['IMG_5646.JPG','IMG_5648.JPG','IMG_5655.JPG','IMG_5657.JPG','IMG_5659.JPG',
    'IMG_5661.JPG','IMG_5662.JPG','IMG_5664.JPG','IMG_5669.JPG','IMG_5672.JPG',
    'IMG_5674.JPG','IMG_5676.JPG','IMG_5683.JPG','IMG_5705.JPG','IMG_5714.JPG',
    'IMG_5725.JPG','IMG_5729.JPG','IMG_5764.JPG','Vikram award.jpg']
ev2x = ''.join([gi(ev2b+f,'Vikram Award') for f in ev2_files])
anchor = gi(ev2b+'IMG_5645.JPG','Vikram Award')
sep = '              </div>\n            </div>\n          </div>\n\n          <!-- EV 03'
html = html.replace(anchor + sep, anchor + ev2x + sep, 1)

# 8. EV03 Self Defence - add 16 more after 20180319_184229
ev3b = 'img/blog/academic/5. Events done/14. Self defence/'
ev3_files = ['20180319_184232.jpg','20180319_184237.jpg','20180319_184241.jpg','20180319_184254.jpg',
    '20180319_184317.jpg','20180319_184330.jpg','20180319_184332.jpg','20180319_184337.jpg',
    '20180319_184344.jpg','20180319_185234.jpg','20180319_185239.jpg','20180319_185241.jpg',
    '20180319_185242.jpg','20180319_185246.jpg','20180319_185248.jpg','20180319_185322.jpg']
ev3x = ''.join([gi(ev3b+f,'Self Defence Workshop 2018') for f in ev3_files])
anchor = gi(ev3b+'20180319_184229.jpg','Self Defence Workshop 2018')
sep = '              </div>\n            </div>\n          </div>\n\n          <!-- EV 04'
html = html.replace(anchor + sep, anchor + ev3x + sep, 1)

# 9. HK01 School - add 2 more after IMG20191113111653
hk1b = 'img/blog/academic/6. Hackathon Head/28. school hackathon/'
hk1x = gi(hk1b+'IMG20191113112224.jpg','School Hackathon 2019') + gi(hk1b+'IMG20191113112227.jpg','School Hackathon 2019')
anchor = gi(hk1b+'IMG20191113111653.jpg','School Hackathon 2019')
sep = '              </div>\n            </div>\n          </div>\n\n          <!-- HK 02'
html = html.replace(anchor + sep, anchor + hk1x + sep, 1)

# 10. HK03 Neemrana - add 8 more after 20181028_184310
hk3b = 'img/blog/academic/6. Hackathon Head/8. Hackathon winners-neemrana/'
hk3_files = ['20181028_184349.jpg','20181028_200405.jpg','20181028_200428.jpg',
    'IMG_1754.JPG','IMG_2521.JPG','IMG_2522.JPG','IMG_2525.JPG','IMG_2527.JPG']
hk3x = ''.join([gi(hk3b+f,'Hackathon Neemrana 2018') for f in hk3_files])
anchor = gi(hk3b+'20181028_184310.jpg','Hackathon Neemrana 2018')
sep = '              </div>\n              <div class="video-section">'
html = html.replace(anchor + sep, anchor + hk3x + sep, 1)

print("Parts 1-10 done, len:", len(html))
with open(path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Saved")
