"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Settings, User } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [activeLink, setActiveLink] = useState("")

  useEffect(() => {
    if (pathname.startsWith("/asset")) {
      setActiveLink("asset")
    } else if (pathname.startsWith("/portfolio")) {
      setActiveLink("portfolio")
    } else {
      setActiveLink("home")
    }
  }, [pathname])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Building2 className="h-8 w-8 text-rbc-blue-600" />
            <span className="ml-2 text-xl font-bold text-rbc-blue-900">ARC</span>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  activeLink === "home" ? "text-rbc-blue-600" : "text-gray-600 hover:text-rbc-blue-600"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/asset/search"
                className={`text-sm font-medium transition-colors ${
                  activeLink === "asset" ? "text-rbc-blue-600" : "text-gray-600 hover:text-rbc-blue-600"
                }`}
              >
                Asset View
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio/filter"
                className={`text-sm font-medium transition-colors ${
                  activeLink === "portfolio" ? "text-rbc-blue-600" : "text-gray-600 hover:text-rbc-blue-600"
                }`}
              >
                Portfolio View
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-rbc-blue-600">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </button>
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-rbc-blue-600">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </button>
        </div>
      </div>
    </header>
  )
}
