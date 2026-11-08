import type { AccessibilityActionInfo, TextStyle } from 'react-native';
import { Platform } from 'react-native';

export const DEFAULT_FONT_SIZE = 18;

export const DEFAULT_ICON_SIZE = 25;

export const DEFAULT_BORDER_RADIUS = 9;

export const DEFAULT_PRIMARY_COLOR = '#1D1B48';

export const DEFAULT_ACCENT_COLOR = '#FFFFFF';

export const DISABLED_ARROW_OPACITY = 0.3;

export const DEFAULT_PREVIOUS_ACCESSIBILITY_LABEL = 'Previous';

export const DEFAULT_NEXT_ACCESSIBILITY_LABEL = 'Next';

export const ACCESSIBILITY_ACTIONS: AccessibilityActionInfo[] = [
    { name: 'increment' },
    { name: 'decrement' },
];

export const FONT_WEIGHT: {
    NORMAL: TextStyle['fontWeight'];
    BOLD: TextStyle['fontWeight'];
} = {
    NORMAL: Platform.OS === 'android' ? 'normal' : '400',
    BOLD: Platform.OS === 'android' ? 'bold' : '600',
};
