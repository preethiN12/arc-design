"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PortfolioRiskChartProps {
  groupBy: string
}

export default function PortfolioRiskChart({ groupBy }: PortfolioRiskChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Generate chart data based on groupBy
    let data: any[] = []

    if (groupBy === "geography") {
      data = [
        { name: "Toronto", Low: 25, Medium: 15, High: 10 },
        { name: "Vancouver", Low: 18, Medium: 12, High: 5 },
        { name: "Montreal", Low: 15, Medium: 10, High: 8 },
        { name: "Calgary", Low: 12, Medium: 8, High: 6 },
        { name: "Ottawa", Low: 10, Medium: 7, High: 3 },
      ]
    } else if (groupBy === "lob") {
      data = [
        { name: "Commercial", Low: 30, Medium: 20, High: 15 },
        { name: "Corporate", Low: 25, Medium: 15, High: 10 },
        { name: "Real Estate", Low: 20, Medium: 12, High: 8 },
        { name: "Small Business", Low: 15, Medium: 10, High: 5 },
        { name: "Enterprise", Low: 10, Medium: 5, High: 2 },
      ]
    } else if (groupBy === "type") {
      data = [
        { name: "Office", Low: 22, Medium: 18, High: 15 },
        { name: "Retail", Low: 18, Medium: 12, High: 10 },
        { name: "Industrial", Low: 25, Medium: 10, High: 5 },
        { name: "Multifamily", Low: 20, Medium: 15, High: 8 },
        { name: "Mixed Use", Low: 15, Medium: 10, High: 7 },
      ]
    } else if (groupBy === "certs") {
      data = [
        { name: "LEED", Low: 30, Medium: 15, High: 5 },
        { name: "BOMA BEST", Low: 25, Medium: 12, High: 8 },
        { name: "ENERGY STAR", Low: 22, Medium: 10, High: 6 },
        { name: "WELL", Low: 18, Medium: 8, High: 4 },
        { name: "None", Low: 5, Medium: 20, High: 25 },
      ]
    } else if (groupBy === "energy") {
      data = [
        { name: "Natural Gas", Low: 15, Medium: 20, High: 25 },
        { name: "Electric", Low: 20, Medium: 15, High: 10 },
        { name: "Renewable", Low: 30, Medium: 10, High: 5 },
        { name: "District", Low: 25, Medium: 15, High: 8 },
        { name: "Mixed", Low: 10, Medium: 25, High: 12 },
      ]
    } else if (groupBy === "intensity") {
      data = [
        { name: "Very Low", Low: 35, Medium: 10, High: 5 },
        { name: "Low", Low: 30, Medium: 15, High: 8 },
        { name: "Medium", Low: 20, Medium: 25, High: 10 },
        { name: "High", Low: 10, Medium: 20, High: 25 },
        { name: "Very High", Low: 5, Medium: 15, High: 30 },
      ]
    }

    setChartData(data)
  }, [groupBy])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis dataKey="name" tick={{ fill: "#666" }} />
        <YAxis tick={{ fill: "#666" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Low" stackId="a" fill="#4CAF50" />
        <Bar dataKey="Medium" stackId="a" fill="#FFC107" />
        <Bar dataKey="High" stackId="a" fill="#F44336" />
      </BarChart>
    </ResponsiveContainer>
  )
}
