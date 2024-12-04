"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, Check } from "lucide-react";

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (categoryId: string) => void;
}

export function CategorySelector({
  categories,
  onSelect,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-center sm:justify-start items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
      >
        {value ? categories.find((category) => category._id === value)?.title : 'Filter by category'}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
      </button>
      {open && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-2">
          <input
            type="text"
            placeholder="Search categories"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border-b"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredCategories.map((category) => (
              <li
                key={category._id}
                onClick={() => {
                  setValue(value === category._id ? '' : category._id);
                  onSelect(category._id);
                  setOpen(false);
                }}
                className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                {category.title}
                {value === category._id && <Check className="h-4 w-4" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}