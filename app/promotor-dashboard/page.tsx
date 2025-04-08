"use client"

import { useState } from "react"
import Link from "next/link"
import { Coffee, Bell, Calendar, FileText, Briefcase, MessageSquare, Package, Clock, User, Video, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function PromotorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  
  // Mock data for the dashboard
  const upcomingEvents = [
    { id: 1, title: "Nespresso Promotion @ Mariahilfer Str.", date: "15. Apr 2025", time: "09:00 - 17:00", status: "confirmed" },
    { id: 2, title: "Barista Training", date: "18. Apr 2025", time: "14:00 - 16:00", status: "training" },
    { id: 3, title: "Coffee Tasting Event", date: "22. Apr 2025", time: "11:00 - 15:00", status: "pending" },
  ]
  
  const notifications = [
    { id: 1, title: "Verfügbarkeitsanfrage bestätigt", time: "Vor 2 Stunden", read: false },
    { id: 2, title: "Neue Schulungsvideos verfügbar", time: "Vor 1 Tag", read: true },
    { id: 3, title: "Equipment-Anfrage genehmigt", time: "Vor 2 Tagen", read: true },
  ]
  
  const notes = [
    { id: 1, title: "Hinweis zur Nespresso Promotion", content: "Bitte alle neuen Materialien für die Vertolino-Reihe mitnehmen. Neue Flyer sind heute eingetroffen.", from: "Julia (SalesCrew)", date: "Heute" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 relative">
      {/* Add the styles */}
      <style jsx global>{marqueeStyles}</style>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-100 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-teal-100 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-50 opacity-30 blur-3xl"></div>
      </div>
      
      {/* Breaking News Banner (conditionally displayed) */}
      <div className="bg-emerald-600 text-white py-2 overflow-hidden">
        <div className="container flex items-center">
          <Badge variant="outline" className="bg-white text-emerald-600 mr-3 uppercase px-2 py-1 text-xs font-bold shrink-0">Breaking News</Badge>
          <div className="overflow-hidden relative w-full">
            <div className="whitespace-nowrap inline-block animate-marquee">
              Wichtig: Team-Meeting am Freitag um 14:00 Uhr • Neue Premium-Kaffeesorten ab nächster Woche verfügbar • Erinnerung: Zeiterfassung nicht vergessen! &nbsp;&nbsp;&nbsp;
            </div>
            <div className="whitespace-nowrap inline-block animate-marquee2 absolute top-0">
              Wichtig: Team-Meeting am Freitag um 14:00 Uhr • Neue Premium-Kaffeesorten ab nächster Woche verfügbar • Erinnerung: Zeiterfassung nicht vergessen! &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
      
      {/* Header/Navigation */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-emerald-600" />
            <span className="text-lg font-bold tracking-tight">Nespresso</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-emerald-100 text-emerald-800">MP</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">Max Promotor</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container py-6 md:py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Promotor Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              VTC/TC
            </Button>
            <Button variant="default" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Mein Kalender
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="tabs-container space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 md:w-[500px] p-1 relative tab-animation-container">
            <TabsTrigger value="dashboard" className="tab-trigger font-medium relative z-10">Dashboard</TabsTrigger>
            <TabsTrigger value="einsatz" className="tab-trigger font-medium relative z-10">Einsatz</TabsTrigger>
            <TabsTrigger value="equipment" className="tab-trigger font-medium relative z-10">Equipment</TabsTrigger>
            <TabsTrigger value="requests" className="tab-trigger font-medium relative z-10">Anträge</TabsTrigger>
            <TabsTrigger value="chats" className="tab-trigger font-medium relative z-10">Chats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            {/* Top Cards Row */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Nächster Einsatz</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15. Apr</div>
                  <p className="text-xs text-muted-foreground mt-1">Mariahilfer Str. • 09:00-17:00</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Details anzeigen
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Offene Anträge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground mt-1">Verfügbarkeit für Mai</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Zur Übersicht
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Stunden diese Woche</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16 / 40</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    Gesamte Statistik
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Kommende Termine</CardTitle>
                <CardDescription>Deine geplanten Promotion-Termine und Schulungen für die nächsten Wochen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          event.status === 'confirmed' ? 'bg-emerald-500' : 
                          event.status === 'training' ? 'bg-blue-500' : 'bg-amber-500'
                        }`}></div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                        </div>
                      </div>
                      <Badge variant={
                        event.status === 'confirmed' ? 'default' : 
                        event.status === 'training' ? 'secondary' : 'outline'
                      }>
                        {event.status === 'confirmed' ? 'Bestätigt' : 
                         event.status === 'training' ? 'Schulung' : 'Ausstehend'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Alle Termine anzeigen</Button>
              </CardFooter>
            </Card>
            
            {/* Two Column Layout */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Benachrichtigungen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex gap-4 items-start">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-slate-900'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground">Alle Benachrichtigungen</Button>
                </CardFooter>
              </Card>
              
              {/* Team Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notizen vom Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="rounded-lg bg-gray-50 p-4">
                        <h4 className="font-medium">{note.title}</h4>
                        <p className="text-sm mt-1">{note.content}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-muted-foreground">{note.from}</span>
                          <span className="text-xs text-muted-foreground">{note.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground">Alle Notizen</Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Schnellzugriff</CardTitle>
                <CardDescription>Häufig verwendete Funktionen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 space-y-2">
                    <Briefcase className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm">Verfügbarkeit</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 space-y-2">
                    <Package className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm">Equipment</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 space-y-2">
                    <Video className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm">Schulungsvideos</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 space-y-2">
                    <MessageSquare className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm">AI Assistent</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="einsatz">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Meine Einsätze</h3>
              <p>Hier findest du Details zu deinen aktuellen und kommenden Promotion-Einsätzen.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="equipment">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Equipment anfragen</h3>
              <p>Hier kannst du Equipment für deine Promotion-Einsätze anfragen.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Meine Anträge</h3>
              <p>Hier werden alle deine Anträge für Verfügbarkeiten, Urlaub und Zeitausgleich angezeigt.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="chats">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Meine Chats</h3>
              <p>Hier kannst du mit anderen Team-Mitgliedern und SalesCrew kommunizieren.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* AI Assistant Button (Fixed) */}
      <div className="fixed bottom-6 right-6">
        <Button className="h-12 w-12 rounded-full" size="icon">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

// Add this to the global CSS or create a new CSS file for these animations
// This can be added using a style tag since this is a client component
const marqueeStyles = `
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

@keyframes marquee2 {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0%); }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 20s linear infinite;
}

/* Custom tab indicator animation styles */
[data-state="active"].tab-trigger {
  position: relative;
  overflow: hidden;
  background-color: transparent;
}

/* Add a light background box to the tabs container */
.tab-animation-container {
  background-color: rgba(240, 249, 244, 0.8);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  padding: 0.25rem 0.5rem !important;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  backdrop-filter: blur(4px);
  position: relative;
  display: flex;
  align-items: center;
}

[data-state="active"].tab-trigger::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: rgba(16, 185, 129, 0.18);
  filter: blur(12px);
  z-index: -1;
  animation: pulseGlow 3s infinite alternate;
}

@keyframes pulseGlow {
  0% {
    opacity: 0.7;
    filter: blur(12px);
  }
  100% {
    opacity: 1;
    filter: blur(15px);
  }
}

/* Additional style to prevent white flash during transitions */
.tab-trigger {
  transition: all 0.2s ease;
  position: relative;
  background-color: transparent !important;
}

/* Create a translucent background for active tabs instead of the default white */
[data-state="active"].tab-trigger::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.65);
  z-index: -2;
  transition: opacity 0.2s ease;
}

/* Ensure the tab list doesn't flash during transitions */
[role="tablist"] {
  position: relative;
  background-color: white;
}

/* Custom animation for the tab indicator */
[role="tablist"] [data-state="active"] {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

.tab-animation-container [data-state="active"] {
  animation: tabBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes tabBounce {
  0% {
    transform: translateX(-30%);
  }
  60% {
    transform: translateX(3%);
  }
  80% {
    transform: translateX(-1%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Additional polish */
.tab-trigger:hover:not([data-state="active"]) {
  background-color: rgba(16, 185, 129, 0.05);
}

/* Tab switching animation */
.tabs-switch-enter {
  opacity: 0;
  transform: translateX(10px);
}

.tabs-switch-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 200ms, transform 200ms;
}

.tabs-switch-exit {
  opacity: 1;
}

.tabs-switch-exit-active {
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 200ms, transform 200ms;
}
`;

// Add the style tag to inject the CSS
export function BreakingNewsStyles() {
  return <style jsx global>{marqueeStyles}</style>
} 