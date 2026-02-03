'use client';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComposeInput } from '@/components/ui/defined-components/compose-input';
import { capitalizeFirstLetter } from '@/lib/utils';
import { ArrowLeft, ScanSearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useReducer, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CityCreate, CountryFuzzySearch } from '@/lib/types';
import { cityApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { cityCreateValidator } from '@/lib/validators';
import { Autocomplete } from '@/components/ui/defined-components/auto-complete';
import { useCountrySearch } from '@/hooks/use-country-search';
import { stateSearchOpenStreetMap } from '@/lib/third-party-api';

type cityFormState = {
    name: string;
    code: string;
    latitude: string;
    longitude: string;
}

type Props = {
    center: [number, number];
    zoom: number;
    onZoomChanged?: (newZoom: number) => void;
    // executed on click
    onLongLatChanged?: (newCenter: [number, number]) => void;
};

export function MoveMap({ center, zoom, onZoomChanged, onLongLatChanged }: Props) {
    const map = useMap();
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            map.setView([lat, lng], map.getZoom());
            if (onLongLatChanged) {
                onLongLatChanged([lat, lng]);
            }
        },
        dragend: () => {
            const center = map.getCenter();
            console.log("Map dragged to " + center);
            if (onLongLatChanged) {
                onLongLatChanged([center.lat, center.lng]);
            }
        },
        zoomend: () => {
            console.log("Zoom changed to " + map.getZoom());
            if (onZoomChanged) {
                onZoomChanged(map.getZoom());
            }
        }
    });
    map.setView(center, zoom);
    return null;
}

export default () => {
    const navigator = useRouter();
    const queryClient = useQueryClient();
    const [searching, setSearching] = useState(false);
    const [state, dispatcher] = useReducer(
        (state: cityFormState, action: Partial<cityFormState>) => {
            return { ...state, ...action };
        },
        {
            name: '',
            code: '',
            latitude: '',
            longitude: ''
        }
    );
    const [countryId, setCountryId] = useState<string>('');
    const [zoomFactor, setZoomFactor] = useState(4);
    const { longitude, latitude } = useMemo(() => {
        const latitude = isNaN(parseFloat(state.latitude)) ? 11.1 : parseFloat(state.latitude);
        const longitude = isNaN(parseFloat(state.longitude)) ? 9.1 : parseFloat(state.longitude);

        return {
            latitude: latitude,
            longitude: longitude
        }
    }, [state]);

    const handleSearchCity = async (query: string) => {
        if (searching) return;
        if (!query || query.trim() === '') return;
        if (!selectedElement) {
            toast.error('Please select a country first');
            return;
        }
        setSearching(true);
        try {
            const results: any[] = await stateSearchOpenStreetMap(query, selectedElement.isoCode);
            console.log(results);
            if (results.length > 0) {
                const cityData = results[0];
                console.log("from condition" + cityData.address['ISO3166-2-lvl4']);
                const stateCode = cityData.address['ISO3166-2-lvl4'] || '';
                dispatcher({
                    name: cityData.name,
                    latitude: cityData.lat,
                    longitude: cityData.lon,
                    code: stateCode.toUpperCase()
                });
                toast.success('City data found and populated');
            } else {
                toast.error('No city data found');
            }
        } catch (error) {
            console.log('Error searching for city:', error);
        } finally {
            setSearching(false);
        }
    };

    const { mutate } = useMutation({
        mutationFn: async (cityCreate: CityCreate) => {
            const errors = cityCreateValidator.safeParse(cityCreate);
            console.log("Errors: ")
            console.log(errors);
            if (!errors.success) {
                throw new Error(errors.error.errors.map(e => e.message).join(', '));
            }
            return cityApi.create({ name: cityCreate.name, stateCode: cityCreate.stateCode, latitude: cityCreate.latitude, longitude: cityCreate.longitude, zoomFactor: cityCreate.zoomFactor, countryId: cityCreate.countryId });
        },
        onSuccess: (e) => {
            toast.success('city created successfully');
            queryClient.invalidateQueries({ queryKey: ['countries'] });
            dispatcher({ name: '', code: '', latitude: '', longitude: '' });
            setCountryId('');
            setCountrySearchTerm('');
            setCountriesFuzzySearch([]);
            setSelectedElement(null);
            setZoomFactor(4);
        },
        onError: (error) => {
            toast.error('Failed to create city ' + error.message);
        }
    });

    // search country
    const [countrySearchTerm, setCountrySearchTerm] = useState('');
    const [countriesFuzzySearch, setCountriesFuzzySearch] = useState<CountryFuzzySearch[]>([]);
    const [contrySearching, setCountrySearching] = useState(false);
    const [selectedElement, setSelectedElement] = useState<CountryFuzzySearch | null>(null);

    useCountrySearch({
        serachTerm: countrySearchTerm,
        onResult: setCountriesFuzzySearch,
        onError: (error) => { console.log(error) },
        abordController: new AbortController(),
        onLoadingStatusChanged: setCountrySearching
    });



    return (
        <main className="p-6">
            <div className="flex flex-col gap-2 w-full">
                <div>
                    <Button className="hover:text-gray-500" variant="outline" onClick={() => navigator.back()}>
                        <ArrowLeft />
                        <p>Back</p>
                    </Button>
                </div>
                <PageHeader title="New City" subtitle="Create a new city here" />
            </div>
            <div className="mt-2 relative">
                {
                    searching &&
                    <div className="absolute rounded-xl top-0 left-0 right-0 bottom-0 bg-gray-900/45"></div>
                }
                <Card>
                    <CardHeader>
                        <CardTitle>City's Data</CardTitle>
                        <CardDescription>
                            City's information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="" className='text-sm mb-1 text-muted-foreground'>
                                    Country
                                </label>
                                <Autocomplete placeholder='Eg, Tunisia'
                                    value={countrySearchTerm} onChange={(e) => {
                                        setSelectedElement(null);
                                        setCountrySearchTerm(capitalizeFirstLetter(e))
                                    }} onSelect={(changedValue) => {
                                        const country = countriesFuzzySearch.find((c) => c.id === changedValue.id);
                                        setCountrySearchTerm(changedValue.label);
                                        if (country) {
                                            dispatcher({
                                                latitude: country.latitude.toString(),
                                                longitude: country.longitude.toString()
                                            });
                                            setZoomFactor(country.zoomFactor);
                                            setSelectedElement(country);
                                            setCountryId(changedValue.id);
                                        }
                                    }}
                                    items={countriesFuzzySearch.map(it => { return { label: `${it.name} (${it.isoCode})`, id: it.id } })}
                                    loading={contrySearching}
                                />
                            </div>
                            <div className='relative'>
                                <ComposeInput onChange={(e) => dispatcher({ name: capitalizeFirstLetter(e.currentTarget.value) })} value={state.name} label="City Name" placeholder="Eg, Ariana" />
                                <div onClick={() => {
                                    if (searching) return;
                                    handleSearchCity(state.name);
                                }} className='absolute top-9 -translate-y-[25%] right-3 text-muted-foreground cursor-pointer hover:bg-gray-800 rounded'>
                                    <ScanSearchIcon />
                                </div>
                            </div>
                            <ComposeInput onChange={(e) => dispatcher({ latitude: e.currentTarget.value })} value={state.latitude} label="Latitude" placeholder="Eg, 10.20" />
                            <ComposeInput onChange={(e) => dispatcher({ longitude: e.currentTarget.value })} value={state.longitude} label="Longitude" placeholder="Eg, 9.20" />
                            <div className='relative'>
                                <ComposeInput onChange={(e) => dispatcher({ code: e.currentTarget.value.toUpperCase() })} value={state.code} label="Code" placeholder="TN-12" />
                                <div onClick={() => {
                                    if (searching) return;
                                    handleSearchCity(state.code);
                                }} className='absolute top-9 -translate-y-[25%] right-3 text-muted-foreground cursor-pointer hover:bg-gray-800 rounded'>
                                    <ScanSearchIcon />
                                </div>
                            </div>
                            <ComposeInput type='number' value={zoomFactor} label="Zoom Factor" placeholder="Eg 10" />
                        </div>
                    </CardContent>
                </Card>
                <Card className='mt-2'>
                    <CardHeader>
                        <CardTitle>Map</CardTitle>
                        <CardDescription>
                            Map showing the city's location.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MapContainer className='h-100' center={[latitude, longitude]} zoom={4} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[0, 0]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                            <MoveMap center={[latitude, longitude]} zoom={zoomFactor} onZoomChanged={(newZoom) => setZoomFactor(newZoom)}
                                onLongLatChanged={(longLat) => {
                                    dispatcher({ latitude: longLat[0].toString(), longitude: longLat[1].toString() });
                                }}
                            />
                        </MapContainer>
                    </CardContent>
                </Card>
                <div className="flex justify-end mt-4">
                    <Button onClick={() => dispatcher({ name: '', latitude: '', longitude: '', code: '' })} variant="outline" className="hover:text-gray-600 mr-2">Cancel</Button>
                    <Button onClick={() => {
                        mutate({ name: state.name, stateCode: state.code, latitude: parseFloat(state.latitude), longitude: parseFloat(state.longitude), zoomFactor: zoomFactor, countryId: countryId });
                    }}>Save</Button>
                </div>
            </div>
        </main>
    )
}