# Testing Strategy

TruongHoc needs fast feedback because product changes will come quickly across both web and mobile.

Current safety layers:

- Web regression tests: validate subject availability, textbook page anchors, and content-bank integrity for History and Geography.
- Flutter unit tests: protect core student session state like login, subject switching, password update, and logout.
- Flutter widget smoke test: protects the login entry screen.

Recommended release gate:

1. `npm run test:web`
2. `npm run typecheck:web`
3. `npm run build:web`
4. `flutter analyze`
5. `flutter test`

As we expand further, the next layer to add should be browser-level end-to-end tests for login, chapter selection, test submission, and review flows.
