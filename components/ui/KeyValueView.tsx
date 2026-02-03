import { cn } from "@/lib/utils";

type Propos = {
    keyT: string;
    value: string;
    focus?: 'key' | 'value';
    rowOrCol?: 'row' | 'col';
    className?: string;
} 

export const KeyValueView = ({keyT, value, focus = "value", rowOrCol = "col", className}: Propos) => {
    return (
        <div className={cn(`flex flex-${rowOrCol} gap-1 ${rowOrCol == 'row' ? 'items-center justify-between' : ''}`, className)}>
            <span className={`${rowOrCol == 'row' ? '' : 'text-sm'} ${focus == 'value' ? 'font-medium text-muted-foreground' : ''} `}>{keyT}</span>
            <span className={`text-md font-semibold ${focus == 'key' ? 'font-medium text-muted-foreground' : ''}`}>{value}</span>
        </div>
    )
}