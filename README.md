# react-native-select-horizontal

A dependency-free horizontal stepper / selector for React Native. Page through a
list of options with left/right arrows. No `useDimens`, no
`react-native-vector-icons`, no theme file — everything is driven by props with
sensible constant defaults, so you plug in your own design system.

**Zero runtime dependencies.** Only `react` and `react-native` as peers.

## Install

```bash
yarn add react-native-select-horizontal
# or
npm install react-native-select-horizontal
```

## Usage

```tsx
import SelectHorizontal from 'react-native-select-horizontal';

const data = [
  {id: 1, label: 'Daily'},
  {id: 2, label: 'Weekly'},
  {id: 3, label: 'Monthly'},
];

export function Example() {
  return (
    <SelectHorizontal
      labelText="Frequency"
      data={data}
      startPosition={0}
      onChange={(position, item) => console.log(position, item.label)}
    />
  );
}
```

### Theming

All the values that used to come from `useDimens` and the app color file are now
props with defaults:

```tsx
<SelectHorizontal
  data={data}
  fontSize={18}          // label + value size        (default 18)
  iconSize={30}          // arrow size                 (default 30)
  labelSpacing={9}       // vertical padding of label  (default 9)
  borderRadius={12}      // corner radius of the bar   (default 12)
  primaryColor="#1D1B48" // bar background + label      (default #1D1B48)
  accentColor="#FFFFFF"  // value + arrows              (default #FFFFFF)
  iconColor="#FFFFFF"    // overrides accent for arrows only
  fontFamily="Sora"
  labelFontWeight="400"
  valueFontWeight="600"
/>
```

The default dimension/color constants are exported if you want to reference
them:

```tsx
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_ICON_SIZE,
  DEFAULT_LABEL_SPACING,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_ACCENT_COLOR,
} from 'react-native-select-horizontal';
```

### Custom arrows

By default arrows render as text chevrons (`‹` `›`) so there's no icon
dependency. Bring your own icon component with the render props:

```tsx
import Icon from 'react-native-vector-icons/Entypo';

<SelectHorizontal
  data={data}
  renderLeftIcon={({size, color}) => (
    <Icon name="chevron-thin-left" size={size} color={color} />
  )}
  renderRightIcon={({size, color}) => (
    <Icon name="chevron-thin-right" size={size} color={color} />
  )}
/>
```

## Props

| Prop                    | Type                                          | Default     | Description                                   |
| ----------------------- | --------------------------------------------- | ----------- | --------------------------------------------- |
| `data`                  | `{ id: number \| string; label: string }[]`   | —           | **Required.** Options to page through.        |
| `startPosition`         | `number`                                      | `0`         | Index selected on mount.                      |
| `labelText`             | `string`                                      | `''`        | Label above the bar. Hidden when empty.       |
| `onChange`              | `(position: number, item) => void`            | —           | Fired when the selection changes.             |
| `fontSize`              | `number`                                      | `18`        | Label and value font size.                    |
| `iconSize`              | `number`                                      | `30`        | Arrow icon size.                              |
| `labelSpacing`          | `number`                                      | `9`         | Vertical padding around the label.            |
| `borderRadius`          | `number`                                      | `12`        | Corner radius of the selector bar.            |
| `primaryColor`          | `string`                                      | `#1D1B48`   | Bar background and label color.               |
| `accentColor`           | `string`                                      | `#FFFFFF`   | Value and arrow color.                        |
| `iconColor`             | `string`                                      | `accentColor` | Overrides `accentColor` for arrows only.    |
| `fontFamily`            | `string`                                      | —           | Font family for label and value.              |
| `labelFontWeight`       | `TextStyle['fontWeight']`                     | normal      | Weight of the label.                          |
| `valueFontWeight`       | `TextStyle['fontWeight']`                     | bold        | Weight of the selected value.                 |
| `renderLeftIcon`        | `(p: ArrowRenderProps) => ReactNode`          | text `‹`    | Custom left arrow.                            |
| `renderRightIcon`       | `(p: ArrowRenderProps) => ReactNode`          | text `›`    | Custom right arrow.                           |
| `contentContainerStyle` | `ViewStyle`                                   | —           | Outer wrapper style.                          |
| `style`                 | `ViewStyle`                                   | —           | Selector bar style.                           |
| `labelStyle`            | `TextStyle`                                   | —           | Extra label style.                            |
| `valueStyle`            | `TextStyle`                                   | —           | Extra value style.                            |
| `iconStyle`             | `TextStyle`                                   | —           | Style for the default chevrons (ignored with custom render). |
| `testID`                | `string`                                      | —           | testID for the root view.                     |

## Example

A runnable Expo app lives in [`example/`](example). It imports the component
straight from `src` (via `babel-plugin-module-resolver` + a Metro
`watchFolders` config), so edits to the library hot-reload in the demo.

```bash
cd example
yarn install
yarn ios      # or: yarn android / yarn web
```

The demo shows the defaults, a custom theme, custom arrow icons, and a label-less
variant.

## License

MIT
