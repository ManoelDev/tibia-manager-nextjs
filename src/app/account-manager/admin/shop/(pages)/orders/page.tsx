import { Suspense } from "react";
import Search from "./components/search";
import DataTable from "./components/table";
import { fetchPayments } from "./data";

const ORDER_STATUS = [
  { value: 'DELIVERED', label: 'DELIVERED' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'CANCELED', label: 'CANCELED' }
]

export default async function Page({ searchParams }: { searchParams?: { search?: string; page?: string; status: string } }) {
  const query = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const status = searchParams?.status;

  const { orders, totalPage } = await fetchPayments({ currentPage, search: query, statusFilter: status });
  return (<>
    <div className="flex flex-col rounded-sm border">
      <Search placeholder="Search..." totalPage={totalPage} options={ORDER_STATUS} />
      <Suspense key={query + currentPage} fallback={<InvoiceSkeleton />}>
        <DataTable orders={orders} />
      </Suspense>
    </div>
  </>)
}

function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-center">
      Searching...
    </div>
  );
}
