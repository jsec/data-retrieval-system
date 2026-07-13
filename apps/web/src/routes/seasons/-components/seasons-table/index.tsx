import type { ListSeasonsResponse } from '@drs/contracts';

import { DataTable, useDataTable } from '#/components/data-table';

import { columns } from './columns';
import './seasons-table.css';

type Props = {
    seasons: ListSeasonsResponse;
};

export const SeasonsTable = ({ seasons }: Props) => {
    const { table } = useDataTable({ columns, data: seasons });

    return <DataTable table={table} />;
};
