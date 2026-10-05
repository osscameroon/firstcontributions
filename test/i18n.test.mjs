import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createTranslator, localeHref, DEFAULT_LOCALE, LOCALES } from '../lib/i18n.mjs';

test('LOCALES includes the default locale', () => {
  assert.ok(LOCALES.includes(DEFAULT_LOCALE));
});

test('createTranslator falls back to the default locale for a missing key', () => {
  const t = createTranslator({ en: { greeting: 'Hello {name}' }, fr: {} });
  assert.equal(t('fr', 'greeting', { name: 'Alex' }), 'Hello Alex');
});

test('createTranslator falls back to the raw key if missing everywhere', () => {
  const t = createTranslator({ en: {}, fr: {} });
  assert.equal(t('en', 'nope'), 'nope');
});

test('localeHref: same locale points to the current page', () => {
  assert.equal(localeHref('en', 'en', ''), '.');
});

test('localeHref: default locale from a nested locale page goes up to localeRoot', () => {
  assert.equal(localeHref('en', 'fr', '../'), '../');
});

test('localeHref: non-default locale from the default locale page nests under /<locale>/', () => {
  assert.equal(localeHref('fr', 'en', ''), 'fr/');
});