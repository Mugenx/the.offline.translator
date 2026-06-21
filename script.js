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
  var HERO_SLIDES = [
    { src: '/assets/ScreenShot_2026-04-24_191406_506.png', alt: 'roadmap.sh translated with the offline.translator side panel visible' },
    { src: '/assets/ScreenShot_2026-04-24_185508_569.png', alt: 'GitHub blog translated with live progress in the side panel' },
    { src: '/assets/Paste.jpg', alt: 'Gates Notes translated inside Chrome with the extension side panel open' },
    { src: '/assets/setting.jpg', alt: 'Language settings with configurable source and target languages' },
    { src: '/assets/ScreenShot_2026-04-24_151406_755.png', alt: 'offline.translator extension screenshot preview' },
    { src: '/assets/ScreenShot_2026-04-24_185020_360.png', alt: 'offline.translator screenshot showing translation controls' },
    { src: '/assets/ScreenShot_2026-04-24_190729_089.png', alt: 'offline.translator screenshot showing translated content and side panel metrics' }
  ];
  var UI_MESSAGES = {
    en: {
      screenshotsLabel: 'Feature previews',
      screenshotLabel: 'Show feature',
      comparisonLastRow: ['Free translation', null, 'Varies', null]
    },
    'zh-Hans': {
      screenshotsLabel: '产品截图',
      screenshotLabel: '查看第',
      comparisonLastRow: ['免费翻译', null, '视服务而定', null]
    },
    'zh-Hant': {
      screenshotsLabel: '產品截圖',
      screenshotLabel: '查看第',
      comparisonLastRow: ['免費翻譯', null, '視服務而定', null]
    },
    'zh-Hant-HK': {
      screenshotsLabel: '產品截圖',
      screenshotLabel: '查看第',
      comparisonLastRow: ['免費翻譯', null, '視乎服務而定', null]
    },
    ja: {
      screenshotsLabel: '製品スクリーンショット',
      screenshotLabel: 'スクリーンショット',
      comparisonLastRow: ['無料翻訳', null, 'サービス次第', null]
    },
    ar: {
      screenshotsLabel: 'لقطات المنتج',
      screenshotLabel: 'انتقل إلى اللقطة',
      comparisonLastRow: ['ترجمة مجانية', null, 'يختلف', null]
    },
    de: {
      screenshotsLabel: 'Produkt-Screenshots',
      screenshotLabel: 'Zum Screenshot',
      comparisonLastRow: ['Kostenlose Übersetzung', null, 'Unterschiedlich', null]
    },
    es: {
      screenshotsLabel: 'Capturas del producto',
      screenshotLabel: 'Ir a la captura',
      comparisonLastRow: ['Traducción gratis', null, 'Varía', null]
    },
    fr: {
      screenshotsLabel: 'Captures produit',
      screenshotLabel: 'Aller à la capture',
      comparisonLastRow: ['Traduction gratuite', null, 'Variable', null]
    },
    hi: {
      screenshotsLabel: 'प्रोडक्ट स्क्रीनशॉट',
      screenshotLabel: 'स्क्रीनशॉट पर जाएँ',
      comparisonLastRow: ['मुफ़्त अनुवाद', null, 'सेवा पर निर्भर', null]
    },
    it: {
      screenshotsLabel: 'Screenshot del prodotto',
      screenshotLabel: 'Vai allo screenshot',
      comparisonLastRow: ['Traduzione gratis', null, 'Variabile', null]
    },
    ko: {
      screenshotsLabel: '제품 스크린샷',
      screenshotLabel: '스크린샷으로 이동',
      comparisonLastRow: ['무료 번역', null, '서비스마다 다름', null]
    },
    pt: {
      screenshotsLabel: 'Capturas do produto',
      screenshotLabel: 'Ir para a captura',
      comparisonLastRow: ['Tradução gratuita', null, 'Varia', null]
    },
    'pt-BR': {
      screenshotsLabel: 'Capturas do produto',
      screenshotLabel: 'Ir para a captura',
      comparisonLastRow: ['Tradução grátis', null, 'Varia', null]
    },
    ru: {
      screenshotsLabel: 'Скриншоты продукта',
      screenshotLabel: 'Перейти к скриншоту',
      comparisonLastRow: ['Бесплатный перевод', null, 'Зависит от сервиса', null]
    }
  };
  var SEO_KEYWORDS = 'local webpage translation, Chrome AI translator, Gemini Nano translation, on-device translation, privacy-first translator, Chrome translate extension, AI-powered translation, local AI processing, browser translation, offline translator';
  var HOME_MESSAGE_OVERRIDES = {
    'zh-Hans': {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: '免费 AI Chrome translate 扩展，使用 Chrome 内置 Translator API 在浏览器内完成整页翻译。支持 40+ 种语言、智能缓存与免费翻译，无需账号。',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: '免费 AI Chrome translate 扩展，使用 Chrome 内置 Translator API 在浏览器内完成整页翻译。支持 40+ 种语言、智能缓存与免费翻译，无需账号。',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: '免费 AI Chrome 网页翻译<br><span class="highlight">适用于任意网页</span>',
        sub: '一款免费的 AI Chrome 翻译扩展，基于 Chrome 内置 Translator API。<br>翻译在浏览器内本地完成。<strong>免费翻译时，页面文本始终留在 Chrome 中。</strong>',
        primaryCta: '安装免费 AI 翻译扩展',
        trust: '免费翻译 · 无需账号 · 支持 40+ 种语言'
      },
      cta: {
        title: '开始在 Chrome 中使用免费 AI 翻译。',
        sub: '免费。内置。私密。无需账号，无需 API key，安装后即可翻译整个网页。',
        primary: '在 Chrome 上安装 · 免费'
      }
    },
    'zh-Hant': {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Translate webpages directly on your device using Chrome's built-in AI and Gemini Nano. Privacy-first design with no developer-hosted translation server.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Translate webpages directly on your device using Chrome's built-in AI and Gemini Nano. Privacy-first design with no developer-hosted translation server.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: '免費 AI Chrome 網頁翻譯<br><span class="highlight">適用於任何網頁</span>',
        sub: '一款免費的 AI Chrome 翻譯擴充功能，基於 Chrome 內建 Translator API。<br>翻譯會在瀏覽器內本地完成。<strong>免費翻譯時，頁面文字始終留在 Chrome 中。</strong>',
        primaryCta: '安裝免費 AI 翻譯擴充功能',
        trust: '免費翻譯 · 不需帳號 · 支援 40+ 種語言'
      },
      cta: {
        title: '開始在 Chrome 中使用免費 AI 翻譯。',
        sub: '免費。內建。私密。不需帳號，不需 API key，安裝後即可翻譯整個網頁。',
        primary: '在 Chrome 上安裝 · 免費'
      }
    },
    'zh-Hant-HK': {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Translate webpages directly on your device using Chrome's built-in AI and Gemini Nano. Privacy-first design with no developer-hosted translation server.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Translate webpages directly on your device using Chrome's built-in AI and Gemini Nano. Privacy-first design with no developer-hosted translation server.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: '免費 AI Chrome 網頁翻譯<br><span class="highlight">適用於任何網頁</span>',
        sub: '一款免費的 AI Chrome 翻譯擴充功能，基於 Chrome 內建 Translator API。<br>翻譯會在瀏覽器內本地完成。<strong>免費翻譯時，頁面文字始終留在 Chrome 中。</strong>',
        primaryCta: '安裝免費 AI 翻譯擴充功能',
        trust: '免費翻譯 · 毋須帳號 · 支援 40+ 種語言'
      },
      cta: {
        title: '開始在 Chrome 中使用免費 AI 翻譯。',
        sub: '免費。內建。私密。毋須帳號，毋須 API key，安裝後即可翻譯整個網頁。',
        primary: '在 Chrome 上安裝 · 免費'
      }
    },
    ja: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: '無料で使える AI Chrome 翻訳拡張機能。Chrome 内蔵の Translator API でページ全体をブラウザ内翻訳。40以上の言語、スマートキャッシュ、アカウント不要。',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: '無料で使える AI Chrome 翻訳拡張機能。Chrome 内蔵の Translator API でページ全体をブラウザ内翻訳。40以上の言語、スマートキャッシュ、アカウント不要。',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: '無料 AI Chrome 翻訳<br><span class="highlight">あらゆるWebページに対応</span>',
        sub: 'Chrome 内蔵の Translator API を使う無料 AI Chrome 翻訳拡張機能です。<br>翻訳はブラウザ内で端末上に保持されたまま実行されます。<strong>ページのテキストは無料翻訳中も Chrome 内にとどまります。</strong>',
        primaryCta: '無料 AI 翻訳をインストール',
        trust: '無料翻訳 · アカウント不要 · 40以上の言語'
      },
      cta: {
        title: 'Chrome で無料 AI 翻訳を始めましょう。',
        sub: '無料。内蔵。プライベート。アカウント不要、API キー不要。インストールするだけで翻訳できます。',
        primary: 'Chrome にインストール · 無料'
      }
    },
    ar: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'إضافة ترجمة AI مجانية لمتصفح Chrome تستخدم Translator API المدمج في Chrome لترجمة صفحات الويب بالكامل داخل المتصفح. تدعم أكثر من 40 لغة وتعمل بدون حساب.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'إضافة ترجمة AI مجانية لمتصفح Chrome تستخدم Translator API المدمج في Chrome لترجمة صفحات الويب بالكامل داخل المتصفح. تدعم أكثر من 40 لغة وتعمل بدون حساب.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'ترجمة AI مجانية في Chrome<br><span class="highlight">لأي صفحة ويب</span>',
        sub: 'إضافة ترجمة AI مجانية لمتصفح Chrome تعتمد على Translator API المدمج في Chrome.<br>تتم الترجمة محلياً داخل المتصفح. <strong>يبقى نص الصفحة داخل Chrome أثناء الترجمة المجانية.</strong>',
        primaryCta: 'ثبّت مترجم AI المجاني',
        trust: 'ترجمة مجانية · بلا حساب · أكثر من 40 لغة'
      },
      cta: {
        title: 'ابدأ الترجمة المجانية بالذكاء الاصطناعي داخل Chrome.',
        sub: 'مجاني. مدمج. خاص. بدون حساب وبدون مفتاح API، فقط ثبّت وابدأ الترجمة.',
        primary: 'ثبّت على Chrome · مجاناً'
      }
    },
    de: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Translate webpages directly on your device using Chrome's built-in AI and Gemini Nano. Privacy-first design with no developer-hosted translation server.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Translate webpages directly on your device using Chrome's built-in AI and Gemini Nano. Privacy-first design with no developer-hosted translation server.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'Kostenlose AI-Chrome-Übersetzung<br><span class="highlight">für jede Webseite</span>',
        sub: 'Eine kostenlose AI-Übersetzungserweiterung für Chrome auf Basis der integrierten Translator API von Chrome.<br>Die Übersetzung läuft lokal in deinem Browser. <strong>Seitentext bleibt während der kostenlosen Übersetzung in Chrome.</strong>',
        primaryCta: 'Kostenlosen AI-Übersetzer installieren',
        trust: 'Kostenlose Übersetzung · Kein Konto · 40+ Sprachen'
      },
      cta: {
        title: 'Starte kostenlose AI-Übersetzung in Chrome.',
        sub: 'Kostenlos. Integriert. Privat. Kein Konto, kein API-Key, einfach installieren und ganze Seiten übersetzen.',
        primary: 'In Chrome installieren · Kostenlos'
      }
    },
    es: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Extensión de traducción AI gratis para Chrome con Translator API integrada de Chrome. Traduce páginas completas en el navegador con 40+ idiomas, caché inteligente y sin cuenta.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Extensión de traducción AI gratis para Chrome con Translator API integrada de Chrome. Traduce páginas completas en el navegador con 40+ idiomas, caché inteligente y sin cuenta.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'Traducción AI gratis en Chrome<br><span class="highlight">para cualquier página web</span>',
        sub: 'Una extensión de traducción AI gratis para Chrome basada en la Translator API integrada de Chrome.<br>La traducción se ejecuta localmente en tu navegador. <strong>El texto de la página permanece en Chrome durante la traducción gratuita.</strong>',
        primaryCta: 'Instalar traductor AI gratis',
        trust: 'Traducción gratis · Sin cuenta · 40+ idiomas'
      },
      cta: {
        title: 'Empieza a traducir gratis con AI en Chrome.',
        sub: 'Gratis. Integrado. Privado. Sin cuenta ni API key: instala y traduce páginas completas.',
        primary: 'Instalar en Chrome · Gratis'
      }
    },
    fr: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Extension de traduction AI gratuite pour Chrome avec la Translator API intégrée de Chrome. Traduisez des pages entières dans le navigateur, avec plus de 40 langues, cache intelligent et sans compte.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Extension de traduction AI gratuite pour Chrome avec la Translator API intégrée de Chrome. Traduisez des pages entières dans le navigateur, avec plus de 40 langues, cache intelligent et sans compte.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'Traduction AI gratuite sur Chrome<br><span class="highlight">pour n\'importe quelle page web</span>',
        sub: 'Une extension de traduction AI gratuite pour Chrome, basée sur la Translator API intégrée de Chrome.<br>La traduction s\'exécute localement dans votre navigateur. <strong>Le texte de la page reste dans Chrome pendant la traduction gratuite.</strong>',
        primaryCta: 'Installer le traducteur AI gratuit',
        trust: 'Traduction gratuite · Sans compte · Plus de 40 langues'
      },
      cta: {
        title: 'Commencez la traduction AI gratuite dans Chrome.',
        sub: 'Gratuit. Intégré. Privé. Aucun compte, aucune clé API : installez et traduisez immédiatement.',
        primary: 'Installer sur Chrome · Gratuit'
      }
    },
    hi: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Translate webpages directly on your device using Chrome's built-in AI and Gemini Nano. Privacy-first design with no developer-hosted translation server.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Translate webpages directly on your device using Chrome's built-in AI and Gemini Nano. Privacy-first design with no developer-hosted translation server.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'किसी भी वेबपेज के लिए<br><span class="highlight">मुफ़्त AI Chrome अनुवाद</span>',
        sub: 'Chrome के built-in Translator API पर आधारित एक मुफ़्त AI Chrome translate एक्सटेंशन।<br>अनुवाद आपके ब्राउज़र में लोकली चलता है। <strong>मुफ़्त अनुवाद के दौरान पेज का टेक्स्ट Chrome में ही रहता है।</strong>',
        primaryCta: 'मुफ़्त AI अनुवादक इंस्टॉल करें',
        trust: 'मुफ़्त अनुवाद · बिना अकाउंट · 40+ भाषाएँ'
      },
      cta: {
        title: 'Chrome में मुफ़्त AI अनुवाद शुरू करें।',
        sub: 'मुफ़्त। Built-in। निजी। न अकाउंट, न API key, बस इंस्टॉल करें और पूरे वेबपेज का अनुवाद करें।',
        primary: 'Chrome पर इंस्टॉल करें · मुफ़्त'
      }
    },
    it: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Estensione di traduzione AI gratis per Chrome con la Translator API integrata di Chrome. Traduce pagine complete nel browser con 40+ lingue, cache intelligente e senza account.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Estensione di traduzione AI gratis per Chrome con la Translator API integrata di Chrome. Traduce pagine complete nel browser con 40+ lingue, cache intelligente e senza account.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'Traduzione AI gratis in Chrome<br><span class="highlight">per qualsiasi pagina web</span>',
        sub: 'Un\'estensione di traduzione AI gratis per Chrome basata sulla Translator API integrata di Chrome.<br>La traduzione gira localmente nel browser. <strong>Il testo della pagina resta in Chrome durante la traduzione gratuita.</strong>',
        primaryCta: 'Installa il traduttore AI gratis',
        trust: 'Traduzione gratis · Nessun account · 40+ lingue'
      },
      cta: {
        title: 'Inizia la traduzione AI gratuita in Chrome.',
        sub: 'Gratis. Integrata. Privata. Nessun account, nessuna API key: installa e traduci subito.',
        primary: 'Installa su Chrome · Gratis'
      }
    },
    ko: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Chrome 내장 Translator API로 웹페이지 전체를 브라우저 안에서 번역하는 무료 AI Chrome translate 확장 프로그램입니다. 40개 이상 언어, 스마트 캐시, 계정 불필요.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Chrome 내장 Translator API로 웹페이지 전체를 브라우저 안에서 번역하는 무료 AI Chrome translate 확장 프로그램입니다. 40개 이상 언어, 스마트 캐시, 계정 불필요.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: '모든 웹페이지를 위한<br><span class="highlight">무료 AI Chrome 번역</span>',
        sub: 'Chrome 내장 Translator API 기반의 무료 AI Chrome 번역 확장 프로그램입니다.<br>번역은 브라우저 안에서 로컬로 실행됩니다. <strong>무료 번역 중에도 페이지 텍스트는 Chrome 안에 유지됩니다.</strong>',
        primaryCta: '무료 AI 번역기 설치',
        trust: '무료 번역 · 계정 불필요 · 40개 이상 언어'
      },
      cta: {
        title: 'Chrome에서 무료 AI 번역을 시작하세요.',
        sub: '무료. 내장. 비공개. 계정도 API 키도 없이 설치만 하면 바로 번역됩니다.',
        primary: 'Chrome에 설치 · 무료'
      }
    },
    pt: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Extensão de tradução AI gratuita para Chrome com a Translator API integrada do Chrome. Traduza páginas completas no navegador com mais de 40 idiomas, cache inteligente e sem conta.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Extensão de tradução AI gratuita para Chrome com a Translator API integrada do Chrome. Traduza páginas completas no navegador com mais de 40 idiomas, cache inteligente e sem conta.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'Tradução AI gratuita no Chrome<br><span class="highlight">para qualquer página web</span>',
        sub: 'Uma extensão de tradução AI gratuita para Chrome baseada na Translator API integrada do Chrome.<br>A tradução é executada localmente no navegador. <strong>O texto da página fica no Chrome durante a tradução gratuita.</strong>',
        primaryCta: 'Instalar tradutor AI gratuito',
        trust: 'Tradução AI gratuita · Sem conta · Mais de 40 idiomas'
      },
      cta: {
        title: 'Comece a tradução AI gratuita no Chrome.',
        sub: 'Gratuito. Integrado. Privado. Sem conta nem chave de API: instale e traduza páginas inteiras.',
        primary: 'Instalar no Chrome · Gratuito'
      }
    },
    'pt-BR': {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Extensão de tradução AI grátis para Chrome com a Translator API integrada do Chrome. Traduza páginas completas no navegador com 40+ idiomas, cache inteligente e sem conta.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Extensão de tradução AI grátis para Chrome com a Translator API integrada do Chrome. Traduza páginas completas no navegador com 40+ idiomas, cache inteligente e sem conta.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'Tradução AI grátis no Chrome<br><span class="highlight">para qualquer página da web</span>',
        sub: 'Uma extensão de tradução AI grátis para Chrome baseada na Translator API integrada do Chrome.<br>A tradução roda localmente no navegador. <strong>O texto da página permanece no Chrome durante a tradução grátis.</strong>',
        primaryCta: 'Instalar tradutor AI grátis',
        trust: 'Tradução AI grátis · Sem conta · 40+ idiomas'
      },
      cta: {
        title: 'Comece a tradução AI grátis no Chrome.',
        sub: 'Grátis. Integrado. Privado. Sem conta e sem chave de API: instale e traduza páginas inteiras.',
        primary: 'Instalar no Chrome · Grátis'
      }
    },
    ru: {
      meta: {
        title: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        description: 'Бесплатное AI-расширение для перевода в Chrome на базе встроенного Translator API Chrome. Переводите целые страницы в браузере: 40+ языков, умный кэш и без аккаунта.',
        ogTitle: 'offline.translator – AI-Powered Local Webpage Translation with Chrome AI',
        ogDescription: 'Бесплатное AI-расширение для перевода в Chrome на базе встроенного Translator API Chrome. Переводите целые страницы в браузере: 40+ языков, умный кэш и без аккаунта.',
        keywords: SEO_KEYWORDS
      },
      hero: {
        title: 'Бесплатный AI-перевод в Chrome<br><span class="highlight">для любой веб-страницы</span>',
        sub: 'Бесплатное AI-расширение для Chrome на базе встроенного Translator API Chrome.<br>Перевод выполняется локально в браузере. <strong>Текст страницы остаётся в Chrome во время бесплатного перевода.</strong>',
        primaryCta: 'Установить бесплатный AI-переводчик',
        trust: 'Бесплатный перевод · Без аккаунта · 40+ языков'
      },
      cta: {
        title: 'Запустите бесплатный AI-перевод в Chrome.',
        sub: 'Бесплатно. Встроено. Приватно. Без аккаунта и без API key: установите и переводите целые страницы.',
        primary: 'Установить в Chrome · Бесплатно'
      }
    }
  };
  var DEFAULT_OG_IMAGE = 'https://theofflinetranslator.com/assets/ScreenShot_2026-04-24_185508_569.png';
  var DEFAULT_OG_IMAGE_ALT = 'offline.translator side panel translating a webpage locally in Chrome';

  function getLocaleConfig(locale) {
    return SUPPORTED_LOCALES.find(function (item) {
      return item.code === locale;
    }) || SUPPORTED_LOCALES.find(function (item) {
      return item.code === 'en';
    });
  }

  function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  function mergeMessageTrees(base, override) {
    if (!base) return override;
    if (!override) return base;

    var result = {};

    Object.keys(base).forEach(function (key) {
      var value = base[key];

      if (Array.isArray(value)) {
        result[key] = value.slice();
      } else if (isPlainObject(value)) {
        result[key] = mergeMessageTrees(value, null);
      } else {
        result[key] = value;
      }
    });

    Object.keys(override).forEach(function (key) {
      var overrideValue = override[key];
      var baseValue = result[key];

      if (isPlainObject(overrideValue) && isPlainObject(baseValue)) {
        result[key] = mergeMessageTrees(baseValue, overrideValue);
      } else if (Array.isArray(overrideValue)) {
        result[key] = overrideValue.slice();
      } else {
        result[key] = overrideValue;
      }
    });

    return result;
  }

  function getHomeMessages(locale) {
    var baseMessages = I18N.home && I18N.home[locale];
    var overrides = HOME_MESSAGE_OVERRIDES[locale];

    if (!baseMessages) return null;
    if (!overrides) return baseMessages;

    return mergeMessageTrees(baseMessages, overrides);
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
    var messages = getHomeMessages(locale);
    var currentUrl = getCurrentUrlWithoutHash();
    var localeConfig = getLocaleConfig(locale);

    document.documentElement.lang = localeConfig.hreflang;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    setCanonical(currentUrl);
    setMeta('meta[property="og:url"]', currentUrl);
    setMeta('meta[property="og:locale"]', localeConfig.ogLocale);
    setMeta('meta[name="keywords"]', SEO_KEYWORDS);
    setMeta('meta[property="og:image"]', DEFAULT_OG_IMAGE);
    setMeta('meta[property="og:image:alt"]', DEFAULT_OG_IMAGE_ALT);
    setMeta('meta[name="twitter:image"]', DEFAULT_OG_IMAGE);
    setMeta('meta[name="twitter:image:alt"]', DEFAULT_OG_IMAGE_ALT);

    if (messages && messages.meta) {
      if (messages.meta.title) document.title = messages.meta.title;
      setMeta('meta[name="description"]', messages.meta.description);
      setMeta('meta[name="keywords"]', messages.meta.keywords || SEO_KEYWORDS);
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

  function initHeroScreenshots(locale) {
    var image = document.getElementById('hero-screenshot');
    var dotsContainer = document.getElementById('hero-screenshot-dots');
    var currentIndex = 0;
    var intervalId = null;
    var uiMessages = getUiMessages(locale);

    if (!image || !dotsContainer || !HERO_SLIDES.length) return;

    dotsContainer.setAttribute('aria-label', uiMessages.screenshotsLabel);

    HERO_SLIDES.forEach(function (slide, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'hero-screenshot-dot' + (index === 0 ? ' is-active' : '');
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      button.setAttribute('aria-label', uiMessages.screenshotLabel + ' ' + (index + 1));
      button.addEventListener('click', function () {
        setSlide(index);
        restart();
      });
      dotsContainer.appendChild(button);
    });

    function syncButtons() {
      var buttons = dotsContainer.querySelectorAll('.hero-screenshot-dot');
      buttons.forEach(function (btn, i) {
        var isActive = i === currentIndex;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function setSlide(nextIndex) {
      var slide = HERO_SLIDES[nextIndex];
      currentIndex = nextIndex;
      syncButtons();

      if (image.getAttribute('src') === slide.src) return;

      image.classList.add('is-fading');
      image.addEventListener('transitionend', function onEnd() {
        image.removeEventListener('transitionend', onEnd);
        image.src = slide.src;
        image.alt = slide.alt;
        requestAnimationFrame(function () {
          image.classList.remove('is-fading');
        });
      });
    }

    function start() {
      intervalId = window.setInterval(function () {
        setSlide((currentIndex + 1) % HERO_SLIDES.length);
      }, 4000);
    }

    function restart() {
      window.clearInterval(intervalId);
      start();
    }

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
              active.style.color = 'var(--color-text-primary)';
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

    initLocalePicker(locale);

    if (document.body && document.body.dataset.page === 'home') {
      applyHomeTranslations(locale);
    }

    initFAQ();
    initReveal();
    initNavHighlight();
  });
})();
