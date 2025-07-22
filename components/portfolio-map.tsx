"use client"

import { useEffect, useRef } from "react"

export default function PortfolioMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Mapbox, Google Maps, or Leaflet

    if (mapRef.current) {
      const mapContainer = mapRef.current

      // Clear any existing content
      mapContainer.innerHTML = ""

      // Create a simple map visualization
      const mapDiv = document.createElement("div")
      mapDiv.className = "relative h-full w-full bg-gray-100"

      // Add some mock regions with risk levels
      const regions = [
        { name: "Toronto", x: 65, y: 30, risk: "medium" },
        { name: "Vancouver", x: 15, y: 25, risk: "low" },
        { name: "Montreal", x: 70, y: 28, risk: "high" },
        { name: "Calgary", x: 30, y: 25, risk: "medium" },
        { name: "Ottawa", x: 68, y: 27, risk: "low" },
      ]

      regions.forEach((region) => {
        const regionEl = document.createElement("div")
        regionEl.className = `absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 ${
          region.risk === "low" ? "bg-green-500" : region.risk === "medium" ? "bg-yellow-500" : "bg-red-500"
        }`
        regionEl.style.left = `${region.x}%`
        regionEl.style.top = `${region.y}%`

        const label = document.createElement("div")
        label.className =
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-gray-800"
        label.textContent = region.name

        regionEl.appendChild(label)
        mapDiv.appendChild(regionEl)
      })

      // Add some mock asset pins
      const pins = [
        { x: 65, y: 30 },
        { x: 64, y: 31 },
        { x: 66, y: 29 },
        { x: 63, y: 30 },
        { x: 15, y: 25 },
        { x: 16, y: 24 },
        { x: 14, y: 26 },
        { x: 70, y: 28 },
        { x: 71, y: 27 },
        { x: 69, y: 29 },
        { x: 70, y: 27 },
        { x: 30, y: 25 },
        { x: 31, y: 24 },
        { x: 29, y: 26 },
        { x: 68, y: 27 },
        { x: 67, y: 28 },
        { x: 69, y: 26 },
      ]

      pins.forEach((pin) => {
        const pinEl = document.createElement("div")
        pinEl.className =
          "absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rbc-blue-800 border border-white"
        pinEl.style.left = `${pin.x}%`
        pinEl.style.top = `${pin.y}%`

        mapDiv.appendChild(pinEl)
      })

      // Add a legend
      const legend = document.createElement("div")
      legend.className = "absolute bottom-2 right-2 rounded bg-white p-2 text-xs shadow"

      const legendTitle = document.createElement("div")
      legendTitle.className = "mb-1 font-medium"
      legendTitle.textContent = "Risk Level"

      const legendItems = document.createElement("div")
      legendItems.className = "flex flex-col gap-1"

      const riskLevels = [
        { label: "Low Risk", color: "bg-green-500" },
        { label: "Medium Risk", color: "bg-yellow-500" },
        { label: "High Risk", color: "bg-red-500" },
      ]

      riskLevels.forEach((level) => {
        const item = document.createElement("div")
        item.className = "flex items-center gap-1"

        const color = document.createElement("div")
        color.className = `h-3 w-3 rounded-full ${level.color}`

        const label = document.createElement("span")
        label.textContent = level.label

        item.appendChild(color)
        item.appendChild(label)
        legendItems.appendChild(item)
      })

      legend.appendChild(legendTitle)
      legend.appendChild(legendItems)
      mapDiv.appendChild(legend)

      mapContainer.appendChild(mapDiv)
    }
  }, [])

  return (
    <div ref={mapRef} className="h-full w-full rounded bg-gray-100">
      <div className="flex h-full items-center justify-center text-gray-500">Loading map...</div>
    </div>
  )
}
