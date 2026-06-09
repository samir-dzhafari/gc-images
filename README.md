# gc-images

React Native app (bare workflow, iOS + Android).

## Setup

```bash
npm install
cd ios && pod install && cd ..
```

## Run

```bash
npm run start
npm run android
# or
npm run ios
```

If Android native build fails after dependency or NDK changes, clean CMake
cache:

```bash
rm -rf android/app/.cxx android/app/build
cd android && ./gradlew clean && cd ..
npm run android
```

## Lint & format

```bash
npm run lint
npm run format
```

## Project structure

- `src/app` — app shell, navigation, providers
- `src/pages` — screens

Path aliases (`@app/*`, `@pages/*`, …) are configured in `tsconfig.json` and
`babel.config.js`.

## FSD import rules (ESLint)

Layer imports are enforced by `eslint-plugin-boundaries`
([`eslint/fsd-boundaries.mjs`](eslint/fsd-boundaries.mjs)):

| Layer      | May import from                                                |
| ---------- | -------------------------------------------------------------- |
| `shared`   | `shared`, `assets`                                             |
| `entities` | `entities`, `shared`, `assets`                                 |
| `features` | `features`, `entities`, `shared`, `assets`                     |
| `widgets`  | `widgets`, `features`, `entities`, `shared`, `assets`          |
| `pages`    | `pages`, `widgets`, `features`, `entities`, `shared`, `assets` |
| `app`      | any layer + `assets`                                           |

`npm` packages (`react-native`, etc.) are not restricted.

Path aliases (`@app/*`, …) are resolved via `eslint-import-resolver-typescript`
and `tsconfig.json` paths. Without that, unresolved aliases are treated as
external and boundary rules are skipped.
