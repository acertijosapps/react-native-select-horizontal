import '@testing-library/react-native/extend-expect';

import React from 'react';
import { Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import SelectHorizontal from '../SelectHorizontal';
import type { ArrowRenderProps, SelectHorizontalItem } from '../types';

const DATA: SelectHorizontalItem[] = [
    { id: 1, label: 'Daily' },
    { id: 2, label: 'Weekly' },
    { id: 3, label: 'Monthly' },
];

const pressNext = () => fireEvent.press(screen.getByTestId('btnRight'));

const pressPrevious = () => fireEvent.press(screen.getByTestId('btnLeft'));

const runAccessibilityAction = (actionName: string) =>
    fireEvent(screen.getByRole('adjustable'), 'accessibilityAction', {
        nativeEvent: { actionName },
    });

describe('SelectHorizontal', () => {
    describe('uncontrolled', () => {
        it('starts at the first option with only the right arrow', () => {
            render(<SelectHorizontal data={DATA} />);

            expect(screen.getByText('Daily')).toBeTruthy();
            expect(screen.queryByTestId('btnLeft')).toBeNull();
            expect(screen.getByTestId('btnRight')).toBeTruthy();
        });

        it('steps through the options and reports each change', () => {
            const onChange = jest.fn();

            render(
                <SelectHorizontal
                    data={DATA}
                    onChange={onChange}
                />,
            );

            pressNext();
            expect(screen.getByText('Weekly')).toBeTruthy();
            expect(onChange).toHaveBeenLastCalledWith(1, DATA[1]);

            pressNext();
            expect(screen.getByText('Monthly')).toBeTruthy();
            expect(screen.queryByTestId('btnRight')).toBeNull();

            pressPrevious();
            expect(screen.getByText('Weekly')).toBeTruthy();
            expect(onChange).toHaveBeenLastCalledWith(1, DATA[1]);
            expect(onChange).toHaveBeenCalledTimes(3);
        });

        it('starts at startPosition', () => {
            render(
                <SelectHorizontal
                    data={DATA}
                    startPosition={1}
                />,
            );

            expect(screen.getByText('Weekly')).toBeTruthy();
            expect(screen.getByTestId('btnLeft')).toBeTruthy();
            expect(screen.getByTestId('btnRight')).toBeTruthy();
        });

        it('clamps an out-of-range startPosition to the last option', () => {
            render(
                <SelectHorizontal
                    data={DATA}
                    startPosition={99}
                />,
            );

            expect(screen.getByText('Monthly')).toBeTruthy();
            expect(screen.queryByTestId('btnRight')).toBeNull();

            pressPrevious();
            expect(screen.getByText('Weekly')).toBeTruthy();
        });

        it('shows the right arrow when data arrives after mount', () => {
            const { rerender } = render(<SelectHorizontal data={[]} />);

            expect(screen.queryByTestId('btnLeft')).toBeNull();
            expect(screen.queryByTestId('btnRight')).toBeNull();

            rerender(<SelectHorizontal data={DATA} />);

            expect(screen.getByText('Daily')).toBeTruthy();
            expect(screen.getByTestId('btnRight')).toBeTruthy();
        });

        it('keeps the position inside data when data shrinks', () => {
            const { rerender } = render(
                <SelectHorizontal
                    data={DATA}
                    startPosition={2}
                />,
            );

            rerender(
                <SelectHorizontal
                    data={DATA.slice(0, 2)}
                    startPosition={2}
                />,
            );

            expect(screen.getByText('Weekly')).toBeTruthy();
            expect(screen.queryByTestId('btnRight')).toBeNull();
        });
    });

    describe('controlled', () => {
        it('shows selectedIndex and only reports steps', () => {
            const onChange = jest.fn();

            const { rerender } = render(
                <SelectHorizontal
                    data={DATA}
                    selectedIndex={1}
                    onChange={onChange}
                />,
            );

            expect(screen.getByText('Weekly')).toBeTruthy();

            pressNext();
            expect(onChange).toHaveBeenCalledWith(2, DATA[2]);
            expect(screen.getByText('Weekly')).toBeTruthy();

            rerender(
                <SelectHorizontal
                    data={DATA}
                    selectedIndex={2}
                    onChange={onChange}
                />,
            );
            expect(screen.getByText('Monthly')).toBeTruthy();
        });

        it('ignores startPosition when selectedIndex is set', () => {
            render(
                <SelectHorizontal
                    data={DATA}
                    selectedIndex={0}
                    startPosition={2}
                />,
            );

            expect(screen.getByText('Daily')).toBeTruthy();
        });
    });

    describe('isLoopEnabled', () => {
        it('wraps around both ends', () => {
            const onChange = jest.fn();

            render(
                <SelectHorizontal
                    data={DATA}
                    isLoopEnabled
                    onChange={onChange}
                />,
            );

            expect(screen.getByTestId('btnLeft')).toBeTruthy();

            pressPrevious();
            expect(screen.getByText('Monthly')).toBeTruthy();
            expect(onChange).toHaveBeenLastCalledWith(2, DATA[2]);

            pressNext();
            expect(screen.getByText('Daily')).toBeTruthy();
            expect(onChange).toHaveBeenLastCalledWith(0, DATA[0]);
        });

        it('shows no arrows with a single option', () => {
            render(
                <SelectHorizontal
                    data={DATA.slice(0, 1)}
                    isLoopEnabled
                />,
            );

            expect(screen.queryByTestId('btnLeft')).toBeNull();
            expect(screen.queryByTestId('btnRight')).toBeNull();
        });
    });

    describe('arrowVisibility', () => {
        it('keeps the arrow with no step visible but disabled', () => {
            const onChange = jest.fn();

            render(
                <SelectHorizontal
                    data={DATA}
                    arrowVisibility="disable"
                    onChange={onChange}
                />,
            );

            const leftArrow = screen.getByTestId('btnLeft');

            expect(leftArrow).toBeDisabled();

            pressPrevious();
            expect(onChange).not.toHaveBeenCalled();
            expect(screen.getByText('Daily')).toBeTruthy();
        });

        it('passes isDisabled to the custom arrow renderers', () => {
            const renderLeftIcon = jest.fn(({ isDisabled }: ArrowRenderProps) => (
                <Text>{isDisabled ? 'left-off' : 'left-on'}</Text>
            ));

            render(
                <SelectHorizontal
                    data={DATA}
                    arrowVisibility="disable"
                    renderLeftIcon={renderLeftIcon}
                />,
            );

            expect(screen.getByText('left-off')).toBeTruthy();

            pressNext();
            expect(screen.getByText('left-on')).toBeTruthy();
        });
    });

    describe('testID', () => {
        it('derives the arrow testIDs from testID', () => {
            render(
                <SelectHorizontal
                    data={DATA}
                    startPosition={1}
                    testID="frequency"
                />,
            );

            expect(screen.getByTestId('frequency')).toBeTruthy();
            expect(screen.getByTestId('frequency-left')).toBeTruthy();
            expect(screen.getByTestId('frequency-right')).toBeTruthy();
        });
    });

    describe('accessibility', () => {
        it('exposes the bar as adjustable with the selected option as its value', () => {
            render(
                <SelectHorizontal
                    data={DATA}
                    labelText="Frequency"
                />,
            );

            const bar = screen.getByRole('adjustable');

            expect(bar.props.accessibilityLabel).toBe('Frequency');
            expect(bar.props.accessibilityValue).toEqual({ text: 'Daily' });
        });

        it('prefers accessibilityLabel over labelText', () => {
            render(
                <SelectHorizontal
                    data={DATA}
                    labelText="Frequency"
                    accessibilityLabel="Report frequency"
                />,
            );

            expect(screen.getByRole('adjustable').props.accessibilityLabel).toBe(
                'Report frequency',
            );
        });

        it('steps with the increment and decrement actions', () => {
            const onChange = jest.fn();

            render(
                <SelectHorizontal
                    data={DATA}
                    onChange={onChange}
                />,
            );

            runAccessibilityAction('increment');
            expect(screen.getByText('Weekly')).toBeTruthy();

            runAccessibilityAction('decrement');
            runAccessibilityAction('decrement');
            expect(screen.getByText('Daily')).toBeTruthy();
            expect(onChange).toHaveBeenCalledTimes(2);
        });

        it('labels the arrows with defaults or custom labels', () => {
            const { rerender } = render(
                <SelectHorizontal
                    data={DATA}
                    startPosition={1}
                />,
            );

            expect(screen.getByLabelText('Previous')).toBeTruthy();
            expect(screen.getByLabelText('Next')).toBeTruthy();

            rerender(
                <SelectHorizontal
                    data={DATA}
                    startPosition={1}
                    previousAccessibilityLabel="Anterior"
                    nextAccessibilityLabel="Siguiente"
                />,
            );

            expect(screen.getByLabelText('Anterior')).toBeTruthy();
            expect(screen.getByLabelText('Siguiente')).toBeTruthy();
        });
    });

    it('hides the label when labelText is blank', () => {
        render(
            <SelectHorizontal
                data={DATA}
                labelText="   "
            />,
        );

        expect(screen.queryByText('   ')).toBeNull();
    });
});
