import { useTheme } from "@/providers/themeProvider"
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return <Button variant='ghost' size='icon' onClick={toggleTheme}>
        {theme === 'dark' ?
            <SunIcon /> :
            <MoonIcon />
        }
        <span className='sr-only'>Toggle Theme</span>
    </Button>
}
