import { parkingApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query";
import { HeadingColumns, TableWrapper } from "../ui/defined-components/table-wrapper";
import { ParkingResponse, ParkingStatus } from "@/lib/types";
import { Chip } from "../ui/chip";
import { Table } from "lucide-react";
import { useRouter } from "next/navigation";

export const ParkingTable = (className: {className?: string}) => {

    const countiesHeaders: HeadingColumns<ParkingResponse> = [
        {name: 'Identifier', keyAccessor: 'id', uniqueKey: 'id'},
        {name: 'Name', keyAccessor: 'name', uniqueKey: 'name'},
        {name: 'Capacity', keyAccessor: 'totalCapacity', uniqueKey: 'capacity'},
        {name: 'Occupied Now', keyAccessor: 'currentOccupied', uniqueKey: 'occupiedNow'},
        {
            name: 'Status', keyAccessor: 'status', uniqueKey: 'status',
            render: (value: ParkingStatus) => {
                return (
                    <Chip label={value} variant={value == ParkingStatus.OPEN ? 'success' : 'default'} />
                )
            }
        },
        {
            name: 'Creatation Date', keyAccessor: 'createdAt',
            render: (value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString();
            },
            uniqueKey: 'creationDate'
        },
        {
            name: 'Creatation Time', keyAccessor: 'createdAt',
            render: (value: string) => {
                const date = new Date(value);
                return date.toLocaleTimeString();
            },
            uniqueKey: 'creationTime'
        }
    ]

    const {data, error: e} = useQuery({
        queryKey: ['parkings', {page: 0, size: 10}],
        queryFn:  () => parkingApi.getAll({page: 0, size: 20})
    });

    const navigator = useRouter();

    return (
        <div className={'' + className}>
            <TableWrapper data={data ? data.content : []} headingColumns={countiesHeaders} onViewClicked={(row) => navigator.push(`/parkings/${row.id}`) } />
        </div>
    )
}