"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ProgressBar from "@/components/progress-bar"
import AssetMap from "@/components/asset-map"
import NOIChart from "@/components/noi-chart"
import type { Asset } from "@/lib/types"

export default function AssetAnalysis() {
  const router = useRouter()
  const [assets, setAssets] = useState<Asset[]>([])
  const [scenario, setScenario] = useState("baseline")
  const [chartView, setChartView] = useState<"combined" | "split">("combined")
  const [retrofitFinancing, setRetrofitFinancing] = useState<"upfront" | "loan">("upfront")
  const [loanRate, setLoanRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(10)

  useEffect(() => {
    // Retrieve assets from session storage
    const storedAssets = sessionStorage.getItem("selectedAssets")
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets))
    } else {
      // Redirect back to search if no assets found
      router.push("/asset/search")
    }
  }, [router])

  if (assets.length === 0) {
    return <div className="flex h-full items-center justify-center">Loading...</div>
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <ProgressBar currentStep={3} totalSteps={3} />

      <h1 className="mb-8 text-3xl font-bold text-rbc-blue-900">Asset Analysis</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-rbc-blue-800">Net Operating Income Projection</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="chart-view"
                      checked={chartView === "split"}
                      onCheckedChange={(checked) => setChartView(checked ? "split" : "combined")}
                    />
                    <Label htmlFor="chart-view">Split Revenue/OpEx</Label>
                  </div>

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
              </div>
            </CardHeader>
            <CardContent>
              <NOIChart assets={assets} scenario={scenario} view={chartView} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-rbc-blue-800">Retrofit Financing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="financing-toggle">Loan Financing</Label>
                  <Switch
                    id="financing-toggle"
                    checked={retrofitFinancing === "loan"}
                    onCheckedChange={(checked) => setRetrofitFinancing(checked ? "loan" : "upfront")}
                  />
                </div>

                {retrofitFinancing === "loan" && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <Label htmlFor="loan-rate">Interest Rate (%)</Label>
                      <Input
                        id="loan-rate"
                        type="number"
                        step="0.1"
                        value={loanRate}
                        onChange={(e) => setLoanRate(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loan-term">Term (years)</Label>
                      <Input
                        id="loan-term"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-rbc-blue-800">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-rbc-blue-600"></div>
                  <span>Building A's retrofit yields 12% IRR over 10 years</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-rbc-blue-600"></div>
                  <span>Building B has highest energy intensity, prioritize for retrofit</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-rbc-blue-600"></div>
                  <span>Building C's DSCR improves by 0.15 with energy upgrades</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-rbc-blue-600"></div>
                  <span>2°C delayed scenario shows 18% higher costs than immediate action</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-rbc-blue-800">Retrofit Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assets.map((asset, index) => (
                  <div key={asset.id} className="rounded-md bg-rbc-blue-50 p-3">
                    <h4 className="font-medium text-rbc-blue-800">
                      {asset.address || `Building ${String.fromCharCode(65 + index)}`}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {asset.energyIntensity > 30
                        ? "High priority: HVAC upgrade, building envelope improvements"
                        : asset.energyIntensity > 20
                          ? "Medium priority: Lighting retrofit, smart controls"
                          : "Low priority: Maintenance optimization"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-rbc-blue-800">Asset Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <AssetMap assets={assets} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {assets.map((asset, index) => (
          <Card key={asset.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-rbc-blue-800">
                {asset.address || `Building ${String.fromCharCode(65 + index)}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="text-gray-600">DSCR:</div>
                <div className="font-medium">{asset.dscr.toFixed(2)}</div>

                <div className="text-gray-600">LTV:</div>
                <div className="font-medium">{asset.ltv}%</div>

                <div className="text-gray-600">Energy Intensity:</div>
                <div className="font-medium">{asset.energyIntensity} kWh/sq ft</div>

                <div className="text-gray-600">Risk Rating:</div>
                <div className="font-medium">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                      asset.riskRating === "L"
                        ? "bg-green-100 text-green-800"
                        : asset.riskRating === "M"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {asset.riskRating}
                  </span>
                </div>

                <div className="text-gray-600">Retrofit Cost:</div>
                <div className="font-medium">${asset.retrofitCost.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
