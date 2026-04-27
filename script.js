/* ============================================================
   offline.translator landing page — script.js
============================================================ */

(function () {
  'use strict';

  var SUPPORTED_LOCALES = [
    { code: 'zh-Hans', label: '简体中文' },
    { code: 'zh-Hant', label: '繁體中文' },
    { code: 'zh-Hant-HK', label: '繁體中文（香港）' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'ar', label: 'العربية' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'it', label: 'Italiano' },
    { code: 'ko', label: '한국어' },
    { code: 'pt', label: 'Português' },
    { code: 'pt-BR', label: 'Português (Brasil)' },
    { code: 'ru', label: 'Русский' }
  ];

  var I18N = window.OFFLINE_TRANSLATOR_I18N || {};

  function isSupportedLocale(locale) {
    return SUPPORTED_LOCALES.some(function (item) {
      return item.code === locale;
    });
  }

  function normalizePathname(pathname) {
    return pathname.replace(/\/index\.html$/, '/').replace(/\/+/g, '/');
  }

  function resolveLocale(pathname) {
    var segments = normalizePathname(pathname).split('/').filter(Boolean);

    if (!segments.length) return 'en';
    return isSupportedLocale(segments[0]) ? segments[0] : 'en';
  }

  function buildLocalePath(locale) {
    return '/' + locale + '/' + window.location.hash;
  }

  function getCurrentUrlWithoutHash() {
    return window.location.origin + normalizePathname(window.location.pathname);
  }

  function setMeta(selector, value) {
    if (!value) return;

    var node = document.querySelector(selector);
    if (node) node.setAttribute('content', value);
  }

  function setCanonical(url) {
    var node = document.querySelector('link[rel="canonical"]');
    if (node) node.setAttribute('href', url);
  }

  function setText(selector, value) {
    if (typeof value !== 'string') return;

    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = value;
    });
  }

  function setHTML(selector, value) {
    if (typeof value !== 'string') return;

    document.querySelectorAll(selector).forEach(function (node) {
      node.innerHTML = value;
    });
  }

  function setTextAt(selector, index, value) {
    if (typeof value !== 'string') return;

    var nodes = document.querySelectorAll(selector);
    if (nodes[index]) nodes[index].textContent = value;
  }

  function setHTMLAt(selector, index, value) {
    if (typeof value !== 'string') return;

    var nodes = document.querySelectorAll(selector);
    if (nodes[index]) nodes[index].innerHTML = value;
  }

  function applyComparisonTranslations(messages) {
    var headers = messages.headers || [];
    var rows = messages.rows || [];

    setText('.comparison-table thead th:nth-child(1)', headers[0]);
    setText('.comparison-table thead th:nth-child(2)', headers[1]);
    setText('.comparison-table thead th:nth-child(3)', headers[2]);
    setText('.comparison-table thead th:nth-child(4)', headers[3]);

    rows.forEach(function (row, rowIndex) {
      if (!row) return;

      setText('.comparison-table tbody tr:nth-child(' + (rowIndex + 1) + ') td:nth-child(1)', row[0]);
      setText('.comparison-table tbody tr:nth-child(' + (rowIndex + 1) + ') td:nth-child(2)', row[1]);
      setText('.comparison-table tbody tr:nth-child(' + (rowIndex + 1) + ') td:nth-child(3)', row[2]);
      setText('.comparison-table tbody tr:nth-child(' + (rowIndex + 1) + ') td:nth-child(4)', row[3]);
    });
  }

  function applyHomeTranslations(locale) {
    var messages = I18N.home && I18N.home[locale];
    var currentUrl = getCurrentUrlWithoutHash();

    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    setCanonical(currentUrl);
    setMeta('meta[property="og:url"]', currentUrl);

    if (!messages) return;

    if (messages.meta) {
      if (messages.meta.title) document.title = messages.meta.title;
      setMeta('meta[name="description"]', messages.meta.description);
      setMeta('meta[property="og:title"]', messages.meta.ogTitle || messages.meta.title);
      setMeta('meta[property="og:description"]', messages.meta.ogDescription || messages.meta.description);
      setMeta('meta[name="twitter:title"]', messages.meta.ogTitle || messages.meta.title);
      setMeta('meta[name="twitter:description"]', messages.meta.ogDescription || messages.meta.description);
    }

    setText('.locale-label-text', messages.localeLabel);
    setText('.nav-links a[href="#features"]', messages.nav.features);
    setText('.nav-links a[href="#how-it-works"]', messages.nav.how);
    setText('.nav-links a[href="#demo"]', messages.nav.demo);
    setText('.nav-links a[href="#faq"]', messages.nav.faq);
    setText('.nav-cta', messages.nav.install);

    setText('.badge-text', messages.hero.badge);
    setHTML('.hero-title', messages.hero.title);
    setHTML('.hero-sub', messages.hero.sub);
    setText('#hero-cta .btn-label', messages.hero.primaryCta);
    setText('.hero-actions .btn-ghost', messages.hero.secondaryCta);
    setText('.hero-trust', messages.hero.trust);
    setText('.hero-stat-1 .stat-label', messages.hero.statTranslated);
    setText('.hero-stat-2 .stat-label', messages.hero.statDataSent);

    setTextAt('.trust-item span', 0, messages.trust.private);
    setTextAt('.trust-item span', 1, messages.trust.free);
    setTextAt('.trust-item span', 2, messages.trust.languages);

    setText('#features .section-label', messages.features.label);
    setHTML('#features .section-header h2', messages.features.title);
    setText('#features .section-sub', messages.features.sub);
    (messages.features.cards || []).forEach(function (card, index) {
      setHTMLAt('.features-grid .feature-card p', index, card.body);
      setTextAt('.features-grid .feature-card h3', index, card.title);
    });

    setText('#how-it-works .section-label', messages.how.label);
    setText('#how-heading', messages.how.title);
    (messages.how.steps || []).forEach(function (step, index) {
      setText('.steps .step:nth-child(' + (index + 1) + ') h3', step.title);
      setHTML('.steps .step:nth-child(' + (index + 1) + ') p', step.body);
    });

    setText('#demo .section-label', messages.demo.label);
    setText('#demo-heading', messages.demo.title);
    setText('#demo .section-sub', messages.demo.sub);
    (messages.demo.captions || []).forEach(function (caption, index) {
      setHTMLAt('.demo-item figcaption', index, caption);
    });

    setText('.use-cases .section-label', messages.usecases.label);
    setText('#usecases-heading', messages.usecases.title);
    (messages.usecases.cards || []).forEach(function (card, index) {
      setText('.usecases-grid .usecase-card:nth-child(' + (index + 1) + ') h3', card.title);
      setText('.usecases-grid .usecase-card:nth-child(' + (index + 1) + ') p', card.body);
    });

    setText('.comparison .section-label', messages.comparison.label);
    setText('#comparison-heading', messages.comparison.title);
    applyComparisonTranslations(messages.comparison);

    setText('.cta-box .section-label', messages.cta.label);
    setText('#install-heading', messages.cta.title);
    setText('.cta-sub', messages.cta.sub);
    setText('.cta-actions .btn-primary .btn-label', messages.cta.primary);
    setText('.cta-actions .btn-ghost .btn-label', messages.cta.secondary);
    setText('.cta-req', messages.cta.req);

    setText('.faq .section-label', messages.faq.label);
    setText('#faq-heading', messages.faq.title);
    (messages.faq.items || []).forEach(function (item, index) {
      setText('.faq-item:nth-child(' + (index + 1) + ') .faq-q-text', item.q);
      setHTML('.faq-item:nth-child(' + (index + 1) + ') .faq-a', item.a);
    });

    setText('.footer-tagline', messages.footer.tagline);
    setText('.footer-nav a[href="#features"]', messages.nav.features);
    setText('.footer-nav a[href="#how-it-works"]', messages.nav.how);
    setText('.footer-nav a[href="#demo"]', messages.nav.demo);
    setText('.footer-nav a[href="#faq"]', messages.nav.faq);
    setText('.footer-nav a[href="/privacy.html"]', messages.footer.privacy);
    setText('.footer-meta a[href="/privacy.html"]', messages.footer.privacy);
  }

  function initLocalePicker(locale) {
    var select = document.getElementById('locale-select');

    if (!select) return;

    SUPPORTED_LOCALES.forEach(function (item) {
      var option = document.createElement('option');
      option.value = item.code;
      option.textContent = item.label;
      select.appendChild(option);
    });

    select.value = locale;
    select.addEventListener('change', function () {
      var nextPath = buildLocalePath(select.value);
      var currentPath = normalizePathname(window.location.pathname) + window.location.hash;

      if (nextPath !== currentPath) {
        window.location.assign(nextPath);
      }
    });
  }

  function initFAQ() {
    var buttons = document.querySelectorAll('.faq-q');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var targetId = btn.getAttribute('aria-controls');
        var answer = document.getElementById(targetId);

        if (!answer) return;

        if (expanded) {
          btn.setAttribute('aria-expanded', 'false');
          answer.hidden = true;
        } else {
          buttons.forEach(function (other) {
            if (other !== btn) {
              other.setAttribute('aria-expanded', 'false');
              var otherId = other.getAttribute('aria-controls');
              var otherAnswer = document.getElementById(otherId);
              if (otherAnswer) otherAnswer.hidden = true;
            }
          });

          btn.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  }

  function initReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var targets = document.querySelectorAll(
      '.feature-card, .step, .demo-item, .usecase-card, .faq-item, .section-header'
    );

    targets.forEach(function (el) {
      el.classList.add('reveal');
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      if (index > 0 && index <= 4) {
        el.classList.add('reveal-delay-' + index);
      }
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  function initNavHighlight() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.removeAttribute('aria-current');
              link.style.color = '';
            });
            var active = document.querySelector(
              '.nav-links a[href="#' + entry.target.id + '"]'
            );
            if (active) {
              active.setAttribute('aria-current', 'true');
              active.style.color = 'var(--text)';
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var locale = resolveLocale(window.location.pathname);

    if (
      document.body &&
      document.body.dataset.page === 'home' &&
      !isSupportedLocale(normalizePathname(window.location.pathname).split('/').filter(Boolean)[0] || '')
    ) {
      window.history.replaceState(null, '', buildLocalePath('en'));
      locale = 'en';
    }

    initLocalePicker(locale);

    if (document.body && document.body.dataset.page === 'home') {
      applyHomeTranslations(locale);
    }

    initFAQ();
    initReveal();
    initNavHighlight();
  });
})();
