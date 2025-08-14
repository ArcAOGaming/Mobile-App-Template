import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, ThemeMode } from '@/contexts/ThemeContext';
import { useThemeColor } from './Themed';

export function ThemeSwitcher() {
    const { themeMode, setThemeMode } = useTheme();

    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const tintColor = useThemeColor({}, 'tint');

    const themeOptions: { mode: ThemeMode; label: string }[] = [
        { mode: 'light', label: 'Light' },
        { mode: 'dark', label: 'Dark' },
        { mode: 'system', label: 'System' },
    ];

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Theme</Text>
            <View style={styles.optionsContainer}>
                {themeOptions.map((option) => (
                    <TouchableOpacity
                        key={option.mode}
                        style={[
                            styles.option,
                            {
                                backgroundColor: themeMode === option.mode ? tintColor : 'transparent',
                                borderColor: tintColor,
                            },
                        ]}
                        onPress={() => setThemeMode(option.mode)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                {
                                    color: themeMode === option.mode ? '#fff' : textColor,
                                },
                            ]}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        margin: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    option: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        minWidth: 80,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
