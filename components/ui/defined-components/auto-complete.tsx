import { useEffect, useRef, useState } from 'react';
import { Input } from '../input';

export type AutocompleteItem = {
    id: string;
    label: string;
};

type AutocompleteProps<T extends AutocompleteItem> = {
    value: string;
    items: T[];
    placeholder?: string;
    loading?: boolean;
    onChange: (value: string) => void;
    onSelect: (item: T) => void;
    renderItem?: (item: T, active: boolean) => React.ReactNode;
    className?: string;
};

export function Autocomplete<T extends AutocompleteItem>({
    value,
    items,
    placeholder,
    loading = false,
    onChange,
    onSelect,
    renderItem,
    className = '',
}: AutocompleteProps<T>) {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!open) return;

        if (e.key === 'ArrowDown') {
            setActiveIndex((i) => Math.min(i + 1, items.length - 1));
        }
        if (e.key === 'ArrowUp') {
            setActiveIndex((i) => Math.max(i - 1, 0));
        }
        if (e.key === 'Enter' && activeIndex >= 0) {
            onSelect(items[activeIndex]);
            setOpen(false);
        }
        if (e.key === 'Escape') {
            setOpen(false);
        }
    }

    return (
        <div ref={containerRef} className={className} style={{ position: 'relative' }}>
            <Input
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    onChange(e.target.value);
                    setOpen(true);
                }}
                onKeyDown={handleKeyDown}
                style={{ width: '100%', padding: '8px' }}
            />

            {open && (
                <div
                style={{
                    top: 'calc(100% + 5px)',
                }} 
                className='min-h-7 max-h-60 overflow-y-auto border border-gray-600 rounded-md absolute bg-gray-900 z-9999 w-full'
                >
                    {loading && 
                        <div className='text-center text-sm font-bold text-gray-500 my-2'>Loading ...</div>
                    }
                    {!loading && items.length === 0 && (
                        <div className='text-center text-sm font-bold text-gray-500 my-2'>No results</div>
                    )}
                    {items.map((item, index) => {
                        const active = index === activeIndex;
                        return (
                            <div
                                key={item.id}
                                onMouseDown={() => {
                                    onSelect(item);
                                    setOpen(false);
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                                style={{
                                    padding: 8,
                                    cursor: 'pointer',
                                }}
                            >
                                {renderItem ? renderItem(item, active) : item.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
