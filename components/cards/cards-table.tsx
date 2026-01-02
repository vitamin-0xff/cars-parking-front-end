import { cardApi, cityApi, countryApi } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { HeadingColumns, TableWrapper } from "../ui/defined-components/table-wrapper";
import { CardResponse, CityResponse } from "@/lib/types";
import { Pagination } from "../ui/pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CardsTable = () => {

    const navigator = useRouter();

    const countiesHeaders: HeadingColumns<CardResponse> = [
        {name: 'Number', keyAccessor: 'cardNumber', uniqueKey: 'cardNumber'},
        {name: 'Credits', keyAccessor: 'creditBalance', uniqueKey: 'creditBalance'},
        {name: 'Client', keyAccessor: 'client', uniqueKey: 'clientFullName',
            render: (value: {fullName?: string}) =>{
                return value?.fullName ?? 'N/A'; 
            }
        },
        {name: 'Client Email', keyAccessor: 'client', uniqueKey: 'clientEmail',
            render: (value: {email: string}) => {
                return value?.email ?? 'N/A'; 
            }
        },
        {name: 'Client Number', keyAccessor: 'client', uniqueKey: 'clientNumber',
            render: (value: {phone?: string}) => {
                return value?.phone ?? 'N/A'; 
            }
        },
        {name: 'Card Status', keyAccessor: 'status', uniqueKey: 'status',
            render: (value: string) => {
                return (
                    <div className="underline cursor-pointer hover:text-muted-foreground" onClick={() => navigator.replace(`/countries`) }>
                        {value}
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
        queryKey: ['cards', tableStatus],
        queryFn:  () => cardApi.getAll(tableStatus),
        placeholderData: keepPreviousData
    });

    return (
        <div>
            {
                data && <TableWrapper onRowClicked={(row) => console.log(row)} data={data.content} headingColumns={countiesHeaders} onViewClicked={(row) => {
                    navigator.push(`/cards/${row.id}`);
                }}/>
            }
            {
                data && <Pagination totalPages={data.totalPages} currentPage={data.totalPages > 0 ? data.number + 1 : data.number} onPageChange={(newPage) => setTableStatus((p) => {return {...p, page: newPage - 1}})} />
            }
        </div>
    )
}