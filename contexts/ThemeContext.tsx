import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    colorScheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_mode';

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const systemColorScheme = useSystemColorScheme();
    const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

    // Determine the actual color scheme based on theme mode
    const colorScheme = themeMode === 'system'
        ? (systemColorScheme ?? 'light')
        : themeMode;

    // Load saved theme preference on mount
    useEffect(() => {
        const loadThemeMode = async () => {
            try {
                const savedThemeMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedThemeMode && ['light', 'dark', 'system'].includes(savedThemeMode)) {
                    setThemeModeState(savedThemeMode as ThemeMode);
                }
            } catch (error) {
                console.log('Error loading theme mode:', error);
            }
        };

        loadThemeMode();
    }, []);

    // Save theme preference when it changes
    const setThemeMode = async (mode: ThemeMode) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
            setThemeModeState(mode);
        } catch (error) {
            console.log('Error saving theme mode:', error);
        }
    };

    const value: ThemeContextType = {
        themeMode,
        setThemeMode,
        colorScheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
