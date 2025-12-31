import { countryApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { HeadingColumns, TableWrapper } from "../ui/defined-components/table-wrapper";

export const CountriesTable = () => {

    const countiesHeaders: HeadingColumns = [
        {name: 'Name', keyAccessor: 'name', uniqueKey: 'name'},
        {name: 'Code', keyAccessor: 'isoCode', uniqueKey: 'isoCode'},
        {
            name: 'Creatation Date', keyAccessor: 'createdAt',
            rander: (value: string, row: any) => {
                const date = new Date(value);
                return date.toLocaleDateString();
            },
            uniqueKey: 'creationDate'
        },
        {
            name: 'Creatation Time', keyAccessor: 'createdAt',
            rander: (value: string) => {
                const date = new Date(value);
                return date.toLocaleTimeString();
            },
            uniqueKey: 'creationTime'
        }
    ]

    const {data, error: e} = useQuery({
        queryKey: ['parkings', {page: 0, size: 10}],
        queryFn:  () => countryApi.getAll({page: 0, size: 20})
    });

    return (
        <div>
            {
                data && <TableWrapper data={data?.content} headingColumns={countiesHeaders}/>
            }
        </div>
    )
}