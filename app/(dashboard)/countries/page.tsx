'use client';
import { CountriesTable } from "@/components/countries/countries";
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { Filter, Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation";

export default () => {
    const navigator = useRouter();
    return (
        <main className="p-6">
            <div className="flex justify-between w-full">
                <PageHeader title="Countries" subtitle="Manage countries here" />
                <div className="actions flex gap-2">
                    <Button onClick={() => navigator.push('/parkings/new')}><Plus fontWeight={900} style={{ fontWeight: 900 }} /></Button>
                    <Button onClick={() => { }}><Filter /></Button>
                    <Button variant={'outline'} className="text-muted-foreground hover:text-white" onClick={() => { }}>
                        <div className="flex items-center gap-2">
                            <Search />
                            <p>Ctrl + K</p>
                        </div>
                    </Button>
                </div>
            </div>
                <div className="table-wrapper">
                    {/* Table component goes here */}
                    <CountriesTable />
                </div>
        </main>
    )
}