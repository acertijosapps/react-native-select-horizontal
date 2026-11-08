# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [1.0.4] - 2026-11-08

### Changed

- El repositorio se movió a GitHub: [acertijosapps/react-native-select-horizontal](https://github.com/acertijosapps/react-native-select-horizontal). `repository`, `bugs` y la imagen del README apuntan ahí.
- Con `testID`, las flechas usan `${testID}-left` y `${testID}-right`; sin él conservan `btnLeft` y `btnRight`.
- `package.json` declara `exports` (`source`, `types`, `react-native`, `import`, `require`) y `sideEffects: false`.
- `prepublishOnly` corre typecheck, lint y format:check antes de publicar, y solo `lib/typescript` lleva los `.d.ts`.

### Fixed

- Las flechas se derivan de la posición actual: si `data` llega vacío y se carga después, la flecha derecha aparece.
- La posición se acota al rango de `data`: un `startPosition` fuera de rango muestra el último elemento en vez de quedar vacío.
- El JSDoc mostraba defaults incorrectos para `iconSize` (30) y `borderRadius` (12); los reales son 25 y 9.
- `ArrowRenderProps.isDisabled` documenta que siempre llega en `false`: la flecha sin paso se oculta.
- El example no cargaba en Metro por los `paths` de su `tsconfig.json`; se desactivó `experiments.tsconfigPaths`.

## [1.0.3] - 2026-10-12

### Changed

- `author` es AcertijosApps (`acertijos.contacto@gmail.com`) y `homepage` apunta a [acertijosapps.com/librerias/react-native-select-horizontal](https://acertijosapps.com/librerias/react-native-select-horizontal).
- El copyright del LICENSE es de AcertijosApps.

## [1.0.2] - 2026-09-19

### Changed

- Links de `homepage`, `repository` y `bugs` en `package.json`.

## [1.0.1] - 2026-09-16

### Changed

- Descripción enfocada como alternativa móvil al dropdown, keywords nuevas y preview en PNG para que npm la muestre.

## [1.0.0] - 2026-09-16

### Added

- `SelectHorizontal`: selector horizontal con flechas izquierda/derecha, sin dependencias de runtime.
- Tema por props (`fontSize`, `iconSize`, `borderRadius`, `primaryColor`, `accentColor`, `iconColor`, `fontFamily`, pesos de fuente) con constantes `DEFAULT_*` exportadas.
- Flechas personalizables con `renderLeftIcon` / `renderRightIcon` y estilo de los chevrons por `iconStyle`.
- Espacios fijos para las flechas y elipsis en medio para textos largos.
- App de ejemplo con Expo en `example/`.
