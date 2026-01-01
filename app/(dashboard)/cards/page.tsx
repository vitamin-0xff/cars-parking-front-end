'use client';
import { CardsTable } from "@/components/cards/cards-table";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";


export default () => {
    return (
        <main className="p-6">
            <div className="flex justify-between w-full">
                <PageHeader title="Cities" subtitle="Manage cities here" />
                <div className="actions flex gap-2">
                    <Button onClick={() => {}}><Plus fontWeight={900} style={{ fontWeight: 900 }} /></Button>
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
                <CardsTable />
            </div>
        </main>
        
    )
}