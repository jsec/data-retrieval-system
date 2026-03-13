import { createContext, use, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<null | ThemeContextValue>(null);

export const ThemeProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    );
};

export const useTheme = () => {
    const ctx = use(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return ctx;
};
