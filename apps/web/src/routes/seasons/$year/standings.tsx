import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

import { Pill, TeamBar } from '#/components/f1-ui';
import { TOTAL_ROUNDS } from '#/data/fixtures';
import { standingsQuery } from '#/data/queries';

export const Route = createFileRoute('/seasons/$year/standings')({
    component: Standings,
    loader: async ({ context, params }) => {
        await context.queryClient.ensureQueryData(standingsQuery(Number(params.year)));
        return {
            crumbs: [
                { label: params.year, params: { year: params.year }, to: '/seasons/$year' },
                { label: 'Standings' },
            ],
        };
    },
});

const COLS = '46px 1fr 130px 70px 80px 80px 80px';

const HEADER_STYLE: React.CSSProperties = {
    background: 'var(--color-accent)',
    color: 'var(--color-muted-foreground)',
    display: 'grid',
    fontSize: 10.5,
    fontWeight: 700,
    gridTemplateColumns: COLS,
    letterSpacing: '0.5px',
    padding: '13px 20px',
    textTransform: 'uppercase',
};

function Standings() {
    const { year } = Route.useParams();
    const { data } = useSuspenseQuery(standingsQuery(Number(year)));
    const [tab, setTab] = useState<'constructors' | 'drivers'>('drivers');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
                <h1 className="f1-display" style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                    Championship Standings
                </h1>
                <div style={{ color: 'var(--color-muted-foreground)', fontSize: 13, marginTop: 4 }}>
                    {`After Round ${data.completed} of ${TOTAL_ROUNDS} · ${year} season`}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
                <Pill active={tab === 'drivers'} onClick={() => setTab('drivers')}>Drivers</Pill>
                <Pill active={tab === 'constructors'} onClick={() => setTab('constructors')}>Constructors</Pill>
            </div>

            {tab === 'drivers'
                ? (
                        <div className="f1-card" style={{ overflow: 'hidden', padding: 0 }}>
                            <div style={HEADER_STYLE}>
                                <span>POS</span>
                                <span>DRIVER</span>
                                <span>TEAM</span>
                                <span style={{ textAlign: 'center' }}>WINS</span>
                                <span style={{ textAlign: 'center' }}>PODIUMS</span>
                                <span style={{ textAlign: 'center' }}>POLES</span>
                                <span style={{ textAlign: 'right' }}>PTS</span>
                            </div>
                            {data.drivers.map((d, i) => (
                                <Link
                                    className="f1-row"
                                    key={d.code}
                                    params={{ driverId: d.code, year }}
                                    style={{
                                        alignItems: 'center',
                                        borderTop: '1px solid var(--color-border)',
                                        color: 'inherit',
                                        display: 'grid',
                                        gridTemplateColumns: COLS,
                                        padding: '11px 20px',
                                        textDecoration: 'none',
                                    }}
                                    to="/seasons/$year/drivers/$driverId"
                                >
                                    <span className="f1-num" style={{ color: 'var(--color-muted-foreground)', fontWeight: 700 }}>{i + 1}</span>
                                    <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap', gap: 11 }}>
                                        <TeamBar color={d.color} height={24} />
                                        <span style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap' }}>{d.name}</span>
                                        <span style={{ color: 'var(--color-muted-foreground)', fontSize: 11, fontWeight: 700 }}>{d.code}</span>
                                    </div>
                                    <span style={{ color: 'var(--color-muted-foreground)', fontSize: 12.5 }}>{d.teamName}</span>
                                    <span className="f1-num" style={{ textAlign: 'center' }}>{d.wins}</span>
                                    <span className="f1-num" style={{ textAlign: 'center' }}>{d.podiums}</span>
                                    <span className="f1-num" style={{ textAlign: 'center' }}>{d.poles}</span>
                                    <span className="f1-num f1-display" style={{ fontWeight: 700, textAlign: 'right' }}>{d.points}</span>
                                </Link>
                            ))}
                        </div>
                    )
                : (
                        <div className="f1-card" style={{ padding: 16 }}>
                            {data.constructors.map(c => (
                                <div
                                    key={c.key}
                                    style={{
                                        alignItems: 'center',
                                        borderTop: '1px solid var(--color-border)',
                                        display: 'flex',
                                        flexWrap: 'nowrap',
                                        gap: 16,
                                        padding: '11px 0',
                                    }}
                                >
                                    <span className="f1-num" style={{ color: 'var(--color-muted-foreground)', fontWeight: 700, width: 26 }}>{c.pos}</span>
                                    <div style={{ background: c.color, borderRadius: 3, flexShrink: 0, height: 30, width: 10 }} />
                                    <span style={{ fontSize: 14, fontWeight: 700, width: 160 }}>{c.name}</span>
                                    <div style={{ background: 'var(--color-border)', borderRadius: 9999, flex: 1, height: 9, overflow: 'hidden' }}>
                                        <div style={{ background: c.color, borderRadius: 9999, height: '100%', width: `${(c.points / data.maxConstructor) * 100}%` }} />
                                    </div>
                                    <span className="f1-num f1-display" style={{ fontSize: 15, fontWeight: 700, textAlign: 'right', width: 60 }}>{c.points}</span>
                                </div>
                            ))}
                        </div>
                    )}
        </div>
    );
}
