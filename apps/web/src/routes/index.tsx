import { createFileRoute, redirect } from '@tanstack/react-router';

import { CURRENT_YEAR } from '#/data/fixtures';

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        throw redirect({
            params: { year: String(CURRENT_YEAR) },
            to: '/seasons/$year',
        });
    },
});
