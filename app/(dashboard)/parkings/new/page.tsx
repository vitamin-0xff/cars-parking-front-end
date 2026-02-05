"use client"
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CityCreateInput, ParkingCreateInput, parkingCreateValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MapIcon, ParkingCircle } from "lucide-react";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { forwardRef, ReactNode, use, useEffect, useReducer, useState } from "react";
import L, { LatLng } from "leaflet";
import { Autocomplete, AutocompleteItem } from "@/components/ui/defined-components/auto-complete";
import { useCountrySearch } from "@/hooks/use-country-search";
import { CityResponse, CountryFuzzySearch, ParkingCreate, ParkingStatus } from "@/lib/types";
import { cityApi, parkingApi } from "@/lib/api";
import { set } from "zod";
import toast from "react-hot-toast";
import { ComposeInput } from "@/components/ui/defined-components/compose-input";
import { useMutation } from "@tanstack/react-query";



// Create a DivIcon from JSX
const reactIconDivIcon = new L.DivIcon({
    className: 'bg-transparent',
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M54.93 8H9.07a3.13 3.13 0 0 0-2.8 4.53L29.2 58.28a3.13 3.13 0 0 0 5.59 0l22.93-45.7A3.13 3.13 0 0 0 54.93 8zM40 28.31A1.69 1.69 0 0 1 38.31 30h-3.76a.55.55 0 0 0-.55.55v3.76A1.69 1.69 0 0 1 32.31 36h-.62A1.69 1.69 0 0 1 30 34.31v-3.76a.55.55 0 0 0-.55-.55h-3.76A1.69 1.69 0 0 1 24 28.31v-.62A1.69 1.69 0 0 1 25.69 26h3.76a.55.55 0 0 0 .55-.55v-3.76A1.69 1.69 0 0 1 31.69 20h.62A1.69 1.69 0 0 1 34 21.69v3.76a.55.55 0 0 0 .55.55h3.76A1.69 1.69 0 0 1 40 27.69z" style="fill:#0072ff" data-name="Layer 2"/></svg>',
    iconSize: [32, 32],
});


const position: [number, number] = [36.8065, 10.1815];


const LocationMarker = forwardRef(({
    onPositionChanged,
}: {
    onPositionChanged: (latlng: LatLng, zoomFactor: number) => void;
}, ref) => {
    const [position, setPosition] = useState<LatLng | null>(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onPositionChanged(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker draggable icon={reactIconDivIcon} position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
});

function LatitudeLongitudeSetter({lat, lng, zoom, onPositionChange}: {lat: number, lng: number, zoom: number, onPositionChange?: (latlng: LatLng, zoomFactor: number) => void}) {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], zoom);
    }, [lat, lng, zoom]);
    useMapEvents({
        dragend: () => {
            const center = map.getCenter();
            if (onPositionChange) {
                onPositionChange(center, map.getZoom());
            }
        },
        zoomend: () => {
            if (onPositionChange) {
                const center = map.getCenter();
                onPositionChange(center, map.getZoom());
            }
        }
    });
    return null;
}

export default () => {
    type CreateParkingInputErrors = {
        [key in keyof ParkingCreateInput]?: string[] | null
    }

    const navigator = useRouter();
    const [countrySearchTerm, setCountrySearchTerm] = useState('');
    const [countresFuzzySearch, setCountriesFuzzySearch] = useState<CountryFuzzySearch[]>([]);
    const [areWeSearching, setAreWeSearching] = useState(false);
    const [governorates, setGovernorates] = useState<CityResponse[] | null>();
    const [governorateSaver, setGovernorateSaver] = useState<CityResponse[] | null>(null);
    const [latitude, setLatitude] = useState(position[0]);
    const [longitude, setLongitude] = useState(position[1]);
    const [zoomFactor, setZoomFactor] = useState(4);
    const [markerPosition, setMarkerPosition] = useState<{lat: number, lng: number, zoomFactor: number} | null>(null);
    const [capacity, setCapacity] = useState('');
    const [occupiedCapacity, setOccupiedCapacity] = useState('');
    const [name, setName] = useState('');

    const [errors, errorsDispatcher] = useReducer((state: CreateParkingInputErrors, action: Partial<CreateParkingInputErrors>) => {
        return {
            ...state,
            action
        }
    }, {});

    // search through countries
    useCountrySearch({
        serachTerm: countrySearchTerm,
        onResult: setCountriesFuzzySearch,
        onError: (error) => {
            toast.error('Error searching countries');
        },
        abordController: new AbortController(),
        onLoadingStatusChanged: setAreWeSearching
    });
    const [selectedElement, setSelectedElement] = useState<CountryFuzzySearch | null>(null);
    useEffect(() => {
        if (selectedElement) {
            // fetch governorates for the selected country
            cityApi.getByCountryId(selectedElement.id, { page: 0, size: 100 }).then((res) => {
                setGovernorates(res.content);
                setGovernorateSaver(res.content);
            }).catch((e) => {
                toast.error('Error fetching governorates');
            });
        } else {
            setGovernorates(null);
        }
    }, [selectedElement]);
    // search through governorates
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGovernorate, setSelectedGovernorate] = useState<CityResponse | null>(null);
    const searchThroughGovernorates = (searchTerm: string) => {
        if (!selectedElement || !governorates) return;
        if( searchTerm.trim() === '') {
            setGovernorates(governorateSaver);
            return;
        }
        const filtered = governorates.filter((gov) => gov.name.toLowerCase().includes(searchTerm.toLowerCase()) || gov.stateCode.toLowerCase().includes(searchTerm.toLowerCase()));
        setGovernorates(filtered);
    };
    useEffect(() => {
        searchThroughGovernorates(searchTerm);
    }, [searchTerm]);
    useEffect(() => {
        if (selectedGovernorate) {
            const lat = selectedGovernorate.latitude;
            const lng = selectedGovernorate.longitude;
            if (!isNaN(lat) && !isNaN(lng)) {
                setLatitude(lat);
                setLongitude(lng);
                setZoomFactor(selectedGovernorate.zoomFactor);
            }
        }
    }, [selectedGovernorate]);
    const {isPending, mutate} = useMutation({
        mutationFn: async (data: ParkingCreateInput) => {
            const validation = parkingCreateValidator.safeParse(data);
            if(validation.success) {
                // last step sync
                return parkingApi.create({...data, status: ParkingStatus.OPEN});
            }
            errorsDispatcher(validation.error.formErrors.fieldErrors);
            console.log(validation.error.formErrors.fieldErrors);
            throw new Error(validation.error.errors.map(e => e.message).join(', '));
        },
        mutationKey: ['parkings'],
        onError: (e) => {
            toast.error("Error creating parking resource: " + (e as Error).message, {duration: 8000});
        },
        onSuccess: (data) => {
            toast.success("Parking resource created successfuly " + data?.id);
            setName('');
            setLatitude(position[0]);
            setLongitude(position[1]);
            setZoomFactor(4);
            setMarkerPosition(null);
            setCapacity('');
            setOccupiedCapacity('');
            setSelectedElement(null);
            setSearchTerm('');
            setCountrySearchTerm('');
            setSelectedGovernorate(null);
            setGovernorates(null);
            setMarkerPosition(null);
            errorsDispatcher({});
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
                <PageHeader title="New Parking" subtitle="Create a new parking here" />
            </div>
            <div className="div">
                <Card>
                    <CardHeader>
                        <CardTitle>Parking's Data</CardTitle>
                        <CardDescription>
                            Parking's information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ComposeInput label="Parking name" placeholder="Eg, Parking Mohamed Sadoun" value={name} onChange={(e) => setName(e.currentTarget.value)} errorMessage={errors.name?.join(', ')}/>
                            <ComposeInput value={markerPosition?.lat || latitude} label="Latitude" placeholder="Eg, 36.8065" onChange={(e) => {
                                const newValue = parseFloat(e.currentTarget.value);
                                if (isNaN(newValue)) {
                                    return;
                                }
                                setMarkerPosition({lat: newValue, lng: markerPosition?.lng || longitude, zoomFactor: markerPosition?.zoomFactor || zoomFactor});
                            }} errorMessage={errors.latitude?.join(', ')} />
                            <ComposeInput value={markerPosition?.lng ?? longitude} label="Longitude" placeholder="Eg, 10.1815" onChange={(e) =>  {
                                const newValue = parseFloat(e.currentTarget.value);
                                if (isNaN(newValue)) {
                                    return;
                                }
                                setMarkerPosition({lng: newValue, lat: markerPosition?.lat || longitude, zoomFactor: markerPosition?.zoomFactor || zoomFactor});
                                setLongitude(newValue);
                            }} errorMessage={errors.longitude?.join(', ')} /> 
                            <ComposeInput type="number" value={markerPosition?.zoomFactor || zoomFactor} label="Zoom Factor" placeholder="Eg 10" onChange={(e) => {
                                const newValue = parseFloat(e.currentTarget.value);
                                if (isNaN(newValue)) {
                                    return
                                }
                                setMarkerPosition({lng: markerPosition?.lng || longitude, lat: markerPosition?.lat || longitude, zoomFactor: newValue});
                                setZoomFactor(newValue);
                            }} />
                            <ComposeInput value={capacity} onChange={(e) => {
                                setCapacity(e.currentTarget.value);
                            }} type="number" label="Total Capacity" placeholder="Eg 100" errorMessage={errors.totalCapacity?.join(', ')} />
                            <ComposeInput value={occupiedCapacity} onChange={(e) => {
                                setOccupiedCapacity(e.currentTarget.value);
                            }} type="number" label="Current Ocuppied Capacity" placeholder="Eg 100" />
                            <div title="country">
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="country">Country</label>
                                <Autocomplete placeholder="Eg, Tunisia" value={selectedElement == null ? countrySearchTerm : selectedElement.name} onChange={(value) => { setSelectedElement(null); setCountrySearchTerm(value) }} onSelect={(value) => {
                                    const country = countresFuzzySearch.find((c) => c.id === value.id);
                                    setSelectedElement(country ?? null);
                                }} items={countresFuzzySearch.map<AutocompleteItem>((value) => { return { label: value.name, id: value.id } })} loading={areWeSearching} />
                            </div>
                            {
                                governorates && (
                                    <div>

                                    <div title="country">
                                        <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="governorate">Governorate ({governorateSaver!.length})</label>
                                        <Autocomplete placeholder="Eg, Ariana" value={searchTerm} onChange={(e) => {
                                            setSelectedGovernorate(null);
                                            setSearchTerm(e);
                                        }}
                                         onSelect={(e) => {
                                            setSearchTerm(e.label);
                                            setSelectedGovernorate(governorates.find(gov => gov.id === e.id) || null);
                                          }}
                                         items={governorates.map(it => {return {id: it.id, label: it.name + '('+ it.stateCode + ')'}})} loading={false} />
                                    </div>
                                        {errors.cityId && <p className="text-sm text-red-600 mt-1">{errors.cityId}</p>}
                                    </div>
                                )
                            }
                        </div>
                    </CardContent>
                </Card>
                <div className="map relative">
                    <Card className="mt-2">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex items-center gap-2">
                                    <MapIcon />
                                    <p>Parking Location</p>
                                </div>
                            </CardTitle>
                            <CardDescription>TN-AR
                                Select the parking location on the map.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MapContainer style={{ height: '400px' }} center={[position[0], position[1]]} zoom={zoomFactor ?? 7} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker onPositionChanged={(latlng, zoomFactor) => {
                                    setMarkerPosition({ lat: latlng.lat, lng: latlng.lng, zoomFactor: zoomFactor});
                                }} />
                                <LatitudeLongitudeSetter lat={latitude} lng={longitude} zoom={zoomFactor} onPositionChange={(values, newZoom) => {
                                    setLatitude(values.lat);
                                    setLongitude(values.lng);
                                    setZoomFactor(newZoom);
                                    // setParkingPosition({ lat: values.lat, lng: values.lng, zoomFactor: newZoom});
                                }} />
                            </MapContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="actions mt-2 flex justify-end">
                    <Button variant="outline" className="hover:text-gray-500 mr-2" onClick={() => {}}>
                        <ArrowLeft />
                        <p>Cancel</p>
                    </Button>
                    <Button
                        disabled={isPending}
                        onClick={() => {
                            mutate({
                                name,
                                latitude: markerPosition?.lat || latitude,
                                longitude: markerPosition?.lng || longitude,
                                totalCapacity: isNaN(parseInt(capacity)) ? 0 : parseInt(capacity),
                                currentOccupied: isNaN(parseInt(occupiedCapacity)) ? 0 : parseInt(occupiedCapacity),
                                cityId: selectedGovernorate ? selectedGovernorate.id : '',
                                zoomFactor: markerPosition?.zoomFactor || zoomFactor
                            });
                        }}>
                        <ParkingCircle />
                        <p>Create Parking</p>
                    </Button>
                </div>
            </div>
        </main>
    )
}