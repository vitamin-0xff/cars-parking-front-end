'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cardApi } from "@/lib/api";
import { CardCreateV1 } from "@/lib/types";
import { browserFromatDate, currencies } from "@/lib/utils";
import { CardCreateInput, cardCreateValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default () => {
    const navigator = useRouter();
    const dateNow = new Date();
    const expresionDate = new Date(dateNow.getFullYear() + 3, dateNow.getMonth(), dateNow.getDate());
    const [browserFormattedNow, browserFormattedExpiration] = [browserFromatDate(dateNow), browserFromatDate(expresionDate)];
    const [currentSelectedCurrency, setSelectedCurrency] = useState('DT');
    const queryClient = useQueryClient();

    const {register, watch, reset, handleSubmit, setValue, formState: {errors}} = useForm({
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
    })

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

    return (
        <main className="p-6">
            <div className="flex flex-col gap-2 w-full">
                <div>
                    <Button variant="outline" onClick={() => navigator.back()}>
                        <ArrowLeft />
                        <p>Back</p>
                    </Button>
                </div>
                <PageHeader title="New Card" subtitle="Create a new card here" />
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                            <div title="issued-at">
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Issued At</label>
                                <Input type="date" id="issued-at" value={browserFormattedNow} disabled/>
                                </div>

                            <div title="expired-at">
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Expired At</label>
                                <Input type="date" id="expired-at" value={browserFormattedExpiration} disabled/>
                            </div>
                            <div className="flex gap-2">
                                <div title="initial-credit-balance" className="flex-2/3">
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Initial Credit Balance</label>
                                    <Input type="number" {...register('creditBalance', {
                                        onChange(event) {
                                             if(event.currentTarget.value === '') {
                                                    setValue('creditBalance', 0);
                                                    return;
                                             }
                                             setValue('creditBalance',  parseInt(event.currentTarget.value));
                                        },
                                    })} min={0} id="initial-balance"/>
                                    {
                                        errors.creditBalance && <p className="text-sm text-red-600 mt-1">{errors.creditBalance.message}</p> 
                                    }
                                </div>
                                <div title="price">
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Price</label>
                                    <Input type="number" value={watch('creditBalance') * 4 + 5} min={0} id="initial-balance"/>
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
                        </div>
                    </CardContent>
                </Card>
                <div className="actions flex mt-4 gap-1 justify-end">
                    <Button className="" disabled={isPending} onClick={handleSubmit(onSubmit)}>Create Card</Button>
                    <Button variant="outline" className="ml-2 hover:text-gray-700" onClick={() => { reset() }}>Clear</Button>
                </div>
            </div>
        </main>
    )
}