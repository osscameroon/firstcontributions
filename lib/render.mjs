import { contributorTemplate, editFileUrl, USERNAME_PLACEHOLDER } from './contributors.mjs';
import { translations } from './i18n.mjs';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

class Html {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

function interpolate(value) {
  if (value instanceof Html) return value.value;
  if (Array.isArray(value)) return value.map(interpolate).join('');
  if (value === undefined || value === null || value === false) return '';
  return escapeHtml(value);
}

/** Tagged template that escapes interpolated values unless they are already `html`. */
export function html(strings, ...values) {
  return new Html(strings.reduce((out, s, i) => out + interpolate(values[i - 1]) + s));
}

const avatar = (login, size) =>
  html`<img class="avatar" src="https://github.com/${login}.png?size=${size * 2}" alt="" width="${size}" height="${size}" loading="lazy">`;

const STATUS_LABELS = {
  merged: 'Merged',
  open: 'Open',
  draft: 'Draft',
  closed: 'Closed',
  completed: 'Closed',
  'not-planned': 'Not planned',
};

// Maps contribution status to its i18n key.
const STATUS_I18N = {
  merged: 'pill_merged',
  open: 'pill_open',
  draft: 'pill_draft',
  closed: 'pill_closed',
  completed: 'pill_closed',
  'not-planned': 'pill_not_planned',
};

/**
 * Returns the inline <script> block for the language switcher.
 * Translations are serialised into the script at build time so no runtime fetch is needed.
 */
function langSwitcherScript() {
  const t = JSON.stringify(translations);
  return new Html(`<script>
(() => {
  const TRANSLATIONS = ${t};

  function applyLang(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;
    document.documentElement.lang = lang;

    // Plain-text nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (key in t) el.textContent = t[key];
    });

    // Nodes that contain inner HTML (step list items, etc.)
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (key in t) el.innerHTML = t[key];
    });

    // Placeholder attributes (inputs)
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (key in t) el.placeholder = t[key];
    });

    // Switcher button visual state
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('lang-btn--active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function setLang(lang) {
    try { localStorage.setItem('lang', lang); } catch {}
    applyLang(lang);
  }

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Apply saved preference on load (default is English, already rendered)
  const saved = (() => { try { return localStorage.getItem('lang'); } catch { return null; } })();
  if (saved && saved !== 'en') applyLang(saved);
})();
<\/script>`);
}

function layout({ config, root, title, description, body }) {
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌍</text></svg>">
<link rel="stylesheet" href="${root}style.css">
</head>
<body>
<div class="flag" aria-hidden="true"><span></span><span></span><span></span></div>
<nav class="nav">
  <a class="brand" href="${root}">${config.community} <span data-i18n="nav_contributors">contributors</span></a>
  <div class="nav-end">
    <a href="https://github.com/${config.repo}">GitHub</a>
    <div class="lang-switcher" role="group" aria-label="Language">
      <button class="lang-btn lang-btn--active" data-lang="en" aria-pressed="true">English</button>
      <span class="lang-sep" aria-hidden="true">|</span>
      <button class="lang-btn" data-lang="fr" aria-pressed="false">Fran&#231;ais</button>
    </div>
  </div>
</nav>
<main>
${body}
</main>
<footer class="footer">
  <p><span data-i18n="footer_built">Built by the</span> <a href="${config.communityUrl}">${config.community}</a> <span data-i18n="footer_community">community.</span>
  <span data-i18n="footer_improve">Want to improve this site?</span> <a href="https://github.com/${config.repo}" data-i18n="footer_contributions">Contributions welcome</a>.</p>
</footer>
${langSwitcherScript()}
</body>
</html>
`.value;
}

function card(c) {
  const count = c.contributions.length;
  const meta = [c.location, count ? `${count} contribution${count > 1 ? 's' : ''}` : null].filter(Boolean);
  const search = [c.name, c.github, c.location].filter(Boolean).join(' ').toLowerCase();
  return html`<li class="card" data-search="${search}">
  <a href="u/${c.github}/">
    ${avatar(c.github, 56)}
    <span class="card-text">
      <span class="card-name">${c.name}</span>
      <span class="card-login">@${c.github}</span>
      ${meta.length ? html`<span class="card-meta">${meta.join(' · ')}</span>` : ''}
    </span>
  </a>
</li>`;
}

export function renderIndex({ config, contributors }) {
  const contributions = contributors.reduce((n, c) => n + c.contributions.length, 0);
  const merged = contributors.reduce((n, c) => n + c.contributions.filter((x) => x.status === 'merged').length, 0);
  const newFileBase = `https://github.com/${config.repo}/new/${config.branch}/contributors`;

  const body = html`<header class="hero">
  <p class="eyebrow">${config.community}</p>
  <h1 data-i18n="hero_h1">Your first open source contribution starts here</h1>
  <p class="lede" data-i18n="hero_lede">Everyone on this page joined by adding a small file to our repository. It takes about five minutes, you only need a GitHub account, and there is nothing to install.</p>
  <form class="join" id="join" data-url="${newFileBase}" data-template="${contributorTemplate()}" data-placeholder="${USERNAME_PLACEHOLDER}">
    <label for="login" data-i18n="form_label">Your GitHub username</label>
    <div class="join-row">
      <input id="login" name="login" autocomplete="username" spellcheck="false" placeholder="e.g. octocat" data-i18n-placeholder="form_placeholder" required pattern="[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}">
      <button type="submit" data-i18n="form_button">Add me &#8594;</button>
    </div>
    <p class="hint"><span data-i18n="form_hint">Opens GitHub with your file ready to fill in.</span> <a href="#how" data-i18n="form_hint_link">How it works</a></p>
  </form>
  <dl class="stats">
    <div><dt data-i18n="stat_contributors">Contributors</dt><dd>${contributors.length}</dd></div>
    <div><dt data-i18n="stat_issues">Issues &amp; PRs listed</dt><dd>${contributions}</dd></div>
    ${merged ? html`<div><dt data-i18n="stat_merged">Merged PRs</dt><dd>${merged}</dd></div>` : ''}
  </dl>
</header>

<section class="section">
  <div class="toolbar">
    <h2 data-i18n="section_contributors_h2">Contributors</h2>
    <input type="search" id="filter" placeholder="Search by name, username or city" data-i18n-placeholder="search_placeholder" aria-label="Search contributors">
  </div>
  <ul class="grid" id="grid">
    ${contributors.map(card)}
  </ul>
  <p class="empty" id="no-results" hidden data-i18n="no_results">Nobody matches that search.</p>
</section>

<section class="section how" id="how">
  <h2 data-i18n="how_h2">How to add yourself</h2>
  <ol class="steps">
    <li data-i18n-html="how_step1"><strong>Enter your username above</strong> and click <em>Add me</em>. GitHub opens an editor with your file, <code>contributors/your-username.yml</code>.</li>
    <li data-i18n-html="how_step2"><strong>Fill in your name</strong> and, if you like, a short bio, your city and a website. Delete any line you don't want.</li>
    <li data-i18n-html="how_step3"><strong>Click <em>Commit changes&#8230;</em>, then <em>Propose changes</em>.</strong> GitHub makes your own copy of the project (a <em>fork</em>) for you.</li>
    <li data-i18n-html="how_step4"><strong>Click <em>Create pull request</em>.</strong> A bot checks your file within a minute and tells you if anything needs fixing.</li>
  </ol>
  <p class="how-closing" data-i18n="how_closing">Once your pull request is merged, you appear here. Later, edit your file to list the issues and pull requests you work on in any open source project, and they show up on your profile.</p>
</section>

<script>
(() => {
  const form = document.getElementById('join');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = form.login.value.trim().replace(/^@/, '');
    const params = new URLSearchParams({
      filename: login + '.yml',
      value: form.dataset.template.replace(form.dataset.placeholder, login),
    });
    window.open(form.dataset.url + '?' + params, '_blank', 'noopener');
  });
  const filter = document.getElementById('filter');
  const cards = [...document.querySelectorAll('#grid .card')];
  filter.addEventListener('input', () => {
    const q = filter.value.trim().toLowerCase();
    let shown = 0;
    for (const c of cards) {
      const match = c.dataset.search.includes(q);
      c.hidden = !match;
      shown += match;
    }
    document.getElementById('no-results').hidden = shown > 0;
  });
})();
<\/script>`;

  return layout({
    config,
    root: '',
    title: config.title,
    description: `${contributors.length} people who made their first open source contribution with ${config.community}.`,
    body,
  });
}

function contribution(c) {
  const kind = c.type === 'pull' ? 'Pull request' : 'Issue';
  const statusKey = c.status ? STATUS_I18N[c.status] : null;
  const label = c.status ? STATUS_LABELS[c.status] : kind;
  const date = c.date ? new Date(c.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : null;
  return html`<li class="contrib">
  <span class="pill pill-${c.status ?? 'unknown'} pill-${c.type}"${statusKey ? html` data-i18n="${statusKey}"` : ''}>${label}</span>
  <div class="contrib-body">
    <a class="contrib-title" href="${c.url}">${c.title ?? `${c.owner}/${c.repo}#${c.number}`}</a>
    <span class="contrib-meta">${c.owner}/${c.repo} #${c.number} &#183; ${kind}${date ? ` &#183; ${date}` : ''}</span>
  </div>
</li>`;
}

export function renderProfile({ config, contributor: c }) {
  const edit = editFileUrl(config, c.github);
  const sorted = [...c.contributions].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  const body = html`<a class="back" href="../../" data-i18n="back_link">&#8592; All contributors</a>
<header class="profile">
  ${avatar(c.github, 112)}
  <div>
    <h1>${c.name}</h1>
    <p class="profile-links">
      <a href="https://github.com/${c.github}">@${c.github}</a>
      ${c.location ? html`<span>${c.location}</span>` : ''}
      ${c.website ? html`<a href="${c.website}" rel="nofollow ugc">${c.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>` : ''}
    </p>
    ${c.bio ? html`<p class="bio">${c.bio}</p>` : ''}
  </div>
</header>
<section class="section">
  <div class="toolbar">
    <h2 data-i18n="profile_contributions_h2">Contributions</h2>
    <a class="button-secondary" href="${edit}" data-i18n="profile_add_button">Is this you? Add a contribution</a>
  </div>
  ${
    sorted.length
      ? html`<ul class="contribs">${sorted.map(contribution)}</ul>`
      : html`<p class="empty"><span data-i18n="profile_empty">No contributions listed yet. Worked on an issue or a pull request?</span> <a href="${edit}" data-i18n="profile_empty_link">Add it to your file</a>.</p>`
  }
</section>`;

  return layout({
    config,
    root: '../../',
    title: `${c.name} · ${config.title}`,
    description: c.bio ?? `${c.name}'s open source contributions.`,
    body,
  });
}

export function renderNotFound({ config }) {
  const body = html`<header class="hero"><h1 data-i18n="not_found_h1">Page not found</h1><p class="lede"><a href="${config.siteUrl}" data-i18n="not_found_link">Back to all contributors</a></p></header>`;
  return layout({ config, root: config.siteUrl, title: `Not found · ${config.title}`, description: config.title, body });
}
