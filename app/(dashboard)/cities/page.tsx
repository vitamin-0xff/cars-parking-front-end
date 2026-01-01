'use client';
import { CountriesTable } from "@/components/countries/countries";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { Input } from "@/components/ui/input";
import { cityApi, countryApi } from "@/lib/api";
import { CityCreate, CityResponse, CountryFuzzySearch } from "@/lib/types";
import { CityCreateInput, cityCreateValidator } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileJson, Filter, Plus, Search } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CitiesTable } from "@/components/cities/cities";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddCitySheet } from "@/components/ui/defined-components/add-city-sheet";

export default () => {
    const [addcityOpen, setAddcityOpen] = useState(false);

    const [submitedWorks, setSubmitedWorks] = useState<{howManySuccess: number, howManyFailed: number, totalDone: number, total: number} | null>(null);
    const [failedInstances, setFailedInstances] = useState<{raison: string, cityCreate: CityCreate}[] | null>(null);
    const [submitedElements, setSubmitedElements] = useState<CityResponse[] | null>(null);
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

    const queryClient = useQueryClient();


    const {isPending: isPandingList, error: errorList, mutate: mutateList, reset} = useMutation({
        mutationFn: async () => {

            if(jsonElements.trim().length === 0) {
                throw new Error("JSON content is required");
            }
            const cityCreates: CityCreate[] = JSON.parse(jsonElements);
            if(cityCreates.length === 0) {
                throw new Error("No city to add");
            }

            setShowRapport(true);
            for(const cityCreate of cityCreates) {
                /* delay server off */
                await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
                const parsed = cityCreateValidator.safeParse(cityCreate);
                if (parsed.success === false) {
                    failedInstances?.push({ raison: JSON.stringify(parsed.error.format()), cityCreate });
                    setSubmitedWorks((value) =>
                        value ? { ...value, howManyFailed: value.howManyFailed + 1, totalDone: value.totalDone + 1 } : { howManySuccess: 0, howManyFailed: 1, totalDone: 1, total: cityCreates.length }
                    );
                    continue;
                }
                try {
                    const elementCreated = await cityApi.create(parsed.data);
                    console.log('Created element:', elementCreated);
                    setSubmitedElements((value) => value ? [...value, elementCreated] : [elementCreated]);
                    setSubmitedWorks((value) =>
                        value ? { ...value, howManySuccess: value.howManySuccess + 1, totalDone: value.totalDone + 1 } : { howManySuccess: 1, howManyFailed: 0, totalDone: 1, total: cityCreates.length }
                    );
                }catch (e) {
                    failedInstances?.push({ raison: (e as Error).message, cityCreate });
                    setSubmitedWorks((value) =>
                        value ? { ...value, howManyFailed: value.howManyFailed + 1, totalDone: value.totalDone + 1 } : { howManySuccess: 0, howManyFailed: 1, totalDone: 1, total: cityCreates.length }
                    );
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cities']});
        },
        onError: (error) => {
            setSubmitJsonWorkError((error as Error).message);
            fashState();
        }
    });


    return (
        <main className="p-6">
            <div className="flex justify-between w-full">
                <PageHeader title="Cities" subtitle="Manage cities here" />
                <div className="actions flex gap-2">
                    <Button onClick={() => setAddcityOpen(true)}><Plus fontWeight={900} style={{ fontWeight: 900 }} /></Button>
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
                <CitiesTable />
            </div>
            {/* modals here */}
            <AddCitySheet selectedCountry={null} isOpen={addcityOpen} onCloseRequest={() => setAddcityOpen(false)} />
            {/* JSON Uploader Modal */}
            <AlertDialog open={openJsonUploader} onOpenChange={(open) => { setOpenJsonUploader(open); }}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Add city list
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
                            setAddcityOpen(false);
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