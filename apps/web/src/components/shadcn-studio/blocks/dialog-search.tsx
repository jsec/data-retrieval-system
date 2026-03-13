import type { ReactNode } from 'react';

import {
    ArrowDownIcon,
    ArrowUpIcon,
    MonitorSmartphoneIcon,
    MoreVerticalIcon,
    ShoppingCartIcon,
    Undo2Icon,
    UsersIcon,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';

type Props = {
    className?: string;
    defaultOpen?: boolean;
    trigger: ReactNode;
};

const SearchDialog = ({ className, defaultOpen = false, trigger }: Readonly<Props>) => {
    const [open, setOpen] = useState(defaultOpen);
    const [search, setSearch] = useState('');

    return (
        <div className={className}>
            <div onClick={() => setOpen(true)}>{trigger}</div>
            <CommandDialog onOpenChange={setOpen} open={open}>
                <CommandInput
                    className="text-base [svg:has(+&)]:size-5 [svg:has(+&)]:opacity-100"
                    onValueChange={setSearch}
                    placeholder="Search here..."
                    value={search}
                />

                <CommandList className="max-h-[65vh]">
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup
                        className="[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase"
                        heading="Suggestions"
                    >
                        <CommandItem className="!py-1.5 text-base" onSelect={() => setOpen(false)}>
                            <UsersIcon className="text-foreground !size-4.5" />
                            <span>Marketing UI Page</span>
                        </CommandItem>
                        <CommandItem className="!py-1.5 text-base" onSelect={() => setOpen(false)}>
                            <ShoppingCartIcon className="text-foreground !size-4.5" />
                            <span>e-commerce UI Page</span>
                        </CommandItem>
                        <CommandItem className="!py-1.5 text-base" onSelect={() => setOpen(false)}>
                            <MonitorSmartphoneIcon className="text-foreground !size-4.5" />
                            <span>Dashboard UI Page</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup
                        className="[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase"
                        heading="Interactions"
                    >
                        <CommandItem className="gap-3 !py-1.5 text-base" onSelect={() => setOpen(false)}>
                            <Avatar className="size-9.5">
                                <AvatarFallback>
                                    <img
                                        alt="Jira"
                                        className="size-6"
                                        src="https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/dashboard-dialog/jira.png"
                                    />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex w-full flex-col items-start">
                                <span className="font-medium">Jira</span>
                                <span className="text-muted-foreground text-sm">Project management</span>
                            </div>
                            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                <Avatar>
                                    <AvatarImage alt="Aaron Larson" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                                    <AvatarFallback>AL</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage
                                        alt="Kathryn Cummings"
                                        src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png"
                                    />
                                    <AvatarFallback>KC</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage alt="Vincent Boone" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png" />
                                    <AvatarFallback>VB</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarFallback>+99</AvatarFallback>
                                </Avatar>
                            </div>
                        </CommandItem>
                        <CommandItem className="gap-3 !py-1.5 text-base" onSelect={() => setOpen(false)}>
                            <Avatar className="size-9.5">
                                <AvatarFallback>
                                    <img
                                        alt="Inferno"
                                        className="size-6"
                                        src="https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/dashboard-dialog/inferno.png"
                                    />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex w-full flex-col items-start">
                                <span className="font-medium">Inferno</span>
                                <span className="text-muted-foreground text-sm">Real-time photo sharing app</span>
                            </div>
                            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                <Avatar>
                                    <AvatarImage alt="Walter Newton" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                                    <AvatarFallback>WN</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage alt="Ruby Stewart" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png" />
                                    <AvatarFallback>RS</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage alt="Bernard Clarke" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png" />
                                    <AvatarFallback>BC</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage alt="Elva Baker" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png" />
                                    <AvatarFallback>EB</AvatarFallback>
                                </Avatar>
                            </div>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup
                        className="[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase"
                        heading="Users"
                    >
                        <CommandItem className="gap-3 !py-1.5 text-base" onSelect={() => setOpen(false)}>
                            <Avatar className="size-9.5">
                                <AvatarImage alt="Barry Barnett" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                                <AvatarFallback>BB</AvatarFallback>
                            </Avatar>
                            <div className="flex w-full flex-col items-start">
                                <span className="font-medium">Barry Barnett</span>
                                <span className="text-muted-foreground text-sm font-light">barry@hotmail.com</span>
                            </div>
                            <Badge className="bg-green-600/10 px-3 py-1 font-normal text-green-600 dark:bg-green-400/10 dark:text-green-400">
                                In office
                            </Badge>
                            <MoreVerticalIcon />
                        </CommandItem>
                        <CommandItem className="gap-3 !py-1.5 text-base" onSelect={() => setOpen(false)}>
                            <Avatar className="size-9.5">
                                <AvatarImage alt="Maria Donin" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png" />
                                <AvatarFallback>MD</AvatarFallback>
                            </Avatar>
                            <div className="flex w-full flex-col items-start">
                                <span className="font-medium">Maria Donin</span>
                                <span className="text-muted-foreground text-sm font-light">maria@hotmail.com</span>
                            </div>
                            <Badge className="bg-red-600/10 px-3 py-1 font-normal text-red-600 dark:bg-red-400/10 dark:text-red-400">
                                On leave
                            </Badge>
                            <MoreVerticalIcon />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>

                <CommandSeparator />

                <div className="text-muted-foreground flex flex-wrap items-center gap-4 p-6">
                    <div className="flex flex-1 items-center gap-2">
                        <kbd className="rounded border px-1 text-sm">esc</kbd>
                        <span>To close</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex size-5 items-center justify-center rounded border">
                            <Undo2Icon className="size-4" />
                        </div>
                        <span>To Select</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex size-5 items-center justify-center rounded border">
                            <ArrowUpIcon className="size-4" />
                        </div>
                        <div className="flex size-5 items-center justify-center rounded border">
                            <ArrowDownIcon className="size-4" />
                        </div>
                        <span>To Navigate</span>
                    </div>
                </div>
            </CommandDialog>
        </div>
    );
};

export default SearchDialog;
