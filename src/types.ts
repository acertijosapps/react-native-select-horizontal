import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Excepción declarada a Code Style §10 ("sin comentarios"): este archivo describe
 * la API pública del paquete, así que los JSDoc alimentan el IntelliSense del
 * consumidor. El resto de `src/` se mantiene sin comentarios.
 */

/** A single selectable option. */
export interface SelectHorizontalItem {
    /** Stable identifier for the option. */
    id: number | string;
    /** Text shown when this option is selected. */
    label: string;
}

/**
 * What to do with an arrow that has no step in its direction: `'hide'` leaves its slot
 * empty and `'disable'` keeps it visible, dimmed and not pressable.
 */
export type ArrowVisibility = 'hide' | 'disable';

/** Info passed to the custom arrow renderers. */
export interface ArrowRenderProps {
    /** Icon size resolved from the `iconSize` prop (or its default). */
    size: number;
    /** Icon color resolved from `iconColor` / `accentColor` (or its default). */
    color: string;
    /**
     * Whether the arrow has no step in its direction. Only `true` with
     * `arrowVisibility="disable"`; with `'hide'` such an arrow is not rendered.
     */
    isDisabled: boolean;
}

export interface SelectHorizontalProps<T extends SelectHorizontalItem = SelectHorizontalItem> {
    /** Options to page through. */
    data: T[];

    /**
     * Selected index for controlled usage. When set, the component shows this index and
     * only reports steps through `onChange`; update it from there. Out-of-range values are
     * clamped to `data`.
     */
    selectedIndex?: number;
    /** Index selected on mount when `selectedIndex` is not set. Defaults to `0`. */
    startPosition?: number;
    /** Wrap from the last option to the first and back. Default `false`. */
    isLoopEnabled?: boolean;
    /** Hide or disable the arrow that has no step in its direction. Default `'hide'`. */
    arrowVisibility?: ArrowVisibility;
    /** Optional label rendered above the selector. Hidden when empty. */
    labelText?: string;
    /**
     * Screen reader label of the selector bar, an adjustable element that announces the
     * selected option and steps with swipe up/down (VoiceOver) or the adjust gestures
     * (TalkBack). Defaults to `labelText`.
     */
    accessibilityLabel?: string;
    /** Screen reader label of the left arrow. Default `'Previous'`. */
    previousAccessibilityLabel?: string;
    /** Screen reader label of the right arrow. Default `'Next'`. */
    nextAccessibilityLabel?: string;

    /** Fired whenever the selection changes. */
    onChange?: (newPosition: number, selectedValue: T) => void;

    /** Font size for the label and the selected value. Default `18`. */
    fontSize?: number;
    /** Arrow icon size. Default `25`. */
    iconSize?: number;
    /** Corner radius of the selector bar. Default `9`. */
    borderRadius?: number;

    /** Bar background + label color. Default `#1D1B48`. */
    primaryColor?: string;
    /** Selected value + arrow color. Default `#FFFFFF`. */
    accentColor?: string;
    /** Overrides `accentColor` for the arrows only. */
    iconColor?: string;

    /** Font family applied to the label and value. */
    fontFamily?: string;
    /** Font weight of the label. Defaults to a normal weight. */
    labelFontWeight?: TextStyle['fontWeight'];
    /** Font weight of the selected value. Defaults to a bold weight. */
    valueFontWeight?: TextStyle['fontWeight'];

    /** Render a custom left arrow. Falls back to a text chevron. */
    renderLeftIcon?: (props: ArrowRenderProps) => ReactNode;
    /** Render a custom right arrow. Falls back to a text chevron. */
    renderRightIcon?: (props: ArrowRenderProps) => ReactNode;

    /** Style for the outer wrapper (label + bar). */
    contentContainerStyle?: StyleProp<ViewStyle>;
    /** Style for the selector bar (the row with arrows and value). */
    style?: StyleProp<ViewStyle>;
    /** Extra style for the label text. */
    labelStyle?: StyleProp<TextStyle>;
    /** Extra style for the selected value text. */
    valueStyle?: StyleProp<TextStyle>;
    /** Extra style for the default chevron glyphs. Ignored when `renderLeftIcon`/`renderRightIcon` are set. */
    iconStyle?: StyleProp<TextStyle>;

    /**
     * testID for the root view. The arrows get `${testID}-left` and `${testID}-right`;
     * without a testID they keep `btnLeft` and `btnRight`.
     */
    testID?: string;
}
