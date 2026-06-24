import type { ReactNode } from 'react';

import { Box, Card, Group, Text, UnstyledButton } from '@mantine/core';
import { TrophyIcon } from '@phosphor-icons/react';

export const GOLD = '#c79100';

export function DriverAvatar({
    code,
    color,
    size = 30,
}: {
    code: string;
    color: string;
    size?: number;
}) {
    return (
        <Box
            style={{
                alignItems: 'center',
                background: color,
                borderRadius: '50%',
                color: '#fff',
                display: 'flex',
                flexShrink: 0,
                fontSize: size * 0.36,
                fontWeight: 800,
                height: size,
                justifyContent: 'center',
                width: size,
            }}
        >
            {code}
        </Box>
    );
}

export function GridHeader({
    children,
    columns,
}: {
    children: ReactNode;
    columns: string;
}) {
    return (
        <Box
            c="dimmed"
            style={{
                display: 'grid',
                fontSize: 10.5,
                fontWeight: 700,
                gridTemplateColumns: columns,
                letterSpacing: '0.5px',
                padding: '0 18px 8px',
            }}
        >
            {children}
        </Box>
    );
}

export function MiniStat({ label, value }: { label: string; value: ReactNode }) {
    return (
        <Card padding="md" radius="md" ta="center" withBorder>
            <Text className="f1-num" fw={800} style={{ fontSize: 24, letterSpacing: '-0.4px' }}>
                {value}
            </Text>
            <Text c="dimmed" fw={600} mt={2} style={{ fontSize: 11 }}>
                {label}
            </Text>
        </Card>
    );
}

export function Pill({
    active,
    children,
    onClick,
    variant = 'solid',
}: {
    active: boolean;
    children: ReactNode;
    onClick: () => void;
    variant?: 'solid' | 'subtle';
}) {
    const solid = variant === 'solid';
    return (
        <UnstyledButton
            onClick={onClick}
            style={{
                background: active
                    ? (solid
                            ? 'var(--mantine-color-gray-9)'
                            : 'var(--mantine-color-blue-0)')
                    : (solid
                            ? 'var(--mantine-color-body)'
                            : 'transparent'),
                border: solid
                    ? `1px solid ${active ? 'var(--mantine-color-gray-9)' : 'var(--mantine-color-default-border)'}`
                    : 'none',
                borderRadius: solid ? 8 : 7,
                color: active
                    ? (solid
                            ? '#fff'
                            : 'var(--mantine-color-blue-7)')
                    : 'var(--mantine-color-dimmed)',
                fontSize: solid ? 13 : 12,
                fontWeight: 600,
                padding: solid ? '8px 18px' : '6px 11px',
            }}
        >
            {children}
        </UnstyledButton>
    );
}

export function SectionCard({
    action,
    children,
    padded = true,
    subtitle,
    title,
}: {
    action?: ReactNode;
    children: ReactNode;
    padded?: boolean;
    subtitle?: string;
    title: string;
}) {
    return (
        <Card padding={0} radius="md" withBorder>
            <Group align="flex-start" justify="space-between" px={18} py={15} wrap="nowrap">
                <Box>
                    <Text fw={700} style={{ fontSize: 15 }}>
                        {title}
                    </Text>
                    {subtitle
                        ? (
                                <Text c="dimmed" mt={2} size="xs">
                                    {subtitle}
                                </Text>
                            )
                        : null}
                </Box>
                {action}
            </Group>
            <Box pb={padded ? 18 : 0} px={padded ? 18 : 0}>
                {children}
            </Box>
        </Card>
    );
}

export function StatCard({
    accent,
    icon,
    label,
    sub,
    value,
}: {
    accent: string;
    icon: ReactNode;
    label: string;
    sub: string;
    value: ReactNode;
}) {
    return (
        <Card padding="md" radius="md" withBorder>
            <Group gap={8} wrap="nowrap">
                <Box c={accent} style={{ display: 'flex', fontSize: 15 }}>
                    {icon}
                </Box>
                <Text c="dimmed" fw={600} size="xs" tt="uppercase">
                    {label}
                </Text>
            </Group>
            <Text className="f1-num" fw={800} mt={9} style={{ fontSize: 23, letterSpacing: '-0.4px' }}>
                {value}
            </Text>
            <Text c="dimmed" mt={2} size="xs">
                {sub}
            </Text>
        </Card>
    );
}

export function TeamBar({
    color,
    height = 26,
    width = 4,
}: {
    color: string;
    height?: number;
    width?: number;
}) {
    return (
        <Box
            style={{
                background: color,
                borderRadius: width,
                flexShrink: 0,
                height,
                width,
            }}
        />
    );
}

export function TrophyCount({ count, size = 12 }: { count: number; size?: number }) {
    if (count <= 0) return null;
    return (
        <Group gap={3} style={{ color: GOLD, fontSize: size + 1, fontWeight: 800 }} wrap="nowrap">
            <TrophyIcon size={size} weight="fill" />
            {count}
        </Group>
    );
}
