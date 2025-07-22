"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProgressBar from "@/components/progress-bar"
import { mockAssets } from "@/lib/mock-data"
import type { Asset } from "@/lib/types"

export default function AssetDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const assetIds = searchParams.get("assets")?.split(",") || []
  const isCustom = searchParams.get("custom") === "true"

  const [currentAssetIndex, setCurrentAssetIndex] = useState(0)
  const [assets, setAssets] = useState<Asset[]>([])

  useEffect(() => {
    if (isCustom) {
      setAssets([
        {
          id: "custom",
          address: "",
          city: "",
          postalCode: "",
          propertyType: "",
          value: 0,
          size: 0,
          age: 0,
          heatSource: { fossil: 80, renewable: 20 },
          certifications: [],
          loanAmount: 0,
          term: 5,
          annualDebtPayment: 0,
          noi2024: { revenue: 0, opEx: 0 },
          projectedNOI: [0, 0, 0, 0, 0],
          riskRating: "M",
          dscr: 0,
          ltv: 0,
          energyIntensity: 0,
          retrofitCost: 0,
          location: { lat: 43.65, lng: -79.38 },
        },
      ])
    } else {
      const selectedAssets = mockAssets.filter((asset) => assetIds.includes(asset.id))
      setAssets(selectedAssets)
    }
  }, [assetIds, isCustom])

  const currentAsset = assets[currentAssetIndex]

  function handleInputChange(field: string, value: any) {
    setAssets((prev) => {
      const updated = [...prev]
      updated[currentAssetIndex] = {
        ...updated[currentAssetIndex],
        [field]: value,
      }
      return updated
    })
  }

  function handleNestedInputChange(parent: string, field: string, value: any) {
    setAssets((prev) => {
      const updated = [...prev]
      updated[currentAssetIndex] = {
        ...updated[currentAssetIndex],
        [parent]: {
          ...updated[currentAssetIndex][parent as keyof Asset],
          [field]: value,
        },
      }
      return updated
    })
  }

  function handleNext() {
    if (currentAssetIndex < assets.length - 1) {
      setCurrentAssetIndex(currentAssetIndex + 1)
    } else {
      // Save assets to session storage for the analysis page
      sessionStorage.setItem("selectedAssets", JSON.stringify(assets))
      router.push("/asset/analysis")
    }
  }

  if (!currentAsset) return <div>Loading...</div>

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ProgressBar currentStep={2} totalSteps={3} />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-rbc-blue-900">Asset Details</h1>
        <div className="text-sm text-gray-600">
          Asset {currentAssetIndex + 1} of {assets.length}
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={currentAsset.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={currentAsset.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={currentAsset.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                value={currentAsset.propertyType}
                onValueChange={(value) => handleInputChange("propertyType", value)}
              >
                <SelectTrigger id="propertyType" className="mt-1">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                  <SelectItem value="Multifamily">Multifamily</SelectItem>
                  <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="value">Property Value ($)</Label>
              <Input
                id="value"
                type="number"
                value={currentAsset.value || ""}
                onChange={(e) => handleInputChange("value", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="size">Size (sq ft)</Label>
              <Input
                id="size"
                type="number"
                value={currentAsset.size || ""}
                onChange={(e) => handleInputChange("size", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={currentAsset.age || ""}
                onChange={(e) => handleInputChange("age", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Heat Source</Label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="fossil" className="text-xs">
                    Fossil (%)
                  </Label>
                  <Input
                    id="fossil"
                    type="number"
                    min="0"
                    max="100"
                    value={currentAsset.heatSource?.fossil || 0}
                    onChange={(e) => handleNestedInputChange("heatSource", "fossil", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="renewable" className="text-xs">
                    Renewable (%)
                  </Label>
                  <Input
                    id="renewable"
                    type="number"
                    min="0"
                    max="100"
                    value={currentAsset.heatSource?.renewable || 0}
                    onChange={(e) => handleNestedInputChange("heatSource", "renewable", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={currentAsset.loanAmount || ""}
                onChange={(e) => handleInputChange("loanAmount", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="term">Term (years)</Label>
              <Input
                id="term"
                type="number"
                value={currentAsset.term || ""}
                onChange={(e) => handleInputChange("term", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="annualDebtPayment">Annual Debt Payment ($)</Label>
              <Input
                id="annualDebtPayment"
                type="number"
                value={currentAsset.annualDebtPayment || ""}
                onChange={(e) => handleInputChange("annualDebtPayment", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label>NOI 2024</Label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="revenue" className="text-xs">
                    Revenue ($)
                  </Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={currentAsset.noi2024?.revenue || 0}
                    onChange={(e) => handleNestedInputChange("noi2024", "revenue", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="opEx" className="text-xs">
                    OpEx ($)
                  </Label>
                  <Input
                    id="opEx"
                    type="number"
                    value={currentAsset.noi2024?.opEx || 0}
                    onChange={(e) => handleNestedInputChange("noi2024", "opEx", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="riskRating">Risk Rating</Label>
              <Select value={currentAsset.riskRating} onValueChange={(value) => handleInputChange("riskRating", value)}>
                <SelectTrigger id="riskRating" className="mt-1">
                  <SelectValue placeholder="Select risk rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low</SelectItem>
                  <SelectItem value="M">Medium</SelectItem>
                  <SelectItem value="H">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dscr">DSCR</Label>
              <Input
                id="dscr"
                type="number"
                step="0.01"
                value={currentAsset.dscr || ""}
                onChange={(e) => handleInputChange("dscr", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="ltv">LTV (%)</Label>
              <Input
                id="ltv"
                type="number"
                step="0.01"
                value={currentAsset.ltv || ""}
                onChange={(e) => handleInputChange("ltv", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="energyIntensity">Energy Intensity (kWh/sq ft)</Label>
              <Input
                id="energyIntensity"
                type="number"
                step="0.01"
                value={currentAsset.energyIntensity || ""}
                onChange={(e) => handleInputChange("energyIntensity", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="retrofitCost">Retrofit Cost ($)</Label>
              <Input
                id="retrofitCost"
                type="number"
                value={currentAsset.retrofitCost || ""}
                onChange={(e) => handleInputChange("retrofitCost", Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  type="number"
                  step="0.000001"
                  value={currentAsset.location?.lat || ""}
                  onChange={(e) => handleNestedInputChange("location", "lat", Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  type="number"
                  step="0.000001"
                  value={currentAsset.location?.lng || ""}
                  onChange={(e) => handleNestedInputChange("location", "lng", Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-rbc-blue-600 hover:bg-rbc-blue-700" onClick={handleNext}>
          {currentAssetIndex < assets.length - 1 ? "Next Asset" : "Continue to Analysis"}
        </Button>
      </div>
    </div>
  )
}
