#!/usr/bin/env python3
"""Regenerate every locale page (<code>/index.html) from the root index.html.

A locale page is the root page with its own lang, canonical, og:locale and og:url, rendered
once in headless Chrome so the translated text is in the HTML itself: crawlers that don't run
JavaScript (Bing, Yandex, Naver, AI search) see the page in its own language. The locale list
is read from SUPPORTED_LOCALES in script.js, so the two never drift. Run after editing index.html.
Needs Google Chrome; set CHROME to its binary if it isn't in the default macOS location.
"""
import functools
import http.server
import os
import pathlib
import re
import subprocess
import sys
import tempfile
import threading

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://theofflinetranslator.com/'
CHROME = os.environ.get('CHROME', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')

template = (ROOT / 'index.html').read_text(encoding='utf-8')
english_title = re.search(r'<title>(.*?)</title>', template).group(1)
locales = re.findall(r"code: '([^']+)', label: '[^']*', hreflang: '([^']+)', ogLocale: '([^']+)'",
                     (ROOT / 'script.js').read_text(encoding='utf-8'))
if len(locales) < 2:
    sys.exit('could not read SUPPORTED_LOCALES from script.js')


def swap(text, old, new):
    # Each tag must appear exactly once, or the template changed and this script needs a look.
    if text.count(old) != 1:
        sys.exit(f'expected exactly one {old!r} in index.html, found {text.count(old)}')
    return text.replace(old, new)


# 1. Untranslated pages. Only the render needs i18n.js, so it is added here and stripped after.
for code, hreflang, og_locale in locales:
    url = SITE if code == 'en' else f'{SITE}{code}/'  # /en/ duplicates the root page, so it points there
    page = template
    page = swap(page, '<html lang="en">', f'<html lang="{hreflang}">')
    page = swap(page, f'<link rel="canonical" href="{SITE}">', f'<link rel="canonical" href="{url}">')
    page = swap(page, '<meta property="og:locale" content="en_US">', f'<meta property="og:locale" content="{og_locale}">')
    page = swap(page, f'<meta property="og:url" content="{SITE}">', f'<meta property="og:url" content="{url}">')
    page = swap(page, f'"url": "{SITE}"', f'"url": "{url}"')
    page = swap(page, '<script src="/script.js" defer></script>',
                '<script src="/i18n.js" defer></script>\n  <script src="/script.js" defer></script>')
    (ROOT / code).mkdir(exist_ok=True)
    (ROOT / code / 'index.html').write_text(page, encoding='utf-8')


# 2. Render each page (script.js translates it, see ?prerender there) and keep what Chrome shows.
class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
port = server.server_address[1]

with tempfile.TemporaryDirectory() as profile:
    for code, _, _ in locales:
        dom = subprocess.run(
            [CHROME, '--headless', '--disable-gpu', '--no-first-run', f'--user-data-dir={profile}',
             '--dump-dom', f'http://127.0.0.1:{port}/{code}/?prerender'],
            capture_output=True, text=True, timeout=90, check=True).stdout
        if 'data-prerendered' not in dom:
            sys.exit(f'{code}: script.js did not finish rendering the page')
        if code != 'en' and f'<title>{english_title}</title>' in dom:
            sys.exit(f'{code}: <title> is still English; check meta.title for {code} in i18n.js')
        dom, removed = re.subn(r'\s*<script src="/i18n\.js" defer(="")?></script>', '', dom)
        if removed != 1:
            sys.exit(f'{code}: expected one i18n.js tag in the rendered page, found {removed}')
        (ROOT / code / 'index.html').write_text(dom, encoding='utf-8')  # --dump-dom keeps the doctype
        print(f'{code}/index.html')

server.shutdown()
