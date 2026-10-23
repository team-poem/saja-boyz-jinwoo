// Injected only in an owned, isolated QA Playwright context.
export function installNaverFixture() {
  const handlers = new Map();
  const state = window.__detailQA = {
    maps: [],
    copies: [],
    geolocationRequests: 0,
    shareMode: 'unsupported',
    nativeShares: [],
    shareCalls: 0,
    events: [],
  };
  const fire = (target, event) => {
    state.events.push(event);
    for (const fn of handlers.get(target)?.get(event) || []) fn();
  };
  class LatLng {
    constructor(latitude, longitude) { this.latitude = latitude; this.longitude = longitude; }
    lat() { return this.latitude; }
    lng() { return this.longitude; }
  }
  class Point { constructor(x, y) { this.x = x; this.y = y; } }
  class Size { constructor(width, height) { this.width = width; this.height = height; } }
  class MapFixture {
    constructor(element, options) {
      this.element = element;
      this.center = options.center;
      this.zoom = options.zoom;
      this.markers = [];
      this.controls = {};
      this.destroyed = false;
      this.moves = 0;
      this.element.style.background = '#e8eef0';
      this.element.style.position = 'relative';
      this.element.setAttribute('data-local-map-fixture', 'true');
      const label = document.createElement('div');
      label.textContent = '검증용 지도 · 실제 지도 타일 아님';
      label.style.cssText = 'position:absolute;left:12px;top:160px;pointer-events:none;color:#607080;font-size:11px';
      element.append(label);
      state.maps.push(this);
      setTimeout(() => fire(this, 'init'), 0);
    }
    getCenter() { return this.center; }
    getZoom() { return this.zoom; }
    setCenter(point) { this.center = point; this.moves += 1; fire(this, 'center_changed'); fire(this, 'idle'); }
    panTo(point) { this.setCenter(point); }
    setZoom(zoom) { this.zoom = zoom; fire(this, 'zoom_changed'); fire(this, 'idle'); }
    setSize(size) { this.size = size; }
    getProjection() {
      return { fromCoordToOffset: (point) => {
        // Stable separated positions avoid accidental SDK-dependent visual clustering.
        if (point.lat() > 37) return new Point(85, 230);
        if (point.lng() > 129) return new Point(285, 340);
        return new Point(185, 450);
      } };
    }
    destroy() { this.destroyed = true; this.markers.forEach((m) => m.setMap(null)); this.element.innerHTML = ''; }
  }
  class Marker {
    constructor(options) {
      this.options = options;
      this.content = options.icon?.content;
      this.position = options.position;
      if (this.content) {
        this.content.addEventListener('click', () => fire(this, 'click'));
      }
      this.setMap(options.map);
    }
    setMap(map) {
      this.map = map;
      if (!map) { this.content?.remove(); return; }
      if (!map.markers.includes(this)) map.markers.push(this);
      if (this.content) {
        const point = map.getProjection().fromCoordToOffset(this.position);
        this.content.style.cssText += `;position:absolute;left:${point.x}px;top:${point.y}px;transform:translate(-50%,-50%);z-index:2`;
        map.element.append(this.content);
      }
    }
  }
  window.naver = { maps: {
    Map: MapFixture, Marker, LatLng, Point, Size,
    Position: { BOTTOM_LEFT: 'BOTTOM_LEFT', BOTTOM_CENTER: 'BOTTOM_CENTER', BOTTOM_RIGHT: 'BOTTOM_RIGHT' },
    Event: {
      addListener(target, event, fn) {
        if (!handlers.has(target)) handlers.set(target, new Map());
        const events = handlers.get(target);
        if (!events.has(event)) events.set(event, new Set());
        events.get(event).add(fn);
        return { target, event, fn };
      },
      removeListener(listener) { handlers.get(listener.target)?.get(listener.event)?.delete(listener.fn); },
      trigger: fire,
    },
  } };
  Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
    getCurrentPosition(success) {
      state.geolocationRequests += 1;
      // A fixed fictional QA location, never the user's live location.
      setTimeout(() => success({ coords: { latitude: 37.5665, longitude: 126.978, accuracy: 1000 } }), 0);
    },
  } });
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
    writeText: async (text) => { state.copies.push(text); },
  } });
  Object.defineProperty(navigator, 'share', { configurable: true, get() {
    if (state.shareMode === 'unsupported') return undefined;
    return async (payload) => {
      state.shareCalls += 1;
      if (state.shareMode === 'cancel') throw new DOMException('사용자 취소', 'AbortError');
      if (state.shareMode === 'fail') throw new Error('QA native share failure');
      state.nativeShares.push(payload);
    };
  } });
}
