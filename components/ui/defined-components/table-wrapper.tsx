import { Eye, Trash, TrashIcon, View } from "lucide-react";
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

export function TableWrapper<T>({headingColumns, data, className, onRowClicked, onDeleteClicked, onViewClicked}: {onDeleteClicked?:(row: T) => void, onViewClicked?: (row: T) => void, onRowClicked?: OnRowClicked<T>, className?: string , headingColumns: HeadingColumns<T>, data: T[]}){
    const isActionSet = onDeleteClicked || onViewClicked;

    return (
        <Table className={className}>
            <TableHeader>
                <TableRow>
                    {
                        headingColumns.map((col) => (
                            <TableHead className="text-muted-foreground" key={col.uniqueKey}>{col.name}</TableHead>
                        ))
                    }
                    {isActionSet && <TableHead className="text-muted-foreground">Actions</TableHead>}
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
                    {isActionSet && (
                        <td>
                            <div className="flex items-center gap-2">
                            {onViewClicked && <button onClick={(e) => {e.stopPropagation(); onViewClicked(row)}} className="border-2 p-1 rounded hover:bg-gray-800">
                                <Eye size={24} color="gray"/>    
                            </button>}
                            {onDeleteClicked && <button onClick={(e) => {e.stopPropagation(); onDeleteClicked(row)}} className="border-2 p-1 rounded hover:bg-gray-800 text-red-500 hover:underline">
                                <TrashIcon size={24}/> 
                            </button>}
                            </div>
                        </td>
                    )}
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