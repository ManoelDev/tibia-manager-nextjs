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

export default function FilterStatus({ options }: { options: { value: string; label: string }[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultValue = searchParams.get('status') || ''

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('status', term);
    } else {
      params.delete('status');
    }

    if (term === 'all') {
      params.delete('status');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (

    <Select defaultValue={defaultValue} onValueChange={(e) => { handleSearch(e); }}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value='all' defaultChecked={!defaultValue}>ALL</SelectItem>
          {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>

  );
}
