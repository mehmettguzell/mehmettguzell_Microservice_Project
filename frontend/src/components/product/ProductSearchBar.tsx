"use client";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function ProductSearchBar({ value, onChange }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full p-4 rounded-2xl border border-gray-300 bg-white/50 backdrop-blur-md text-gray-800 placeholder-gray-400 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:shadow-lg"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </div>
  );
}
