"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Coffee, Users, Calendar, MessageSquare, BarChart4, Zap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const timerRef = useRef(null)

  const handleMouseEnter = (feature) => {
    timerRef.current = setTimeout(() => {
      setActiveFeature(feature)
      setShowPopup(true)
    }, 2000) // 2 seconds
  }

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showPopup && e.target.classList.contains("popup-overlay")) {
        closePopup()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showPopup])

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showPopup])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-100 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-teal-100 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-50 opacity-30 blur-3xl"></div>
      </div>
      <header className="container z-10 flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Coffee className="h-8 w-8 text-emerald-600" />
          <span className="text-xl font-bold tracking-tight">Nespresso</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Welcome to <span className="text-emerald-600">Nespresso</span>
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Your all-in-one platform for seamless communication and workflow management
            </p>
          </div>

          <div className="mx-auto w-full max-w-4xl py-12">
            <div className="grid gap-8 md:grid-cols-2">
              <SignInCard
                title="Promotor Sign In"
                description="Access your schedule, request equipment, and communicate with your team"
                buttonText="Sign In as Promotor"
                href="/promotor-signin"
                icon="👤"
              />
              <SignInCard
                title="SalesCrew Sign In"
                description="Manage your team, create schedules, and oversee operations"
                buttonText="Sign In as SalesCrew"
                href="/salescrew-signin"
                icon="👥"
              />
            </div>
          </div>

          <div className="relative mx-auto mt-8 w-full max-w-5xl overflow-hidden rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-8 shadow-lg">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                  Seamless Experience
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Designed for efficiency</h2>
                <p className="text-muted-foreground">
                  Nespresso brings together all the tools you need for effective team management and communication in
                  one elegant platform.
                </p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 p-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Coffee className="h-24 w-24 text-white opacity-20" />
                </div>
                <div className="relative z-10 flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-medium">Nespresso App</h3>
                    <p className="mt-2 text-sm text-emerald-100">Available on Web, iOS & Android</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-emerald-200 opacity-50 blur-xl"></div>
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-200 opacity-50 blur-xl"></div>
          </div>

          {/* SalesCrew Features Section */}
          <div className="w-full py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">SalesCrew Features</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground">
                Powerful tools designed specifically for SalesCrew members to manage teams and operations efficiently
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Users className="h-8 w-8 text-emerald-600" />}
                title="Team Management"
                description="Easily manage your team members, track performance, and assign tasks with our intuitive interface."
                onMouseEnter={() =>
                  handleMouseEnter({
                    icon: <Users className="h-12 w-12 text-emerald-600" />,
                    title: "Team Management",
                    description:
                      "Easily manage your team members, track performance, and assign tasks with our intuitive interface. Our comprehensive team management system allows you to organize team members by skills, availability, and location. You can quickly assign tasks, track completion status, and provide feedback all in one place.",
                    features: [
                      "Team member profiles with skills and availability",
                      "Task assignment and tracking",
                      "Performance metrics and feedback tools",
                      "Team communication channels",
                      "Automated notifications for task deadlines",
                    ],
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
              <FeatureCard
                icon={<Calendar className="h-8 w-8 text-emerald-600" />}
                title="Dynamic Scheduling"
                description="Create and manage schedules with our drag-and-drop calendar. Filter by team member, location, or event type."
                onMouseEnter={() =>
                  handleMouseEnter({
                    icon: <Calendar className="h-12 w-12 text-emerald-600" />,
                    title: "Dynamic Scheduling",
                    description:
                      "Create and manage schedules with our intuitive drag-and-drop calendar interface. Our scheduling system allows you to easily visualize and organize your team's time across multiple locations and events. Filter views by team member, location, or event type to get exactly the information you need.",
                    features: [
                      "Drag-and-drop calendar interface",
                      "Multiple view options (day, week, month)",
                      "Color-coded events by type or priority",
                      "Conflict detection and resolution",
                      "Automated schedule notifications",
                    ],
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8 text-emerald-600" />}
                title="Instant Communication"
                description="Real-time messaging with individual team members or groups. Send important updates with push notifications."
                onMouseEnter={() =>
                  handleMouseEnter({
                    icon: <MessageSquare className="h-12 w-12 text-emerald-600" />,
                    title: "Instant Communication",
                    description:
                      "Keep your team connected with our real-time messaging system. Send messages to individuals, create group chats for specific teams or projects, and broadcast important announcements to everyone. With push notifications, you can ensure critical information reaches your team instantly.",
                    features: [
                      "Individual and group messaging",
                      "File and image sharing",
                      "Read receipts and typing indicators",
                      "Push notifications for important messages",
                      "Message search and history",
                    ],
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
              <FeatureCard
                icon={<BarChart4 className="h-8 w-8 text-emerald-600" />}
                title="Performance Analytics"
                description="Comprehensive dashboards and reports to track team performance, sales metrics, and campaign effectiveness."
                onMouseEnter={() =>
                  handleMouseEnter({
                    icon: <BarChart4 className="h-12 w-12 text-emerald-600" />,
                    title: "Performance Analytics",
                    description:
                      "Gain valuable insights with our comprehensive analytics dashboards. Track key performance indicators, monitor sales metrics, and measure campaign effectiveness all in one place. Our customizable reports help you identify trends, spot opportunities, and make data-driven decisions.",
                    features: [
                      "Real-time performance dashboards",
                      "Customizable reports and visualizations",
                      "Sales and conversion tracking",
                      "Campaign effectiveness metrics",
                      "Export options for presentations and sharing",
                    ],
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-emerald-600" />}
                title="Breaking News"
                description="Create and broadcast important announcements to your entire team instantly with our Breaking News feature."
                onMouseEnter={() =>
                  handleMouseEnter({
                    icon: <Zap className="h-12 w-12 text-emerald-600" />,
                    title: "Breaking News",
                    description:
                      "Ensure critical information reaches your entire team instantly with our Breaking News feature. Create eye-catching announcements that appear prominently in the app, ensuring they won't be missed. Perfect for urgent updates, important reminders, or celebrating team successes.",
                    features: [
                      "High-visibility announcements",
                      "Scheduled or immediate publishing",
                      "Targeting options for specific teams",
                      "Rich formatting with images and links",
                      "Confirmation tracking to ensure message receipt",
                    ],
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
              <FeatureCard
                icon={<Coffee className="h-8 w-8 text-emerald-600" />}
                title="AI Assistant"
                description="Leverage our AI assistant to answer common questions, automate routine tasks, and improve team efficiency."
                onMouseEnter={() =>
                  handleMouseEnter({
                    icon: <Coffee className="h-12 w-12 text-emerald-600" />,
                    title: "AI Assistant",
                    description:
                      "Boost productivity with our intelligent AI assistant. It can answer common questions, automate routine tasks, and provide helpful suggestions based on your team's activities. The AI learns from your interactions to become more helpful over time, allowing your team to focus on what matters most.",
                    features: [
                      "Natural language question answering",
                      "Automated task scheduling and reminders",
                      "Smart suggestions based on team activity",
                      "Data analysis and insight generation",
                      "Integration with other platform features",
                    ],
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="container flex h-16 items-center justify-between border-t px-4 md:px-6">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CapoVerse. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-emerald-600"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-emerald-600"
          >
            Terms
          </Link>
        </div>
      </footer>

      {/* Feature Popup */}
      {showPopup && activeFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center popup-overlay">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={closePopup}
                  className="rounded-full p-1.5 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 border border-gray-100">
                    {activeFeature.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{activeFeature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{activeFeature.description}</p>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-gray-700">Key Features:</h4>
                  <ul className="space-y-2">
                    {activeFeature.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 border-t flex justify-end">
                <Button
                  onClick={closePopup}
                  className="bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SignInCard({ title, description, buttonText, href, icon }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md hover:border-emerald-200 relative">
      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-emerald-300 opacity-20 blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-teal-300 opacity-20 blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
      </div>
      <CardContent className="p-6 relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700 transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-200">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-emerald-600">{title}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{description}</p>
        <Button
          asChild
          className="w-full bg-emerald-600 transition-all duration-300 hover:bg-emerald-700 hover:translate-y-[-2px] hover:shadow-md"
        >
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ icon, title, description, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-emerald-100 opacity-30 blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
      </div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 transition-colors duration-300 group-hover:bg-emerald-100">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-emerald-600">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

