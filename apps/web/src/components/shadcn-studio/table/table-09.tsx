import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const invoices = [
    {
        invoice: 'INV001',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
    },
    {
        invoice: 'INV002',
        paymentMethod: 'PayPal',
        paymentStatus: 'Pending',
        totalAmount: '$150.00',
    },
    {
        invoice: 'INV003',
        paymentMethod: 'Bank Transfer',
        paymentStatus: 'Unpaid',
        totalAmount: '$350.00',
    },
    {
        invoice: 'INV004',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        totalAmount: '$450.00',
    },
    {
        invoice: 'INV005',
        paymentMethod: 'PayPal',
        paymentStatus: 'Paid',
        totalAmount: '$550.00',
    },
    {
        invoice: 'INV006',
        paymentMethod: 'Bank Transfer',
        paymentStatus: 'Pending',
        totalAmount: '$200.00',
    },
    {
        invoice: 'INV007',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
    },
    {
        invoice: 'INV008',
        paymentMethod: 'Debit Card',
        paymentStatus: 'Paid',
        totalAmount: '$350.00',
    },
    {
        invoice: 'INV009',
        paymentMethod: 'Google Pay',
        paymentStatus: 'Pending',
        totalAmount: '$969.00',
    },
    {
        invoice: 'INV010',
        paymentMethod: 'Apple Pay',
        paymentStatus: 'Unpaid',
        totalAmount: '$815.00',
    },
];

const OverflowScrollTableDemo = () => {
    return (
        <div className="w-full">
            <div className="grid [&>div]:max-h-70 [&>div]:rounded-sm [&>div]:border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-25">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map(invoice => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <p className="text-muted-foreground mt-4 text-center text-sm">Overflow scroll table</p>
        </div>
    );
};

export default OverflowScrollTableDemo;
