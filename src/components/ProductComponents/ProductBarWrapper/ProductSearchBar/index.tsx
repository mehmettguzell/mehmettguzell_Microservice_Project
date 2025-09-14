"use client";

interface Props{
    value: string;
    onChange: (val: string) => void;
}

export default function ProductSearchBar({value, onChange}: Props) {
    return(
        <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search products..."
        />
    );
}