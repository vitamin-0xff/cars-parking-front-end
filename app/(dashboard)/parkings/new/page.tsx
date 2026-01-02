"use client"
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { parkingCreateValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MapIcon, ParkingCircle } from "lucide-react";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import L, { LatLng } from "leaflet";
import { Autocomplete, AutocompleteItem } from "@/components/ui/defined-components/auto-complete";
import { useCountrySearch } from "@/hooks/use-country-search";
import { CountryFuzzySearch } from "@/lib/types";



// Create a DivIcon from JSX
const reactIconDivIcon = new L.DivIcon({
    className: 'bg-transparent',
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M54.93 8H9.07a3.13 3.13 0 0 0-2.8 4.53L29.2 58.28a3.13 3.13 0 0 0 5.59 0l22.93-45.7A3.13 3.13 0 0 0 54.93 8zM40 28.31A1.69 1.69 0 0 1 38.31 30h-3.76a.55.55 0 0 0-.55.55v3.76A1.69 1.69 0 0 1 32.31 36h-.62A1.69 1.69 0 0 1 30 34.31v-3.76a.55.55 0 0 0-.55-.55h-3.76A1.69 1.69 0 0 1 24 28.31v-.62A1.69 1.69 0 0 1 25.69 26h3.76a.55.55 0 0 0 .55-.55v-3.76A1.69 1.69 0 0 1 31.69 20h.62A1.69 1.69 0 0 1 34 21.69v3.76a.55.55 0 0 0 .55.55h3.76A1.69 1.69 0 0 1 40 27.69z" style="fill:#0072ff" data-name="Layer 2"/></svg>',
    iconSize: [32, 32],
});


const position: [number, number] = [36.8065, 10.1815];

function LocationMarker() {
    const [position, setPosition] = useState<LatLng | null>(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            console.log(e);
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    });

    return position === null ? null : (
        <Marker draggable icon={reactIconDivIcon} position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default () => {
    const navigator = useRouter();
    const { register, watch, reset, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(parkingCreateValidator),
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            creditBalance: 0,
        }
    });

    const [countrySearchTerm, setCountrySearchTerm] = useState('');
    const [countresFuzzySearch, setCountriesFuzzySearch] = useState<CountryFuzzySearch[]>([]);
    const [areWeSearching, setAreWeSearching] = useState(false);


    useCountrySearch({
        serachTerm: countrySearchTerm,
        onResult: setCountriesFuzzySearch,
        onError: (error) => { console.log(error) },
        abordController: new AbortController(),
        onLoadingStatusChanged: setAreWeSearching
    })

    const [selectedElement, setSelectedElement] = useState<CountryFuzzySearch | null>(null);

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
                            <div title="parking-name">
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Name</label>
                                <Input id="Parking's Name" placeholder="Eg, Parking Mohamed Saadoun" />
                                {
                                    // errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p> 
                                }
                            </div>
                            <div title="country">
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Country</label>
                                <Autocomplete placeholder="Eg, Tunisia" value={selectedElement == null ? countrySearchTerm : selectedElement.name} onChange={(value) => { setSelectedElement(null); setCountrySearchTerm(value) }} onSelect={(value) => {
                                    const country = countresFuzzySearch.find((c) => c.id === value.id);
                                    setSelectedElement(country ?? null);
                                }} items={countresFuzzySearch.map<AutocompleteItem>((value) => { return { label: value.name, id: value.id } })} loading={areWeSearching} />
                            </div>
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
                            <CardDescription>
                                Select the parking location on the map.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MapContainer style={{ height: '400px' }} center={position} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker />
                            </MapContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}