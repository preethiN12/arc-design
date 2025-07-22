"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Asset } from "@/lib/types"

interface NOIChartProps {
  assets: Asset[]
  scenario: string
  view: "combined" | "split"
}

export default function NOIChart({ assets, scenario, view }: NOIChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Generate chart data based on assets, scenario, and view
    const years = Array.from({ length: 26 }, (_, i) => 2025 + i)

    const data = years.map((year) => {
      const dataPoint: any = { year }

      if (view === "combined") {
        // Add NOI for each asset
        assets.forEach((asset, index) => {
          const assetName = asset.address || `Building ${String.fromCharCode(65 + index)}`
          const baseNOI = asset.noi2024.revenue - asset.noi2024.opEx

          // Apply scenario adjustments
          let adjustment = 1
          if (scenario === "1.5c") {
            adjustment = 0.95 - (year - 2025) * 0.005
          } else if (scenario === "2c-immediate") {
            adjustment = 0.97 - (year - 2025) * 0.003
          } else if (scenario === "2c-delayed") {
            adjustment = year < 2035 ? 1 : 0.9 - (year - 2035) * 0.008
          }

          dataPoint[assetName] = Math.round(baseNOI * adjustment * (1 + (year - 2025) * 0.02))
        })
      } else {
        // Split into revenue and opEx for each asset
        assets.forEach((asset, index) => {
          const assetName = asset.address || `Building ${String.fromCharCode(65 + index)}`
          const baseRevenue = asset.noi2024.revenue
          const baseOpEx = asset.noi2024.opEx

          // Apply scenario adjustments
          let revenueAdjustment = 1
          let opExAdjustment = 1

          if (scenario === "1.5c") {
            revenueAdjustment = 0.98 - (year - 2025) * 0.002
            opExAdjustment = 1.02 + (year - 2025) * 0.003
          } else if (scenario === "2c-immediate") {
            revenueAdjustment = 0.99 - (year - 2025) * 0.001
            opExAdjustment = 1.01 + (year - 2025) * 0.002
          } else if (scenario === "2c-delayed") {
            revenueAdjustment = year < 2035 ? 1 : 0.95 - (year - 2035) * 0.005
            opExAdjustment = year < 2035 ? 1 : 1.05 + (year - 2035) * 0.01
          }

          dataPoint[`${assetName} Revenue`] = Math.round(baseRevenue * revenueAdjustment * (1 + (year - 2025) * 0.02))
          dataPoint[`${assetName} OpEx`] = Math.round(baseOpEx * opExAdjustment * (1 + (year - 2025) * 0.015))
        })
      }

      return dataPoint
    })

    // Only use every 5th year for better visualization
    const filteredData = data.filter((_, index) => index % 5 === 0)
    setChartData(filteredData)
  }, [assets, scenario, view])

  // Generate colors for each line
  const colors = ["#0D47A1", "#1976D2", "#2196F3", "#64B5F6", "#90CAF9", "#BBDEFB"]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis dataKey="year" tick={{ fill: "#666" }} tickFormatter={(value) => value.toString()} />
        <YAxis tick={{ fill: "#666" }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
          labelFormatter={(label) => `Year: ${label}`}
        />
        <Legend />
        {Object.keys(chartData[0] || {})
          .filter((key) => key !== "year")
          .map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
