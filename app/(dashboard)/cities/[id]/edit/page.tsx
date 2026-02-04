'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { Skeleton } from "@/components/ui/skeleton";
import { cityApi } from "@/lib/api";
import { CityResponse } from "@/lib/types";
import 'leaflet/dist/leaflet.css';
import { formatDateToDDMMYYYY, objectsDifferenceCallculator, removeUndefined, toDateValue, zodErrorToString } from "@/lib/utils";
import { updateCityValidator } from "@/lib/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { MoveMap } from "@/app/(dashboard)/cities/new/page";
import { ComposeInput } from "@/components/ui/defined-components/compose-input";


type Props = {
    center: [number, number];
    zoom: number;
    onZoomChanged?: (newZoom: number) => void;
    // executed on click
    onLongLatChanged?: (newCenter: [number, number]) => void;
};

function MoveMapChange({ onZoomChanged, onLongLatChanged }: Props) {
    const map = useMap();
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            if (onLongLatChanged) {
                onLongLatChanged([lat, lng]);
            }
        },
        zoomend: () => {
            console.log("Zoom changed to " + map.getZoom());
            if (onZoomChanged) {
                onZoomChanged(map.getZoom());
            }
        }
    });
    // map.setView(center, zoom);
    return null;
}



export default () => {
    const navigator = useRouter();
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();

    /**
     * initial fetch city data
     */
    const { data, error, isLoading } = useQuery({
        queryKey: ['city', id],
        queryFn: async () => {
            const response = await cityApi.getById(id);
            setLatestFetchedData(response); // set the latest fetched data
            setCityData(response); // set the city data
            if(!response) {
                throw new Error(`City not found with id ${id}`);
            }
            return response;
        },
    });

    /**
     * City update data
     */
    const [cityData, setCityData] = useState<CityResponse | null>(data ?? null);
    const [latestFetchedData, setLatestFetchedData] = useState<CityResponse | null>(data ?? null);

    /**
     * @returns difference between latest version server synchronized and latest updated local version
     */
    const verifieDataChanged = () => {
        return cityData?.name !== latestFetchedData?.name ||
               cityData?.stateCode !== latestFetchedData?.stateCode ||
               cityData?.latitude !== latestFetchedData?.latitude ||
               cityData?.longitude !== latestFetchedData?.longitude ||
               cityData?.zoomFactor !== latestFetchedData?.zoomFactor;
    }

    /**
     * 
     * @returns the new object to send to server for update (difference only)  
     */
    const newObject = () => {
        const newObjct = objectsDifferenceCallculator(latestFetchedData, cityData);
        const validationResult = updateCityValidator.safeParse(removeUndefined(newObjct));
        if (!validationResult.success) {
            validationResult.error;
            console.error(zodErrorToString(validationResult.error));
            toast.error(zodErrorToString(validationResult.error));
            return;
        }
        return validationResult.data;
    }

    /**
     * City modification mutation
     */
    const {isPending, mutate: cityUpdater} = useMutation({ 
        mutationFn: async () => {
            const updatedData = newObject();
            if(!updatedData || Object.keys(updatedData || {}).length === 0)  {
                throw new Error("No changes detected to update.");
            }            
            return cityApi.update(id, updatedData); 
        },
        onSuccess: (data) => { 
            toast.success("City updated successfully.", { duration: 7000 });
            setCityData(data);
            setLatestFetchedData(data);
            queryClient.invalidateQueries({ queryKey: ['countries'] });
        },
        onError: (error: any) => { 
            toast.error(`Error updating city: ${error?.message || 'Unknown error'}`, { duration: 7000 });
        }
    });

    /**
     *  Partial city data to update the cityData state
     */
    const updateFieldOfCityData = (value: Partial<CityResponse>) => {
        setCityData((prev) => ({
            ...prev!,
            ...value
        }));
    }


    return (
        <main className="p-6">
            <div className="flex flex-col gap-2 w-full">
                <div>
                    <Button variant="outline" onClick={() => navigator.back()}>
                        <ArrowLeft />
                        <p>Back</p>
                    </Button>
                </div>
                {
                    !verifieDataChanged() ? (
                        <PageHeader title="City" subtitle="City details here" />
                    ):  <PageHeader title="City" subtitle="City details here"
                     actions={[
                        <Button key="reset" className="cursor-pointer hover:text-primary" variant="outline" onClick={() => {
                            /**
                             * Reset city edit form data
                             */
                            setCityData(data ?? null);
                        }}>
                            <X />
                        </Button>,
                        <Button key="save" className="cursor-pointer hover:text-primary" disabled={isPending} variant="outline" onClick={() => {
                            cityUpdater();
                        }}> 
                        {isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    ]} />

                    }
            </div>
            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>City's Data </CardTitle>
                        <CardDescription>
                            City's information and card details form.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            !isLoading && !error && data && (
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ComposeInput readOnly label="Identifier" value={data.id} />
                                        <ComposeInput label="Name" value={cityData?.name ?? ''} onChange={(e) => updateFieldOfCityData({name: e.currentTarget.value})} />
                                        <ComposeInput label="State Code" value={cityData?.stateCode ?? ''} onChange={(e) => updateFieldOfCityData({stateCode: e.currentTarget.value})} />
                                        <ComposeInput readOnly label="Creation Date" value={toDateValue(data.createdAt, formatDateToDDMMYYYY)} />
                                    </div>
                                </div>
                            )
                        }
                        {
                            error && <div className="h-24 flex items-center justify-center">
                                <p className="text-red-600">Error fetching client data: {(error as any)?.message || 'Unknown error'}</p>
                            </div>
                        }
                        {
                            isLoading && <Skeleton className="w-full h-36" />
                        }
                    </CardContent>
                </Card>

                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>City's Position</CardTitle>
                        <CardDescription>
                            Poistion's Map.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {(cityData?.longitude && cityData?.latitude && cityData.zoomFactor) && (
                            <MapContainer className='h-100' center={[cityData?.latitude, cityData?.longitude]} zoom={cityData?.zoomFactor} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                
                                <Marker position={[cityData?.latitude ?? 0, cityData?.longitude ?? 0]}>
                                    <Popup>
                                        <p>
                                            Latitude: {cityData?.latitude}
                                        </p>
                                        <p>
                                            Longitude: {cityData?.longitude}
                                        </p>
                                        <p>
                                            Zoom Factor: {cityData?.zoomFactor}
                                        </p>
                                    </Popup>
                                </Marker>
                                <MoveMapChange  center={[cityData?.latitude, cityData?.longitude]} zoom={cityData?.zoomFactor} onZoomChanged={(newZoom) => { 
                                    updateFieldOfCityData({ zoomFactor: newZoom });
                                }}
                                onLongLatChanged={(newCenter) => {
                                    updateFieldOfCityData({
                                      latitude: newCenter[0],
                                      longitude: newCenter[1]
                                    });
                                }}
                                />
                            </MapContainer>
                        )
                        }
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}