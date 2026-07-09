import type { ListSeasonsResponse } from '@drs/contracts';

import { useReactTable } from '@tanstack/react-table';

import { DataTable } from '#/components/data-table';

import type { Season } from './columns';

import { columns, rowModel } from './columns';

type Props = {
    seasons: ListSeasonsResponse;
};

const getSeasonLink = (s: Season) => {
    return {
        params: {
            year: String(s.season),
        },
        to: '/seasons/$year',
    } as const;
};

export const SeasonsTable = ({ seasons }: Props) => {
    const table = useReactTable({
        columns,
        data: seasons,
        getCoreRowModel: rowModel,
    });

    return (
        <DataTable rowLink={getSeasonLink} table={table} />
    );
};
