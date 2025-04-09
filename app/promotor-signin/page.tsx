"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Coffee, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PromotorSignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push("/promotor-dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-coffee-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -left-40 h-96 w-96 rounded-full bg-mocha-100 opacity-20 blur-3xl"></div>
      </div>
      <div className="container flex flex-1 items-center justify-center py-12 relative z-10">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center">
              <Link href="/" className="mb-4 inline-flex items-center gap-2">
                <Coffee className="h-6 w-6 text-coffee-700" />
                <span className="text-lg font-bold tracking-tight">Nespresso</span>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold">Promotor Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="transition-all duration-200 focus:border-coffee-500 focus:ring-coffee-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-xs text-coffee-600 transition-all duration-200 hover:underline hover:text-coffee-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 transition-all duration-200 focus:border-coffee-500 focus:ring-coffee-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-coffee-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-coffee-700 transition-all duration-300 hover:bg-coffee-800 hover:translate-y-[-2px] hover:shadow-md"
              >
                Sign In
              </Button>
              <div className="text-center text-sm">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-coffee-600 transition-all duration-200 hover:underline hover:text-coffee-700 hover:gap-2"
                >
                  <ArrowLeft className="h-3 w-3 transition-transform duration-200" />
                  Back to home
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

