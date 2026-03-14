"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { kpis_mensuales } from "@/data/demo-data";

const formatMillions = (v: number) => `$${(v / 1_000_000).toFixed(0)}M`;

export function CarteraChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Desembolsos vs Recaudo — Últimos 6 meses
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={kpis_mensuales} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="mes"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatMillions}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(v) =>
              typeof v === "number"
                ? new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(v)
                : String(v)
            }
            contentStyle={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar
            dataKey="desembolsos"
            name="Desembolsos"
            fill="#0A2540"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="recaudo"
            name="Recaudo"
            fill="#00B894"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
