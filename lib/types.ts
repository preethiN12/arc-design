export interface Asset {
  id: string
  address: string
  city: string
  postalCode: string
  propertyType: string
  value: number
  size: number
  age: number
  heatSource: {
    fossil: number
    renewable: number
  }
  certifications: string[]
  loanAmount: number
  term: number
  annualDebtPayment: number
  noi2024: {
    revenue: number
    opEx: number
  }
  projectedNOI: number[]
  riskRating: "L" | "M" | "H"
  dscr: number
  ltv: number
  energyIntensity: number
  retrofitCost: number
  location: {
    lat: number
    lng: number
  }
}
