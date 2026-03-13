'use client';

import type { ReactNode } from 'react';

import { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
    align?: 'center' | 'end' | 'start';
    defaultOpen?: boolean;
    trigger: ReactNode;
};

const LanguageDropdown = ({ align, defaultOpen, trigger }: Readonly<Props>) => {
    const [language, setLanguage] = useState('english');

    return (
        <DropdownMenu defaultOpen={defaultOpen}>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent align={align || 'end'} className="w-50">
                <DropdownMenuRadioGroup onValueChange={setLanguage} value={language}>
                    <DropdownMenuRadioItem
                        className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
                        value="english"
                    >
                        English
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
                        value="german"
                    >
                        Deutsch
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
                        value="spanish"
                    >
                        Española
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
                        value="portuguese"
                    >
                        Português
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
                        value="korean"
                    >
                        한국인
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageDropdown;
