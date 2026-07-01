import type { ReactNode } from 'react';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ResolvedTheme = 'dark' | 'light';
type Theme = 'dark' | 'light' | 'system';

type ThemeContextValue = {
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    theme: Theme;
    toggleTheme: () => void;
};

const STORAGE_KEY = 'drs-theme';
const ThemeContext = createContext<null | ThemeContextValue>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);
    const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

    useEffect(() => {
        const media = globalThis.window.matchMedia('(prefers-color-scheme: dark)');
        const updateSystemTheme = () => setSystemTheme(media.matches ? 'dark' : 'light');

        updateSystemTheme();
        media.addEventListener('change', updateSystemTheme);
        return () => media.removeEventListener('change', updateSystemTheme);
    }, []);

    const resolvedTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    }, [resolvedTheme]);

    const value = useMemo<ThemeContextValue>(() => ({
        resolvedTheme,
        setTheme: (nextTheme) => {
            setThemeState(nextTheme);
            globalThis.window.localStorage.setItem(STORAGE_KEY, nextTheme);
        },
        theme,
        toggleTheme: () => {
            const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
            setThemeState(nextTheme);
            globalThis.window.localStorage.setItem(STORAGE_KEY, nextTheme);
        },
    }), [resolvedTheme, theme]);

    return (
        <ThemeContext value={value}>
            {children}
        </ThemeContext>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider.');
    }
    return context;
};

const getInitialTheme = (): Theme => {
    const stored = globalThis.window.localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' || stored === 'system' ? stored : 'system';
};

const getSystemTheme = (): ResolvedTheme => {
    return globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
