'use client';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { cityApi, countryApi } from "@/lib/api";
import { CityCreate, CityResponse, CountryFuzzySearch } from "@/lib/types";
import { cityCreateValidator } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Filter, Plus, Search } from "lucide-react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CitiesTable } from "@/components/cities/cities";
import { useRouter } from "next/navigation";

export default () => {
    const [addcityOpen, setAddcityOpen] = useState(false);
    const navigator = useRouter();

    return (
        <main className="p-6">
            <div className="flex justify-between w-full">
                <PageHeader title="Cities" subtitle="Manage cities here" />
                <div className="actions flex gap-2">
                    <Button onClick={() => navigator.push('/cities/new')}><Plus fontWeight={900} style={{ fontWeight: 900 }} /></Button>
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
        </main>
        
    )
}