"use client"
import { EntryGatesTable } from "@/components/gates/gates-table";
import PageHeader from "@/components/page-header";
import { ParkingTable } from "@/components/parking/parking-table";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { DoorOpen, Filter, ParkingSquare, Plus, Search, Table } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react";

type tabsType = 'parkings' | 'gates';
type tabsRefType = tabsType | null;

export default () => {
    const navigator = useRouter();
    const [currentActiveTabValue, setCurrentActiveTabValue] = useState<tabsRefType>('parkings');

    return (
        <main className="p-6">
            <div className="flex justify-between">
            <PageHeader title="Parkings" subtitle="Manage your parking lots and spaces" className="mb-6"/>
            <div className="actions flex gap-2">
                <Button onClick={() => navigator.push('/parkings/new')}><Plus fontWeight={900} style={{fontWeight: 900}} /></Button>
                <Button onClick={() => {}}><Filter/></Button>
                <Button variant={'outline'} className="text-muted-foreground hover:text-white" onClick={() => {}}>
                    <div className="flex items-center gap-2">
                        <Search/>
                        <p>Ctrl + K</p>
                    </div>
                    </Button>
            </div>
            </div>
            <div className="table-wrap">
                <Tabs defaultValue="parkings" onValueChange={(currentValue) => {
                    console.log(currentValue);
                    setCurrentActiveTabValue(currentValue as tabsRefType);                    
                }}>
                    <TabsList  className="flex gap-2 py-1 px-4 w-fit rounded-lg bg-[#13161A]">
                        <TabsTrigger className={`px-3 py-1 hover:bg-gray-800 rounded-lg text-gray-400 ${currentActiveTabValue === 'parkings' ? 'bg-primary text-white' : ''}`} value="parkings">
                            <div className="flex items-center gap-2">
                                <ParkingSquare size={18}/>
                                <p className="text-xs font-bold">Parkings</p>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger className={`px-3 py-1 hover:bg-gray-800 text-gray-400 rounded-lg ${currentActiveTabValue === 'gates' ? 'bg-primary text-white' : ''}`} value="gates">
                            <div className="flex items-center gap-2">
                                <DoorOpen size={18}/>
                                <p className="text-xs font-bold">Parkings Gets</p>
                            </div>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="parkings">
                        <ParkingTable className="mt-4"/>
                    </TabsContent>
                    <TabsContent value="gates">
                        <EntryGatesTable className="mt-4"/>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}