'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cardApi, creditSupplingApi } from "@/lib/api";
import { CardCreateV1, CreditSource, CreditStatus, UUID } from "@/lib/types";
import { browserFromatDate, currencies } from "@/lib/utils";
import { CardCreateInput, cardCreateValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default () => {
    const navigator = useRouter();
    const dateNow = new Date();
    const expresionDate = new Date(dateNow.getFullYear() + 3, dateNow.getMonth(), dateNow.getDate());
    const [browserFormattedNow, browserFormattedExpiration] = [browserFromatDate(dateNow), browserFromatDate(expresionDate)];
    const [currentSelectedCurrency, setSelectedCurrency] = useState('DT');
    const queryClient = useQueryClient();
    const {id} = useParams<{id: string}>()
    const [creditsToAdd, setCreditsToAdd] = useState(0);

    const {register, getValues, reset, handleSubmit, formState: {errors}} = useForm({
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

    const {isPending, mutate} = useMutation({
        mutationFn: async (data: CardCreateV1) => {
            return cardApi.createV1(data);
        },
        onSuccess: () => {
            toast.success("Card created successfully", {duration: 7000});
            reset();
            queryClient.invalidateQueries({queryKey: ['cards']});
        },
        onError: (error: any) => {
            console.error("Error creating card:", error);
            toast.error(`Error creating card: ${error?.message || 'Unknown error'}`, {duration: 7000});
        }
    });

    const {isPending: isPendingSupply, mutate: mutateSupply} = useMutation({
        mutationFn: async (data: {credits: number, cardId: UUID, currency: string}) => {
            if(data.credits <= 0) {
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
            toast.success("Credits supplied successfully", {duration: 7000});
            setCreditsToAdd(0);
            queryClient.invalidateQueries({queryKey: ['cards']});
        },
        onError: (error: any) => {
            toast.error(`Error supplying credits: ${error?.message || 'Unknown error'}`, {duration: 7000});
        }
    });


    const onSubmit = (data: CardCreateInput) => {
        mutate({
            client: {
                fullName: `${data.name} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                name: data.name,
                lastName: data.lastName
            },
            creditBalance: data.creditBalance,
            issuedAt: (new Date(data.issuedAt)).toISOString(),
            expiresAt: (new Date(data.expiredAt)).toISOString()
            });
    }

    const {data, error, isLoading} = useQuery({
        queryKey: ['cards', id],
        queryFn: async () => {
            console.log("Fetching client with id:", id);
            return cardApi.getById(id);
        }
    })

    useEffect(() => {
        if(data) {
            reset({
                name: data.client?.name || '',
                lastName: data.client?.lastName || '',
                email: data.client?.email || '',
                phone: data.client?.phone || '',
                creditBalance: data.creditBalance || 0,
                issuedAt: browserFromatDate(new Date(data.issuedAt)) || browserFormattedNow,
                expiredAt: browserFromatDate(new Date(data.expiresAt)) || browserFormattedExpiration
            });
        }
    }, [data, error]);


    return (
        <main className="p-6">
            <div className="flex flex-col gap-2 w-full">
                <div>
                    <Button variant="outline" onClick={() => navigator.back()}>
                        <ArrowLeft />
                        <p>Back</p>
                    </Button>
                </div>
                <PageHeader title="Card" subtitle="Card details here" />
            </div>
            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User's Data </CardTitle>
                        <CardDescription>
                            User's information and card details form.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            !isLoading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div title="first-name">
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Name</label>
                                    <Input {...register('name')} id="firstName" placeholder="Eg, Amine" />
                                    {
                                        errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p> 
                                    }
                                </div>
                                {/* lastname */}
                                <div title="last-name">
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Last name</label>
                                    <Input id="last name" {...register('lastName')} placeholder="Eg, Essid" />
                                    {
                                        errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p> 
                                    }
                                </div>

                                {/* email */}
                                <div title="email">
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Email</label>
                                    <Input id="email" {...register('email')} placeholder="Eg, essid@mail.com" />
                                    {
                                        errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p> 
                                    }
                                </div>

                                {/* phone number */}
                                <div title="phone-number">
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Phone Number</label>
                                    <Input id="phone" {...register('phone')} placeholder="Eg, +21653789076" />
                                    {
                                        errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p> 
                                    }
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
                            isLoading && <Skeleton className="w-full h-36"/> 
                        }
                    </CardContent>
                </Card>
                <Card className="mt-2">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex gap-2 items-center">
                                <p>
                                    Card's Data
                                </p>
                                <Badge title="3 Year"> 3 year </Badge>
                                </div>
                        </CardTitle>
                        <CardDescription>
                             Card details form.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            error && <div className="h-24 flex items-center justify-center">
                                <p className="text-red-600">Error fetching client data: {(error as any)?.message || 'Unknown error'}</p>
                            </div>
                        }
                        {
                            isLoading && <Skeleton className="w-full h-36"/> 
                        }
                        {
                            !isLoading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                            <div title="issued-at">
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Issued At</label>
                                <Input type="date" id="issued-at" defaultValue={browserFormattedNow} disabled/>
                                </div>

                            <div title="expired-at">
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Expired At</label>
                                <Input type="date" id="expired-at" defaultValue={browserFormattedExpiration} disabled/>
                            </div>
                            <div className="flex gap-2">
                                <div title="initial-credit-balance" className="flex-2/3">
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Credit Balance</label>
                                    <Input type="number" {...register('creditBalance')} min={0} id="initial-balance" disabled/>
                                    {
                                        errors.creditBalance && <p className="text-sm text-red-600 mt-1">{errors.creditBalance.message}</p> 
                                    }
                                </div>
                            </div>
                        </div>
                            )
                        }
                    </CardContent>
                </Card>
                <Card className="mt-2">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex gap-2 items-center">
                                <p>
                                    Supply Card
                                </p>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Card details form.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="credits" className="text-muted-foreground text-sm">Credits (Eg. 10)</label>
                                <Input value={creditsToAdd} onChange={(e) => {
                                    if (e.currentTarget.value == '' || parseInt(e.currentTarget.value) <= 0) {
                                        setCreditsToAdd(0);
                                        return;
                                    }
                                    setCreditsToAdd(parseInt(e.currentTarget.value));
                                }} placeholder="Eg, 10" name="credits" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="price" className="text-muted-foreground text-sm">Price</label>
                                <Input name="price" value={creditsToAdd * 4} disabled/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Unit</label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant={'outline'}>{currentSelectedCurrency}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {
                                            currencies.map((currency) =>
                                                <DropdownMenuItem key={currency} onClick={() => setSelectedCurrency(currency)}>
                                                    {currency}
                                                </DropdownMenuItem>
                                            )
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className="actions mt-2 gap-2 flex justify-end">
                            <Button className="" disabled={isPendingSupply} onClick={() => mutateSupply({
                                cardId: id,
                                credits: creditsToAdd,
                                currency: currentSelectedCurrency,
                            })} >Supply</Button>
                            <Button variant={'outline'} className="hover:text-gray-700" disabled={isPendingSupply} onClick={() => {}}>Clear</Button>
                        </div>
                    </CardContent>
                </Card>
                <div className="actions flex mt-4 gap-1 justify-end">
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
                </div>
            </div>
        </main>
    )
}