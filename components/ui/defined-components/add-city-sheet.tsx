import { cityApi, countryApi } from "@/lib/api";
import { CountryFuzzySearch } from "@/lib/types";
import { CityCreateInput, cityCreateValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../alert-dialog";
import { Button } from "../button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { set } from "zod";
import { useCountrySearch } from "@/hooks/use-country-search";

type SelectedCountry = {
    id: string;
    name: string;
    isoCode: string;
}

type Propos = {
    selectedCountry: SelectedCountry | null
    isOpen: boolean;
    onCloseRequest: () => void;
}

export const AddCitySheet = ({ selectedCountry, isOpen, onCloseRequest }: Propos) => {

    /* serach state */
    const [searchResults, setSearchResults] = useState<CountryFuzzySearch[]>([]);
    const [searchError, setSearchError] = useState<string | null>(null);
    const abordController = useMemo(() => new AbortController(), []);
    const [serachTerm, setSearchTerm] = useState<string>('');
    const [selectedCountryLocal, setSelectedCountryLocal] = useState<SelectedCountry | null>(selectedCountry);

    useEffect(() => {
        setSelectedCountryLocal(selectedCountry);
    }, [selectedCountry]);


    const { register, getValues, setValue, reset,handleSubmit, formState: { errors } } = useForm<CityCreateInput>({
        resolver: zodResolver(cityCreateValidator),
        defaultValues: {
            stateCode: '',
            name: '',
            postalCode: '',
            countryId: selectedCountry ? selectedCountry.id : '',
        },
    });

    useEffect(() => {
        setValue('countryId', selectedCountryLocal ? selectedCountryLocal.id : '');
    }, [selectedCountryLocal])

    const queryClient = useQueryClient();

    useCountrySearch({
        serachTerm,
        onResult: setSearchResults,
        onError: setSearchError,
        abordController: abordController
    })

    const { isPending, error, mutate } = useMutation({
        mutationFn: async (cityCreate: CityCreateInput) => {
            return cityApi.create(cityCreate)
        },
        onSuccess: () => {
            reset({
                name: '',
                postalCode: '',
                stateCode: '',
                countryId: '',
            });
            setSelectedCountryLocal(null);
            queryClient.invalidateQueries({ queryKey: ['cities'] });
        }
    });

    const onSubmit = (data: CityCreateInput) => {
        mutate(data);
    }
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Add city
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Add city from
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <div className="flex flex-col gap-2">
                        {
                            error && <p className="text-red-500 text-sm">{(error as Error).message}</p>
                        }
                        <div>
                            <label className="block text-xs text-muted-foreground mb-1">City Name</label>
                            <Input {...register('name',
                                {
                                    onChange(event) {
                                        setValue('name', capitalizeFirstLetter(event.currentTarget.value.trim()));
                                    },
                                }
                            )} placeholder="Eg, Ariana" />
                            {
                                errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            }
                        </div>
                        <div>
                            <label className="block text-xs  text-muted-foreground mb-1">City Postal Code</label>
                            <Input {...register('postalCode', {
                                onChange(event) {
                                    setValue('postalCode', event.currentTarget.value.trim().toLocaleUpperCase());
                                },
                            })} placeholder="Eg, 1011" />
                            {
                                errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>
                            }
                        </div>
                        <div>
                            <label className="block text-xs  text-muted-foreground mb-1">State Code</label>
                            <Input {...register('stateCode', {
                                onChange(event) {
                                    setValue('stateCode', event.currentTarget.value.trim().toLocaleUpperCase())
                                }
                            })
                            } placeholder="Eg, TN-AR" />
                            {
                                errors.stateCode && <p className="text-red-500 text-xs mt-1">{errors.stateCode.message}</p>
                            }
                        </div>
                        <div>
                            {
                                selectedCountryLocal == null  && (
                                    <div>
                                        <label className="block text-xs  text-muted-foreground mb-1">Search country</label>
                                        <Input onChange={(e) => setSearchTerm(e.currentTarget.value ?? '')} placeholder="Search, Eg Tunisie" />
                                    </div>
                                )
                            }
                        {((getValues('countryId') === null || getValues('countryId') === '' )) ?
                            <div className="relative">
                                {
                                    searchError && <p className="text-red-500 text-xs mt-1">{searchError}</p>
                                }
                                {
                                    serachTerm.trim().length >=2 &&  (
                                    <ScrollArea>
                                        <div className="mt-2 max-h-40 border left-0 right-0 bg-gray-800 absolute border-gray-200 rounded-md overflow-y-auto">
                                            {
                                                searchResults.map((country) => (
                                                    <div key={country.id} className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => {
                                                        console.log("Selected country ID: " + country.id);
                                                        setSelectedCountryLocal(country);
                                                        setSearchResults([]);
                                                        setSearchTerm('');
                                                    }}>
                                                        <p className="text-sm">{country.name} ({country.isoCode})</p>
                                                    </div>
                                                ))
                                            }
                                            {
                                                searchResults.length === 0 && <p className="p-2 text-sm text-muted-foreground">No results found</p>
                                            }
                                        </div>
                                    </ScrollArea>
                                    )
                                }
                            </div>
                            :
                            <div className="relative">
                                <label className="block text-xs  text-muted-foreground mb-1">Country</label>
                                <div className="p-2 rounded-lg text-muted-foreground text-sm border-2">
                                     <p>{selectedCountryLocal?.name} Selected</p>
                                </div>
                                <Button variant="link" className="absolute border-2 rounded-full top-1/2 right-2 w-4 h-4 hover:bg-gray-600  text-xs" onClick={() => {
                                    setSelectedCountryLocal(null);
                                    setValue('countryId', '');
                                }}><XIcon /></Button>
                            </div>
                        }
                        </div>
                    </div>

                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:text-gray-600" onClick={() => {
                        reset();
                        setSelectedCountryLocal(null);
                        onCloseRequest();
                    }}>Cancel</AlertDialogCancel>
                    <Button disabled={isPending} onClick={handleSubmit(onSubmit)}>Save</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}