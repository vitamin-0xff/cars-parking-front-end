import { cityApi, countryApi } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { HeadingColumns, TableWrapper } from "../ui/defined-components/table-wrapper";
import { CityResponse } from "@/lib/types";
import { Pagination } from "../ui/pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CitiesTable = () => {

    const navigator = useRouter();

    const countiesHeaders: HeadingColumns<CityResponse> = [
        {name: 'Name', keyAccessor: 'name', uniqueKey: 'name'},
        {name: 'State Code', keyAccessor: 'stateCode', uniqueKey: 'stateCode'},
        {name: 'Country', keyAccessor: 'country', uniqueKey: 'country',
            render: (value: {name: string, id: string}) => {
                return (
                    <div className="underline cursor-pointer hover:text-muted-foreground" onClick={() => navigator.replace(`/countries`) }>
                        {value?.name ?? 'N/A'}
                    </div>
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

    const [tableStatus, setTableStatus] = useState<{page: number, size: number}>({page: 0, size: 10});

    const {data, error: e} = useQuery({
        queryKey: ['cities', tableStatus],
        queryFn:  () => cityApi.getAll(tableStatus),
        placeholderData: keepPreviousData
    });

    return (
        <div>
            {
                data && <TableWrapper onRowClicked={(row) => console.log(row)} data={data.content} headingColumns={countiesHeaders} onViewClicked={(row) => {console.log("View Request " + row.id)}}/>
            }
            {
                data && <Pagination totalPages={data.totalPages} currentPage={data.number + 1} onPageChange={(newPage) => setTableStatus((p) => {return {...p, page: newPage - 1}})} />
            }
        </div>
    )
}