import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
    DEFAULT_ACCENT_COLOR,
    DEFAULT_BORDER_RADIUS,
    DEFAULT_FONT_SIZE,
    DEFAULT_ICON_SIZE,
    DEFAULT_PRIMARY_COLOR,
    FONT_WEIGHT,
} from './constants';
import type { ArrowRenderProps, SelectHorizontalItem, SelectHorizontalProps } from './types';

function SelectHorizontal<T extends SelectHorizontalItem>(
    props: SelectHorizontalProps<T>,
): React.JSX.Element {
    const {
        data = [],
        selectedIndex,
        startPosition = 0,
        labelText = '',
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
    const isLeftVisible = actualPosition > 0;
    const isRightVisible = actualPosition < lastIndex;
    const arrowSlotSize = iconSize * 2;
    const resolvedIconColor = iconColor ?? accentColor;
    const isLabelVisible = !!labelText && labelText.trim() !== '';
    const leftTestID = testID ? `${testID}-left` : 'btnLeft';
    const rightTestID = testID ? `${testID}-right` : 'btnRight';

    const handleStep = (step: number) => {
        const newPosition = actualPosition + step;

        if (newPosition < 0 || newPosition > lastIndex) {
            return;
        }

        if (!isControlled) {
            setInternalPosition(newPosition);
        }

        onChange?.(newPosition, data[newPosition]);
    };

    const handleMinus = () => handleStep(-1);

    const handlePlus = () => handleStep(1);

    const renderArrow = (
        direction: 'left' | 'right',
        render: ((arrowProps: ArrowRenderProps) => React.ReactNode) | undefined,
    ) => {
        if (render) {
            return render({ size: iconSize, color: resolvedIconColor, isDisabled: false });
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
                style={[styles.container, { backgroundColor: primaryColor, borderRadius }, style]}
            >
                {isLeftVisible ? (
                    <TouchableOpacity
                        testID={leftTestID}
                        activeOpacity={0.6}
                        style={[styles.button, { height: arrowSlotSize, width: arrowSlotSize }]}
                        onPress={handleMinus}
                    >
                        {renderArrow('left', renderLeftIcon)}
                    </TouchableOpacity>
                ) : (
                    <View style={{ height: arrowSlotSize, width: arrowSlotSize }} />
                )}

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
                    {data[actualPosition]?.label}
                </Text>

                {isRightVisible ? (
                    <TouchableOpacity
                        testID={rightTestID}
                        activeOpacity={0.6}
                        style={[styles.button, { height: arrowSlotSize, width: arrowSlotSize }]}
                        onPress={handlePlus}
                    >
                        {renderArrow('right', renderRightIcon)}
                    </TouchableOpacity>
                ) : (
                    <View style={{ height: arrowSlotSize, width: arrowSlotSize }} />
                )}
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
    txtBody: {
        flex: 1,
        textAlign: 'center',
    },
});

export default SelectHorizontal;
