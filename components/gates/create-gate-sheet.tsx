import { EntryGateCreate, Direction } from "@/lib/types";
import { use, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { entryGateApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ComposeInput } from "../ui/defined-components/compose-input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Network, NetworkIcon, ZapIcon } from "lucide-react";
import { addClassWithCondition } from "@/lib/utils";
import { gateCreateValidator } from "@/lib/validators";
import toast from "react-hot-toast";
import { t } from "i18next";

interface CreateGateSheetProps {
    parking?: {
        id: string,
        name: string,
        cityName: string,
        countryName: string,
    } | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export const CreateGateSheet = ({
    parking,
    open,
    onOpenChange,
    onSuccess,
}: CreateGateSheetProps) => {
    const connectionTester = useRef<WebSocket | null>(null);
    const [socketState, setSocketState] = useState<'idle' | 'initialized' | 'connected' | 'error'>('idle');
    const queryClient = useQueryClient();

    const handleSocketToggle = () => {
        if (!connectionTester.current || socketState === 'idle' || socketState === 'error') {
            // create websocket
            const ws = new WebSocket("wss://echo.websocket.org");
            connectionTester.current = ws;

            ws.addEventListener("open", () => {
                setSocketState("connected");
                console.log("WebSocket connected");
            });

            ws.addEventListener("message", (e) => {
                console.log("Message:", e.data);
            });

            ws.addEventListener("close", () => {
                setSocketState("idle");
                console.log("WebSocket closed");
                connectionTester.current = null;
            });

            ws.addEventListener("error", (e) => {
                setSocketState("error");
                console.error("WebSocket error", e);
            });

            setSocketState("initialized");
        } else if (connectionTester.current && socketState === "connected") {
            connectionTester.current.close();
        }
    };

    const [openDirectionDropdown, setOpenDirectionDropdown] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        direction: Direction;
        hardwareId: string;
        isActive: boolean;
    }>({
        name: "",
        direction: Direction.IN,
        hardwareId: "",
        isActive: true,
    });
    const mutation = useMutation({
        mutationFn: (data: EntryGateCreate) => {
            const errors = gateCreateValidator.safeParse(data);
            if (!errors.success) {
                const errorMessages = errors.error.errors.map((err) => err.message).join(", ");
                throw new Error(errorMessages);
            }
            return entryGateApi.create(data);
        },
        onSuccess: () => {
            setFormData({
                name: "",
                direction: Direction.IN,
                hardwareId: "",
                isActive: true,
            });
            queryClient.invalidateQueries({queryKey: ['gates']});
            onOpenChange(false);
            toast.success("Gate created successfully");
            onSuccess?.();
        },
        onError: (error) => {
            toast.error((error as Error).message || "Failed to create gate. Please try again.", {
                duration: 5000,
            });
        }
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (parking) {
            mutation.mutate({ ...formData, parkingId: parking.id });
        }
    };
    const generateName = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return (formData.direction === Direction.IN ? "in-gate-" : "out-gate-") + Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="min-w-150">
                <SheetHeader>
                    <SheetTitle>Create Entry Gate</SheetTitle>
                    <SheetDescription>Add a new entry gate to the system</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {
                        parking ? (
                            <div className="border p-4 mx-2 rounded-md">
                                <p className="text-sm text-foreground">
                                    Parking's Information
                                </p>
                                <ComposeInput label="Parking" value={parking.name || parking.id} disabled />
                                <ComposeInput label="Country" value={parking.countryName} disabled />
                                <ComposeInput label="City" value={parking.cityName} disabled />
                            </div>
                        ) : (
                            <div className="h-10 bg-muted/50 animate-pulse rounded" />
                        )
                    }
                    <div className="px-4 flex flex-col gap-2">
                        <div className="space-y-2 relative">
                            <ComposeInput label="Gate Name" placeholder="descriptive name, eg left gate" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} postIcon={
                                <ZapIcon className="cursor-pointer size-4 text-muted-foreground hover:text-foreground" onClick={() => setFormData({ ...formData, name: generateName() })
                                } />} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="direction" className="text-muted-foreground text-sm mb-1 block">Direction</label>
                            <DropdownMenu onOpenChange={setOpenDirectionDropdown}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between hover:bg-primary/20 hover:text-foreground">
                                        {formData.direction === Direction.IN ? "In" : "Out"}
                                        {
                                            openDirectionDropdown ? <span className="ml-2">▴</span> : <span className="ml-2">▾</span>
                                        }
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="left-0 right-0">
                                    <DropdownMenuCheckboxItem className="" checked={formData.direction === Direction.IN} onCheckedChange={() => setFormData({ ...formData, direction: Direction.IN })}>
                                        In
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked={formData.direction === Direction.OUT} onCheckedChange={() => setFormData({ ...formData, direction: Direction.OUT })}>
                                        Out
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="space-y-2 mb-2">
                            <ComposeInput label="Hardware ID" placeholder="hardware identifier, eg: mac address" value={formData.hardwareId} onChange={(e) => setFormData({ ...formData, hardwareId: e.target.value })}
                                postIcon={
                                    <Button type="button" variant={'link'} className={`size-4 cursor-pointer text-muted-foreground hover:text-foreground ${addClassWithCondition(socketState === 'connected', 'text-primary')}`} onClick={() => { handleSocketToggle() }}>
                                        <NetworkIcon />
                                    </Button>
                                } />
                        </div>
                        <Button type="submit" disabled={mutation.isPending} className="w-full">
                            {mutation.isPending ? "Creating..." : "Create Gate"}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};