import { CaretRightIcon } from '@phosphor-icons/react';
import { Link, useMatches } from '@tanstack/react-router';

export type Crumb = {
    label: string;
    params?: Record<string, string>;
    to?: string;
};

export const Breadcrumbs = () => {
    const matches = useMatches();

    const withCrumbs = matches.filter(
        (m): m is typeof m & { loaderData: { crumbs: Crumb[] } } =>
            !!(m.loaderData as undefined | { crumbs?: Crumb[] })?.crumbs,
    );

    const crumbs = withCrumbs.at(-1)?.loaderData.crumbs ?? [];

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap', fontSize: 13.5, gap: 8, minWidth: 0 }}>
            {crumbs.map((c: Crumb, i: number) => {
                const last = i === crumbs.length - 1;
                return (
                    <div key={`${c.label}-${i}`} style={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap', gap: 8 }}>
                        {c.to && !last
                            ? (
                                    <Link
                                        params={c.params}
                                        style={{
                                            color: 'var(--color-primary)',
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
                                    <span style={{ fontWeight: last ? 700 : 600, whiteSpace: 'nowrap' }}>
                                        {c.label}
                                    </span>
                                )}
                        {last
                            ? null
                            : (
                                    <CaretRightIcon color="var(--neutral-400)" size={11} />
                                )}
                    </div>
                );
            })}
        </div>
    );
};
