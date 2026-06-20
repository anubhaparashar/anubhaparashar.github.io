(function () {
  'use strict';

  var data = window.travelMapData || (window.SiteData && window.SiteData.travelMapData) || [];
  if (!data.length) return;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function countItems(categories) {
    return data.reduce(function (total, place) {
      return total + place.items.filter(function (item) { return categories.indexOf(item.category) !== -1; }).length;
    }, 0);
  }

  function renderStats(container) {
    if (!container) return;
    var memoryCount = data.reduce(function (total, place) {
      return total + place.items.filter(function (item) {
        return item.category === 'Awards' || /memory|phd|convocation|defence/i.test(item.title);
      }).length;
    }, 0);
    var stats = [
      ['Total Places', data.length],
      ['India Locations', data.filter(function (p) { return p.region === 'India'; }).length],
      ['International Locations', data.filter(function (p) { return p.region === 'International'; }).length],
      ['Conferences & Workshops', countItems(['Conferences', 'Workshops'])],
      ['Talks & Research Visits', countItems(['Talks', 'Research Visits'])],
      ['Awards & Memories', memoryCount],
      ['Sports & Treks', countItems(['Sports', 'Trekking'])]
    ];
    container.innerHTML = stats.map(function (stat) {
      return '<span class="travel-stat"><strong>' + stat[1] + '</strong> ' + escapeHtml(stat[0]) + '</span>';
    }).join('');
  }

  function matchesFilter(place, filter) {
    if (filter === 'All') return true;
    if (filter === 'India' || filter === 'International') return place.region === filter;
    if (filter === 'Visited' || filter === 'Academic Footprint') return place.status === filter;
    return place.categories.indexOf(filter) !== -1;
  }

  function project(place) {
    return { x: 5 + ((place.lng + 180) / 360) * 90, y: 6 + ((90 - place.lat) / 180) * 86 };
  }

  function spreadPositions(places) {
    var positions = [];
    places.forEach(function (place) {
      var point = project(place);
      var close = positions.filter(function (used) {
        return Math.abs(used.baseX - point.x) < 2.6 && Math.abs(used.baseY - point.y) < 2.6;
      }).length;
      var angle = close * 1.45;
      var radius = close ? 2.2 + Math.floor(close / 5) * 1.4 : 0;
      positions.push({ id: place.id, baseX: point.x, baseY: point.y, x: point.x + Math.cos(angle) * radius, y: point.y + Math.sin(angle) * radius });
    });
    return positions;
  }

  function renderMap() {
    var section = document.getElementById('my-travel-map');
    if (!section) return;

    var pinLayer = section.querySelector('[data-travel-pins]');
    var panel = section.querySelector('[data-travel-panel]');
    var cards = section.querySelector('[data-travel-cards]');
    var filters = section.querySelectorAll('[data-travel-filter]');
    var mappedPlaces = data.filter(function (place) { return typeof place.lat === 'number' && typeof place.lng === 'number'; });
    var positions = spreadPositions(mappedPlaces);
    var selectedId = data[0].id;
    var activeFilter = 'All';

    renderStats(section.querySelector('[data-travel-stats]'));

    pinLayer.innerHTML = mappedPlaces.map(function (place) {
      var point = positions.filter(function (p) { return p.id === place.id; })[0];
      return '<button class="travel-pin" type="button" data-place-id="' + escapeHtml(place.id) + '" data-status="' + escapeHtml(place.status) + '" style="left:' + point.x.toFixed(2) + '%;top:' + point.y.toFixed(2) + '%" aria-label="Open ' + escapeHtml(place.city) + ', ' + place.items.length + ' related entries">' +
        '<span class="travel-pin-tooltip">' + escapeHtml(place.city) + ' · ' + place.items.length + ' ' + (place.items.length === 1 ? 'entry' : 'entries') + '</span></button>';
    }).join('');

    cards.innerHTML = data.map(function (place) {
      var location = [place.city, place.country].filter(Boolean).join(', ');
      return '<article class="travel-location-card" data-place-card="' + escapeHtml(place.id) + '"><button type="button" data-open-place="' + escapeHtml(place.id) + '">' +
        '<h3>' + escapeHtml(location) + '</h3><p>' + escapeHtml(place.summary) + '</p>' +
        '<div class="travel-location-meta"><span>' + place.items.length + ' ' + (place.items.length === 1 ? 'entry' : 'entries') + '</span><span>' + escapeHtml(place.status) + '</span></div>' +
        '</button></article>';
    }).join('');

    function renderPanel(place) {
      if (!place) return;
      var location = [place.city, place.state, place.country].filter(Boolean).join(', ');
      panel.innerHTML = '<div class="travel-panel-kicker">' + escapeHtml(place.status) + ' · ' + place.items.length + ' ' + (place.items.length === 1 ? 'entry' : 'entries') + '</div>' +
        '<h3>' + escapeHtml(location) + '</h3><p class="travel-panel-summary">' + escapeHtml(place.summary) + '</p>' +
        '<div class="travel-panel-items">' + place.items.map(function (item) {
          var link = item.url ? '<a class="travel-item-link" href="' + escapeHtml(item.url) + '">' + (place.items.length === 1 ? 'Read More' : 'View') + '</a>' : '';
          return '<article class="travel-panel-item"><div><h4>' + escapeHtml(item.title) + '</h4><div class="travel-item-meta">' +
            [item.date, item.category].filter(Boolean).map(escapeHtml).join(' · ') + '</div></div>' + link + '</article>';
        }).join('') + '</div>';
      panel.scrollTop = 0;
    }

    function selectPlace(id, shouldScroll) {
      var place = data.filter(function (entry) { return entry.id === id; })[0];
      if (!place) return;
      selectedId = id;
      section.querySelectorAll('.travel-pin').forEach(function (pin) { pin.classList.toggle('selected', pin.getAttribute('data-place-id') === id); });
      renderPanel(place);
      if (shouldScroll) section.querySelector('.travel-map-layout').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function applyFilter(filter) {
      activeFilter = filter;
      filters.forEach(function (button) {
        var active = button.getAttribute('data-travel-filter') === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      section.querySelectorAll('.travel-pin').forEach(function (pin) {
        var place = data.filter(function (entry) { return entry.id === pin.getAttribute('data-place-id'); })[0];
        pin.hidden = !matchesFilter(place, filter);
      });
      section.querySelectorAll('[data-place-card]').forEach(function (card) {
        var place = data.filter(function (entry) { return entry.id === card.getAttribute('data-place-card'); })[0];
        card.hidden = !matchesFilter(place, filter);
      });
      var visible = data.filter(function (place) { return matchesFilter(place, filter); });
      cards.querySelectorAll('.travel-empty').forEach(function (empty) { empty.remove(); });
      if (!visible.length) cards.insertAdjacentHTML('beforeend', '<div class="travel-empty">No locations match this filter yet.</div>');
      if (!visible.some(function (place) { return place.id === selectedId; }) && visible.length) selectPlace(visible[0].id, false);
    }

    pinLayer.addEventListener('click', function (event) {
      var pin = event.target.closest('[data-place-id]');
      if (pin) selectPlace(pin.getAttribute('data-place-id'), false);
    });
    cards.addEventListener('click', function (event) {
      var button = event.target.closest('[data-open-place]');
      if (button) selectPlace(button.getAttribute('data-open-place'), true);
    });
    filters.forEach(function (button) {
      button.addEventListener('click', function () { applyFilter(button.getAttribute('data-travel-filter')); });
    });

    selectPlace(selectedId, false);
    applyFilter(activeFilter);
  }

  function renderPreview() {
    var strip = document.getElementById('travelPreviewStrip');
    if (!strip) return;
    var highlights = ['jaipur-india', 'zagreb-croatia', 'dubai-uae', 'agra-india', 'delhi-india', 'udaipur-india'];
    strip.innerHTML = highlights.map(function (id) {
      var place = data.filter(function (entry) { return entry.id === id; })[0];
      if (!place) return '';
      return '<article class="travel-preview-card"><div class="travel-preview-dot"></div><h3>' + escapeHtml(place.city) + '</h3><p>' + place.items.length + ' related ' + (place.items.length === 1 ? 'entry' : 'entries') + '<br>' + escapeHtml(place.status) + '</p></article>';
    }).join('');
  }

  renderMap();
  renderPreview();
})();
