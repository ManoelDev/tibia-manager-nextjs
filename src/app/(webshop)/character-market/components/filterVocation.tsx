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

  const defaultValue = searchParams.get('vocation') || ''

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('vocation', term);
    } else {
      params.delete('vocation');
    }

    if (term === 'all') {
      params.delete('vocation');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (

    <Select defaultValue={defaultValue} onValueChange={(e) => { handleSearch(e); }}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select a vocation" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>vocation</SelectLabel>
          <SelectItem value='all' defaultChecked={!defaultValue}>ALL</SelectItem>
          {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>

  );
}
