"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProgressBar from "@/components/progress-bar"
import PortfolioNOIChart from "@/components/portfolio-noi-chart"
import PortfolioRiskChart from "@/components/portfolio-risk-chart"
import PortfolioMap from "@/components/portfolio-map"
import PortfolioTable from "@/components/portfolio-table"
import { ArrowLeft, Download } from "lucide-react"

export default function PortfolioAnalysis() {
  const router = useRouter()
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [scenario, setScenario] = useState("baseline")
  const [splitBy, setSplitBy] = useState("count")
  const [groupBy, setGroupBy] = useState("geography")

  useEffect(() => {
    // Retrieve filters from session storage
    const storedFilters = sessionStorage.getItem("portfolioFilters")
    if (storedFilters) {
      setFilters(JSON.parse(storedFilters))
    } else {
      // Redirect back to filter page if no filters found
      router.push("/portfolio/filter")
    }
  }, [router])

  function handleBackToFilter() {
    router.push("/portfolio/filter")
  }

  function handleExportCSV() {
    // In a real app, this would generate and download a CSV file
    alert("CSV export functionality would be implemented here")
  }

  // Create a summary of the filters for display
  const filterSummary = Object.entries(filters)
    .map(([category, values]) => `${category}: ${values.join(", ")}`)
    .join(" • ")

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <ProgressBar currentStep={2} totalSteps={2} />

      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-rbc-blue-900">Portfolio Analysis</h1>
          {Object.keys(filters).length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Filters:</span> {filterSummary}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-rbc-blue-600 text-rbc-blue-600 hover:bg-rbc-blue-50 bg-transparent"
            onClick={handleBackToFilter}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="border-rbc-blue-600 text-rbc-blue-600 hover:bg-rbc-blue-50 bg-transparent"
            onClick={handleExportCSV}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium text-rbc-blue-800">Here's What We Expect...</CardTitle>
              <Select value={scenario} onValueChange={setScenario}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baseline">Baseline</SelectItem>
                  <SelectItem value="1.5c">1.5 °C</SelectItem>
                  <SelectItem value="2c-immediate">2 °C Immediate</SelectItem>
                  <SelectItem value="2c-delayed">2 °C Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-rbc-blue-800">NOI Projection (2025-2050)</h3>
                <Select value={splitBy} onValueChange={setSplitBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Split by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="count">Property Count</SelectItem>
                    <SelectItem value="value">Property Value</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 h-[300px]">
                <PortfolioNOIChart scenario={scenario} splitBy={splitBy} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-rbc-blue-800">Risk Distribution</h3>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Grouped by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="lob">LOB</SelectItem>
                    <SelectItem value="type">Property Type</SelectItem>
                    <SelectItem value="certs">Certifications</SelectItem>
                    <SelectItem value="energy">Energy Source</SelectItem>
                    <SelectItem value="intensity">Energy Intensity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 h-[300px]">
                <PortfolioRiskChart groupBy={groupBy} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-rbc-blue-800">Portfolio Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <PortfolioMap />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-rbc-blue-800">Asset Details</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
