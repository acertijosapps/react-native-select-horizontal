import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import SelectHorizontal, {
    type SelectHorizontalItem,
} from '@acertijosapps/react-native-select-horizontal';
import { StatusBar } from 'expo-status-bar';

const FREQUENCY: SelectHorizontalItem[] = [
    { id: 1, label: 'Daily' },
    { id: 2, label: 'Weekly' },
    { id: 3, label: 'Monthly' },
    { id: 4, label: 'Yearly' },
];

const SIZES: SelectHorizontalItem[] = [
    { id: 'sm', label: 'Small' },
    { id: 'md', label: 'Medium' },
    { id: 'lg', label: 'Large' },
];

const LONG_TEXT: SelectHorizontalItem[] = [
    { id: 1, label: 'Short' },
    {
        id: 2,
        label: 'This is an extremely long option label that should not fit inside the bar and will test how the value text overflows',
    },
    { id: 3, label: 'Another very long label to check the overflow behaviour again' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
}

export default function App(): React.JSX.Element {
    const [selected, setSelected] = useState('Daily');
    const [asyncData, setAsyncData] = useState<SelectHorizontalItem[]>([]);
    const [controlledIndex, setControlledIndex] = useState(2);

    useEffect(() => {
        const timeout = setTimeout(() => setAsyncData(FREQUENCY), 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>react-native-select-horizontal</Text>

                <Section title="Defaults">
                    <SelectHorizontal
                        labelText="Frequency"
                        data={FREQUENCY}
                        onChange={(_, item) => setSelected(item.label)}
                    />
                    <Text style={styles.result}>Selected: {selected}</Text>
                </Section>

                <Section title="Custom theme">
                    <SelectHorizontal
                        labelText="Plan size"
                        data={SIZES}
                        startPosition={1}
                        primaryColor="#0E7C66"
                        accentColor="#FFFFFF"
                        fontSize={20}
                        iconSize={34}
                        style={styles.rounded}
                    />
                </Section>

                <Section title="Custom arrow icons (emoji)">
                    <SelectHorizontal
                        labelText="Frequency"
                        data={FREQUENCY}
                        primaryColor="#1D1B48"
                        accentColor="#FFD166"
                        renderLeftIcon={({ size }) => (
                            <Text style={{ fontSize: size * 0.7 }}>⬅️</Text>
                        )}
                        renderRightIcon={({ size }) => (
                            <Text style={{ fontSize: size * 0.7 }}>➡️</Text>
                        )}
                    />
                </Section>

                <Section title="No label">
                    <SelectHorizontal
                        data={SIZES}
                        primaryColor="#E02241"
                        accentColor="#FFFFFF"
                        style={styles.rounded}
                    />
                </Section>

                <Section title="Controlled (selectedIndex)">
                    <SelectHorizontal
                        labelText="Frequency"
                        data={FREQUENCY}
                        selectedIndex={controlledIndex}
                        onChange={(position) => setControlledIndex(position)}
                    />
                    <Pressable
                        accessibilityRole="button"
                        style={styles.resetButton}
                        onPress={() => setControlledIndex(0)}
                    >
                        <Text style={styles.resetText}>Reset to Daily</Text>
                    </Pressable>
                </Section>

                <Section title="isLoopEnabled">
                    <SelectHorizontal
                        labelText="Frequency"
                        data={FREQUENCY}
                        isLoopEnabled
                        primaryColor="#0E7C66"
                    />
                </Section>

                <Section title={'arrowVisibility="disable" + Spanish a11y labels'}>
                    <SelectHorizontal
                        labelText="Frecuencia"
                        data={FREQUENCY}
                        arrowVisibility="disable"
                        previousAccessibilityLabel="Anterior"
                        nextAccessibilityLabel="Siguiente"
                        primaryColor="#E02241"
                    />
                </Section>

                <Section title="Async data (loads after 1.5 s)">
                    <SelectHorizontal
                        labelText={asyncData.length ? 'Loaded' : 'Loading…'}
                        data={asyncData}
                        testID="async"
                    />
                </Section>

                <Section title="startPosition out of range (99)">
                    <SelectHorizontal
                        data={SIZES}
                        startPosition={99}
                        primaryColor="#0E7C66"
                    />
                </Section>

                <Section title="Long text (overflow) + iconStyle">
                    <SelectHorizontal
                        labelText="Overflow test"
                        data={LONG_TEXT}
                        startPosition={1}
                        primaryColor="#6C3AED"
                        accentColor="#FFFFFF"
                        iconStyle={{ fontWeight: '700' }}
                    />
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F7F7FC',
    },
    content: {
        padding: 20,
        gap: 28,
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1D1B48',
        marginBottom: 4,
    },
    section: {
        gap: 8,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#757575',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    result: {
        fontSize: 14,
        color: '#212121',
    },
    resetButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: '#E6E6F0',
    },
    resetText: {
        fontSize: 14,
        color: '#1D1B48',
    },
    rounded: {
        borderRadius: 12,
        overflow: 'hidden',
    },
});
