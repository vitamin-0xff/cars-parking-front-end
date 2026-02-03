import { ComponentProps } from "react";
import { Input } from "../input";

export const ComposeInput = ({
    value,
    onValueChange,
    errorMessage,
    label,
    ...props
}: {
    onValueChange?: (value: string) => void;
    label?: string;
    errorMessage?: string;
} & ComponentProps<'input'>) => {
    return (
        <div>
            {label && <label className='text-muted-foreground text-sm mb-1 block'>{label}</label>}
            <Input
                {...props} 
                className="flex-1"
                value={value}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                    }
                }}
            />
            {
                errorMessage && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            }
        </div>
    );
}