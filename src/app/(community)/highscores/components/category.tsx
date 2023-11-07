'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FilterVocation({ options }: { options: { value: string; label: string }[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultValue = searchParams.get('category') || 'experience'

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('category', term);
    } else {
      params.delete('category');
    }

    if (term === 'all') {
      params.delete('category');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (

    <Select defaultValue={defaultValue} onValueChange={(e) => { handleSearch(e); }}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>

  );
}
