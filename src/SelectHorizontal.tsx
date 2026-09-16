import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
    DEFAULT_ACCENT_COLOR,
    DEFAULT_BORDER_RADIUS,
    DEFAULT_FONT_SIZE,
    DEFAULT_ICON_SIZE,
    DEFAULT_LABEL_SPACING,
    DEFAULT_PRIMARY_COLOR,
    FONT_WEIGHT,
} from './constants';
import type { ArrowRenderProps, SelectHorizontalItem, SelectHorizontalProps } from './types';

function SelectHorizontal<T extends SelectHorizontalItem>(
    props: SelectHorizontalProps<T>,
): React.JSX.Element {
    const {
        data = [],
        startPosition = 0,
        labelText = '',
        onChange,
        fontSize = DEFAULT_FONT_SIZE,
        iconSize = DEFAULT_ICON_SIZE,
        labelSpacing = DEFAULT_LABEL_SPACING,
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
        testID,
    } = props;

    const [actualPosition, setActualPosition] = useState<number>(startPosition);
    const [isShowLeft, setIsShowLeft] = useState<boolean>(startPosition !== 0);
    const [isShowRight, setIsShowRight] = useState<boolean>(
        startPosition !== data.length - 1 && data.length - 1 !== -1,
    );

    const lastIndex = data.length - 1;
    const arrowSlotWidth = iconSize * 2;
    const resolvedIconColor = iconColor ?? accentColor;
    const isLabelVisible = !!labelText && labelText.trim() !== '';

    const handleMinus = () => {
        if (actualPosition > 0) {
            const newPosition = actualPosition - 1;

            setActualPosition(newPosition);
            setIsShowLeft(newPosition > 0);
            setIsShowRight(true);

            onChange?.(newPosition, data[newPosition]);
        }
    };

    const handlePlus = () => {
        if (actualPosition < lastIndex) {
            const newPosition = actualPosition + 1;

            setActualPosition(newPosition);
            setIsShowLeft(true);
            setIsShowRight(newPosition !== lastIndex);

            onChange?.(newPosition, data[newPosition]);
        }
    };

    const renderArrow = (
        direction: 'left' | 'right',
        render: ((arrowProps: ArrowRenderProps) => React.ReactNode) | undefined,
    ) => {
        if (render) {
            return render({ size: iconSize, color: resolvedIconColor, isDisabled: false });
        }

        return (
            <Text
                style={{
                    fontSize: iconSize,
                    lineHeight: iconSize,
                    color: resolvedIconColor,
                    fontFamily,
                }}
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
                            paddingVertical: labelSpacing,
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
                {isShowLeft ? (
                    <TouchableOpacity
                        testID="btnLeft"
                        activeOpacity={0.6}
                        style={[styles.button, { width: arrowSlotWidth }]}
                        onPress={handleMinus}
                    >
                        {renderArrow('left', renderLeftIcon)}
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: arrowSlotWidth }} />
                )}

                <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
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

                {isShowRight ? (
                    <TouchableOpacity
                        testID="btnRight"
                        activeOpacity={0.6}
                        style={[styles.button, { width: arrowSlotWidth }]}
                        onPress={handlePlus}
                    >
                        {renderArrow('right', renderRightIcon)}
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: arrowSlotWidth }} />
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
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtBody: {
        flex: 1,
        textAlign: 'center',
    },
});

export default SelectHorizontal;
