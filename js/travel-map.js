(function () {
  'use strict';

  var data = window.travelMapData || (window.SiteData && window.SiteData.travelMapData) || [];
  if (!data.length) return;

  var CDN = {
    leafletCss: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    leafletJs: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    clusterCss: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
    clusterDefaultCss: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css',
    clusterJs: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js'
  };
  var assetsPromise = null;
  var mapInstance = null;
  var markerLayer = null;
  var placeMarkers = {};
  var selectedId = data[0] && data[0].id;
  var activeFilter = 'All';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function validUrl(url) {
    if (!url || typeof url !== 'string') return '';
    var trimmed = url.trim();
    if (!trimmed || /^javascript:/i.test(trimmed) || trimmed === '#') return '';
    return trimmed;
  }

  function loadStyle(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function ensureLeaflet() {
    if (window.L && window.L.markerClusterGroup) return Promise.resolve();
    if (!assetsPromise) {
      loadStyle(CDN.leafletCss);
      loadStyle(CDN.clusterCss);
      loadStyle(CDN.clusterDefaultCss);
      assetsPromise = loadScript(CDN.leafletJs).then(function () {
        return loadScript(CDN.clusterJs).catch(function () { return null; });
      });
    }
    return assetsPromise;
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
    if (filter === 'Awards') return place.categories.indexOf('Awards') !== -1;
    return place.categories.indexOf(filter) !== -1;
  }

  function markerClass(place) {
    if (place.status === 'Academic Footprint') return 'footprint';
    if (place.status === 'Location to Confirm') return 'unconfirmed';
    return '';
  }

  function placeLocation(place) {
    return [place.city, place.state, place.country].filter(Boolean).join(', ');
  }

  function placePopupHtml(place) {
    return '<div class="travel-popup"><h3>' + escapeHtml(placeLocation(place)) + '</h3>' +
      '<p>' + escapeHtml(place.summary || '') + '</p>' +
      '<div class="travel-popup-meta"><span>' + escapeHtml(place.status) + '</span><span>' + place.items.length + ' ' + (place.items.length === 1 ? 'entry' : 'entries') + '</span></div>' +
      '<div class="travel-popup-list">' + place.items.slice(0, 6).map(function (item) {
        return '<div class="travel-popup-item"><strong>' + escapeHtml(item.title) + '</strong><small>' + [item.date, item.category].filter(Boolean).map(escapeHtml).join(' &middot; ') + '</small></div>';
      }).join('') + '</div></div>';
  }

  function panelItemHtml(item, itemCount) {
    var url = validUrl(item.url);
    var link = url ? '<a class="travel-item-link" href="' + escapeHtml(url) + '">' + (itemCount === 1 ? 'Read More' : 'View') + '</a>' : '';
    return '<article class="travel-panel-item"><div><h4>' + escapeHtml(item.title) + '</h4><div class="travel-item-meta">' +
      [item.date, item.category].filter(Boolean).map(escapeHtml).join(' &middot; ') + '</div></div>' + link + '</article>';
  }

  function renderPanel(section, place) {
    var panel = section.querySelector('[data-travel-panel]');
    if (!panel || !place) return;
    panel.innerHTML = '<div class="travel-panel-kicker">' + escapeHtml(place.status) + ' &middot; ' + place.items.length + ' ' + (place.items.length === 1 ? 'entry' : 'entries') + '</div>' +
      '<h3>' + escapeHtml(placeLocation(place)) + '</h3><p class="travel-panel-summary">' + escapeHtml(place.summary || '') + '</p>' +
      '<div class="travel-panel-items">' + place.items.map(function (item) { return panelItemHtml(item, place.items.length); }).join('') + '</div>';
    panel.scrollTop = 0;
  }

  function renderCards(section) {
    var cards = section.querySelector('[data-travel-cards]');
    if (!cards) return;
    cards.innerHTML = data.map(function (place) {
      var location = [place.city, place.country].filter(Boolean).join(', ');
      return '<article class="travel-location-card" data-place-card="' + escapeHtml(place.id) + '"><button type="button" data-open-place="' + escapeHtml(place.id) + '">' +
        '<h3>' + escapeHtml(location) + '</h3><p>' + escapeHtml(place.summary || '') + '</p>' +
        '<div class="travel-location-meta"><span>' + place.items.length + ' ' + (place.items.length === 1 ? 'entry' : 'entries') + '</span><span>' + escapeHtml(place.status) + '</span></div>' +
        '</button></article>';
    }).join('');
  }

  function selectPlace(section, id, shouldScroll) {
    var place = data.filter(function (entry) { return entry.id === id; })[0];
    if (!place) return;
    selectedId = id;
    renderPanel(section, place);
    Object.keys(placeMarkers).forEach(function (placeId) {
      var marker = placeMarkers[placeId];
      if (marker && marker.getElement) {
        var el = marker.getElement();
        if (el) el.classList.toggle('selected', placeId === id);
      }
    });
    if (placeMarkers[id] && mapInstance) {
      mapInstance.panTo(placeMarkers[id].getLatLng(), { animate: true, duration: 0.45 });
      placeMarkers[id].openPopup();
    }
    if (shouldScroll) section.querySelector('.travel-map-layout').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function visiblePlaces() {
    return data.filter(function (place) { return matchesFilter(place, activeFilter); });
  }

  function applyFilter(section, filter) {
    activeFilter = filter;
    section.querySelectorAll('[data-travel-filter]').forEach(function (button) {
      var active = button.getAttribute('data-travel-filter') === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    section.querySelectorAll('[data-place-card]').forEach(function (card) {
      var place = data.filter(function (entry) { return entry.id === card.getAttribute('data-place-card'); })[0];
      card.hidden = !matchesFilter(place, filter);
    });
    var cards = section.querySelector('[data-travel-cards]');
    cards.querySelectorAll('.travel-empty').forEach(function (empty) { empty.remove(); });
    var places = visiblePlaces();
    if (!places.length) cards.insertAdjacentHTML('beforeend', '<div class="travel-empty">No locations match this filter yet.</div>');
    renderMarkers(section);
    if (!places.some(function (place) { return place.id === selectedId; }) && places.length) selectPlace(section, places[0].id, false);
  }

  function renderMarkers(section) {
    if (!mapInstance || !window.L) return;
    var mappedPlaces = visiblePlaces().filter(function (place) { return typeof place.lat === 'number' && typeof place.lng === 'number'; });
    if (markerLayer) markerLayer.clearLayers();
    placeMarkers = {};
    mappedPlaces.forEach(function (place) {
      var icon = window.L.divIcon({
        className: '',
        html: '<div class="travel-marker ' + markerClass(place) + '"><span class="travel-marker-count">' + place.items.length + '</span></div>',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30]
      });
      var marker = window.L.marker([place.lat, place.lng], { icon: icon, title: place.city })
        .bindTooltip(place.city + ' &middot; ' + place.items.length + ' ' + (place.items.length === 1 ? 'entry' : 'entries'), { className: 'travel-tooltip', direction: 'top', offset: [0, -24] })
        .bindPopup(placePopupHtml(place));
      marker.on('click', function () { selectPlace(section, place.id, false); });
      markerLayer.addLayer(marker);
      placeMarkers[place.id] = marker;
    });
    if (mappedPlaces.length) {
      var bounds = window.L.latLngBounds(mappedPlaces.map(function (place) { return [place.lat, place.lng]; }));
      mapInstance.fitBounds(bounds.pad(0.18), { animate: true, maxZoom: 5 });
    }
  }

  function initLeaflet(section) {
    if (mapInstance || !window.L) return;
    var canvas = section.querySelector('[data-leaflet-map]');
    if (!canvas) return;
    canvas.innerHTML = '';
    mapInstance = window.L.map(canvas, {
      scrollWheelZoom: false,
      worldCopyJump: true,
      zoomControl: true,
      attributionControl: true
    }).setView([25, 35], 2);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);
    markerLayer = window.L.markerClusterGroup ? window.L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 34,
      iconCreateFunction: function (cluster) {
        return window.L.divIcon({ html: '<div class="travel-cluster">' + cluster.getChildCount() + '</div>', className: '', iconSize: [40, 40] });
      }
    }) : window.L.layerGroup();
    mapInstance.addLayer(markerLayer);
    renderMarkers(section);
    setTimeout(function () { mapInstance.invalidateSize(); }, 120);
  }

  function renderMap() {
    var section = document.getElementById('my-travel-map');
    if (!section || section.dataset.travelRendered === 'true') return;
    section.dataset.travelRendered = 'true';
    renderStats(section.querySelector('[data-travel-stats]'));
    renderCards(section);
    renderPanel(section, data[0]);

    section.querySelector('[data-travel-cards]').addEventListener('click', function (event) {
      var button = event.target.closest('[data-open-place]');
      if (button) selectPlace(section, button.getAttribute('data-open-place'), true);
    });
    section.querySelectorAll('[data-travel-filter]').forEach(function (button) {
      button.addEventListener('click', function () { applyFilter(section, button.getAttribute('data-travel-filter')); });
    });

    ensureLeaflet().then(function () {
      initLeaflet(section);
      applyFilter(section, activeFilter);
      selectPlace(section, selectedId, false);
    }).catch(function () {
      var canvas = section.querySelector('[data-leaflet-map]');
      if (canvas) canvas.innerHTML = '<div class="travel-map-loading">The interactive map could not load. Location details are available in the cards and panel.</div>';
    });
  }

  function ensureMapIfVisible() {
    var tabPanel = document.getElementById('connection-section-my-travel-map');
    if (tabPanel && tabPanel.classList.contains('active')) renderMap();
    if (mapInstance) setTimeout(function () { mapInstance.invalidateSize(); }, 80);
  }

  function renderPreview() {
    var strip = document.getElementById('travelPreviewStrip');
    var markerLayer = document.getElementById('travelPreviewMarkers');
    if (!strip && !markerLayer) return;
    var highlights = [
      { id: 'jaipur-india', x: 66, y: 52 },
      { id: 'zagreb-croatia', x: 51, y: 30 },
      { id: 'dubai-uae', x: 70, y: 48 },
      { id: 'agra-india', x: 64, y: 57 },
      { id: 'delhi-india', x: 64, y: 50 },
      { id: 'udaipur-india', x: 62, y: 62 }
    ];
    var places = highlights.map(function (item) {
      var place = data.filter(function (entry) { return entry.id === item.id; })[0];
      return place ? { place: place, x: item.x, y: item.y } : null;
    }).filter(Boolean);

    if (markerLayer) {
      markerLayer.innerHTML = places.map(function (item) {
        return '<span class="travel-mini-marker" data-city="' + escapeHtml(item.place.city) + '" style="left:' + item.x + '%;top:' + item.y + '%"></span>';
      }).join('');
    }
    if (strip) {
      strip.innerHTML = places.map(function (item) {
        var place = item.place;
        return '<article class="travel-preview-card"><h3>' + escapeHtml(place.city) + '</h3><p>' + place.items.length + ' related ' + (place.items.length === 1 ? 'entry' : 'entries') + ' &middot; ' + escapeHtml(place.status) + '</p></article>';
      }).join('');
    }
  }

  renderPreview();
  document.addEventListener('DOMContentLoaded', ensureMapIfVisible);
  window.addEventListener('load', ensureMapIfVisible);
  window.addEventListener('socialtabchange', function (event) {
    if (event.detail && event.detail.id === 'my-travel-map') renderMap();
  });
})();
