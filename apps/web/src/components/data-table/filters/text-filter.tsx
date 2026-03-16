import type { Table } from '@tanstack/react-table';

import { useDebounce } from '@/hooks/use-debounce';

type Props = {
    columnName: string;
    table: Table<unknown>;
};

export const TextFilter = ({ columnName, table }: Readonly<Props>) => {
    const [inputValue, setInputValue] = useDebounce('', (v) => {
        table.getColumn(columnName)?.setFilterValue(v);
    });

    return (
        <input
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
        />
    );
};
