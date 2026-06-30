import type { ListSeasonsResponse } from '@drs/contracts';

import { TrophyIcon } from '@phosphor-icons/react';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { TeamBar } from '#/components/f1-ui';
import { api } from '#/lib/query/api';

export const Route = createFileRoute('/seasons/')({
    component: Seasons,
    loader: async () => {
        return { crumbs: [{ label: 'Seasons' }] };
    },
});

const COLS = '90px 80px 1fr 1fr 110px';

const HEADER_STYLE: React.CSSProperties = {
    background: 'var(--color-accent)',
    color: 'var(--color-muted-foreground)',
    display: 'grid',
    fontSize: 10.5,
    fontWeight: 700,
    gridTemplateColumns: COLS,
    letterSpacing: '0.5px',
    padding: '13px 22px',
    textTransform: 'uppercase',
};

function Seasons() {
    const { data: seasons } = useSuspenseQuery(
        queryOptions({
            queryFn: () => api.get('seasons').json<ListSeasonsResponse>(),
            queryKey: ['seasons'],
        }),
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
                <h1 className="f1-display" style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                    Seasons
                </h1>
                <div style={{ color: 'var(--color-muted-foreground)', fontSize: 13, marginTop: 4 }}>
                    Browse championship seasons and their outcomes
                </div>
            </div>

            <div className="f1-card" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={HEADER_STYLE}>
                    <span>SEASON</span>
                    <span style={{ textAlign: 'center' }}>RACES</span>
                    <span>WORLD CHAMPION</span>
                    <span>CONSTRUCTORS&apos; CHAMPION</span>
                    <span>STATUS</span>
                </div>
                {seasons.map((s) => {
                    const inProgress = !s.wcc; // rough proxy for in-progress season
                    return (
                        <Link
                            className="f1-row"
                            key={s.season}
                            params={{ year: String(s.season) }}
                            style={{
                                alignItems: 'center',
                                borderTop: '1px solid var(--color-border)',
                                color: 'inherit',
                                display: 'grid',
                                gridTemplateColumns: COLS,
                                padding: '14px 22px',
                                textDecoration: 'none',
                            }}
                            to="/seasons/$year"
                        >
                            <span className="f1-num f1-display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px' }}>
                                {s.season}
                            </span>
                            <span className="f1-num" style={{ color: 'var(--color-muted-foreground)', fontWeight: 700, textAlign: 'center' }}>
                                {s.raceCount}
                            </span>
                            <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap', gap: 10 }}>
                                <TrophyIcon color="var(--gold-500)" size={15} weight="fill" />
                                <TeamBar color="var(--neutral-800)" height={22} />
                                <span style={{ fontSize: 14, fontWeight: 600 }}>{s.wdc.name}</span>
                            </div>
                            <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap', gap: 10 }}>
                                {s.wcc
                                    ? (
                                            <>
                                                <div style={{ background: 'var(--neutral-800)', borderRadius: 3, height: 14, width: 14 }} />
                                                <span style={{ fontSize: 14, fontWeight: 600 }}>{s.wcc.name}</span>
                                            </>
                                        )
                                    : <span style={{ color: 'var(--color-muted-foreground)', fontSize: 13 }}>—</span>}
                            </div>
                            <div>
                                <span style={{
                                    background: inProgress
                                        ? 'color-mix(in srgb, var(--green-500) 10%, transparent)'
                                        : 'var(--color-accent)',
                                    borderRadius: 4,
                                    color: inProgress ? 'var(--green-600)' : 'var(--color-muted-foreground)',
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: '0.5px',
                                    padding: '3px 7px',
                                }}
                                >
                                    {inProgress ? 'IN PROGRESS' : 'FINAL'}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
