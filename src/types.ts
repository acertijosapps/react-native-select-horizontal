import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

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

/** Info passed to the custom arrow renderers. */
export interface ArrowRenderProps {
    /** Icon size resolved from the `iconSize` prop (or its default). */
    size: number;
    /** Icon color resolved from `iconColor` / `accentColor` (or its default). */
    color: string;
    /**
     * Always `false` for now: when there is no step in a direction its arrow is hidden
     * instead of rendered disabled.
     */
    isDisabled: boolean;
}

export interface SelectHorizontalProps<T extends SelectHorizontalItem = SelectHorizontalItem> {
    /** Options to page through. */
    data: T[];

    /** Index selected on mount. Defaults to `0`. */
    startPosition?: number;
    /** Optional label rendered above the selector. Hidden when empty. */
    labelText?: string;

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
    contentContainerStyle?: ViewStyle;
    /** Style for the selector bar (the row with arrows and value). */
    style?: ViewStyle;
    /** Extra style for the label text. */
    labelStyle?: TextStyle;
    /** Extra style for the selected value text. */
    valueStyle?: TextStyle;
    /** Extra style for the default chevron glyphs. Ignored when `renderLeftIcon`/`renderRightIcon` are set. */
    iconStyle?: TextStyle;

    /**
     * testID for the root view. The arrows get `${testID}-left` and `${testID}-right`;
     * without a testID they keep `btnLeft` and `btnRight`.
     */
    testID?: string;
}
