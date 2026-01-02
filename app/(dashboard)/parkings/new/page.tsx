"use client"
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { parkingCreateValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MapIcon } from "lucide-react";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { LatLng } from "leaflet";

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    click(e) {
        console.log(e);
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}


export default () => {
    const navigator = useRouter();
    const {register, watch, reset, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: zodResolver(parkingCreateValidator),
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            creditBalance: 0,
        }
    });
    const position: [number, number] = [36.8065, 10.1815];

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
                            <div title="first-name">
                                <label className="block text-sm font-medium mb-1 text-muted-foreground" htmlFor="username">Name</label>
                                <Input id="Parking's Name" placeholder="Eg, Parking Mohamed Saadoun"/>
                                {/* {
                                    errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p> 
                                } */}
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
                            <MapContainer style={{ height: '400px' }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
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