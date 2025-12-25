'use client';

import { Input, Label } from '@/components/ui';

interface SearchBoxProps {
  searchTerm: string;
  onChange: (value: string) => void;
}

export function SearchBox({ searchTerm, onChange }: SearchBoxProps) {
  return (
    <div >
      <Input
        type="text"
        placeholder="Search in Products ..."
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
    </div>
  );
}