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
                  <Button variant="outline" size="sm" className="w-full card-stat-button">
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
                  <Button variant="outline" size="sm" className="w-full card-stat-button">
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
                    <div className="h-2.5 rounded-full" style={{ 
                      width: "40%", 
                      background: "linear-gradient(to right, rgba(167, 243, 208, 1), rgba(5, 150, 105, 1))" 
                    }}></div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full card-stat-button">
                    <Clock className="mr-2 h-4 w-4" />
                    Gesamte Statistik
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Upcoming Events - Completely Redesigned */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Termine List with Tabs */}
                <div className="border-r border-gray-100">
                  <CardHeader>
                    <CardTitle>Kommende Termine</CardTitle>
                    <div className="flex space-x-1 mt-2 termine-tabs">
                      <Button variant="ghost" className="text-sm px-3 py-1 h-auto termine-tab active">Heute</Button>
                      <Button variant="ghost" className="text-sm px-3 py-1 h-auto termine-tab">Diese Woche</Button>
                      <Button variant="ghost" className="text-sm px-3 py-1 h-auto termine-tab">Diesen Monat</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="space-y-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                      {/* Today's events - can be replaced with dynamic content based on active tab */}
                      <div className="termine-item">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="w-1 self-stretch rounded-full bg-emerald-500"></div>
                            <div>
                              <h4 className="font-medium">Nespresso Promotion</h4>
                              <p className="text-sm text-muted-foreground">09:00 - 17:00 • Mariahilfer Str.</p>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-0">
                            Einsatz
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="termine-item">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="w-1 self-stretch rounded-full bg-blue-500"></div>
                            <div>
                              <h4 className="font-medium">Barista Training</h4>
                              <p className="text-sm text-muted-foreground">14:00 - 16:00 • Online Zoom</p>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-0">
                            Schulung
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="termine-item">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="w-1 self-stretch rounded-full bg-amber-500"></div>
                            <div>
                              <h4 className="font-medium">Zeiterfassung einreichen</h4>
                              <p className="text-sm text-muted-foreground">Bis 18:00 Uhr</p>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-0">
                            To-do
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="termine-item">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="w-1 self-stretch rounded-full bg-purple-500"></div>
                            <div>
                              <h4 className="font-medium">Coffee Tasting Event</h4>
                              <p className="text-sm text-muted-foreground">Ab 11:00 • Stephansplatz</p>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 border-0">
                            Event
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
                
                {/* Right Side - Modern Calendar */}
                <div className="calendar-container">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Kalender</CardTitle>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 calendar-nav">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 calendar-nav">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">April 2025</p>
                  </CardHeader>
                  <CardContent className="pb-6">
                    {/* Calendar Grid */}
                    <div className="calendar-grid">
                      {/* Weekday Headers */}
                      <div className="calendar-weekdays">
                        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                          <div key={day} className="text-xs text-center font-medium text-muted-foreground">{day}</div>
                        ))}
                      </div>
                      
                      {/* Calendar Days */}
                      <div className="calendar-days">
                        {/* Week 1 */}
                        <div className="calendar-day prev-month">31</div>
                        <div className="calendar-day">1</div>
                        <div className="calendar-day">2</div>
                        <div className="calendar-day">3</div>
                        <div className="calendar-day">4</div>
                        <div className="calendar-day weekend">5</div>
                        <div className="calendar-day weekend">6</div>
                        
                        {/* Week 2 */}
                        <div className="calendar-day">7</div>
                        <div className="calendar-day">8</div>
                        <div className="calendar-day">9</div>
                        <div className="calendar-day">10</div>
                        <div className="calendar-day">11</div>
                        <div className="calendar-day weekend">12</div>
                        <div className="calendar-day weekend">13</div>
                        
                        {/* Week 3 */}
                        <div className="calendar-day">14</div>
                        <div className="calendar-day has-event">15</div>
                        <div className="calendar-day">16</div>
                        <div className="calendar-day">17</div>
                        <div className="calendar-day has-event">18</div>
                        <div className="calendar-day weekend">19</div>
                        <div className="calendar-day weekend">20</div>
                        
                        {/* Week 4 */}
                        <div className="calendar-day">21</div>
                        <div className="calendar-day has-event">22</div>
                        <div className="calendar-day">23</div>
                        <div className="calendar-day">24</div>
                        <div className="calendar-day">25</div>
                        <div className="calendar-day weekend">26</div>
                        <div className="calendar-day weekend">27</div>
                        
                        {/* Week 5 */}
                        <div className="calendar-day">28</div>
                        <div className="calendar-day">29</div>
                        <div className="calendar-day">30</div>
                        <div className="calendar-day next-month">1</div>
                        <div className="calendar-day next-month">2</div>
                        <div className="calendar-day next-month weekend">3</div>
                        <div className="calendar-day next-month weekend">4</div>
                      </div>
                    </div>
                    
                    {/* Hover Tooltip for Events (will appear when hovering over days with events) */}
                    <div className="event-tooltip bg-white p-3 rounded-lg shadow-lg border border-gray-100 hidden">
                      <div className="text-sm font-medium">15. April 2025</div>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-xs">Nespresso Promotion (09:00-17:00)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
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
  background-color: transparent !important;
  z-index: 1;
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

/* Active tab green indicator styles */
[data-state="active"].tab-trigger::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(5, 150, 105, 0.2); /* Darker green with transparency */
  border-radius: 0.5rem;
  z-index: -1;
  transform-origin: left center;
  animation: tabIndicatorBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Basic tab styles */
.tab-trigger {
  transition: color 0.2s ease;
  background-color: transparent !important; 
  position: relative;
  z-index: 2;
}

/* Tab indicator bounce animation */
@keyframes tabIndicatorBounce {
  0% {
    transform: scaleX(0.7) scaleY(0.9);
    opacity: 0.7;
  }
  60% {
    transform: scaleX(1.04) scaleY(1.01);
    opacity: 1;
  }
  80% {
    transform: scaleX(0.98) scaleY(1);
  }
  100% {
    transform: scaleX(1) scaleY(1);
  }
}

/* Additional polish */
.tab-trigger:hover:not([data-state="active"]) {
  background-color: rgba(5, 150, 105, 0.05);
}

/* Tab list styles */
[role="tablist"] {
  position: relative;
  overflow: visible;
}

/* Simplify tab content transitions */
.tabs-container [data-state] {
  transition: opacity 0.2s ease;
}

/* Elegant hover effects for cards */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
}

/* Hover effect for buttons */
button:not([disabled]):hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* Quick actions hover effect */
.grid button.h-auto:hover {
  background-color: rgba(16, 185, 129, 0.08);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.grid button.h-auto:hover svg {
  transform: scale(1.1);
  color: rgb(5, 150, 105);
  transition: all 0.2s ease;
}

/* Hover effect for event items */
.flex.items-center.justify-between:hover {
  background-color: rgba(249, 250, 251, 0.8);
  transform: translateX(3px);
  transition: all 0.25s ease;
}

/* Improved upcoming events hover styling */
.event-item {
  margin: 0 -1.5rem;
  padding: 1rem 1.5rem;
  border-left: 3px solid transparent;
  transition: all 0.2s ease-out;
}

.event-item:hover {
  background-color: rgba(249, 250, 251, 0.9);
  border-left-color: rgba(5, 150, 105, 0.5);
  transform: translateX(0);
}

.event-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 1px;
  background-color: rgba(229, 231, 235, 0.5);
}

.event-item:last-child::after {
  display: none;
}

.event-item:hover::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
  background: linear-gradient(to bottom, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.5));
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Notification hover effect */
.flex.gap-4.items-start:hover {
  background-color: rgba(249, 250, 251, 0.5);
  padding: 0.5rem;
  margin: -0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

/* Team notes hover effect */
.rounded-lg.bg-gray-50:hover {
  background-color: rgba(243, 244, 246, 0.8);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

/* AI Assistant button hover effect */
.fixed.bottom-6.right-6 button:hover {
  background-color: rgb(5, 150, 105);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Calendar hover effect */
button[variant="default"]:hover {
  box-shadow: 0 4px 12px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

/* Card footer buttons hover effect - green hover for the three main statistic buttons */
.card-stat-button:hover {
  background-color: rgba(5, 150, 105, 0.08) !important;
  border-color: rgba(5, 150, 105, 0.5) !important;
  color: rgb(5, 150, 105) !important;
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.card-stat-button:hover svg {
  transform: scale(1.1);
  color: rgb(5, 150, 105) !important;
  transition: all 0.2s ease;
}

/* Calendar styling */
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 8px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 0.375rem;
  color: #374151;
  position: relative;
  transition: all 0.2s ease;
}

.calendar-day:hover {
  background-color: rgba(5, 150, 105, 0.08);
}

.calendar-day.prev-month, 
.calendar-day.next-month {
  color: #9CA3AF;
}

.calendar-day.weekend {
  color: #6B7280;
}

.calendar-day.has-event::after {
  content: "";
  position: absolute;
  bottom: 15%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgb(5, 150, 105);
}

.calendar-nav:hover {
  background-color: rgba(5, 150, 105, 0.08);
  color: rgb(5, 150, 105);
}

/* Termine Section Styling */
.termine-tabs {
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  padding-bottom: 0.5rem;
}

.termine-tab {
  border-radius: 0.25rem;
  font-weight: 500;
}

.termine-tab.active {
  background-color: rgba(5, 150, 105, 0.08);
  color: rgb(5, 150, 105);
}

.termine-tab:hover:not(.active) {
  background-color: rgba(5, 150, 105, 0.04);
}

.termine-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.termine-item:hover {
  background-color: rgba(249, 250, 251, 0.9);
  transform: translateX(2px);
}

/* Custom scrollbar for termine list */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(229, 231, 235, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(229, 231, 235, 0.5);
  border-radius: 4px;
}

/* Event tooltip styling */
.event-tooltip {
  position: absolute;
  z-index: 50;
  max-width: 250px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.calendar-day.has-event:hover + .event-tooltip,
.event-tooltip:hover {
  opacity: 1;
  display: block;
}
`;

// Add the style tag to inject the CSS
export function BreakingNewsStyles() {
  return <style jsx global>{marqueeStyles}</style>
} 