(function () {
  'use strict';

  var FILTERS = ['All', 'India', 'International', 'Visited', 'Academic Footprint', 'Conferences', 'Workshops', 'Talks', 'Research Visits', 'Awards', 'Hackathons', 'Social / Outreach', 'Sports', 'Trekking'];

  var CDN = {
    leafletCss: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    leafletJs: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    clusterCss: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
    clusterDefaultCss: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css',
    clusterJs: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js'
  };

  var map = null;
  var markerLayer = null;
  var markersById = {};
  var activeFilter = 'All';
  var places = [];
  var mapEl = null;
  var detailsEl = null;
  var filtersEl = null;
  var summaryEl = null;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getData() {
    return (window.travelMapData || (window.SiteData && window.SiteData.travelMapData) || []).filter(Boolean);
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
    if (window.L) {
      if (window.L.markerClusterGroup) return Promise.resolve();
      return loadScript(CDN.clusterJs).catch(function () { return null; });
    }

    loadStyle(CDN.leafletCss);
    loadStyle(CDN.clusterCss);
    loadStyle(CDN.clusterDefaultCss);

    return loadScript(CDN.leafletJs).then(function () {
      return loadScript(CDN.clusterJs).catch(function () { return null; });
    });
  }

  function coordinatePair(place) {
    var lat = Number(place && place.lat);
    var lng = Number(place && place.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      if (window.console && typeof window.console.warn === 'function') {
        window.console.warn('Global Footprints location missing coordinates:', (place && (place.city || place.title)) || 'Unknown location', place);
      }
      return null;
    }

    return [lat, lng];
  }

  function getTravelItemUrl(item, location) {
    return (
      item.url ||
      item.href ||
      item.link ||
      item.postUrl ||
      item.sourceUrl ||
      location.url ||
      ''
    );
  }

  function categoriesFor(place) {
    var categories = Array.isArray(place.categories) ? place.categories.slice() : [];

    (place.items || []).forEach(function (item) {
      if (item.category && categories.indexOf(item.category) === -1) {
        categories.push(item.category);
      }
    });

    return categories;
  }

  function matchesFilter(place, filter) {
    if (filter === 'All') return true;
    if (filter === 'India' || filter === 'International') return place.region === filter;
    if (filter === 'Visited' || filter === 'Academic Footprint') return place.status === filter;
    return categoriesFor(place).indexOf(filter) !== -1;
  }

  function visiblePlaces() {
    return places.filter(function (place) {
      return matchesFilter(place, activeFilter);
    });
  }

  function markerClass(place) {
    if (place.status === 'Academic Footprint') return 'footprint';
    if (place.status === 'Location to Confirm') return 'unconfirmed';
    return '';
  }

  function placeLocation(place) {
    return [place.city, place.state, place.country].filter(Boolean).join(', ');
  }

  function entryMeta(item) {
    return [item.date, item.category].filter(Boolean).map(escapeHtml).join(' &middot; ');
  }

  function itemLinkHtml(item, place) {
    var url = getTravelItemUrl(item, place);
    return url ? '<a href="' + escapeHtml(url) + '">View</a>' : '';
  }

  function chipsHtml(place, limit) {
    return categoriesFor(place).slice(0, limit || 6).map(function (category) {
      return '<span>' + escapeHtml(category) + '</span>';
    }).join('');
  }

  function popupHtml(place) {
    var items = (place.items || []).slice(0, 8).map(function (item) {
      return '<article class="global-popup-item"><strong>' + escapeHtml(item.title) + '</strong><small>' + entryMeta(item) + '</small>' + itemLinkHtml(item, place) + '</article>';
    }).join('');

    return '<div class="global-map-popup"><h3>' + escapeHtml(placeLocation(place)) + '</h3>' +
      '<p>' + escapeHtml(place.summary || '') + '</p>' +
      '<div class="global-popup-chips"><span>' + escapeHtml(place.status || '') + '</span><span>' + (place.items || []).length + ' ' + ((place.items || []).length === 1 ? 'entry' : 'entries') + '</span>' + chipsHtml(place, 4) + '</div>' +
      '<div class="global-popup-items">' + items + '</div></div>';
  }

  function renderDetails(place) {
    if (!detailsEl || !place) return;

    var entries = (place.items || []).map(function (item) {
      return '<article class="home-map-entry"><h4>' + escapeHtml(item.title) + '</h4><small>' + entryMeta(item) + '</small>' + itemLinkHtml(item, place) + '</article>';
    }).join('');

    detailsEl.innerHTML = '<div class="home-map-kicker">' + escapeHtml(place.status || '') + ' &middot; ' + (place.items || []).length + ' ' + ((place.items || []).length === 1 ? 'entry' : 'entries') + '</div>' +
      '<h3>' + escapeHtml(placeLocation(place)) + '</h3>' +
      '<p>' + escapeHtml(place.summary || '') + '</p>' +
      '<div class="home-map-chips">' + chipsHtml(place, 8) + '</div>' +
      '<div class="home-map-entry-list">' + entries + '</div>';

    detailsEl.scrollTop = 0;
  }

  function selectPlace(place, openPopup) {
    renderDetails(place);

    var marker = markersById[place.id];

    if (marker && map) {
      map.panTo(marker.getLatLng(), { animate: true, duration: 0.35 });
      if (openPopup) marker.openPopup();
    }
  }

  function renderFilters() {
    if (!filtersEl) return;

    filtersEl.innerHTML = FILTERS.map(function (filter) {
      return '<button type="button" class="global-map-filter' + (filter === activeFilter ? ' active' : '') + '" data-filter="' + escapeHtml(filter) + '" aria-pressed="' + (filter === activeFilter ? 'true' : 'false') + '">' + escapeHtml(filter) + '</button>';
    }).join('');

    filtersEl.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;

      activeFilter = button.getAttribute('data-filter') || 'All';

      filtersEl.querySelectorAll('[data-filter]').forEach(function (item) {
        var active = item.getAttribute('data-filter') === activeFilter;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      renderMarkers();
      renderSummary();

      var first = visiblePlaces().filter(coordinatePair)[0];
      if (first) renderDetails(first);
    });
  }

  function regionFor(place) {
    if (place.region === 'India' || place.country === 'India') return 'India';
    if (/United Arab Emirates/i.test(place.country || '')) return 'Middle East';
    if (/Croatia|United Kingdom|Russia/i.test(place.country || '')) return 'Europe';
    if (/Malaysia/i.test(place.country || '')) return 'Southeast Asia';
    if (place.status === 'Location to Confirm') return 'Location to Confirm';
    return place.region || 'Other';
  }

  function renderSummary() {
    if (!summaryEl) return;

    var counts = {};

    visiblePlaces().forEach(function (place) {
      var region = regionFor(place);
      if (!counts[region]) counts[region] = { places: 0, entries: 0 };
      counts[region].places += 1;
      counts[region].entries += (place.items || []).length;
    });

    summaryEl.innerHTML = Object.keys(counts).sort().map(function (region) {
      var count = counts[region];
      return '<article class="home-map-region-card"><strong>' + escapeHtml(region) + '</strong><span>' + count.places + ' ' + (count.places === 1 ? 'place' : 'places') + ' &middot; ' + count.entries + ' ' + (count.entries === 1 ? 'entry' : 'entries') + '</span></article>';
    }).join('');
  }

  function fitVisibleMarkers() {
    if (!map) return;

    var bounds = [];

    visiblePlaces().forEach(function (place) {
      var point = coordinatePair(place);
      if (point) bounds.push(point);
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [38, 38], maxZoom: 5 });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 5);
    }
  }

  function renderMarkers() {
    if (!map || !window.L) return;

    if (markerLayer) markerLayer.clearLayers();

    markersById = {};

    visiblePlaces().forEach(function (place) {
      var point = coordinatePair(place);
      if (!point) return;

      var icon = window.L.divIcon({
        className: '',
        html: '<div class="global-footprint-marker ' + markerClass(place) + '"><span class="global-footprint-count">' + (place.items || []).length + '</span></div>',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30]
      });

      var marker = window.L.marker(point, { icon: icon, title: place.city })
        .bindTooltip(place.city + ' &middot; ' + (place.items || []).length + ' ' + ((place.items || []).length === 1 ? 'entry' : 'entries'), { direction: 'top', offset: [0, -24] })
        .bindPopup(popupHtml(place));

      marker.on('click', function () {
        selectPlace(place, false);
      });

      markerLayer.addLayer(marker);
      markersById[place.id] = marker;
    });

    fitVisibleMarkers();
  }

  function initMap() {
    map = window.L.map(mapEl, {
      scrollWheelZoom: false,
      zoomControl: true,
      worldCopyJump: true,
      attributionControl: true
    }).setView([24, 32], 2);

    /* Removes only the automatic "Leaflet |" prefix from the attribution box */
    if (map.attributionControl) {
      map.attributionControl.setPrefix('');
    }

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    markerLayer = window.L.markerClusterGroup ? window.L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 36,
      iconCreateFunction: function (cluster) {
        return window.L.divIcon({
          html: '<div class="global-footprint-cluster">' + cluster.getChildCount() + '</div>',
          className: '',
          iconSize: [42, 42]
        });
      }
    }) : window.L.layerGroup();

    map.addLayer(markerLayer);
    renderMarkers();
    renderSummary();

    var first = visiblePlaces().filter(coordinatePair)[0];
    if (first) renderDetails(first);

    setTimeout(function () {
      map.invalidateSize();
      fitVisibleMarkers();
    }, 120);
  }

  function showError(message) {
    if (mapEl) {
      mapEl.innerHTML = '<div class="home-global-map-error">' + escapeHtml(message) + '</div>';
    }
  }

  function start() {
    mapEl = document.getElementById('home-global-map');
    if (!mapEl) return;

    detailsEl = document.getElementById('home-map-details');
    filtersEl = document.getElementById('home-map-filters');
    summaryEl = document.getElementById('home-map-region-summary');

    places = getData();

    if (!places.length) {
      showError('Global Footprints data is not available yet.');
      return;
    }

    renderFilters();

    ensureLeaflet().then(function () {
      if (!window.L) throw new Error('Leaflet did not load');
      initMap();
    }).catch(function () {
      showError('The interactive map could not load. Please check your connection and try again.');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();