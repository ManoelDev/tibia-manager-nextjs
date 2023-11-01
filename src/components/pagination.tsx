'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (<>
    <div className="flex flex-row gap-2 items-center">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      <span>
        {currentPage} of {totalPages}
      </span>
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  </>)
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-9 w-9 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-1': direction === 'left',
      'ml-1': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 7l-5 5m0 0l5 5" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 17l5-5l-5-5" />
      </svg>
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
