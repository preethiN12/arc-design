"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PortfolioNOIChartProps {
  scenario: string
  splitBy: string
}

export default function PortfolioNOIChart({ scenario, splitBy }: PortfolioNOIChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Generate chart data based on scenario and splitBy
    const years = Array.from({ length: 26 }, (_, i) => 2025 + i)

    const data = years.map((year) => {
      // Base values
      const baseRetrofit = splitBy === "count" ? 120 : 180000000
      const baseFines = splitBy === "count" ? 100 : 150000000
      const baseBenchmark = splitBy === "count" ? 110 : 165000000

      // Apply scenario adjustments
      let retrofitAdjustment = 1
      let finesAdjustment = 1
      let benchmarkAdjustment = 1

      if (scenario === "1.5c") {
        retrofitAdjustment = 0.95 - (year - 2025) * 0.002
        finesAdjustment = 0.9 - (year - 2025) * 0.01
        benchmarkAdjustment = 0.92 - (year - 2025) * 0.008
      } else if (scenario === "2c-immediate") {
        retrofitAdjustment = 0.97 - (year - 2025) * 0.001
        finesAdjustment = 0.92 - (year - 2025) * 0.008
        benchmarkAdjustment = 0.94 - (year - 2025) * 0.006
      } else if (scenario === "2c-delayed") {
        retrofitAdjustment = year < 2035 ? 1 : 0.9 - (year - 2035) * 0.01
        finesAdjustment = year < 2035 ? 0.98 : 0.8 - (year - 2035) * 0.015
        benchmarkAdjustment = year < 2035 ? 0.99 : 0.85 - (year - 2035) * 0.012
      }

      // Apply growth rates
      const yearsSince2025 = year - 2025
      const retrofitGrowth = 1 + yearsSince2025 * 0.02
      const finesGrowth = 1 + yearsSince2025 * 0.015
      const benchmarkGrowth = 1 + yearsSince2025 * 0.018

      return {
        year,
        Retrofit: Math.round(baseRetrofit * retrofitAdjustment * retrofitGrowth),
        "Pay Fines": Math.round(baseFines * finesAdjustment * finesGrowth),
        Benchmark: Math.round(baseBenchmark * benchmarkAdjustment * benchmarkGrowth),
      }
    })

    // Only use every 5th year for better visualization
    const filteredData = data.filter((_, index) => index % 5 === 0)
    setChartData(filteredData)
  }, [scenario, splitBy])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis dataKey="year" tick={{ fill: "#666" }} tickFormatter={(value) => value.toString()} />
        <YAxis
          tick={{ fill: "#666" }}
          tickFormatter={(value) => (splitBy === "count" ? value.toString() : `$${(value / 1000000).toFixed(0)}M`)}
        />
        <Tooltip
          formatter={(value: number) => [
            splitBy === "count" ? value.toLocaleString() : `$${value.toLocaleString()}`,
            "",
          ]}
          labelFormatter={(label) => `Year: ${label}`}
        />
        <Legend />
        <Line type="monotone" dataKey="Retrofit" stroke="#0D47A1" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        <Line
          type="monotone"
          dataKey="Pay Fines"
          stroke="#D32F2F"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="Benchmark"
          stroke="#388E3C"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
