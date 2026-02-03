'use client';
import { CountriesTable } from "@/components/countries/countries";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { Input } from "@/components/ui/input";
import { countryApi } from "@/lib/api";
import { CountryCreate, CountryResponse } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { countryCreateValidator } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileJson, Filter, Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default () => {
    const [addCountryOpen, setAddCountryOpen] = useState(false);
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const navigator = useRouter();

    const [submitedWorks, setSubmitedWorks] = useState<{howManySuccess: number, howManyFailed: number, totalDone: number, total: number} | null>(null);
    const [failedInstances, setFailedInstances] = useState<{raison: string, countryCreate: CountryCreate}[] | null>(null);
    const [submitedElements, setSubmitedElements] = useState<CountryResponse[] | null>(null);
    const [jsonElements, setJsonElements] = useState<string>('');
    const [submitJsonWorkError, setSubmitJsonWorkError] = useState<string | null>(null);
    const [showRapport, setShowRapport] = useState(false);

    const fashState = () => {
        setSubmitedWorks(null);
        setFailedInstances(null);
        setSubmitedElements(null);
        setJsonElements('');
        setSubmitJsonWorkError(null);
        setShowRapport(false);
    }

    /* JSON Uploader Modal */
    const [openJsonUploader, setOpenJsonUploader] = useState(false);

    const [countryNameError, setCountryNameError] = useState<string | null>(null);
    const [countryCodeError, setCountryCodeError] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const {isPending, error, mutate} = useMutation({
        mutationFn: async (countryCreate: CountryCreate) => {
            setCountryNameError('');
            setCountryCodeError('');
            if(countryCreate.name.trim().length === 0) {
                throw new Error("Country name is required");
            }

            if(countryCreate.isoCode.trim().length === 0) {
                throw new Error("Country iso code is required");
            }
            return countryApi.create(countryCreate)
        },
        onSuccess: () => {
            setCountryCode('');
            setCountryName('');
            queryClient.invalidateQueries({queryKey: ['countries']});
        }
    });

    const {isPending: isPandingList, error: errorList, mutate: mutateList, reset} = useMutation({
        mutationFn: async () => {

            if(jsonElements.trim().length === 0) {
                throw new Error("JSON content is required");
            }
            const countryCreates: CountryCreate[] = JSON.parse(jsonElements);
            if(countryCreates.length === 0) {
                throw new Error("No country to add");
            }

            setShowRapport(true);
            for(const countryCreate of countryCreates) {
                /* delay server off */
                await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
                const parsed = countryCreateValidator.safeParse(countryCreate);
                if (parsed.success === false) {
                    failedInstances?.push({ raison: JSON.stringify(parsed.error.format()), countryCreate });
                    setSubmitedWorks((value) =>
                        value ? { ...value, howManyFailed: value.howManyFailed + 1, totalDone: value.totalDone + 1 } : { howManySuccess: 0, howManyFailed: 1, totalDone: 1, total: countryCreates.length }
                    );
                    continue;
                }
                try {
                    // TODO: optimize this part // const elementCreated = await countryApi.create(parsed.data);
                    // console.log('Created element:', elementCreated);
                    // setSubmitedElements((value) => value ? [...value, elementCreated] : [elementCreated]);
                    setSubmitedWorks((value) =>
                        value ? { ...value, howManySuccess: value.howManySuccess + 1, totalDone: value.totalDone + 1 } : { howManySuccess: 1, howManyFailed: 0, totalDone: 1, total: countryCreates.length }
                    );
                }catch (e) {
                    failedInstances?.push({ raison: (e as Error).message, countryCreate });
                    setSubmitedWorks((value) =>
                        value ? { ...value, howManyFailed: value.howManyFailed + 1, totalDone: value.totalDone + 1 } : { howManySuccess: 0, howManyFailed: 1, totalDone: 1, total: countryCreates.length }
                    );
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['countries']});
        },
        onError: (error) => {
            setSubmitJsonWorkError((error as Error).message);
            fashState();
        }
    });

    return (
        <main className="p-6">
            <div className="flex justify-between w-full">
                <PageHeader title="Countries" subtitle="Manage countries here" />
                <div className="actions flex gap-2">
                    <Button onClick={() => navigator.push('countries/new')}><Plus fontWeight={900} style={{ fontWeight: 900 }} /></Button>
                    <Button onClick={() => setOpenJsonUploader(true)}><FileJson/></Button>
                    <Button onClick={() => {}}><Filter /></Button>
                    <Button variant={'outline'} className="text-muted-foreground hover:text-white" onClick={() => { }}>
                        <div className="flex items-center gap-2">
                            <Search />
                            <p>Ctrl + K</p>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="table-wrapper">
                <CountriesTable />
            </div>
            {/* modals here */}
            <AlertDialog open={addCountryOpen} onOpenChange={(open) => { setAddCountryOpen(open); }}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Add Country
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                            Add country from 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                    {/* Form fields go here */}
                    {
                        error && <p className="text-red-500 text-sm">{(error as any).message}</p>
                    }
                    <div className="flex flex-col gap-2">
                        <div>
                         <label className="block text-xs text-muted-foreground mb-1">Country Name</label>
                         <Input value={countryName} onChange={(e) => setCountryName(capitalizeFirstLetter(e.currentTarget.value.trim()) ?? '')} placeholder="Eg, Tunisia" />
                         {
                            countryNameError && <p className="text-red-500 text-xs mt-1">{countryNameError}</p>
                         }
                        </div>
                        <div>
                         <label className="block text-xs  text-muted-foreground mb-1">Country Code</label>
                         <Input value={countryCode} onChange={(e) => setCountryCode(e.currentTarget.value.toLocaleUpperCase())} placeholder="Eg, TN" />
                         {
                            countryNameError && <p className="text-red-500 text-xs mt-1">{countryCodeError}</p>
                         }
                        </div>
                    </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:text-gray-600" onClick={() => setAddCountryOpen(false)}>Cancel</AlertDialogCancel>
                    {/* <Button disabled={isPending} onClick={() => {)}}>Save</Button> */}
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* JSON Uploader Modal */}
            <AlertDialog open={openJsonUploader} onOpenChange={(open) => { setOpenJsonUploader(open); }}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Add Country list
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Add List of countries from a JSON file
                    </AlertDialogDescription>
                </AlertDialogHeader>
                    {
                        errorList && <p className="text-red-500 text-sm">{(errorList as any).message}</p>
                    }
                    { !showRapport &&
                        <div className="flex flex-col gap-2">
                            <textarea value={jsonElements} onChange={(e) => setJsonElements(e.currentTarget.value)} name="uploader" id="uploaderJsonFormat" className="w-full h-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='[{"name": "Tunisia", "isoCode": "TN"}, {"name": "United States", "isoCode": "US"}]'>
                            </textarea>
                        </div>
                    }
                    { showRapport &&
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold">Upload Report</h3>
                            {
                                submitedWorks && <div>
                                    <p>Total Submitted: {submitedWorks.total}</p>
                                    <p>Successful: {submitedWorks.howManySuccess}</p>
                                    <p>Failed: {submitedWorks.howManyFailed}</p>
                                </div>
                            }
                        </div>
                    }
                    <AlertDialogFooter>
                        <AlertDialogCancel className="hover:text-gray-600" onClick={() => {
                            setAddCountryOpen(false);
                            fashState();
                            reset();
                        }}>Cancel</AlertDialogCancel>
                        <Button disabled={isPandingList} onClick={() => { mutateList() }}>Save</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
        
    )
}