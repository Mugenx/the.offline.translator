/* ============================================================
   offline.translator landing page — script.js
============================================================ */

(function () {
  'use strict';

  var SUPPORTED_LOCALES = [
    { code: 'zh-Hans', label: '简体中文', hreflang: 'zh-Hans', ogLocale: 'zh_CN' },
    { code: 'zh-Hant', label: '繁體中文', hreflang: 'zh-Hant', ogLocale: 'zh_TW' },
    { code: 'zh-Hant-HK', label: '繁體中文（香港）', hreflang: 'zh-Hant-HK', ogLocale: 'zh_HK' },
    { code: 'en', label: 'English', hreflang: 'en', ogLocale: 'en_US' },
    { code: 'ja', label: '日本語', hreflang: 'ja', ogLocale: 'ja_JP' },
    { code: 'ar', label: 'العربية', hreflang: 'ar', ogLocale: 'ar_SA' },
    { code: 'de', label: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE' },
    { code: 'es', label: 'Español', hreflang: 'es', ogLocale: 'es_ES' },
    { code: 'fr', label: 'Français', hreflang: 'fr', ogLocale: 'fr_FR' },
    { code: 'hi', label: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN' },
    { code: 'it', label: 'Italiano', hreflang: 'it', ogLocale: 'it_IT' },
    { code: 'ko', label: '한국어', hreflang: 'ko', ogLocale: 'ko_KR' },
    { code: 'pt', label: 'Português', hreflang: 'pt', ogLocale: 'pt_PT' },
    { code: 'pt-BR', label: 'Português (Brasil)', hreflang: 'pt-BR', ogLocale: 'pt_BR' },
    { code: 'ru', label: 'Русский', hreflang: 'ru', ogLocale: 'ru_RU' }
  ];

  var I18N = window.OFFLINE_TRANSLATOR_I18N || {};
  var THEME_STORAGE_KEY = 'offline-translator-theme';
  var HERO_SLIDES = [
    {
      src: '/assets/ScreenShot_2026-04-24_191406_506.png',
      alt: 'roadmap.sh translated with the offline.translator side panel visible'
    },
    {
      src: '/assets/ScreenShot_2026-04-24_185508_569.png',
      alt: 'GitHub blog translated with live progress in the side panel'
    },
    {
      src: '/assets/Paste.jpg',
      alt: 'Gates Notes translated inside Chrome with the extension side panel open'
    },
    {
      src: '/assets/setting.jpg',
      alt: 'Language settings with configurable source and target languages'
    },
    {
      src: '/assets/ScreenShot_2026-04-24_151406_755.png',
      alt: 'offline.translator extension screenshot preview'
    },
    {
      src: '/assets/ScreenShot_2026-04-24_185020_360.png',
      alt: 'offline.translator screenshot showing translation controls'
    },
    {
      src: '/assets/ScreenShot_2026-04-24_190729_089.png',
      alt: 'offline.translator screenshot showing translated content and side panel metrics'
    }
  ];
  var UI_MESSAGES = {
    en: {
      toggleToLight: 'Switch to light theme',
      toggleToDark: 'Switch to dark theme',
      slideshow: 'Product screenshots',
      slide: 'Go to screenshot',
      trustAccount: 'No account needed',
      comparisonLastRow: ['No sign-up required', null, 'Varies', null]
    },
    'zh-Hans': {
      toggleToLight: '切换到浅色主题',
      toggleToDark: '切换到深色主题',
      slideshow: '产品截图',
      slide: '查看第',
      trustAccount: '无需账号',
      comparisonLastRow: ['无需注册', null, '视服务而定', null]
    },
    'zh-Hant': {
      toggleToLight: '切換到淺色主題',
      toggleToDark: '切換到深色主題',
      slideshow: '產品截圖',
      slide: '查看第',
      trustAccount: '無需帳號',
      comparisonLastRow: ['無需註冊', null, '視服務而定', null]
    },
    'zh-Hant-HK': {
      toggleToLight: '切換到淺色主題',
      toggleToDark: '切換到深色主題',
      slideshow: '產品截圖',
      slide: '查看第',
      trustAccount: '毋須帳號',
      comparisonLastRow: ['毋須註冊', null, '視乎服務而定', null]
    },
    ja: {
      toggleToLight: 'ライトテーマに切り替える',
      toggleToDark: 'ダークテーマに切り替える',
      slideshow: '製品スクリーンショット',
      slide: 'スクリーンショット',
      trustAccount: 'アカウント不要',
      comparisonLastRow: ['登録不要', null, 'サービス次第', null]
    },
    ar: {
      toggleToLight: 'التبديل إلى الوضع الفاتح',
      toggleToDark: 'التبديل إلى الوضع الداكن',
      slideshow: 'لقطات المنتج',
      slide: 'انتقل إلى اللقطة',
      trustAccount: 'لا حاجة إلى حساب',
      comparisonLastRow: ['لا يتطلب تسجيلًا', null, 'يختلف', null]
    },
    de: {
      toggleToLight: 'Zum hellen Design wechseln',
      toggleToDark: 'Zum dunklen Design wechseln',
      slideshow: 'Produkt-Screenshots',
      slide: 'Zum Screenshot',
      trustAccount: 'Kein Konto nötig',
      comparisonLastRow: ['Keine Registrierung nötig', null, 'Unterschiedlich', null]
    },
    es: {
      toggleToLight: 'Cambiar al tema claro',
      toggleToDark: 'Cambiar al tema oscuro',
      slideshow: 'Capturas del producto',
      slide: 'Ir a la captura',
      trustAccount: 'Sin cuenta necesaria',
      comparisonLastRow: ['Sin registro obligatorio', null, 'Varía', null]
    },
    fr: {
      toggleToLight: 'Passer au thème clair',
      toggleToDark: 'Passer au thème sombre',
      slideshow: 'Captures produit',
      slide: 'Aller à la capture',
      trustAccount: 'Aucun compte requis',
      comparisonLastRow: ['Sans inscription obligatoire', null, 'Variable', null]
    },
    hi: {
      toggleToLight: 'लाइट थीम पर जाएँ',
      toggleToDark: 'डार्क थीम पर जाएँ',
      slideshow: 'प्रोडक्ट स्क्रीनशॉट',
      slide: 'स्क्रीनशॉट पर जाएँ',
      trustAccount: 'खाते की ज़रूरत नहीं',
      comparisonLastRow: ['साइनअप की ज़रूरत नहीं', null, 'सेवा पर निर्भर', null]
    },
    it: {
      toggleToLight: 'Passa al tema chiaro',
      toggleToDark: 'Passa al tema scuro',
      slideshow: 'Screenshot del prodotto',
      slide: 'Vai allo screenshot',
      trustAccount: 'Nessun account richiesto',
      comparisonLastRow: ['Nessuna registrazione richiesta', null, 'Variabile', null]
    },
    ko: {
      toggleToLight: '라이트 테마로 전환',
      toggleToDark: '다크 테마로 전환',
      slideshow: '제품 스크린샷',
      slide: '스크린샷으로 이동',
      trustAccount: '계정 불필요',
      comparisonLastRow: ['가입 불필요', null, '서비스마다 다름', null]
    },
    pt: {
      toggleToLight: 'Mudar para tema claro',
      toggleToDark: 'Mudar para tema escuro',
      slideshow: 'Capturas do produto',
      slide: 'Ir para a captura',
      trustAccount: 'Sem conta',
      comparisonLastRow: ['Sem registo obrigatório', null, 'Varia', null]
    },
    'pt-BR': {
      toggleToLight: 'Mudar para tema claro',
      toggleToDark: 'Mudar para tema escuro',
      slideshow: 'Capturas do produto',
      slide: 'Ir para a captura',
      trustAccount: 'Sem conta',
      comparisonLastRow: ['Sem cadastro obrigatório', null, 'Varia', null]
    },
    ru: {
      toggleToLight: 'Переключить на светлую тему',
      toggleToDark: 'Переключить на темную тему',
      slideshow: 'Скриншоты продукта',
      slide: 'Перейти к скриншоту',
      trustAccount: 'Без аккаунта',
      comparisonLastRow: ['Без регистрации', null, 'Зависит от сервиса', null]
    }
  };
  var DEFAULT_OG_IMAGE = 'https://theofflinetranslator.com/assets/ScreenShot_2026-04-24_185508_569.png';
  var DEFAULT_OG_IMAGE_ALT = 'offline.translator side panel translating a webpage locally in Chrome';

  document.documentElement.dataset.theme = getPreferredTheme();

  function getLocaleConfig(locale) {
    return SUPPORTED_LOCALES.find(function (item) {
      return item.code === locale;
    }) || SUPPORTED_LOCALES.find(function (item) {
      return item.code === 'en';
    });
  }

  function stripHtml(value) {
    var temp = document.createElement('div');

    temp.innerHTML = value || '';
    return (temp.textContent || temp.innerText || '').replace(/\s+/g, ' ').trim();
  }

  function setJsonLdScript(id, payload) {
    var script = document.getElementById(id);

    if (script) script.textContent = JSON.stringify(payload);
  }

  function getStructuredDataSource(messages) {
    if (messages) return messages;

    return {
      meta: {
        description: (document.querySelector('meta[name="description"]') || {}).content || ''
      },
      hero: {
        sub: (document.querySelector('.hero-sub') || {}).innerHTML || ''
      },
      features: {
        cards: Array.from(document.querySelectorAll('.features-grid .feature-card h3')).map(function (node) {
          return { title: node.textContent.trim() };
        })
      },
      faq: {
        items: Array.from(document.querySelectorAll('.faq-item')).map(function (item) {
          return {
            q: ((item.querySelector('.faq-q-text') || {}).textContent || '').trim(),
            a: (item.querySelector('.faq-a') || {}).innerHTML || ''
          };
        })
      }
    };
  }

  function updateStructuredData(locale, messages, currentUrl) {
    var localeConfig = getLocaleConfig(locale);
    var source = getStructuredDataSource(messages);

    setJsonLdScript('software-application-schema', {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'offline.translator',
      description: source.meta && source.meta.description ? source.meta.description : stripHtml(source.hero && source.hero.sub),
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Chrome 138+',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      softwareVersion: '0.1.0',
      inLanguage: localeConfig.hreflang,
      featureList: (source.features && source.features.cards ? source.features.cards : []).map(function (card) {
        return stripHtml(card.title);
      }),
      screenshot: DEFAULT_OG_IMAGE,
      url: currentUrl
    });

    setJsonLdScript('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: localeConfig.hreflang,
      mainEntity: (source.faq && source.faq.items ? source.faq.items : []).map(function (item) {
        return {
          '@type': 'Question',
          name: stripHtml(item.q),
          acceptedAnswer: {
            '@type': 'Answer',
            text: stripHtml(item.a)
          }
        };
      })
    });
  }

  function getUiMessages(locale) {
    return UI_MESSAGES[locale] || UI_MESSAGES.en;
  }

  function readStoredTheme() {
    try {
      return window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage failures and keep the theme only for the current session.
    }
  }

  function getPreferredTheme() {
    var storedTheme = readStoredTheme();

    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  }

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

  function getComparisonMessages(locale, comparison) {
    if (!comparison) return comparison;

    var uiMessages = getUiMessages(locale);
    var rows = comparison.rows ? comparison.rows.slice() : [];

    if (rows.length && uiMessages.comparisonLastRow) {
      rows[rows.length - 1] = uiMessages.comparisonLastRow;
    }

    return {
      label: comparison.label,
      title: comparison.title,
      headers: comparison.headers,
      rows: rows
    };
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
    var localeConfig = getLocaleConfig(locale);

    document.documentElement.lang = localeConfig.hreflang;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    setCanonical(currentUrl);
    setMeta('meta[property="og:url"]', currentUrl);
    setMeta('meta[property="og:locale"]', localeConfig.ogLocale);
    setMeta('meta[property="og:image"]', DEFAULT_OG_IMAGE);
    setMeta('meta[property="og:image:alt"]', DEFAULT_OG_IMAGE_ALT);
    setMeta('meta[name="twitter:image"]', DEFAULT_OG_IMAGE);
    setMeta('meta[name="twitter:image:alt"]', DEFAULT_OG_IMAGE_ALT);

    if (messages && messages.meta) {
      if (messages.meta.title) document.title = messages.meta.title;
      setMeta('meta[name="description"]', messages.meta.description);
      setMeta('meta[property="og:title"]', messages.meta.ogTitle || messages.meta.title);
      setMeta('meta[property="og:description"]', messages.meta.ogDescription || messages.meta.description);
      setMeta('meta[name="twitter:title"]', messages.meta.ogTitle || messages.meta.title);
      setMeta('meta[name="twitter:description"]', messages.meta.ogDescription || messages.meta.description);
    }

    updateStructuredData(locale, messages, currentUrl);

    if (!messages) return;

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
    setText('.hero-visual-note', messages.trust.private);

    setTextAt('.trust-item span', 0, messages.trust.private);
    setTextAt('.trust-item span', 1, getUiMessages(locale).trustAccount || messages.trust.free);
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
    applyComparisonTranslations(getComparisonMessages(locale, messages.comparison));

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

  function updateThemeToggle(locale) {
    var toggle = document.getElementById('theme-toggle');
    var theme = document.documentElement.dataset.theme || 'dark';
    var uiMessages = getUiMessages(locale);

    if (!toggle) return;

    toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      theme === 'light' ? uiMessages.toggleToDark : uiMessages.toggleToLight
    );
    toggle.title = theme === 'light' ? uiMessages.toggleToDark : uiMessages.toggleToLight;
  }

  function initThemeToggle(locale) {
    var toggle = document.getElementById('theme-toggle');

    updateThemeToggle(locale);

    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';

      document.documentElement.dataset.theme = nextTheme;
      writeStoredTheme(nextTheme);
      updateThemeToggle(locale);
    });

    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

      mediaQuery.addEventListener('change', function (event) {
        if (readStoredTheme()) return;

        document.documentElement.dataset.theme = event.matches ? 'light' : 'dark';
        updateThemeToggle(locale);
      });
    }
  }

  function initHeroCarousel(locale) {
    var image = document.getElementById('hero-carousel-image');
    var stage = document.getElementById('hero-browser-stage');
    var dots = document.getElementById('hero-carousel-dots');
    var currentIndex = 0;
    var intervalId = null;
    var uiMessages = getUiMessages(locale);

    if (!image || !dots || !stage || !HERO_SLIDES.length) return;

    dots.innerHTML = '';
    dots.setAttribute('aria-label', uiMessages.slideshow);

    HERO_SLIDES.forEach(function (slide, index) {
      var button = document.createElement('button');

      button.type = 'button';
      button.className = 'hero-carousel-dot' + (index === 0 ? ' is-active' : '');
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      button.setAttribute('aria-label', uiMessages.slide + ' ' + (index + 1));
      button.addEventListener('click', function () {
        setSlide(index);
        restart();
      });
      dots.appendChild(button);
    });

    function preload(nextIndex) {
      var preloadImage = new Image();
      preloadImage.src = HERO_SLIDES[nextIndex].src;
    }

    function syncStageRatio() {
      if (!image.naturalWidth || !image.naturalHeight) return;

      stage.style.setProperty('--hero-media-ratio', image.naturalWidth + ' / ' + image.naturalHeight);
    }

    function syncButtons() {
      var buttons = dots.querySelectorAll('.hero-carousel-dot');

      buttons.forEach(function (button, index) {
        var isActive = index === currentIndex;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function setSlide(nextIndex) {
      var slide = HERO_SLIDES[nextIndex];

      currentIndex = nextIndex;
      image.classList.add('is-fading');
      syncButtons();
      preload((currentIndex + 1) % HERO_SLIDES.length);

      if (image.getAttribute('src') === slide.src) {
        image.alt = slide.alt;
        syncStageRatio();
        image.classList.remove('is-fading');
        return;
      }

      image.alt = slide.alt;
      image.src = slide.src;
    }

    function start() {
      intervalId = window.setInterval(function () {
        setSlide((currentIndex + 1) % HERO_SLIDES.length);
      }, 3600);
    }

    function restart() {
      window.clearInterval(intervalId);
      start();
    }

    image.addEventListener('load', function () {
      syncStageRatio();
      image.classList.remove('is-fading');
    });

    image.src = HERO_SLIDES[0].src;
    image.alt = HERO_SLIDES[0].alt;
    syncButtons();
    preload(1);

    if (image.complete) syncStageRatio();
    start();
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

    initThemeToggle(locale);
    initLocalePicker(locale);

    if (document.body && document.body.dataset.page === 'home') {
      applyHomeTranslations(locale);
      updateThemeToggle(locale);
      initHeroCarousel(locale);
    }

    initFAQ();
    initReveal();
    initNavHighlight();
  });
})();
