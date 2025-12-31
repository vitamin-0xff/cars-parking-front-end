import { parkingApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query";

export const ParkingTable = (className: {className?: string}) => {

    const {data, error: e} = useQuery({
        queryKey: ['parkings', {page: 0, size: 10}],
        queryFn:  () => parkingApi.getAll({page: 0, size: 20})
    });
    return (
        <div className={'' + className}>
        {e && <div className="text-red-500">Error: {e.message}</div>}
        {
            e == null && data && data.content.map((parking) => (
                <div key={parking.id} className="p-4 border-b">
                    <h2 className="text-lg font-semibold">{parking.name}</h2>
                    <p className="text-sm text-muted-foreground">{parking.place.id}</p>
                    <p className="text-sm">Status: {parking.status}</p>
                </div>
            ))
        }
        {
             e == null && data && data.content.length === 0 && <div>No parking data available.</div>

        }
        </div>
    )
}