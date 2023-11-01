
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Overview } from "./components/overview";
import { Orders } from "@prisma/client";
import { IconiFy } from "@/components/Iconify";

function calculatePercentageChange(previousMonth = 0, currentMonth = 0) {
  if (previousMonth === 0) {
    if (currentMonth > 0) {
      return `${(currentMonth * 100)}% from no previous data`;
    } else {
      return "No change from no previous data";
    }
  }
  const percentageChange = ((currentMonth - previousMonth) / previousMonth) * 100;
  const changeType = percentageChange > 0 ? "+" : "-";
  return (
    <div className="flex">
      <IconiFy icon={percentageChange < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'} className={percentageChange > 0 ? 'text-green-500' : 'text-red-500'} />{changeType}{Math.round(percentageChange * 10) / 10}% from the previous month
    </div>
  );
}

async function getMonthlyData(orders: Orders[], status: Orders['status'] = 'DELIVERED') {
  const currentYear = new Date().getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyTotals: Record<string, number> = {};
  for (const month of months) monthlyTotals[`${month}`] = 0;
  for (const order of orders) {
    if (order.status === status && order.updatedAt) {
      const orderDate = new Date(order.updatedAt);
      const year = orderDate.getFullYear();
      if (year === currentYear) {
        const month = orderDate.getMonth();
        const monthName = months[month];
        const monthYear = `${monthName}`;
        monthlyTotals[monthYear] += parseFloat(order.total_amount);
      }
    }
  }
  return Object.entries(monthlyTotals).map(([name, total]) => ({ name, total }));;
}

const FCurrency = (value: number) => {
  return value.toLocaleString(undefined, { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', })
}

async function getProducts() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const orders = await prisma.orders.findMany({ where: { createdAt: { gte: new Date(currentYear, 0, 1), lte: new Date(currentYear, 11, 31, 23, 59, 59) } } })
  const graphic = await getMonthlyData(orders, 'DELIVERED')
  const pending = await getMonthlyData(orders, 'PENDING')
  const revenue = FCurrency(graphic.reduce((a, order) => order.total + a, 0))
  const totalSales = FCurrency(graphic[currentMonth].total)
  const totalPending = FCurrency(pending[currentMonth].total)

  return { revenue, totalPending, totalSales, orders, pending, graphic }
}

export default async function ProductsAdminManager() {
  const { revenue, totalPending, totalSales, pending, graphic } = await getProducts()

  return (
    <>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenue}</div>
            <p className="text-xs text-muted-foreground">
              {/* {calculatePercentageChange(graphic[`${new Date().getMonth() - 1}`].total, graphic[`${new Date().getMonth()}`].total)} */}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">
              {calculatePercentageChange(graphic[`${new Date().getMonth() - 1}`].total, graphic[`${new Date().getMonth()}`].total)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending}</div>
            <p className="text-xs text-muted-foreground">
              {calculatePercentageChange(pending[`${new Date().getMonth() - 1}`].total, pending[`${new Date().getMonth()}`].total)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Overview data={graphic} />
        </CardContent>
      </Card>
    </>
  )
}