import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);

async function readProjectFile(path) {
  try {
    return await readFile(new URL(path, root), "utf8");
  } catch {
    return null;
  }
}

test("the portfolio ships a complete semantic page", async () => {
  const html = await readProjectFile("index.html");

  assert.notEqual(html, null, "index.html must exist");
  assert.equal((html.match(/<main\b/gi) ?? []).length, 1);
  assert.match(html, /<section\b[^>]*\bid=["']about["']/i);
  assert.match(html, /<section\b[^>]*\bid=["']work["']/i);
  assert.match(html, /<section\b[^>]*\bid=["']contact["']/i);
  assert.match(html, /I build for the web &amp; the pocket\./i);
  assert.match(html, />Drift</i);
  assert.match(html, />Northstar</i);
  assert.match(html, />Relay</i);
  assert.ok(
    (html.match(/mailto:hi@juan-oclock\.com/gi) ?? []).length >= 2,
    "the page must include at least two direct email actions",
  );
  assert.match(html, /class=["'][^"']*skip-link/i);
  assert.match(html, /<img\b[^>]*\balt=["'][^"']+["']/i);
  assert.doesNotMatch(html, /https?:\/\/[^"']+\.(?:js|css)(?:[?"'])/i);
});

test("the visual system keeps interaction accessible", async () => {
  const css = await readProjectFile("styles.css");

  assert.notEqual(css, null, "styles.css must exist");
  assert.match(css, /:focus-visible/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/i);
  assert.match(css, /\.js\s+\.reveal/i);
  assert.match(css, /\.is-visible/i);
  assert.match(css, /@media\s*\([^)]*max-width:\s*900px/i);
  assert.match(css, /@media\s*\([^)]*max-width:\s*640px/i);
});

test("the vanilla enhancement reveals intersecting content and updates the year", async () => {
  const script = await readProjectFile("script.js");
  assert.notEqual(script, null, "script.js must exist");

  const rootClasses = new Set();
  const revealClasses = new Set();
  const year = { textContent: "2026" };
  const reveal = { classList: { add: (name) => revealClasses.add(name) } };
  const observed = [];
  const unobserved = [];
  let observerCallback;

  class FakeIntersectionObserver {
    constructor(callback) {
      observerCallback = callback;
    }
    observe(item) {
      observed.push(item);
    }
    unobserve(item) {
      unobserved.push(item);
    }
  }

  const document = {
    documentElement: { classList: { add: (name) => rootClasses.add(name) } },
    querySelectorAll: (selector) =>
      selector === ".reveal" ? [reveal] : selector === "[data-year]" ? [year] : [],
  };
  const window = {
    matchMedia: () => ({ matches: false }),
    IntersectionObserver: FakeIntersectionObserver,
  };

  runInNewContext(script, {
    Date,
    document,
    window,
    IntersectionObserver: FakeIntersectionObserver,
  });

  assert.ok(rootClasses.has("js"));
  assert.equal(year.textContent, String(new Date().getFullYear()));
  assert.deepEqual(observed, [reveal]);

  observerCallback([{ isIntersecting: true, target: reveal }]);
  assert.ok(revealClasses.has("is-visible"));
  assert.deepEqual(unobserved, [reveal]);
});

test("reduced motion reveals everything without starting an observer", async () => {
  const script = await readProjectFile("script.js");
  const revealClasses = new Set();
  const reveal = { classList: { add: (name) => revealClasses.add(name) } };
  const document = {
    documentElement: { classList: { add() {} } },
    querySelectorAll: (selector) => (selector === ".reveal" ? [reveal] : []),
  };
  const window = {
    matchMedia: () => ({ matches: true }),
    IntersectionObserver: class {
      constructor() {
        throw new Error("observer must not start for reduced motion");
      }
    },
  };

  runInNewContext(script, { Date, document, window });

  assert.ok(revealClasses.has("is-visible"));
});

test("the project remains dependency and framework free", async () => {
  const [html, css, script, packageJson] = await Promise.all([
    readProjectFile("index.html"),
    readProjectFile("styles.css"),
    readProjectFile("script.js"),
    readProjectFile("package.json"),
  ]);
  const source = [html, css, script, packageJson].filter(Boolean).join("\n");

  assert.doesNotMatch(source, /\b(?:react|next(?:\.js)?|tailwind|vue|angular|svelte)\b/i);
  assert.doesNotMatch(packageJson ?? "", /"(?:dependencies|devDependencies)"\s*:/);
});
