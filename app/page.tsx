import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-16 md:py-24">
      <div className="w-full max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-rbc-blue-900 md:text-5xl">Welcome to ARC</h1>
          <p className="text-lg text-gray-600">Asset Risk Calculator for Commercial Real Estate</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-rbc-blue-800">Asset View</h2>
            <p className="mb-6 text-center text-gray-600">
              Analyze up to 3 individual properties—search, edit details, run scenario simulations.
            </p>
            <Link href="/asset/search" className="mt-auto">
              <Button className="bg-rbc-blue-600 hover:bg-rbc-blue-700">Get Started</Button>
            </Link>
          </div>

          <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-rbc-blue-800">Portfolio View</h2>
            <p className="mb-6 text-center text-gray-600">
              Filter portfolios by geography, type, energy, then review aggregated risk & cashflow.
            </p>
            <Link href="/portfolio/filter" className="mt-auto">
              <Button className="bg-rbc-blue-600 hover:bg-rbc-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
