import assert from 'node:assert/strict';
import { test } from 'node:test';
import config from '../site.config.mjs';
import { renderNotFound } from '../lib/render.mjs';

test('404 page shows both languages', () => {
  const page = renderNotFound({ config });
  assert.match(page, /Page not found/);
  assert.match(page, /Page introuvable/);
  assert.ok(page.includes(`href="${config.siteUrl}fr/"`));
});