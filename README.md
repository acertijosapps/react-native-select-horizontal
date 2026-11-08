# @acertijosapps/react-native-select-horizontal

Una alternativa al dropdown tradicional para React Native, pensada para el celular. En vez de abrir
un menú que tapa la pantalla, el usuario recorre las opciones en el mismo lugar con flechas a la
izquierda y a la derecha: más rápido, con una sola mano y al alcance del pulgar. Sin dependencias y
con el tema completo por props, así que se adapta a tu design system: colores, tamaños, fuentes y
hasta los íconos de las flechas.

Página de la librería: [acertijosapps.com/librerias/react-native-select-horizontal](https://acertijosapps.com/librerias/react-native-select-horizontal)

<p align="center">
  <img src="https://raw.githubusercontent.com/acertijosapps/react-native-select-horizontal/main/assets/preview.png" alt="SelectHorizontal con el tema por default, un tema verde y uno rojo sin etiqueta" width="360" />
</p>

- **Sin dependencias de runtime:** solo `react` y `react-native` como peers.
- Modo no controlado (`startPosition`) o controlado (`selectedIndex`).
- Recorrido circular opcional (`isLoopEnabled`).
- La flecha sin paso se oculta o se muestra deshabilitada (`arrowVisibility`), sin mover el texto.
- Accesible: la barra es un elemento `adjustable` que anuncia la opción y avanza con los gestos del
  lector de pantalla.
- Colores, tamaños, fuentes, estilos e íconos de las flechas configurables.

## Instalación

```bash
yarn add @acertijosapps/react-native-select-horizontal
# o
npm install @acertijosapps/react-native-select-horizontal
```

## Uso

```tsx
import SelectHorizontal from '@acertijosapps/react-native-select-horizontal';

const data = [
    { id: 1, label: 'Diario' },
    { id: 2, label: 'Semanal' },
    { id: 3, label: 'Mensual' },
];

export function Example() {
    return (
        <SelectHorizontal
            labelText="Frecuencia"
            data={data}
            startPosition={0}
            onChange={(position, item) => console.log(position, item.label)}
        />
    );
}
```

### Modo controlado

Con `selectedIndex` el componente muestra ese índice y solo reporta los pasos por `onChange`.
Actualízalo desde ahí; así puedes resetear la selección o sincronizarla con otro estado:

```tsx
const [index, setIndex] = useState(0);

<SelectHorizontal
    data={data}
    selectedIndex={index}
    onChange={(position) => setIndex(position)}
/>;
```

Un índice fuera de rango se acota a `data`, igual que `startPosition`.

### Recorrido circular y flechas en los extremos

```tsx
<SelectHorizontal
    data={data}
    isLoopEnabled
/>
```

Con `isLoopEnabled` el último elemento lleva al primero y al revés, así que las dos flechas siempre
están activas (salvo con una sola opción).

Sin loop, en los extremos la flecha que no tiene paso se oculta y su lugar queda reservado, para que
el texto no se mueva. Con `arrowVisibility="disable"` se queda visible, atenuada
(`DISABLED_ARROW_OPACITY`) y sin respuesta:

```tsx
<SelectHorizontal
    data={data}
    arrowVisibility="disable"
/>
```

### Tema

Cada dimensión y color es una prop con un default constante, así que el componente se adapta a tu
design system:

```tsx
<SelectHorizontal
    data={data}
    fontSize={18}
    iconSize={25}
    borderRadius={9}
    primaryColor="#1D1B48"
    accentColor="#FFFFFF"
    iconColor="#FFFFFF"
    fontFamily="Sora"
    labelFontWeight="400"
    valueFontWeight="600"
/>
```

Defaults: `fontSize` 18, `iconSize` 25, `borderRadius` 9, `primaryColor` `#1D1B48`, `accentColor`
`#FFFFFF`. También se exportan por si quieres usarlos:

```tsx
import {
    DEFAULT_ACCENT_COLOR,
    DEFAULT_BORDER_RADIUS,
    DEFAULT_FONT_SIZE,
    DEFAULT_ICON_SIZE,
    DEFAULT_PRIMARY_COLOR,
} from '@acertijosapps/react-native-select-horizontal';
```

Las props de estilo (`contentContainerStyle`, `style`, `labelStyle`, `valueStyle`, `iconStyle`)
aceptan `StyleProp`: objetos, arrays y estilos de `StyleSheet.create`.

### Flechas personalizadas

Por default las flechas son chevrons de texto (`‹` `›`). Pasa cualquier componente por los render
props para usar tus propios íconos (un SVG, una fuente de íconos, un emoji…):

```tsx
<SelectHorizontal
    data={data}
    renderLeftIcon={({ size, color }) => (
        <MyChevronLeft
            size={size}
            color={color}
        />
    )}
    renderRightIcon={({ size, color, isDisabled }) => (
        <MyChevronRight
            size={size}
            color={isDisabled ? 'gray' : color}
        />
    )}
/>
```

`isDisabled` llega en `true` solo con `arrowVisibility="disable"`, en la flecha que no tiene paso.

### Accesibilidad

La barra es un elemento `adjustable`: el lector de pantalla anuncia su etiqueta y la opción
seleccionada, y avanza o retrocede con swipe arriba/abajo (VoiceOver) o los gestos de ajuste
(TalkBack). La etiqueta es `labelText`, o `accessibilityLabel` si lo pasas. Las flechas son botones
con `previousAccessibilityLabel` y `nextAccessibilityLabel` (default `'Previous'` / `'Next'`);
tradúcelas al idioma de tu app:

```tsx
<SelectHorizontal
    data={data}
    labelText="Frecuencia"
    previousAccessibilityLabel="Anterior"
    nextAccessibilityLabel="Siguiente"
/>
```

## API

| Prop                         | Tipo                                        | Default         | Descripción                                                                                |
| ---------------------------- | ------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------ |
| `data`                       | `{ id: number \| string; label: string }[]` | —               | **Requerida.** Opciones a recorrer.                                                         |
| `selectedIndex`              | `number`                                    | —               | Índice seleccionado en modo controlado.                                                     |
| `startPosition`              | `number`                                    | `0`             | Índice inicial en modo no controlado.                                                       |
| `isLoopEnabled`              | `boolean`                                   | `false`         | Del último elemento vuelve al primero y al revés.                                           |
| `arrowVisibility`            | `'hide' \| 'disable'`                       | `'hide'`        | Oculta o deshabilita la flecha sin paso.                                                    |
| `labelText`                  | `string`                                    | `''`            | Etiqueta sobre la barra. Se oculta si está vacía.                                           |
| `onChange`                   | `(position: number, item) => void`          | —               | Se llama al cambiar la selección.                                                           |
| `fontSize`                   | `number`                                    | `18`            | Tamaño de la etiqueta y del valor.                                                          |
| `iconSize`                   | `number`                                    | `25`            | Tamaño de las flechas.                                                                      |
| `borderRadius`               | `number`                                    | `9`             | Radio de las esquinas de la barra.                                                          |
| `primaryColor`               | `string`                                    | `#1D1B48`       | Fondo de la barra y color de la etiqueta.                                                   |
| `accentColor`                | `string`                                    | `#FFFFFF`       | Color del valor y de las flechas.                                                           |
| `iconColor`                  | `string`                                    | `accentColor`   | Reemplaza `accentColor` solo en las flechas.                                                |
| `fontFamily`                 | `string`                                    | —               | Fuente de la etiqueta y del valor.                                                          |
| `labelFontWeight`            | `TextStyle['fontWeight']`                   | normal          | Peso de la etiqueta.                                                                        |
| `valueFontWeight`            | `TextStyle['fontWeight']`                   | bold            | Peso del valor seleccionado.                                                                |
| `renderLeftIcon`             | `(p: ArrowRenderProps) => ReactNode`        | texto `‹`       | Flecha izquierda personalizada.                                                             |
| `renderRightIcon`            | `(p: ArrowRenderProps) => ReactNode`        | texto `›`       | Flecha derecha personalizada.                                                               |
| `accessibilityLabel`         | `string`                                    | `labelText`     | Etiqueta de la barra para el lector de pantalla.                                            |
| `previousAccessibilityLabel` | `string`                                    | `'Previous'`    | Etiqueta de la flecha izquierda.                                                            |
| `nextAccessibilityLabel`     | `string`                                    | `'Next'`        | Etiqueta de la flecha derecha.                                                              |
| `contentContainerStyle`      | `StyleProp<ViewStyle>`                      | —               | Estilo del contenedor (etiqueta + barra).                                                   |
| `style`                      | `StyleProp<ViewStyle>`                      | —               | Estilo de la barra.                                                                         |
| `labelStyle`                 | `StyleProp<TextStyle>`                      | —               | Estilo extra de la etiqueta.                                                                |
| `valueStyle`                 | `StyleProp<TextStyle>`                      | —               | Estilo extra del valor.                                                                     |
| `iconStyle`                  | `StyleProp<TextStyle>`                      | —               | Estilo de los chevrons por default (no aplica con render props).                            |
| `testID`                     | `string`                                    | —               | testID del contenedor. Las flechas usan `${testID}-left` / `${testID}-right` (`btnLeft` / `btnRight` sin él). |

`ArrowRenderProps`: `{ size: number; color: string; isDisabled: boolean }`.

## Example

En [`example/`](example) hay una app de Expo que importa el componente directo de `src` (con
`babel-plugin-module-resolver` y `watchFolders` de Metro), así que los cambios en la librería se
recargan en la demo.

```bash
cd example
yarn install
yarn ios      # o: yarn android / yarn web
```

La demo muestra los defaults, un tema propio, flechas personalizadas, el modo controlado, el loop,
`arrowVisibility="disable"`, data asíncrona y textos largos.

## Autor

Hecho por [AcertijosApps](https://acertijosapps.com/librerias). Conoce el resto de nuestras
librerías en [acertijosapps.com/librerias](https://acertijosapps.com/librerias).

Dudas o propuestas: [acertijos.contacto@gmail.com](mailto:acertijos.contacto@gmail.com) o abre un
[issue](https://github.com/acertijosapps/react-native-select-horizontal/issues).

## Licencia

MIT
