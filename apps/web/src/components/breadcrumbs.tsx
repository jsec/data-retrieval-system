import { Box, Group } from '@mantine/core';
import { CaretRightIcon } from '@phosphor-icons/react';
import { Link, useMatches } from '@tanstack/react-router';

export type Crumb = {
    label: string;
    params?: Record<string, string>;
    to?: string;
};

export function Breadcrumbs() {
    const matches = useMatches();

    const withCrumbs = matches.filter(
        (m): m is typeof m & { loaderData: { crumbs: Crumb[] } } =>
            !!(m.loaderData as undefined | { crumbs?: Crumb[] })?.crumbs,
    );

    const crumbs = withCrumbs.at(-1)?.loaderData.crumbs ?? [];

    return (
        <Group gap={8} style={{ fontSize: 13.5, minWidth: 0 }} wrap="nowrap">
            {crumbs.map((c: Crumb, i: number) => {
                const last = i === crumbs.length - 1;
                return (
                    <Group gap={8} key={`${c.label}-${i}`} wrap="nowrap">
                        {c.to && !last
                            ? (
                                    <Link
                                        params={c.params}
                                        style={{
                                            color: 'var(--mantine-color-f1red-6)',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            whiteSpace: 'nowrap',
                                        }}
                                        to={c.to}
                                    >
                                        {c.label}
                                    </Link>
                                )
                            : (
                                    <Box fw={last ? 700 : 600} style={{ whiteSpace: 'nowrap' }}>
                                        {c.label}
                                    </Box>
                                )}
                        {last
                            ? null
                            : (
                                    <CaretRightIcon color="var(--mantine-color-gray-5)" size={11} />
                                )}
                    </Group>
                );
            })}
        </Group>
    );
}
