'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { Skeleton } from "@/components/ui/skeleton";
import { countryApi } from "@/lib/api";
import { CountryResponse } from "@/lib/types";
import 'leaflet/dist/leaflet.css';
import { formatDateToDDMMYYYY, objectsDifferenceCallculator, removeUndefined, toDateValue, zodErrorToString } from "@/lib/utils";
import { updateCountryValidator } from "@/lib/validators";
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
     * initial fetch country data
     */
    const { data, error, isLoading } = useQuery({
        queryKey: ['country', id],
        queryFn: async () => {
            const response = await countryApi.getById(id);
            setLatestFetchedData(response); // set the latest fetched data
            setCountryData(response); // set the country data
            if(!response) {
                throw new Error(`Country not found with id ${id}`);
            }
            return response;
        },
    });

    /**
     * Country update data
     */
    const [countryData, setCountryData] = useState<CountryResponse | null>(data ?? null);
    const [latestFetchedData, setLatestFetchedData] = useState<CountryResponse | null>(data ?? null);

    /**
     * @returns difference between latest version server synchronized and latest updated local version
     */
    const verifieDataChanged = () => {
        return countryData?.name !== latestFetchedData?.name ||
               countryData?.isoCode !== latestFetchedData?.isoCode ||
               countryData?.latitude !== latestFetchedData?.latitude ||
               countryData?.longitude !== latestFetchedData?.longitude ||
               countryData?.zoomFactor !== latestFetchedData?.zoomFactor;
    }

    /**
     * 
     * @returns the new object to send to server for update (difference only)  
     */
    const newObject = () => {
        const newObjct = objectsDifferenceCallculator(latestFetchedData, countryData);
        const validationResult = updateCountryValidator.safeParse(removeUndefined(newObjct));
        if (!validationResult.success) {
            validationResult.error;
            console.error(zodErrorToString(validationResult.error));
            toast.error(zodErrorToString(validationResult.error));
            return;
        }
        return validationResult.data;
    }

    /**
     * Country modification mutation
     */
    const {isPending, mutate: countryUpdater} = useMutation({ 
        mutationFn: async () => {
            const updatedData = newObject();
            if(!updatedData || Object.keys(updatedData || {}).length === 0)  {
                throw new Error("No changes detected to update.");
            }            
            return countryApi.update(id, updatedData); 
        },
        onSuccess: (data) => { 
            toast.success("Country updated successfully.", { duration: 7000 });
            setCountryData(data);
            setLatestFetchedData(data);
            queryClient.invalidateQueries({ queryKey: ['countries'] });
        },
        onError: (error: any) => { 
            toast.error(`Error updating country: ${error?.message || 'Unknown error'}`, { duration: 7000 });
        }
    });

    /**
     *  Partial country data to update the countryData state
     */
    const updateFieldOfCountryData = (value: Partial<CountryResponse>) => {
        setCountryData((prev) => ({
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
                        <PageHeader title="Country" subtitle="Country details here" />
                    ):  <PageHeader title="Country" subtitle="Country details here"
                     actions={[
                        <Button key="reset" className="cursor-pointer hover:text-primary" variant="outline" onClick={() => {
                            /**
                             * Reset country edit form data
                             */
                            setCountryData(data ?? null);
                        }}>
                            <X />
                        </Button>,
                        <Button key="save" className="cursor-pointer hover:text-primary" disabled={isPending} variant="outline" onClick={() => {
                            countryUpdater();
                        }}> 
                        {isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    ]} />

                    }
            </div>
            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Country's Data </CardTitle>
                        <CardDescription>
                            Country's information and card details form.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            !isLoading && !error && data && (
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ComposeInput readOnly label="Identifier" value={data.id} />
                                        <ComposeInput label="Name" value={countryData?.name ?? ''} onChange={(e) => updateFieldOfCountryData({name: e.currentTarget.value})} />
                                        <ComposeInput label="ISO Code" value={countryData?.isoCode ?? ''} onChange={(e) => updateFieldOfCountryData({isoCode: e.currentTarget.value})} />
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
                        <CardTitle>Country's Position</CardTitle>
                        <CardDescription>
                            Poistion's Map.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {(countryData?.longitude && countryData?.latitude && countryData.zoomFactor) && (
                            <MapContainer className='h-100' center={[countryData?.latitude, countryData?.longitude]} zoom={countryData?.zoomFactor} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                
                                <Marker position={[countryData?.latitude, countryData?.longitude]}>
                                    <Popup>
                                        <p>
                                            Latitude: {countryData?.latitude}
                                        </p>
                                        <p>
                                            Longitude: {countryData?.longitude}
                                        </p>
                                        <p>
                                            Zoom Factor: {countryData?.zoomFactor}
                                        </p>
                                    </Popup>
                                </Marker>
                                <MoveMapChange  center={[countryData?.latitude, countryData?.longitude]} zoom={countryData?.zoomFactor} onZoomChanged={(newZoom) => { 
                                    updateFieldOfCountryData({ zoomFactor: newZoom });
                                }}
                                onLongLatChanged={(newCenter) => {
                                    updateFieldOfCountryData({
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

                {/* <div className="actions flex mt-4 gap-1 justify-end">
                    <Button className="" disabled={isPending} onClick={handleSubmit(onSubmit)}>Save Changes</Button>
                    <Button variant="outline" className="ml-2 hover:text-gray-700" onClick={() => { reset({
                        name: data?.client?.name || '',
                        lastName: data?.client?.lastName || '',
                        email: data?.client?.email || '',
                        phone: data?.client?.phone || '',
                        creditBalance: data?.creditBalance || 0,
                        issuedAt: browserFromatDate(new Date(data?.issuedAt || '')) || browserFormattedNow,
                        expiredAt: browserFromatDate(new Date(data?.expiresAt || '')) || browserFormattedExpiration
                    }) }}>Clear</Button>
                </div> */}
            </div>
        </main>
    )
}