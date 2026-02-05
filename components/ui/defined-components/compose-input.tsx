import { ComponentProps } from "react";
import { Input } from "../input";

export const ComposeInput = ({
    value,
    onValueChange,
    errorMessage,
    label,
    postIcon,
    ...props
}: {
    onValueChange?: (value: string) => void;
    label?: string;
    errorMessage?: string;
    postIcon?: React.ReactNode;
} & ComponentProps<'input'>) => {
    return (
        <div>
            {label && <label className='text-muted-foreground text-sm mb-1 block'>{label}</label>}
            <div className="relative">
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
            {postIcon && <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">{postIcon}</div>}
            </div>
            {
                errorMessage && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            }
        </div>
    );
}