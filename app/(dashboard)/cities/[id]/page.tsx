'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cityApi, countryApi, creditSupplingApi } from "@/lib/api";
import { CardCreateV1, CreditSource, CreditStatus, UUID } from "@/lib/types";
import { browserFromatDate, currencies, formatDateToDDMMYYYY, toDateValue } from "@/lib/utils";
import { CardCreateInput, cardCreateValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { KeyValueView } from "@/components/ui/KeyValueView";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MoveMap } from "../new/page";

/**
 * representative page for a single city details
 */
export default () => {
    const navigator = useRouter();
    const { id } = useParams<{ id: string }>()

    const { data, error, isLoading } = useQuery({
        queryKey: ['city', id],
        queryFn: async () => {
            console.log("Fetching client with id:", id);
            return cityApi.getById(id);
        }
    });

    return (
        <main className="p-6">
            <div className="flex flex-col gap-2 w-full">
                <div>
                    <Button variant="outline" onClick={() => navigator.back()}>
                        <ArrowLeft />
                        <p>Back</p>
                    </Button>
                </div>
                {data &&
                <PageHeader title="City" subtitle="City details here" onEditRequest={() => navigator.push(`/cities/${data.id}/edit`)} />
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
                                        <KeyValueView keyT="Identifier" value={data.id} />
                                        <KeyValueView keyT="Name" value={data.name} />
                                        <KeyValueView keyT="State Code" value={data.stateCode} />
                                        <KeyValueView keyT="Creation Date" value={toDateValue(data.createdAt, formatDateToDDMMYYYY)} />
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
                        {data && (
                            <MapContainer className='h-100' center={[data.latitude, data.longitude]} zoom={data.zoomFactor} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[data.latitude, data.longitude]}>
                                    <Popup>
                                        ${data.latitude} ${data.longitude}
                                    </Popup>
                                </Marker>
                                <MoveMap center={[data.latitude, data.longitude]} zoom={data.zoomFactor} onZoomChanged={(newZoom) => { }}
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