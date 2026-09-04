import fs from 'node:fs';

const CDP_PORT = 9333;
const SITE = 'http://127.0.0.1:8765/';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class CdpClient {
  constructor(url) {
    this.url = url;
    this.id = 0;
    this.pending = new Map();
    this.waiters = new Map();
    this.exceptions = [];
    this.localFailures = [];
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => this.onMessage(event));
    await Promise.all([
      this.send('Page.enable'),
      this.send('Runtime.enable'),
      this.send('Network.enable'),
      this.send('Log.enable'),
    ]);
    await this.send('Network.setBlockedURLs', {
      urls: ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.gif', '*.jfif', '*.mp4', '*fonts.googleapis.com*', '*counterapi.dev*'],
    });
  }

  onMessage(event) {
    const message = JSON.parse(event.data);
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result || {});
      return;
    }
    if (message.method === 'Runtime.exceptionThrown') {
      const details = message.params.exceptionDetails || {};
      this.exceptions.push({
        text: details.exception?.description || details.text || 'Runtime exception',
        url: details.url || '',
        line: details.lineNumber,
        column: details.columnNumber,
        stack: details.stackTrace?.callFrames?.slice(0, 3) || [],
      });
    }
    if (message.method === 'Network.loadingFailed') {
      const url = message.params.blockedReason || message.params.errorText || '';
      if (/127\.0\.0\.1/.test(url)) this.localFailures.push(url);
    }
    const queue = this.waiters.get(message.method);
    if (queue?.length) queue.shift()(message.params || {});
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  waitFor(method, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const queue = this.waiters.get(method) || [];
      const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeout);
      queue.push((params) => {
        clearTimeout(timer);
        resolve(params);
      });
      this.waiters.set(method, queue);
    });
  }

  async goto(path) {
    const destination = new URL(path, SITE);
    destination.searchParams.set('_atlasqa', String(Date.now()));
    const domReady = this.waitFor('Page.domContentEventFired', 20000);
    await this.send('Page.navigate', { url: destination.href });
    await domReady;
    await this.poll('Boolean(document.querySelector(".portfolio-atlas-trail-wrap") && window.PortfolioAtlas)', 10000);
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Evaluation failed');
    return result.result?.value;
  }

  async poll(expression, timeout = 8000) {
    const started = Date.now();
    while (Date.now() - started < timeout) {
      if (await this.evaluate(expression)) return true;
      await delay(35);
    }
    throw new Error(`Timed out polling: ${expression}`);
  }

  close() {
    this.socket.close();
  }
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

const target = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?${encodeURIComponent('about:blank')}`, {
  method: 'PUT',
}).then((response) => response.json());

const cdp = new CdpClient(target.webSocketDebuggerUrl);
await cdp.connect();
await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});

const failures = [];
const routeResults = [];
const routes = [
  ['index.html', 'home', 'Home'],
  ['experience.html', 'experience', 'Experience'],
  ['project.html', 'projects', 'Projects'],
  ['project.html#p1', 'project-p1', 'Surveillance System to Track Individuals Using Gait Biometrics'],
  ['publication.html', 'publications', 'Publications'],
  ['education.html', 'education', 'Education & Learning'],
  ['academics.html', 'academics', 'Academics'],
  ['event.html#talks', 'evt-talks', 'Talks Delivered'],
  ['blog.html', 'blog', 'Blog'],
  ['academics.html#et-10', 'story-academics-et-10', 'Fundamentals of LLMs & RAG — Global AI Jaipur'],
  ['social-life.html', 'social-life', 'Social Life'],
  ['sports.html', 'sports', 'Sports'],
  ['avocations.html', 'avocations', 'Avocations'],
];

for (const [path, expectedId, expectedLabel] of routes) {
  await cdp.goto(path);
  await delay(1150);
  const result = await cdp.evaluate(`(() => {
    const current = PortfolioAtlas.getCurrentNode();
    const trail = document.querySelector('.portfolio-atlas-trail-wrap');
    const trigger = document.querySelector('.portfolio-atlas-trigger');
    const crumbs = Array.from(document.querySelectorAll('.portfolio-atlas-crumb')).map((node) => node.textContent.trim());
    const activeHeader = document.querySelector('.header_area .nav-item[data-nav].active');
    trigger.click();
    const dialog = document.querySelector('.portfolio-atlas-dialog');
    const currentTreeNode = dialog.querySelector('.portfolio-atlas-node.is-current');
    const parentList = currentTreeNode && currentTreeNode.parentElement;
    const visibleSiblings = parentList ? Array.from(parentList.children).filter((node) => node.getClientRects().length).length : 0;
    return {
      id: current && current.id,
      label: current && current.label,
      crumbs,
      activeHeader: activeHeader && activeHeader.getAttribute('data-nav'),
      trailReady: trail.classList.contains('is-ready'),
      triggerLabel: trigger.getAttribute('aria-label'),
      dialogOpen: dialog.open || dialog.hasAttribute('open'),
      semanticNav: Boolean(dialog.querySelector('nav[aria-label="Portfolio Atlas"] ul')),
      currentTree: currentTreeNode && currentTreeNode.getAttribute('data-node-id'),
      currentAria: currentTreeNode && currentTreeNode.querySelector('[aria-current="page"]')?.getAttribute('aria-current'),
      visibleSiblings,
      bodyOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    };
  })()`);
  assert(result.id === expectedId, `${path}: expected current ${expectedId}, got ${result.id}`, failures);
  assert(result.label === expectedLabel, `${path}: expected label “${expectedLabel}”, got “${result.label}”`, failures);
  assert(result.crumbs.at(-1) === expectedLabel, `${path}: current breadcrumb is incorrect`, failures);
  assert(result.trailReady, `${path}: arrival state did not resolve to the icon`, failures);
  assert(result.triggerLabel === 'Open Portfolio Atlas', `${path}: trigger accessible label is incorrect`, failures);
  assert(result.dialogOpen && result.semanticNav, `${path}: Atlas dialog or semantic nav did not open`, failures);
  assert(result.currentTree === expectedId, `${path}: current tree node is incorrect`, failures);
  assert(result.currentAria === 'page', `${path}: current node lacks aria-current=page`, failures);
  assert(result.visibleSiblings >= 1, `${path}: current branch has no visible context`, failures);
  assert(result.bodyOverflow, `${path}: horizontal page overflow detected`, failures);
  await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 });
  await delay(60);
  const closed = await cdp.evaluate('!document.querySelector(".portfolio-atlas-dialog").open');
  assert(closed, `${path}: Escape did not close the dialog`, failures);
  routeResults.push({ path, ...result, escapeClosed: closed });
}

await cdp.goto('index.html');
const arrivalBefore = await cdp.evaluate(`(() => {
  const wrap = document.querySelector('.portfolio-atlas-trail-wrap');
  const heading = document.querySelector('h1');
  const crumb = document.querySelector('.portfolio-atlas-trail ol');
  return {
    ready: wrap.classList.contains('is-ready'),
    here: getComputedStyle(document.querySelector('.portfolio-atlas-here')).opacity,
    heading: heading && heading.getBoundingClientRect().toJSON(),
    crumb: crumb.getBoundingClientRect().toJSON(),
  };
})()`);
await delay(1400);
const arrivalAfter = await cdp.evaluate(`(() => {
  const wrap = document.querySelector('.portfolio-atlas-trail-wrap');
  const heading = document.querySelector('h1');
  const crumb = document.querySelector('.portfolio-atlas-trail ol');
  return {
    ready: wrap.classList.contains('is-ready'),
    icon: getComputedStyle(document.querySelector('.portfolio-atlas-trigger')).opacity,
    heading: heading && heading.getBoundingClientRect().toJSON(),
    crumb: crumb.getBoundingClientRect().toJSON(),
  };
})()`);
assert(!arrivalBefore.ready && arrivalBefore.here === '1', 'Home: YOU ARE HERE was not visible on route arrival', failures);
assert(arrivalAfter.ready && Number(arrivalAfter.icon) > 0.98, 'Home: Atlas icon did not replace YOU ARE HERE', failures);
assert(Math.abs(arrivalBefore.crumb.x - arrivalAfter.crumb.x) < 0.5, 'Home: breadcrumb shifted during the transition', failures);
assert(Math.abs(arrivalBefore.heading.x - arrivalAfter.heading.x) < 0.5, 'Home: heading shifted during the transition', failures);

await cdp.evaluate('document.querySelector(".portfolio-atlas-trigger").click()');
await delay(1900);
const counts = await cdp.evaluate(`(() => {
  const values = PortfolioAtlas.getCounts();
  return { projects: values.projects, publications: values.publications, blog: values.blog, academics: values.academics };
})()`);
assert(counts.projects === 19, `Projects count expected 19, got ${counts.projects}`, failures);
assert(counts.publications === 55, `Publications count expected 55, got ${counts.publications}`, failures);
assert(counts.blog === 87, `Canonical Blog count expected 87 before category discovery, got ${counts.blog}`, failures);
assert(counts.academics === 77, `Academics count expected 77, got ${counts.academics}`, failures);
await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }).then(({ data }) => {
  fs.writeFileSync('tmp/portfolio-atlas-desktop.png', Buffer.from(data, 'base64'));
});

const keyboardBefore = await cdp.evaluate(`(() => {
  const button = document.querySelector('[data-node-id="professional"] > .portfolio-atlas-node-row .portfolio-atlas-expander');
  button.focus();
  return button.getAttribute('aria-expanded');
})()`);
await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', unmodifiedText: '\r', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
await delay(80);
const keyboardAfterEnter = await cdp.evaluate(`document.querySelector('[data-node-id="professional"] > .portfolio-atlas-node-row .portfolio-atlas-expander').getAttribute('aria-expanded')`);
await cdp.evaluate(`document.querySelector('[data-node-id="professional"] > .portfolio-atlas-node-row .portfolio-atlas-expander').focus()`);
await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: ' ', code: 'Space', windowsVirtualKeyCode: 32, nativeVirtualKeyCode: 32 });
await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space', windowsVirtualKeyCode: 32, nativeVirtualKeyCode: 32 });
await delay(80);
const keyboardAfterSpace = await cdp.evaluate(`document.querySelector('[data-node-id="professional"] > .portfolio-atlas-node-row .portfolio-atlas-expander').getAttribute('aria-expanded')`);
const keyboard = { before: keyboardBefore, afterEnter: keyboardAfterEnter, afterSpace: keyboardAfterSpace };
assert(keyboardBefore === 'false' && keyboardAfterEnter === 'true' && keyboardAfterSpace === 'false', `Keyboard: expected false → true → false, got ${keyboardBefore} → ${keyboardAfterEnter} → ${keyboardAfterSpace}`, failures);

await cdp.evaluate(`(() => {
  const input = document.querySelector('.portfolio-atlas-search');
  input.value = 'Croatia';
  input.dispatchEvent(new Event('input', { bubbles: true }));
})()`);
await cdp.poll('document.querySelectorAll("[data-atlas-result]").length > 0', 15000);
await delay(500);
const searchResult = await cdp.evaluate(`(() => {
  const first = document.querySelector('[data-atlas-result]');
  const text = first && first.textContent.replace(/\\s+/g, ' ').trim();
  first && first.click();
  const focused = document.querySelector('.portfolio-atlas-node-row.is-focused');
  return { text, focused: focused && focused.parentElement.getAttribute('data-node-id') };
})()`);
assert(/Croatia/i.test(searchResult.text || ''), `Search: Croatia result missing (${searchResult.text})`, failures);
assert(Boolean(searchResult.focused), 'Search: selecting a result did not focus its tree node', failures);

await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await cdp.goto('publication.html#journals');
await delay(1150);
await cdp.evaluate(`document.querySelector('.portfolio-atlas-trigger').click()`);
await delay(650);
const mobile = await cdp.evaluate(`(() => {
  const dialog = document.querySelector('.portfolio-atlas-dialog');
  const expanders = Array.from(dialog.querySelectorAll('.portfolio-atlas-expander')).filter((node) => node.getClientRects().length);
  const targets = expanders.map((node) => node.getBoundingClientRect().height);
  return {
    current: PortfolioAtlas.getCurrentNode().id,
    viewport: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    dialogWidth: dialog.getBoundingClientRect().width,
    dialogHeight: dialog.getBoundingClientRect().height,
    minTouch: Math.min(...targets),
    verticalTree: getComputedStyle(document.querySelector('.portfolio-atlas-frame')).display === 'flex',
  };
})()`);
assert(mobile.current === 'pub-journals', `Mobile: expected pub-journals, got ${mobile.current}`, failures);
assert(mobile.scrollWidth <= mobile.viewport, `Mobile: horizontal overflow ${mobile.scrollWidth}/${mobile.viewport}`, failures);
assert(Math.abs(mobile.dialogWidth - mobile.viewport) < 1, 'Mobile: dialog is not full width', failures);
assert(mobile.minTouch >= 43.9, `Mobile: expandable touch target is ${mobile.minTouch}px`, failures);
assert(mobile.verticalTree, 'Mobile: Atlas did not switch to vertical expandable layout', failures);
await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }).then(({ data }) => {
  fs.writeFileSync('tmp/portfolio-atlas-mobile.png', Buffer.from(data, 'base64'));
});

await cdp.send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
});
await cdp.goto('index.html');
const reduced = await cdp.evaluate(`(() => {
  const wrap = document.querySelector('.portfolio-atlas-trail-wrap');
  return {
    ready: wrap.classList.contains('is-ready'),
    triggerTabIndex: document.querySelector('.portfolio-atlas-trigger').getAttribute('tabindex'),
  };
})()`);
assert(reduced.ready && reduced.triggerTabIndex !== '-1', 'Reduced motion: arrival transition was not skipped', failures);

cdp.close();

const report = {
  passed: failures.length === 0,
  failures,
  counts,
  arrival: { before: arrivalBefore, after: arrivalAfter },
  searchResult,
  keyboard,
  mobile,
  reduced,
  routes: routeResults,
  runtimeExceptions: cdp.exceptions,
  localNetworkFailures: cdp.localFailures,
};
fs.writeFileSync('tmp/portfolio-atlas-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (failures.length || cdp.exceptions.length || cdp.localFailures.length) process.exitCode = 1;
