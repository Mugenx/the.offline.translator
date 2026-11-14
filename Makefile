.PHONY: watch locales

watch:
	python3 -m http.server 8000

# Rebuild the 15 locale pages from index.html; run after every index.html change.
locales:
	python3 scripts/sync-locales.py
