'use client';
import { CreateGateSheet } from "@/components/gates/create-gate-sheet";
import { EntryGatesTable } from "@/components/gates/gates-table";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyValueSkeleton } from "@/components/ui/key-value-skeleton";
import { KeyValueView } from "@/components/ui/KeyValueView";
import { parkingApi } from "@/lib/api";
import { addClassWithCondition, formatDateToDDMMYYYY, mayNotSepcified, toDateValue } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Filter, Plus, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from "react";

export default () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['parking', id],
        queryFn: async () => {
            return parkingApi.getById(id);
        }
    });
    const [currentActiveTabValue, setCurrentActiveTabValue] = useState<'gates' | 'map'>('gates');
    const [isCreateGateSheetOpen, setIsCreateGateSheetOpen] = useState(false);
    console.log("Zoom factor:", data?.zoomFactor);
    return (
        <main className="p-6">
            <div className="flex justify-between">
                <PageHeader title="Parkings" subtitle="Manage your parking lots and spaces" className="mb-6" />
            </div>
            <div>
                <Card className={error ? 'bg-red-600/10' : ''}>
                    <CardHeader>
                        <CardTitle>Parking's Data </CardTitle>
                        <CardDescription>
                            Parking information and card details form.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={error ? 'border-red-600' : ''}>
                        <div className="grid grid-cols-3 gap-2">
                            {
                                (data && !isLoading && !error) && (
                                    <>
                                        <KeyValueView keyT="Identifier" value={data.id} />
                                        <KeyValueView keyT="Name" value={mayNotSepcified(data.name)} />
                                        <KeyValueView keyT="Total Capacity" value={mayNotSepcified(data.totalCapacity.toString())} />
                                        <KeyValueView keyT="Ocuppied Capacity" value={mayNotSepcified(data.currentOccupied.toString())} />
                                        <KeyValueView keyT="Country" value={mayNotSepcified(data.city.country.name)} />
                                        <KeyValueView keyT="City" value={mayNotSepcified(data.city.name)} />
                                        <KeyValueView keyT="Creation Date" value={toDateValue(data.createdAt, formatDateToDDMMYYYY)} />
                                    </>
                                )
                            }
                        </div>
                        {
                            isLoading && (
                                <KeyValueSkeleton className="w-full" />
                            )
                        }
                        {
                            error && <div className="h-24 flex items-center justify-center flex-col gap-4">
                                <p className="text-red-600/60">Error fetching parking data: {(error as any)?.message || 'Unknown error'}</p>
                                <Button variant="outline" onClick={() => refetch()} className="cursor-pointer hover:text-white">
                                    Retry
                                </Button>
                            </div>
                        }
                    </CardContent>
                </Card>
                <div className="flex gap-1 border-2 py-0.5 px-1 w-fit rounded-xl tabs mt-4">
                    <button className={`rounded-xl py-0.5 px-1 w-16 border-muted text-muted-foreground ${addClassWithCondition(!(currentActiveTabValue == 'gates'), 'hover:bg-primary/10')} cursor-pointer ${addClassWithCondition(currentActiveTabValue == 'gates', 'text-primary bg-primary/20')}`} onClick={() => { setCurrentActiveTabValue('gates') }}> Gates </button>
                    <button className={`rounded-xl py-0.5 px-1 w-16 border-muted text-muted-foreground cursor-pointer ${addClassWithCondition(!(currentActiveTabValue == 'map'), 'hover:bg-primary/10')} ${addClassWithCondition(currentActiveTabValue == 'map', 'text-primary bg-primary/20')}`} onClick={() => { setCurrentActiveTabValue('map') }}> Map </button>
                </div>
                {
                    currentActiveTabValue === 'gates' ? (
                        <Card className="mt-2">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Parking's Entry Gates </CardTitle>
                                    <Button variant="outline" className="cursor-pointer hover:text-primary hover:border-primary" onClick={() => setIsCreateGateSheetOpen(true)}>
                                        <Plus fontWeight={900} style={{ fontWeight: 900 }} />
                                    </Button>
                                </div>
                                <CardDescription>
                                    Entry gates associated with this parking.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <EntryGatesTable id={id} onViewRequest={(row) => {
                                    console.log("View requested for", row.id);
                                }} />
                            </CardContent>
                        </Card>

                    ) : (
                        <Card className="mt-2">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Parking's position </CardTitle>
                                </div>
                                <CardDescription>
                                    Map view.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {
                                    data && !isLoading && !error && (
                                        <MapContainer style={{ height: '400px' }} center={[data.latitude, data.longitude]} zoom={7} scrollWheelZoom={true}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[data.latitude, data.longitude]}>
                                                <Popup>
                                                    <div>
                                                        <p className="text-sm font-semibold">{data.name}</p>
                                                        <p className="text-xs text-muted-foreground">City: {data.city.name}</p>
                                                        <p className="text-xs text-muted-foreground">Country: {data.city.country.name}</p>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    )
                                }
                            </CardContent>
                        </Card>
                    )
                }
            </div>
            {
                data ? <CreateGateSheet open={isCreateGateSheetOpen} onOpenChange={setIsCreateGateSheetOpen} parking={{ id: data.id, name: data.name, cityName: data.city.name, countryName: data.city.country.name }} /> :
                    <CreateGateSheet open={isCreateGateSheetOpen} onOpenChange={setIsCreateGateSheetOpen} />
            }
        </main>)
}