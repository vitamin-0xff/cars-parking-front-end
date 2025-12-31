"use client"
import PageHeader from "@/components/page-header";
import { ParkingTable } from "@/components/parking/parking-table";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search, Table } from "lucide-react";
import { useRouter } from "next/navigation"

export default () => {
    const navigator = useRouter();
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
                <ParkingTable className="w-full"/>
            </div>
        </main>
    )
}