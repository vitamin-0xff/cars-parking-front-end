import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../table";

export type HeaderColumn<T> = {
    name: string;
    keyAccessor: string;
    sortable?: boolean;
    uniqueKey: string;
    rander?: (value: any, row?: T) => React.ReactNode;
}

type OnRowClicked<T> = (row: T) => void;

export type HeadingColumns<T> = HeaderColumn<T>[];

export function TableWrapper<T>({headingColumns, data, className, onRowClicked}: {onRowClicked?: OnRowClicked<T>, className?: string , headingColumns: HeadingColumns<T>, data: T[]}){
    return (
        <Table className={className}>
            <TableHeader>
                <TableRow>
                    {
                        headingColumns.map((col) => (
                            <TableHead className="text-muted-foreground" key={col.uniqueKey}>{col.name}</TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                data.length === 0 && 
                <TableRow>
                    <TableCell colSpan={headingColumns.length} className="text-cente h-24">
                        No data available.
                    </TableCell>
                </TableRow>
            }
            {data.map((row, index) => 
                <TableRow onClick={() => {onRowClicked?.(row)}} key={index}>
                    {
                        headingColumns.map((col) => (
                            <TableCell className="py-5" key={col.uniqueKey}>
                                {/* @ts-ignore */}
                                {col.rander ? col.rander(row[col.keyAccessor], row) : row[col.keyAccessor]}
                            </TableCell>
                        ))
                    }
                </TableRow>
            )
            }
            </TableBody>
        </Table>
    )
}


type Column<T> = {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, row?: T) => React.ReactNode;
}