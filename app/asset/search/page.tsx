"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import ProgressBar from "@/components/progress-bar"
import { mockAssets } from "@/lib/mock-data"

export default function AssetSearch() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    size: "",
  })

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = !filters.location || asset.city === filters.location
    const matchesType = !filters.propertyType || asset.propertyType === filters.propertyType
    const matchesSize = !filters.size || getSizeCategory(asset.size) === filters.size

    return matchesSearch && matchesLocation && matchesType && matchesSize
  })

  function getSizeCategory(size: number) {
    if (size < 10000) return "small"
    if (size < 50000) return "medium"
    return "large"
  }

  function handleAssetToggle(assetId: string) {
    setSelectedAssets((prev) =>
      prev.includes(assetId)
        ? prev.filter((id) => id !== assetId)
        : selectedAssets.length < 3
          ? [...prev, assetId]
          : prev,
    )
  }

  function handleContinue() {
    if (selectedAssets.length > 0) {
      const assetIds = selectedAssets.join(",")
      router.push(`/asset/details?assets=${assetIds}`)
    }
  }

  function handleAddCustomAsset() {
    router.push("/asset/details?custom=true")
  }

  const cities = Array.from(new Set(mockAssets.map((asset) => asset.city)))
  const propertyTypes = Array.from(new Set(mockAssets.map((asset) => asset.propertyType)))

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <ProgressBar currentStep={1} totalSteps={3} />

      <h1 className="mb-8 text-3xl font-bold text-rbc-blue-900">Asset Search</h1>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by address or city..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.propertyType}
            onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.size} onValueChange={(value) => setFilters({ ...filters, size: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">Small (&lt;10,000 sq ft)</SelectItem>
              <SelectItem value="medium">Medium (10,000-50,000 sq ft)</SelectItem>
              <SelectItem value="large">Large (&gt;50,000 sq ft)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="font-medium text-rbc-blue-800">{selectedAssets.length} of 3 assets selected</span>
        </div>
        <Button
          variant="outline"
          className="border-rbc-blue-600 text-rbc-blue-600 hover:bg-rbc-blue-50 bg-transparent"
          onClick={handleAddCustomAsset}
        >
          Add Custom Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssets.map((asset) => (
          <Card
            key={asset.id}
            className={`cursor-pointer transition-all ${selectedAssets.includes(asset.id) ? "border-2 border-rbc-blue-600" : "hover:border-rbc-blue-300"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-rbc-blue-800">{asset.address}</h3>
                  <p className="text-sm text-gray-600">{asset.city}</p>
                  <div className="mt-2">
                    <span className="inline-block rounded-full bg-rbc-blue-100 px-2 py-1 text-xs text-rbc-blue-800">
                      {asset.propertyType}
                    </span>
                    <span className="ml-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      {asset.size.toLocaleString()} sq ft
                    </span>
                  </div>
                </div>
                <Checkbox
                  checked={selectedAssets.includes(asset.id)}
                  onCheckedChange={() => handleAssetToggle(asset.id)}
                  disabled={selectedAssets.length >= 3 && !selectedAssets.includes(asset.id)}
                  className="h-5 w-5 border-rbc-blue-400 data-[state=checked]:bg-rbc-blue-600"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          className="bg-rbc-blue-600 hover:bg-rbc-blue-700"
          onClick={handleContinue}
          disabled={selectedAssets.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
