"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp } from "lucide-react"

type SortDirection = "asc" | "desc" | null
type SortField = "postalCode" | "riskRating" | "dscrDelta" | "ltvDelta" | "energyDelta" | "retrofitCost"

const mockTableData = [
  {
    id: 1,
    postalCode: "M5V 2A1",
    riskRating: "L",
    dscrDelta: 0.12,
    ltvDelta: -2.5,
    energyDelta: -15.3,
    retrofitCost: 250000,
  },
  {
    id: 2,
    postalCode: "V6B 1S5",
    riskRating: "M",
    dscrDelta: 0.05,
    ltvDelta: -1.2,
    energyDelta: -8.7,
    retrofitCost: 180000,
  },
  {
    id: 3,
    postalCode: "H2Y 1C6",
    riskRating: "H",
    dscrDelta: -0.08,
    ltvDelta: 3.5,
    energyDelta: 5.2,
    retrofitCost: 320000,
  },
  {
    id: 4,
    postalCode: "T2P 1J9",
    riskRating: "M",
    dscrDelta: 0.03,
    ltvDelta: -0.8,
    energyDelta: -6.5,
    retrofitCost: 210000,
  },
  {
    id: 5,
    postalCode: "K1P 5J6",
    riskRating: "L",
    dscrDelta: 0.09,
    ltvDelta: -1.9,
    energyDelta: -12.1,
    retrofitCost: 190000,
  },
  {
    id: 6,
    postalCode: "M4W 1A5",
    riskRating: "H",
    dscrDelta: -0.11,
    ltvDelta: 4.2,
    energyDelta: 7.8,
    retrofitCost: 350000,
  },
  {
    id: 7,
    postalCode: "V7Y 1C1",
    riskRating: "L",
    dscrDelta: 0.14,
    ltvDelta: -3.1,
    energyDelta: -18.5,
    retrofitCost: 280000,
  },
  {
    id: 8,
    postalCode: "H3B 2Y7",
    riskRating: "M",
    dscrDelta: 0.02,
    ltvDelta: -0.5,
    energyDelta: -4.3,
    retrofitCost: 150000,
  },
]

export default function PortfolioTable() {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortField(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      // New field, start with ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...mockTableData]

  if (sortField && sortDirection) {
    sortedData.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1
      } else {
        return a[sortField] < b[sortField] ? 1 : -1
      }
    })
  }

  return (
    <div className="max-h-[350px] overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white">
          <TableRow>
            <TableHead className="w-[100px]">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 font-medium"
                onClick={() => handleSort("postalCode")}
              >
                Postal Code
                {sortField === "postalCode" &&
                  sortDirection &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 font-medium"
                onClick={() => handleSort("riskRating")}
              >
                Risk Rating
                {sortField === "riskRating" &&
                  sortDirection &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 font-medium"
                onClick={() => handleSort("dscrDelta")}
              >
                DSCR Δ
                {sortField === "dscrDelta" &&
                  sortDirection &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" size="sm" className="h-8 px-2 font-medium" onClick={() => handleSort("ltvDelta")}>
                LTV Δ
                {sortField === "ltvDelta" &&
                  sortDirection &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 font-medium"
                onClick={() => handleSort("energyDelta")}
              >
                Energy Δ
                {sortField === "energyDelta" &&
                  sortDirection &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 font-medium"
                onClick={() => handleSort("retrofitCost")}
              >
                Retrofit Cost
                {sortField === "retrofitCost" &&
                  sortDirection &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.postalCode}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                    row.riskRating === "L"
                      ? "bg-green-100 text-green-800"
                      : row.riskRating === "M"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {row.riskRating}
                </span>
              </TableCell>
              <TableCell className={`text-right ${row.dscrDelta >= 0 ? "text-green-600" : "text-red-600"}`}>
                {row.dscrDelta > 0 ? "+" : ""}
                {row.dscrDelta.toFixed(2)}
              </TableCell>
              <TableCell className={`text-right ${row.ltvDelta <= 0 ? "text-green-600" : "text-red-600"}`}>
                {row.ltvDelta > 0 ? "+" : ""}
                {row.ltvDelta.toFixed(1)}%
              </TableCell>
              <TableCell className={`text-right ${row.energyDelta <= 0 ? "text-green-600" : "text-red-600"}`}>
                {row.energyDelta > 0 ? "+" : ""}
                {row.energyDelta.toFixed(1)}%
              </TableCell>
              <TableCell className="text-right">${row.retrofitCost.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
