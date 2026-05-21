(function() {
  var STYLE_ID = 'blog-post-actions-style';
  var STORAGE_PREFIX = 'anubha-blog-actions:';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.blog-actions{margin:18px 0 22px;padding:14px;border:1px solid #dde6f7;border-radius:12px;background:#fff;box-shadow:0 3px 16px rgba(15,52,96,.07);font-size:.82rem;color:#40506a;}',
      '.blog-actions-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}',
      '.blog-actions button,.blog-actions input{font:inherit;}',
      '.blog-action-btn{border:1px solid #cfdaf2;background:#f7f9ff;color:#0f3460;border-radius:20px;padding:6px 12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all .2s;}',
      '.blog-action-btn:hover,.blog-action-btn.active{background:#0f3460;color:#fff;border-color:#0f3460;}',
      '.blog-action-chip{border:1px solid #e0e7f6;background:#fafcff;border-radius:20px;padding:6px 12px;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;}',
      '.blog-action-chip strong{color:#0f3460;}',
      '.blog-upload-input{border:0;background:transparent;color:#0f3460;font-weight:700;min-width:118px;outline:none;}',
      '.blog-comments{display:none;margin-top:12px;border-top:1px solid #edf1fb;padding-top:12px;}',
      '.blog-comments.open{display:block;}',
      '.blog-comment-list{display:flex;flex-direction:column;gap:8px;margin-bottom:10px;}',
      '.blog-comment-item{background:#f7f9ff;border:1px solid #e3eafa;border-radius:10px;padding:8px 10px;color:#445;}',
      '.blog-comment-item small{display:block;color:#7d8aa3;margin-top:3px;font-size:.7rem;}',
      '.blog-comment-empty{color:#8a96aa;font-style:italic;margin-bottom:8px;}',
      '.blog-comment-form{display:grid;grid-template-columns:minmax(110px,160px) 1fr auto;gap:8px;}',
      '.blog-comment-form input{border:1px solid #d7e0f4;border-radius:8px;padding:8px 10px;min-width:0;}',
      '.blog-comment-form button{border:0;border-radius:8px;background:#0f3460;color:#fff;font-weight:800;padding:8px 12px;cursor:pointer;}',
      '@media(max-width:640px){.blog-comment-form{grid-template-columns:1fr}.blog-actions{padding:12px}.blog-action-chip,.blog-action-btn{width:100%;justify-content:center}.blog-upload-input{text-align:center;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function storageKey(id, part) {
    return STORAGE_PREFIX + location.pathname + ':' + id + ':' + part;
  }

  function slug(text) {
    return (text || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'post';
  }

  function titleFor(el) {
    var title = el.querySelector('.blog_details h2, h2, h3, .feat-card-title, .card-body h3, .sports-sh-title, .conf-card-header h3, .hobby-card h3');
    return title ? title.textContent.replace(/\s+/g, ' ').trim() : document.title;
  }

  function postId(el, index) {
    if (el.id) return el.id;
    var id = 'blog-post-' + slug(titleFor(el)) + '-' + (index + 1);
    el.id = id;
    return id;
  }

  function firstImageUrl(el) {
    var img = el.querySelector('img[src]');
    if (img) return img.getAttribute('src');
    var link = el.querySelector('a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"],a[href$=".JPG"],a[href$=".PNG"]');
    if (link) return link.getAttribute('href');
    img = document.querySelector('.header-slideshow .slide.active img[src], .soc-hero-slides img.active[src], .blog-header img[src], .avoc-header img[src]');
    return img ? img.getAttribute('src') : '';
  }

  function formatExifDate(raw) {
    var m = String(raw || '').match(/^(\d{4}):(\d{2}):(\d{2})(?:\s+(\d{2}):(\d{2}):(\d{2}))?/);
    if (!m) return '';
    return formatDateParts(+m[1], +m[2], +m[3]);
  }

  function formatDateParts(y, m, d) {
    if (!y || !m) return '';
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return (d ? d + ' ' : '') + months[m - 1] + ' ' + y;
  }

  function fallbackDateFromName(url) {
    var decoded = decodeURIComponent((url || '').split('/').pop() || url || '');
    var m = decoded.match(/(?:IMG)?(20\d{2})(\d{2})(\d{2})[_-]?\d*/i) || decoded.match(/(20\d{2})(\d{2})(\d{2})/);
    if (m) return formatDateParts(+m[1], +m[2], +m[3]);
    m = decoded.match(/(20\d{2})[-_ ](\d{1,2})[-_ ](\d{1,2})/);
    if (m) return formatDateParts(+m[1], +m[2], +m[3]);
    m = decoded.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(20\d{2})\b/i);
    if (m) {
      var month = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(m[1].slice(0,3).toLowerCase()) + 1;
      return formatDateParts(+m[2], month, 0);
    }
    return '';
  }

  function readAscii(view, offset, length) {
    var out = '';
    for (var i = 0; i < length; i++) out += String.fromCharCode(view.getUint8(offset + i));
    return out.replace(/\0+$/, '');
  }

  function parseIfd(view, tiff, offset, little) {
    var count = view.getUint16(tiff + offset, little);
    var tags = {};
    for (var i = 0; i < count; i++) {
      var p = tiff + offset + 2 + i * 12;
      var tag = view.getUint16(p, little);
      var type = view.getUint16(p + 2, little);
      var len = view.getUint32(p + 4, little);
      var val = view.getUint32(p + 8, little);
      tags[tag] = { type: type, len: len, val: val, ptr: p + 8 };
    }
    return tags;
  }

  function tagString(view, tiff, tag) {
    if (!tag) return '';
    var offset = tag.len <= 4 ? tag.ptr : tiff + tag.val;
    return readAscii(view, offset, tag.len);
  }

  function exifDate(url) {
    if (!/\.jpe?g($|\?)/i.test(url || '')) return Promise.resolve('');
    return fetch(new URL(url, location.href).href)
      .then(function(res) { if (!res.ok) return ''; return res.arrayBuffer(); })
      .then(function(buf) {
        if (!buf) return '';
        var view = new DataView(buf);
        if (view.getUint16(0) !== 0xffd8) return '';
        var offset = 2;
        while (offset < view.byteLength) {
          var marker = view.getUint16(offset);
          var size = view.getUint16(offset + 2);
          if (marker === 0xffe1 && readAscii(view, offset + 4, 6) === 'Exif') {
            var tiff = offset + 10;
            var little = readAscii(view, tiff, 2) === 'II';
            var firstIfd = view.getUint32(tiff + 4, little);
            var tags = parseIfd(view, tiff, firstIfd, little);
            var value = tagString(view, tiff, tags[0x0132]);
            if (tags[0x8769]) {
              var exifTags = parseIfd(view, tiff, tags[0x8769].val, little);
              value = tagString(view, tiff, exifTags[0x9003]) || tagString(view, tiff, exifTags[0x9004]) || value;
            }
            return formatExifDate(value);
          }
          offset += 2 + size;
        }
        return '';
      })
      .catch(function() { return ''; });
  }

  function dateInputValue(value) {
    var m = String(value || '').match(/(\d{4})-(\d{2})-(\d{2})/);
    if (m) return m[0];
    m = String(value || '').match(/(\d{1,2})\s+([A-Za-z]{3,9}),?\s+(\d{4})/);
    if (m) {
      var month = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(m[2].slice(0,3).toLowerCase()) + 1;
      return m[3] + '-' + String(month).padStart(2, '0') + '-' + String(+m[1]).padStart(2, '0');
    }
    m = String(value || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) return m[3] + '-' + String(+m[1]).padStart(2, '0') + '-' + String(+m[2]).padStart(2, '0');
    return '';
  }

  function renderComments(panel, key) {
    var list = panel.querySelector('.blog-comment-list');
    var comments = JSON.parse(localStorage.getItem(key) || '[]');
    list.innerHTML = '';
    if (!comments.length) {
      var empty = document.createElement('div');
      empty.className = 'blog-comment-empty';
      empty.textContent = 'No comments yet.';
      list.appendChild(empty);
      return;
    }
    comments.forEach(function(c) {
      var item = document.createElement('div');
      item.className = 'blog-comment-item';
      item.textContent = c.name + ': ' + c.text;
      var small = document.createElement('small');
      small.textContent = c.date;
      item.appendChild(small);
      list.appendChild(item);
    });
  }

  function attach(el, index) {
    if (el.querySelector(':scope > .blog-actions')) return;
    var id = postId(el, index);
    var viewsKey = storageKey(id, 'views');
    var likesKey = storageKey(id, 'likes');
    var likedKey = storageKey(id, 'liked');
    var commentsKey = storageKey(id, 'comments');
    var dateKey = storageKey(id, 'uploaded');

    var views = parseInt(localStorage.getItem(viewsKey) || '0', 10) + 1;
    var likes = parseInt(localStorage.getItem(likesKey) || '0', 10);
    var liked = localStorage.getItem(likedKey) === '1';
    localStorage.setItem(viewsKey, String(views));

    var comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    var savedDate = localStorage.getItem(dateKey);

    var box = document.createElement('div');
    box.className = 'blog-actions';
    box.innerHTML =
      '<div class="blog-actions-bar">' +
      '<button type="button" class="blog-action-btn blog-like' + (liked ? ' active' : '') + '"><i class="fa fa-thumbs-up"></i> Like <span>' + likes + '</span></button>' +
      '<button type="button" class="blog-action-btn blog-comment-toggle"><i class="fa fa-comment"></i> Comment <span>' + comments.length + '</span></button>' +
      '<span class="blog-action-chip"><i class="fa fa-calendar"></i> Date: <input class="blog-upload-input" type="text" value="' + (savedDate || '') + '" placeholder="Photo date" aria-label="Photo date"></span>' +
      '</div>' +
      '<div class="blog-comments">' +
      '<div class="blog-comment-list"></div>' +
      '<form class="blog-comment-form"><input name="name" placeholder="Name" value="Visitor"><input name="comment" placeholder="Write a comment"><button type="submit">Post</button></form>' +
      '</div>';

    var target = el.classList.contains('single-post') ? el : el;
    target.appendChild(box);

    var likeBtn = box.querySelector('.blog-like');
    likeBtn.addEventListener('click', function() {
      liked = !liked;
      likes += liked ? 1 : -1;
      if (likes < 0) likes = 0;
      localStorage.setItem(likesKey, String(likes));
      localStorage.setItem(likedKey, liked ? '1' : '0');
      likeBtn.classList.toggle('active', liked);
      likeBtn.querySelector('span').textContent = likes;
    });

    var panel = box.querySelector('.blog-comments');
    box.querySelector('.blog-comment-toggle').addEventListener('click', function() {
      panel.classList.toggle('open');
      renderComments(panel, commentsKey);
    });

    box.querySelector('.blog-comment-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var name = this.elements.name.value.trim() || 'Visitor';
      var text = this.elements.comment.value.trim();
      if (!text) return;
      comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
      comments.push({ name: name, text: text, date: new Date().toLocaleString() });
      localStorage.setItem(commentsKey, JSON.stringify(comments));
      this.elements.comment.value = '';
      box.querySelector('.blog-comment-toggle span').textContent = comments.length;
      renderComments(panel, commentsKey);
    });

    var dateInput = box.querySelector('.blog-upload-input');
    dateInput.addEventListener('change', function() {
      localStorage.setItem(dateKey, this.value);
    });

    var img = firstImageUrl(el);
    exifDate(img).then(function(date) {
      if (savedDate) return;
      dateInput.value = date || fallbackDateFromName(img) || '';
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('script[src*="firebase-blog.js"]')) return;
    addStyles();
    var selectors = ['.single-post', '.post-card', '.conf-card', '.hobby-card'];
    var items = [];
    selectors.forEach(function(selector) {
      Array.prototype.forEach.call(document.querySelectorAll(selector), function(el) {
        if (items.indexOf(el) === -1) items.push(el);
      });
    });
    items.forEach(attach);
  });
})();
