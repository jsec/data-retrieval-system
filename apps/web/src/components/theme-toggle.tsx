import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '@/providers/theme-provider';

import { Button } from './ui/button';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} size="icon" variant="ghost">
            {theme === 'dark'
                ? <SunIcon />
                : <MoonIcon />}
            <span className="sr-only">Toggle Theme</span>
        </Button>
    );
};
