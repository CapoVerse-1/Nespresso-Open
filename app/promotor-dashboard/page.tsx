import Link from "next/link"
import { Coffee } from "lucide-react"

export default function PromotorDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-emerald-600" />
            <span className="text-lg font-bold tracking-tight">Nespresso</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, Promotor</span>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-6">Promotor Dashboard</h1>
        <p className="text-muted-foreground">This is a blank dashboard page for you to customize.</p>
      </main>
    </div>
  )
}

