# Privacy Policy

**Effective date:** April 24, 2026

offline.translator is designed to provide private, on-device webpage translation in Chrome. This Privacy Policy explains what the extension does with data, what it stores locally, and what it does not send anywhere.

## Summary

- offline.translator processes webpage text locally on your device.
- The extension does not use an external translation server for its core translation flow.
- The extension does not sell your data.
- The extension does not transmit webpage text or translated text to the developer's servers.
- User settings and translation cache are stored locally in the browser on your device.

## What the Extension Does

offline.translator reads text from webpages you choose to translate, processes that text locally, and updates the page with translated text. It can also optionally refine translations using Chrome's built-in on-device AI capabilities, including Gemini Nano when available in Chrome.

The extension is built around local processing. Its core translation workflow uses Google's built-in Translator API in Chrome and Chrome's built-in AI capabilities on the device, rather than sending page content to an external service operated by the developer.

## Information Processed by the Extension

The extension may process the following data locally on your device:

- webpage text that appears on pages you choose to translate
- page metadata such as visible placeholders, page titles, and image alt text when these are translated as part of the page
- user-selected settings such as source language, target language, translation scope, UI preferences, and optional feature settings
- locally cached translation records used to speed up repeat translations on your device

## What We Store

offline.translator stores data locally in the browser, including:

- user preferences in Chrome storage
- translation cache records in local browser storage such as IndexedDB
- optional UI and workflow settings needed to preserve your preferred experience across sessions

This local storage is used only to make the extension work, improve repeat translation speed, and preserve your settings.

## What We Do Not Collect or Send to Our Servers

offline.translator does not operate a developer-hosted translation backend for the core translation flow. The developer does not collect, receive, sell, or share your webpage text, translated text, or local cache contents through a separate remote service.

In particular, the extension does not intentionally send the following to developer-controlled servers:

- webpage text
- translated output
- browsing content for translation
- local cache contents
- user language preferences for analytics or advertising purposes

## Built-in Browser AI and Model Downloads

offline.translator relies on AI capabilities built into Chrome, such as the built-in Translator API and built-in on-device AI features including Gemini Nano where available. If Chrome needs to download, update, or manage built-in language or AI models, that process is controlled by Chrome or the platform, not by this extension. Any such browser-managed downloads are outside the extension's own server infrastructure.

## Permissions and Why They Are Used

offline.translator requests only the permissions needed to provide on-device translation features:

- `activeTab`: to act on the page the user has chosen to translate
- `storage`: to save settings and local preferences
- `tabs`: to target and synchronize with the correct tab
- `webNavigation`: to stay aligned with page and frame navigation changes
- `sidePanel`: to provide the main translation interface without covering page content
- `offscreen`: to run built-in AI tasks in an offscreen extension context when needed
- `notifications`: to show user-facing status updates such as optimization progress or completion

## Data Sharing

offline.translator does not sell personal information and does not share webpage text or translation content with the developer's own external services as part of its core operation.

## Data Retention and User Control

Because data is stored locally on your device, you control it through your browser and extension settings. You can remove the extension, clear browser storage, or clear local extension data to remove locally stored settings and cached translations.

## Security

offline.translator is designed to keep processing on the device whenever possible. The extension packages its executable code with the extension and does not intentionally run developer-hosted remote code for its core workflow.

## Children's Privacy

offline.translator is not specifically directed to children. If you are responsible for a child using the browser, you should supervise extension use in the same way you supervise browsing activity generally.

## Changes to This Privacy Policy

This Privacy Policy may be updated from time to time to reflect changes in the extension or in applicable requirements. The latest version should be published with the extension materials.

## Contact

For privacy questions, replace the placeholder below with your real publisher contact email before publication:

`the.offline.translator@gmail.com`
