path = "C:/Users/Anubha/Documents/GitHub/anubhaparashar.github.io/academics.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

def gi(fp, alt, cert=''):
    c = ('gal-item ' + cert).strip()
    return '                <a href="' + fp + '" class="' + c + '"><img loading="lazy" src="' + fp + '" alt="' + alt + '"><div class="gal-overlay"><i class="fa fa-search-plus"></i></div></a>\n'

# ── Expert Talks: reduce to ET01 (AI, 6 photos) and ET02 (IoT, 3 photos) ──
# Replace entire acad-experttalks section
et01_b = 'img/blog/academic/3. expert talk/3. expert talk on AI/'
et01_files = ['4c2f44b4-b358-46aa-b07a-f261b9e0071a.jpeg','_MG_1110.jpg','_MG_1124.jpg','_MG_1126.jpg','_MG_1129.jpg','_MG_1132.jpg']
et01_imgs = ''.join([gi(et01_b+f,'Expert Talk') for f in et01_files])

et02_b = 'img/blog/academic/3. expert talk/4. expert talk on IoT/'
et02_files = ['IMG-20190326-WA0004.jpg','IMG-20200107-WA0008.jpg','IMG-20200107-WA0009.jpg']
et02_imgs = ''.join([gi(et02_b+f,'Expert Talk on IoT') for f in et02_files])

new_et_section = '''        <div class="acad-section" id="acad-experttalks">

          <!-- ET 01 Expert Talk -->
          <div class="conf-card" id="et-01">
            <div class="conf-card-header">
              <h3><span class="conf-num">01</span>Expert Talk</h3>
              <div class="conf-meta">
                <span><i class="fa fa-image"></i>6 Photos</span>
              </div>
            </div>
            <div class="conf-card-body">
              <p class="conf-desc">Invited expert talk — sharing knowledge and insights on contemporary topics in technology and research with students and faculty of the department.</p>
              <div class="gal-grid" id="g-et-01">
''' + et01_imgs + '''              </div>
            </div>
          </div>

          <!-- ET 02 Expert Talk on IoT -->
          <div class="conf-card" id="et-02">
            <div class="conf-card-header">
              <h3><span class="conf-num">02</span>Expert Talk on IoT</h3>
              <div class="conf-meta">
                <span><i class="fa fa-calendar"></i>2019&#8211;2020</span>
                <span><i class="fa fa-image"></i>3 Photos</span>
              </div>
            </div>
            <div class="conf-card-body">
              <p class="conf-desc">Expert talk series on Internet of Things, 2019&#8211;2020 &#8212; delivering sessions on IoT architecture, security, and emerging applications for students and young professionals.</p>
              <div class="gal-grid" id="g-et-02">
''' + et02_imgs + '''              </div>
            </div>
          </div>

        </div><!-- /acad-experttalks -->'''

# Find and replace the entire expert talks section
start_marker = '        <div class="acad-section" id="acad-experttalks">'
end_marker = '        </div><!-- /acad-experttalks -->'
start_idx = html.index(start_marker)
end_idx = html.index(end_marker) + len(end_marker)
html = html[:start_idx] + new_et_section + html[end_idx:]

# Update tab badge for expert talks (from 6 to 2)
html = html.replace(
    'onclick="switchAcadTab(\'experttalks\',this)">\n      <i class="fa fa-microphone"></i> Expert Talks\n      <span class="acad-tab-count">6</span>',
    'onclick="switchAcadTab(\'experttalks\',this)">\n      <i class="fa fa-microphone"></i> Expert Talks\n      <span class="acad-tab-count">2</span>')

# Also try alternate format
import re
html = re.sub(
    r'(switchAcadTab\(\'experttalks\'[^>]*>[\s\S]*?Expert Talks[\s\S]*?<span class="acad-tab-count">)\d+(</span>)',
    r'\g<1>2\g<2>', html, count=1)

# Update Quick Stats Expert Talks from 6 to 2
html = html.replace(
    '<span style="color:#555;">Expert Talks</span><strong style="color:#0f3460;">6</strong>',
    '<span style="color:#555;">Expert Talks</span><strong style="color:#0f3460;">2</strong>')

print("Expert talks done, len:", len(html))

# ── Social Activities: reorder (Green Club #1, Chair #2) + add all missing photos ──
socb = 'img/blog/academic/7. Social Activities/'

# Build complete new social section
def build_soc_card(num, card_id, gal_id, title, meta_spans, desc, images):
    imgs_html = ''.join([gi(i[0], i[1], i[2] if len(i) > 2 else '') for i in images])
    num_str = str(num).zfill(2)
    meta_html = '\n'.join(['                <span>' + s + '</span>' for s in meta_spans])
    return '''          <!-- SOC ''' + num_str + ' ' + title + ''' -->
          <div class="conf-card" id="''' + card_id + '''">
            <div class="conf-card-header">
              <h3><span class="conf-num">''' + num_str + '''</span>''' + title + '''</h3>
              <div class="conf-meta">
''' + meta_html + '''
              </div>
            </div>
            <div class="conf-card-body">
              <p class="conf-desc">''' + desc + '''</p>
              <div class="gal-grid" id="''' + gal_id + '''">
''' + imgs_html + '''              </div>
            </div>
          </div>
'''

# Green Club (18 photos)
gc_b = socb + '12.01.2018Green club Hangout/'
gc_files = ['IMG-20180112-WA0004.jpg','IMG-20180112-WA0005.jpg','IMG-20180112-WA0006.jpg','IMG-20180112-WA0007.jpg','IMG-20180112-WA0008.jpg','IMG-20180112-WA0009.jpg','IMG-20180112-WA0010.jpg','IMG-20180112-WA0011.jpg','IMG-20180112-WA0012.jpg','IMG-20180112-WA0013.jpg','IMG-20180112-WA0014.jpg','IMG-20180112-WA0015.jpg','IMG-20180112-WA0016.jpg','IMG-20180112-WA0017.jpg','IMG-20180112-WA0024.jpg','IMG-20180112-WA0025.jpg','IMG-20180112-WA0026.jpg','IMG-20180112-WA0027.jpg']
soc01 = build_soc_card(1,'soc-greenclub','g-soc-greenclub','Green Club Hangout',
    ['<i class="fa fa-calendar"></i>January 12, 2018','<i class="fa fa-image"></i>18 Photos'],
    'Green Club faculty and student hangout &#8212; strengthening campus community with activities centred on environmental awareness, teamwork, and collective well-being.',
    [(gc_b+f,'Green Club Hangout 2018') for f in gc_files])

# Chair & Table (9 photos)
ch_b = socb + '12.02.2018. Chair table distribution/'
ch_files = ['IMG-20180212-WA0015.jpg','IMG-20180212-WA0016.jpg','IMG-20180212-WA0017.jpg','IMG-20180212-WA0018.jpg','IMG-20180212-WA0019.jpg','IMG-20180212-WA0020.jpg','IMG-20180212-WA0021.jpg','IMG-20180212-WA0022.jpg','IMG-20180212-WA0023.jpg']
soc02 = build_soc_card(2,'soc-chair','g-soc-chair','Chair &amp; Table Distribution',
    ['<i class="fa fa-calendar"></i>February 12, 2018','<i class="fa fa-image"></i>9 Photos'],
    'Furniture distribution drive for underprivileged communities &#8212; contributing to educational access and community welfare through practical and meaningful resource sharing.',
    [(ch_b+f,'Chair Table Distribution 2018') for f in ch_files])

# Blood 2018 (30 photos)
bl18_b = socb + '2. Blood Donation - 2018/'
bl18_files = ['IMG_2474.JPG','IMG_2480.JPG','IMG_2483.JPG','IMG_2484.JPG','IMG_2485.JPG','IMG_2490.JPG','IMG_2492.JPG','IMG_2493.JPG','IMG_2494.JPG','IMG_2495.JPG','IMG_2496.JPG','IMG_2499.JPG','IMG_2504.JPG','IMG_2505.JPG','IMG_2508.JPG','IMG_2510.JPG','IMG_2511.JPG','IMG_2512.JPG','IMG_2513.JPG','IMG_2514.JPG','IMG_2516.JPG','IMG_2520.JPG','IMG_2534.JPG','IMG_2535.JPG','IMG_2536.JPG','IMG_2537.JPG','IMG_2538.JPG','IMG_2541.JPG','IMG_2543.JPG','IMG_2544.JPG']
soc03 = build_soc_card(3,'soc-blood18','g-soc-blood18','Blood Donation Camp 2018',
    ['<i class="fa fa-calendar"></i>2018','<i class="fa fa-image"></i>30 Photos'],
    'Annual blood donation camp 2018 &#8212; mobilising faculty, students, and staff to contribute to a life-saving cause and raise awareness about voluntary blood donation.',
    [(bl18_b+f,'Blood Donation Camp 2018') for f in bl18_files])

# Blood 2019 (6 photos including PNG)
bl19_b = socb + '2. Blood Donation - 2019/'
bl19_files = ['IMG20191114104421.png','IMG20191114141747.jpg','IMG20191114141904.jpg','IMG20191114141906.jpg','IMG20191114142411.jpg','IMG20191114142442.jpg']
soc04 = build_soc_card(4,'soc-blood19','g-soc-blood19','Blood Donation Camp 2019',
    ['<i class="fa fa-calendar"></i>November 2019','<i class="fa fa-image"></i>6 Photos'],
    'Annual blood donation camp 2019 &#8212; continuing the campus tradition of community service with a successful drive encouraging voluntary and life-saving donations.',
    [(bl19_b+f,'Blood Donation Camp 2019') for f in bl19_files])

# Blood 2017 (14 photos)
bl17_b = socb + '2. Blood Donation-2017/'
bl17_files = ['20171116_142416.jpg','20171116_142420.jpg','20171116_142423.jpg','20171116_165911.jpg','img.jpeg','IMG-20171116-WA0002.jpg','IMG-20171116-WA0003.jpg','IMG-20171116-WA0009.jpg','IMG-20171116-WA0011.jpg','IMG-20171116-WA0012.jpg','IMG-20171116-WA0013.jpg','IMG-20171116-WA0018.jpg','IMG-20171116-WA0019.jpg','IMG-20171116-WA0022.jpg']
soc05 = build_soc_card(5,'soc-blood17','g-soc-blood17','Blood Donation Camp 2017',
    ['<i class="fa fa-calendar"></i>November 2017','<i class="fa fa-image"></i>14 Photos'],
    'First blood donation drive &#8212; organising and participating in the inaugural campus blood donation camp to support patients in need through collective civic action.',
    [(bl17_b+f,'Blood Donation Camp 2017') for f in bl17_files])

# Dhemi (16 photos)
dh_b = socb + '25.11.2017 Dhemi School visit/'
dh_files = ['IMG-20171125-WA0001.jpg','IMG-20171125-WA0002.jpg','IMG-20171125-WA0003.jpg','IMG-20171125-WA0004.jpg','IMG-20171125-WA0005.jpg','IMG-20171125-WA0006.jpg','IMG-20171125-WA0007.jpg','IMG-20171125-WA0008.jpg','IMG-20171125-WA0009.jpg','IMG-20171125-WA0010.jpg','IMG-20171125-WA0011.jpg','IMG-20171125-WA0012.jpg','IMG-20171125-WA0013.jpg','IMG-20171125-WA0014.jpg','IMG-20171125-WA0015.jpg','IMG-20171125-WA0016.jpg']
soc06 = build_soc_card(6,'soc-dhemi','g-soc-dhemi','Dhemi School Visit',
    ['<i class="fa fa-calendar"></i>November 25, 2017','<i class="fa fa-image"></i>16 Photos'],
    'Visit to Dhemi Government School &#8212; engaging with children from underprivileged backgrounds and contributing to educational outreach and community development initiatives.',
    [(dh_b+f,'Dhemi School Visit 2017') for f in dh_files])

# Beti Bachao (9 photos - already complete)
bt_b = socb + '26.02.2018. Beti Bachao Beti Padhao/'
bt_files = ['IMG-20180227-WA0006.jpg','IMG-20180227-WA0007.jpg','IMG-20180227-WA0008.jpg','IMG-20180227-WA0009.jpg','IMG-20180227-WA0010.jpg','IMG-20180227-WA0011.jpg','IMG-20180227-WA0012.jpg','IMG-20180227-WA0013.jpg','IMG-20180227-WA0014.jpg']
soc07 = build_soc_card(7,'soc-beti','g-soc-beti','Beti Bachao Beti Padhao',
    ['<i class="fa fa-calendar"></i>February 26&#8211;27, 2018','<i class="fa fa-image"></i>9 Photos'],
    'Beti Bachao Beti Padhao initiative &#8212; participating in awareness activities for the national campaign promoting girl child education, empowerment, and gender equality.',
    [(bt_b+f,'Beti Bachao Beti Padhao 2018') for f in bt_files])

# Village Visit (7 photos - already complete)
vv_b = socb + '27.02.2018 Village visit/'
vv_files = ['IMG-20180227-WA0015.jpg','IMG-20180227-WA0016.jpg','IMG-20180227-WA0017.jpg','IMG-20180227-WA0018.jpg','IMG-20180227-WA0019.jpg','IMG-20180227-WA0020.jpg','IMG-20180227-WA0021.jpg']
soc08 = build_soc_card(8,'soc-village','g-soc-village','Village Visit',
    ['<i class="fa fa-calendar"></i>February 27, 2018','<i class="fa fa-image"></i>7 Photos'],
    'Rural community visit &#8212; connecting with village residents to understand grassroots challenges and exploring technology-driven solutions for sustainable community development.',
    [(vv_b+f,'Village Visit 2018') for f in vv_files])

# Cleanliness Drive (20 photos)
cl_b = socb + '32. cleanileness drive/'
cl_files = ['20181002_091055.jpg','20181002_091100.jpg','20181002_091119.jpg','20181002_091124.jpg','20181002_092121.jpg','20181002_092127.jpg','20181002_092136.jpg','20181002_092144.jpg','20181002_092147.jpg','20181002_092547.jpg','20181002_092549.jpg','20181002_092635.jpg','20181002_092639.jpg','20181002_092653.jpg','20181002_092657.jpg','20181002_092701.jpg','20181002_092826.jpg','20181002_092832.jpg','20181002_092833.jpg','20181002_092835.jpg']
soc09 = build_soc_card(9,'soc-clean','g-soc-clean','Cleanliness Drive',
    ['<i class="fa fa-calendar"></i>October 2018','<i class="fa fa-image"></i>20 Photos'],
    'Swachh Bharat cleanliness drive &#8212; leading students and colleagues in campus and neighbourhood cleaning activities as part of the national Clean India mission.',
    [(cl_b+f,'Cleanliness Drive 2018') for f in cl_files])

# Projector Distribution (18 photos)
pj_b = socb + 'projector distribution/'
pj_files = ['IMG-20171230-WA0008.jpg','IMG-20180208-WA0001.jpg','IMG-20180208-WA0002.jpg','IMG-20180208-WA0003.jpg','IMG-20180208-WA0004.jpg','IMG-20180208-WA0005.jpg','IMG-20180208-WA0006.jpg','IMG-20180208-WA0007.jpg','IMG-20180208-WA0008.jpg','IMG-20180208-WA0009.jpg','IMG-20180208-WA0010.jpg','IMG-20180208-WA0011.jpg','IMG-20180208-WA0012.jpg','IMG-20180208-WA0013.jpg','IMG-20180208-WA0014.jpg','IMG-20180208-WA0015.jpg','IMG-20180208-WA0016.jpg','IMG-20180208-WA0017.jpg']
soc10 = build_soc_card(10,'soc-projector','g-soc-projector','Projector Distribution',
    ['<i class="fa fa-calendar"></i>Dec 2017 &#8211; Feb 2018','<i class="fa fa-image"></i>18 Photos'],
    'Projector distribution to underprivileged schools &#8212; bridging the technology gap in education by equipping schools with visual learning tools to enhance classroom outcomes.',
    [(pj_b+f,'Projector Distribution') for f in pj_files])

new_social_section = '''        <!-- ======== SOCIAL ACTIVITIES ======== -->
        <div class="acad-section" id="acad-social">

''' + soc01 + soc02 + soc03 + soc04 + soc05 + soc06 + soc07 + soc08 + soc09 + soc10 + '''
        </div><!-- /acad-social -->'''

# Find and replace the entire social section
start_marker = '        <!-- ======== SOCIAL ACTIVITIES ======== -->\n        <div class="acad-section" id="acad-social">'
end_marker = '        </div><!-- /acad-social -->'

# Try to find it - the comment format might differ
if start_marker in html:
    start_idx = html.index(start_marker)
    end_idx = html.index(end_marker) + len(end_marker)
    html = html[:start_idx] + new_social_section + html[end_idx:]
    print("Social section replaced via exact marker")
else:
    # Try alternate
    alt_start = '        <!-- &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550; SOCIAL ACTIVITIES'
    start2 = '        <div class="acad-section" id="acad-social">'
    if start2 in html:
        start_idx = html.index(start2)
        end_idx = html.index(end_marker) + len(end_marker)
        html = html[:start_idx] + new_social_section.replace('        <!-- ======== SOCIAL ACTIVITIES ======== -->\n','') + html[end_idx:]
        print("Social section replaced via div marker")
    else:
        print("ERROR: Could not find social section start!")

print("Done, len:", len(html))
with open(path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Saved")
