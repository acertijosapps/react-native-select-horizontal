import React, { useState } from 'react';
import type { AccessibilityActionEvent } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
    ACCESSIBILITY_ACTIONS,
    DEFAULT_ACCENT_COLOR,
    DEFAULT_BORDER_RADIUS,
    DEFAULT_FONT_SIZE,
    DEFAULT_ICON_SIZE,
    DEFAULT_NEXT_ACCESSIBILITY_LABEL,
    DEFAULT_PREVIOUS_ACCESSIBILITY_LABEL,
    DEFAULT_PRIMARY_COLOR,
    DISABLED_ARROW_OPACITY,
    FONT_WEIGHT,
} from './constants';
import type { ArrowRenderProps, SelectHorizontalItem, SelectHorizontalProps } from './types';

type ArrowDirection = 'left' | 'right';

interface ArrowSlotOptions {
    direction: ArrowDirection;
    isEnabled: boolean;
    slotTestID: string;
    accessibilityLabel: string;
    render: ((arrowProps: ArrowRenderProps) => React.ReactNode) | undefined;
    onPress: () => void;
}

function SelectHorizontal<T extends SelectHorizontalItem>(
    props: SelectHorizontalProps<T>,
): React.JSX.Element {
    const {
        data = [],
        selectedIndex,
        startPosition = 0,
        isLoopEnabled = false,
        arrowVisibility = 'hide',
        labelText = '',
        accessibilityLabel,
        previousAccessibilityLabel = DEFAULT_PREVIOUS_ACCESSIBILITY_LABEL,
        nextAccessibilityLabel = DEFAULT_NEXT_ACCESSIBILITY_LABEL,
        onChange,
        fontSize = DEFAULT_FONT_SIZE,
        iconSize = DEFAULT_ICON_SIZE,
        borderRadius = DEFAULT_BORDER_RADIUS,
        primaryColor = DEFAULT_PRIMARY_COLOR,
        accentColor = DEFAULT_ACCENT_COLOR,
        iconColor,
        fontFamily,
        labelFontWeight = FONT_WEIGHT.NORMAL,
        valueFontWeight = FONT_WEIGHT.BOLD,
        renderLeftIcon,
        renderRightIcon,
        contentContainerStyle,
        style,
        labelStyle,
        valueStyle,
        iconStyle,
        testID,
    } = props;

    const [internalPosition, setInternalPosition] = useState<number>(startPosition);

    const isControlled = selectedIndex !== undefined;
    const position = isControlled ? selectedIndex : internalPosition;
    const lastIndex = data.length - 1;
    const actualPosition = Math.min(Math.max(position, 0), Math.max(lastIndex, 0));
    const hasSeveralItems = data.length > 1;
    const canGoPrevious = isLoopEnabled ? hasSeveralItems : actualPosition > 0;
    const canGoNext = isLoopEnabled ? hasSeveralItems : actualPosition < lastIndex;
    const arrowSlotSize = iconSize * 2;
    const arrowSlotStyle = { height: arrowSlotSize, width: arrowSlotSize };
    const resolvedIconColor = iconColor ?? accentColor;
    const isLabelVisible = !!labelText && labelText.trim() !== '';
    const selectedLabel = data[actualPosition]?.label ?? '';
    const barAccessibilityLabel = accessibilityLabel ?? (isLabelVisible ? labelText : undefined);
    const leftTestID = testID ? `${testID}-left` : 'btnLeft';
    const rightTestID = testID ? `${testID}-right` : 'btnRight';

    const handleStep = (step: number) => {
        const canStep = step < 0 ? canGoPrevious : canGoNext;

        if (!canStep) {
            return;
        }

        const newPosition = isLoopEnabled
            ? (actualPosition + step + data.length) % data.length
            : actualPosition + step;

        if (!isControlled) {
            setInternalPosition(newPosition);
        }

        onChange?.(newPosition, data[newPosition]);
    };

    const handleMinus = () => handleStep(-1);

    const handlePlus = () => handleStep(1);

    const handleAccessibilityAction = (event: AccessibilityActionEvent) => {
        if (event.nativeEvent.actionName === 'increment') {
            handlePlus();
        }

        if (event.nativeEvent.actionName === 'decrement') {
            handleMinus();
        }
    };

    const renderArrow = (
        direction: ArrowDirection,
        isDisabled: boolean,
        render: ((arrowProps: ArrowRenderProps) => React.ReactNode) | undefined,
    ) => {
        if (render) {
            return render({ size: iconSize, color: resolvedIconColor, isDisabled });
        }

        return (
            <Text
                style={[
                    {
                        fontSize: iconSize,
                        lineHeight: iconSize,
                        color: resolvedIconColor,
                        fontFamily,
                    },
                    iconStyle,
                ]}
            >
                {direction === 'left' ? '‹' : '›'}
            </Text>
        );
    };

    const renderArrowSlot = ({
        direction,
        isEnabled,
        slotTestID,
        accessibilityLabel: slotAccessibilityLabel,
        render,
        onPress,
    }: ArrowSlotOptions) => {
        if (!isEnabled && arrowVisibility === 'hide') {
            return <View style={arrowSlotStyle} />;
        }

        return (
            <TouchableOpacity
                testID={slotTestID}
                accessibilityRole="button"
                accessibilityLabel={slotAccessibilityLabel}
                accessibilityState={{ disabled: !isEnabled }}
                disabled={!isEnabled}
                activeOpacity={0.6}
                style={[styles.button, arrowSlotStyle, !isEnabled && styles.buttonDisabled]}
                onPress={onPress}
            >
                {renderArrow(direction, !isEnabled, render)}
            </TouchableOpacity>
        );
    };

    return (
        <View
            testID={testID}
            style={contentContainerStyle}
        >
            {isLabelVisible ? (
                <Text
                    style={[
                        {
                            fontSize,
                            color: primaryColor,
                            fontFamily,
                            fontWeight: labelFontWeight,
                        },
                        labelStyle,
                    ]}
                >
                    {labelText}
                </Text>
            ) : null}

            <View
                accessible
                accessibilityRole="adjustable"
                accessibilityLabel={barAccessibilityLabel}
                accessibilityValue={{ text: selectedLabel }}
                accessibilityActions={ACCESSIBILITY_ACTIONS}
                style={[styles.container, { backgroundColor: primaryColor, borderRadius }, style]}
                onAccessibilityAction={handleAccessibilityAction}
            >
                {renderArrowSlot({
                    direction: 'left',
                    isEnabled: canGoPrevious,
                    slotTestID: leftTestID,
                    accessibilityLabel: previousAccessibilityLabel,
                    render: renderLeftIcon,
                    onPress: handleMinus,
                })}

                <Text
                    numberOfLines={1}
                    ellipsizeMode="middle"
                    style={[
                        styles.txtBody,
                        {
                            fontSize,
                            color: accentColor,
                            fontFamily,
                            fontWeight: valueFontWeight,
                        },
                        valueStyle,
                    ]}
                >
                    {selectedLabel}
                </Text>

                {renderArrowSlot({
                    direction: 'right',
                    isEnabled: canGoNext,
                    slotTestID: rightTestID,
                    accessibilityLabel: nextAccessibilityLabel,
                    render: renderRightIcon,
                    onPress: handlePlus,
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        opacity: DISABLED_ARROW_OPACITY,
    },
    txtBody: {
        flex: 1,
        textAlign: 'center',
    },
});

export default SelectHorizontal;
