'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { countryApi, creditSupplingApi } from "@/lib/api";
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
import { MoveMap } from "@/app/(dashboard)/cities/new/page";
import { ComposeInput } from "@/components/ui/defined-components/compose-input";

export default () => {
    const navigator = useRouter();
    const dateNow = new Date();
    const expresionDate = new Date(dateNow.getFullYear() + 3, dateNow.getMonth(), dateNow.getDate());
    const [browserFormattedNow, browserFormattedExpiration] = [browserFromatDate(dateNow), browserFromatDate(expresionDate)];
    const [currentSelectedCurrency, setSelectedCurrency] = useState('DT');
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>()
    const [creditsToAdd, setCreditsToAdd] = useState(0);

    const { register, getValues, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(cardCreateValidator),
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            creditBalance: 0,
            issuedAt: browserFormattedNow,
            expiredAt: browserFormattedExpiration
        }
    });

    const { isPending: isPendingSupply, mutate: mutateSupply } = useMutation({
        mutationFn: async (data: { credits: number, cardId: UUID, currency: string }) => {
            if (data.credits <= 0) {
                throw new Error("Credits to add must be greater than zero");
            }
            await creditSupplingApi.create({
                cardId: data.cardId,
                amount: data.credits,
                feeTaken: data.credits * 4,
                source: CreditSource.ADMIN,
                status: CreditStatus.SUCCESS,
                balanceBefore: getValues().creditBalance,
                balanceAfter: getValues().creditBalance + data.credits,
                reference: `SUPPLY-${Date.now()}`
            })
        },
        onSuccess: () => {
            toast.success("Credits supplied successfully", { duration: 7000 });
            setCreditsToAdd(0);
            queryClient.invalidateQueries({ queryKey: ['cards'] });
        },
        onError: (error: any) => {
            toast.error(`Error supplying credits: ${error?.message || 'Unknown error'}`, { duration: 7000 });
        }
    });


    const { data, error, isLoading } = useQuery({
        queryKey: ['country', id],
        queryFn: async () => {
            console.log("Fetching client with id:", id);
            return countryApi.getById(id);
        }
    });

    /**
     * Country update data
     */

    const [countryName, setCountryName] = useState(data?.name || '');
    const [countryIsoCode, setCountryIsoCode] = useState(data?.isoCode || '');
    const [latitude, setLatitude] = useState(data?.latitude || 0);
    const [longitude, setLongitude] = useState(data?.longitude || 0);
    const [zoomFactor, setZoomFactor] = useState(data?.zoomFactor || 5);

    useEffect(() => {  
        if(data) {
            /**
             * Set country data for edit form
             */
            setCountryName(data.name);
            setCountryIsoCode(data.isoCode);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setZoomFactor(data.zoomFactor);
        }
    }, [data]);


    return (
        <main className="p-6">
            <div className="flex flex-col gap-2 w-full">
                <div>
                    <Button variant="outline" onClick={() => navigator.back()}>
                        <ArrowLeft />
                        <p>Back</p>
                    </Button>
                </div>
                <PageHeader title="Country" subtitle="Country details here" />
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
                                        <ComposeInput label="Name" value={countryName} onChange={(e) => setCountryName(e.currentTarget.value)} />
                                        <ComposeInput label="ISO Code" value={countryIsoCode} onChange={(e) => setCountryIsoCode(e.currentTarget.value)} />
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
                        {(longitude && latitude && zoomFactor) && (
                            <MapContainer className='h-100' center={[latitude, longitude]} zoom={zoomFactor} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                
                                <Marker title={`${latitude} ${latitude}`} position={[latitude, longitude]}>
                                    <Popup>
                                        ${latitude} ${longitude}
                                    </Popup>
                                </Marker>
                                <MoveMap center={[latitude, longitude]} zoom={zoomFactor} onZoomChanged={(newZoom) => { }}
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