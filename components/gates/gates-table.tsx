import { EntryGateResponse } from "@/lib/types";
import { HeadingColumns, TableWrapper } from "../ui/defined-components/table-wrapper";
import { useQuery } from "@tanstack/react-query";
import { entryGateApi } from "@/lib/api";

export const EntryGatesTable = ({ className, id, onViewRequest }: {
    className?: string,
    id?: string,
    onViewRequest?: (row: EntryGateResponse) => void;
}) => {

    const countiesHeaders: HeadingColumns<EntryGateResponse> = [
        { name: 'Identifier', keyAccessor: 'id', uniqueKey: 'id' },
        { name: 'Name', keyAccessor: 'name', uniqueKey: 'name' },
        { name: 'Direction', keyAccessor: 'direction', uniqueKey: 'direction' },
        { name: 'Hardware Topic', keyAccessor: 'hardwareId', uniqueKey: 'hardwareId' },
    ]
    const depdendenciesArray: any = ['gates', { page: 0, size: 10 }]
    if (id) {
        depdendenciesArray.push({
            parkingId: id,
        });
    }
    const { data, error: e } = useQuery({
        queryKey: depdendenciesArray,
        queryFn: () => !id ? entryGateApi.getAll({ page: 0, size: 20 }) : entryGateApi.getByParkingId(id, { page: 0, size: 20 }),
    });
    return (
        <div className={'' + className}>
            <TableWrapper data={data ? data.content : []} headingColumns={countiesHeaders} onViewClicked={onViewRequest} />
        </div>
    )
}