'use client';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComposeInput } from '@/components/ui/defined-components/compose-input';
import { countrySearchOpenStreetMap } from '@/lib/third-party-api';
import { capitalizeFirstLetter } from '@/lib/utils';
import { ArrowLeft, ScanSearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useReducer, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CountryCreate } from '@/lib/types';
import { countryApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { countryCreateValidator } from '@/lib/validators';
import { t } from 'i18next';
import { set } from 'zod';

type CountryFormState = {
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

export function MoveMap({ center, onZoomChanged, onLongLatChanged }: Props) {
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
  return null;
}


function MoveMapChanges({center}: {center?: [number, number] | null}) {
    if(center == undefined) {
        return null;
    }
    const map = useMap();
    map.setView(center);
    return null;
}


export default () => {
    const navigator = useRouter();
    const queryClient = useQueryClient();
    const [searching, setSearching] = useState(false);
    const [state, dispatcher] = useReducer(
        (state: CountryFormState, action: Partial<CountryFormState>) => {
            return { ...state, ...action };
        },
        {
            name: '',
            code: '',
            latitude: '',
            longitude: ''
        }
    );
    const [zoomFactor, setZoomFactor] = useState(4);
    const {longitude, latitude} = useMemo(() => {
        const latitude = isNaN(parseFloat(state.latitude)) ?  11.1 : parseFloat(state.latitude);
        const longitude = isNaN(parseFloat(state.longitude)) ?  9.1 : parseFloat(state.longitude);

        return {
            latitude: latitude,
            longitude: longitude
        }
    }, [state]);
    const [searchedLongLat, setSearchedLongLat] = useState<[number, number] | null>(null);
    const handleSearchCountry = async (query: string) => {
        if(!query || query.trim() === '') {
            return;
        }
        setSearching(true);
        try {
            const results = await countrySearchOpenStreetMap(query);
            if (results.length > 0) {
                const countryData = results[0];
                dispatcher({
                    name: countryData.display_name,
                    latitude: countryData.lat,
                    longitude: countryData.lon,
                    code: countryData.address?.country_code?.toUpperCase() || ''
                });
                setSearchedLongLat([parseFloat(countryData.lat), parseFloat(countryData.lon)]);
                toast.success('Country data loaded from search');
            }else {
                toast.error('No country found for the given query');
            }
        } catch (error) {
            console.log('Error searching for country:', error);
        } finally {
            setSearching(false);
        }
    };


     const {mutate} = useMutation({
        mutationFn: async (countryCreate: CountryCreate) => {
            const errors = countryCreateValidator.safeParse(countryCreate);
            if(!errors.success) {
                throw new Error(errors.error.errors.map(e => e.message).join(', '));
            }
             return countryApi.create(countryCreate)
        },
        onSuccess: (e) => {
            toast.success('Country created successfully');
            queryClient.invalidateQueries({queryKey: ['countries']});
            dispatcher({name: '', code: '', latitude: '', longitude: ''});
            setSearching(false);
            setZoomFactor(4);
        },
        onError: (error) => {
            toast.error('Failed to create country ' + error.message);
        }
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
                <PageHeader title="New Country" subtitle="Create a new country here" />
            </div>
            <div className="mt-2 relative">
                <Card className='relative'>
                    {
                        searching &&
                        <div className="absolute rounded-xl top-0 left-0 right-0 bottom-0 bg-gray-900/45"></div>
                    }
                    <CardHeader>
                        <CardTitle>Country's Data</CardTitle>
                        <CardDescription>
                            Country's information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                            <div className='relative'>
                                <ComposeInput onChange={(e) => dispatcher({name: capitalizeFirstLetter(e.currentTarget.value)})} value={state.name} label="Country Name" placeholder="Eg, Tunisie" />
                                <div onClick={() => {
                                    if (searching) return;
                                    handleSearchCountry(state.name);
                                }} className='absolute top-9 -translate-y-[25%] right-3 text-muted-foreground cursor-pointer hover:bg-gray-800 rounded'>
                                    <ScanSearchIcon />
                                </div>
                            </div>
                            <ComposeInput onChange={(e) => dispatcher({latitude: e.currentTarget.value})} value={state.latitude} label="Latitude" placeholder="Eg, 10.20" />
                            <ComposeInput onChange={(e) => dispatcher({longitude: e.currentTarget.value}) } value={state.longitude} label="Longitude" placeholder="Eg, 9.20" />
                            <div className='relative'>
                                <ComposeInput onChange={(e) => dispatcher({code: e.currentTarget.value.toUpperCase()})} value={state.code} label="Code" placeholder="TN" />
                                <div onClick={() => {
                                    if (searching) return;
                                    handleSearchCountry(state.code);
                                }} className='absolute top-9 -translate-y-[25%] right-3 text-muted-foreground cursor-pointer hover:bg-gray-800 rounded'>
                                    <ScanSearchIcon />
                                </div>
                            </div>
                            <ComposeInput readOnly type='number' value={zoomFactor} label="Zoom Factor" placeholder="Eg 10" />
                        </div>
                    </CardContent>
                </Card>
                <Card className='mt-2'>
                    <CardHeader>
                        <CardTitle>Map</CardTitle>
                        <CardDescription>
                            Map showing the country's location.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                            <MapContainer className='h-100' center={[latitude, longitude]} zoom={4} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[latitude, longitude]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            <MoveMap center={[latitude, longitude]} zoom={zoomFactor} onZoomChanged={(newZoom) => setZoomFactor(newZoom)}
                            onLongLatChanged={(longLat) => {
                                setSearchedLongLat(null); // change long lat from search to null in order to not override user changes (it is a solution workaround to a react-leaflet issue)
                                dispatcher({latitude: longLat[0].toString(), longitude: longLat[1].toString()});
                            }}
                            />
                            <MoveMapChanges center={searchedLongLat} />
                            </MapContainer>
                    </CardContent>
                </Card>
                <div className="flex justify-end mt-4">
                    <Button onClick={() => dispatcher({name: '', latitude: '', longitude: '', code: ''})} variant="outline" className="hover:text-gray-600 mr-2">Cancel</Button>
                    <Button onClick={() => {
                        mutate({name: state.name, isoCode: state.code, latitude: parseFloat(state.latitude), longitude: parseFloat(state.longitude), zoomFactor: zoomFactor});
                    }}>Save</Button>  
                </div>
            </div>
        </main>
    )
}