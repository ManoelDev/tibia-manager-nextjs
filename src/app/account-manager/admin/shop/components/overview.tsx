"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts"

interface Props {
  data: { name: string, total: number }[]
}


export function Overview({ data }: Props) {

  const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: any[], label: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border rounded-sm bg-gray-100/80 p-2">
          <p className="text-xs font-medium">Total: {payload[0].value.toLocaleString(undefined, { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', })}</p>
        </div>
      );
    }

    return null;
  };


  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        barCategoryGap={5}
        barGap={0}
        width={150}

      >
        <CartesianGrid strokeDasharray="1 4" />
        <XAxis
          dataKey="name"
          stroke="#000"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} separator="#000" />
        <Bar dataKey="total" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>

      {/*
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} separator="#000" />
        <Area type="monotone" dataKey="total" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
      */}

    </ResponsiveContainer>
  )
}