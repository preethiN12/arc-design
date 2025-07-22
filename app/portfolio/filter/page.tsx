"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import ProgressBar from "@/components/progress-bar"

type FilterCategory = {
  name: string
  options: string[]
  selected: string[]
}

export default function PortfolioFilter() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterCategory[]>([
    {
      name: "Geography",
      options: ["North America", "Canada", "USA", "Toronto", "Vancouver", "New York", "Chicago", "San Francisco"],
      selected: [],
    },
    {
      name: "Property Type",
      options: ["Office", "Retail", "Industrial", "Multifamily", "Mixed Use", "Hotel"],
      selected: [],
    },
    {
      name: "LOB / Sub-LOB",
      options: ["Commercial Banking", "Corporate Banking", "Real Estate", "Small Business", "Enterprise"],
      selected: [],
    },
    {
      name: "Energy Source",
      options: ["Natural Gas", "Electric", "Oil", "District Energy", "Renewable", "Mixed"],
      selected: [],
    },
    {
      name: "Efficiency Range",
      options: ["High (>90%)", "Medium (70-90%)", "Low (<70%)"],
      selected: [],
    },
    {
      name: "Certifications",
      options: ["LEED", "BOMA BEST", "ENERGY STAR", "WELL", "Net Zero", "None"],
      selected: [],
    },
  ])

  function handleFilterToggle(categoryIndex: number, option: string) {
    setFilters((prev) => {
      const updated = [...prev]
      const category = updated[categoryIndex]

      if (category.selected.includes(option)) {
        category.selected = category.selected.filter((item) => item !== option)
      } else {
        category.selected = [...category.selected, option]
      }

      return updated
    })
  }

  function handleRemoveFilter(categoryIndex: number, option: string) {
    setFilters((prev) => {
      const updated = [...prev]
      const category = updated[categoryIndex]
      category.selected = category.selected.filter((item) => item !== option)
      return updated
    })
  }

  function handleContinue() {
    // Store selected filters in session storage
    const selectedFilters = filters.reduce(
      (acc, category) => {
        if (category.selected.length > 0) {
          acc[category.name] = category.selected
        }
        return acc
      },
      {} as Record<string, string[]>,
    )

    sessionStorage.setItem("portfolioFilters", JSON.stringify(selectedFilters))
    router.push("/portfolio/analysis")
  }

  const totalSelectedFilters = filters.reduce((sum, category) => sum + category.selected.length, 0)
  const filteredCategories = searchTerm
    ? filters.map((category) => ({
        ...category,
        options: category.options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase())),
      }))
    : filters

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <ProgressBar currentStep={1} totalSteps={2} />

      <h1 className="mb-8 text-3xl font-bold text-rbc-blue-900">Portfolio Filter</h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search filters..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {totalSelectedFilters > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-sm font-medium text-gray-600">Selected Filters:</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((category, categoryIndex) =>
              category.selected.map((option) => (
                <div
                  key={`${category.name}-${option}`}
                  className="flex items-center rounded-full bg-rbc-blue-100 px-3 py-1 text-sm text-rbc-blue-800"
                >
                  <span className="mr-1 text-xs text-rbc-blue-600">{category.name}:</span>
                  {option}
                  <button
                    onClick={() => handleRemoveFilter(categoryIndex, option)}
                    className="ml-2 rounded-full p-0.5 hover:bg-rbc-blue-200"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {option}</span>
                  </button>
                </div>
              )),
            )}
          </div>
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category, categoryIndex) => (
          <Card key={category.name} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b bg-rbc-blue-50 p-4">
                <h2 className="font-medium text-rbc-blue-800">{category.name}</h2>
              </div>
              <div className="max-h-64 overflow-y-auto p-4">
                {category.options.length > 0 ? (
                  <div className="space-y-2">
                    {category.options.map((option) => (
                      <div key={option} className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-full justify-start text-left ${
                            filters[categoryIndex].selected.includes(option)
                              ? "border-rbc-blue-600 bg-rbc-blue-50 text-rbc-blue-800"
                              : ""
                          }`}
                          onClick={() => handleFilterToggle(categoryIndex, option)}
                        >
                          {option}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No options match your search</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          className="bg-rbc-blue-600 hover:bg-rbc-blue-700"
          onClick={handleContinue}
          disabled={totalSelectedFilters === 0}
        >
          Continue to Analysis
        </Button>
      </div>
    </div>
  )
}
