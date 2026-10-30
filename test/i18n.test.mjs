import assert from 'node:assert/strict';
import { test } from 'node:test';
import { translations } from '../lib/i18n.mjs';
import config from '../site.config.mjs';
import { renderIndex, renderProfile, renderNotFound } from '../lib/render.mjs';
import { parseContributionUrl } from '../lib/contributors.mjs';

// ── Translation key parity ──

test('en and fr have the same keys', () => {
  const enKeys = Object.keys(translations.en).sort();
  const frKeys = Object.keys(translations.fr).sort();
  assert.deepEqual(enKeys, frKeys, 'en and fr translation keys must match');
});

test('no translation value is empty', () => {
  for (const [locale, strings] of Object.entries(translations)) {
    for (const [key, value] of Object.entries(strings)) {
      // fr footer_community is intentionally empty (sentence structure differs)
      if (locale === 'fr' && key === 'footer_community') continue;
      assert.ok(typeof value === 'string' && value.length > 0, `${locale}.${key} must be a non-empty string`);
    }
  }
});

// ── data-i18n attributes in rendered output ──

const contributor = {
  github: 'testuser',
  name: 'Test User',
  contributions: [
    { ...parseContributionUrl('https://github.com/a/b/pull/1'), title: 'Test PR', status: 'merged' },
  ],
};

test('index page contains data-i18n attributes', () => {
  const page = renderIndex({ config, contributors: [contributor] });
  assert.ok(page.includes('data-i18n="hero_h1"'), 'missing hero_h1 i18n attribute');
  assert.ok(page.includes('data-i18n="nav_contributors"'), 'missing nav_contributors i18n attribute');
  assert.ok(page.includes('data-i18n="footer_built"'), 'missing footer_built i18n attribute');
  assert.ok(page.includes('data-i18n-placeholder="form_placeholder"'), 'missing form_placeholder i18n attribute');
  assert.ok(page.includes('data-i18n-html="how_step1"'), 'missing how_step1 i18n-html attribute');
});

test('profile page contains data-i18n attributes', () => {
  const page = renderProfile({ config, contributor });
  assert.ok(page.includes('data-i18n="back_link"'), 'missing back_link i18n attribute');
  assert.ok(page.includes('data-i18n="profile_contributions_h2"'), 'missing profile_contributions_h2 i18n attribute');
  assert.ok(page.includes('data-i18n="pill_merged"'), 'missing pill_merged i18n attribute');
});

test('404 page contains data-i18n attributes', () => {
  const page = renderNotFound({ config });
  assert.ok(page.includes('data-i18n="not_found_h1"'), 'missing not_found_h1 i18n attribute');
  assert.ok(page.includes('data-i18n="not_found_link"'), 'missing not_found_link i18n attribute');
});

test('language switcher script is included in rendered pages', () => {
  const page = renderIndex({ config, contributors: [] });
  assert.ok(page.includes('lang-btn'), 'missing language switcher buttons');
  assert.ok(page.includes('TRANSLATIONS'), 'missing serialised translations in script');
});
