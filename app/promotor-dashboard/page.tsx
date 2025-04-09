"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Coffee, Bell, Calendar, FileText, Briefcase, MessageSquare, Package, Clock, User, Video, Send, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function PromotorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: "ai", message: "Hallo! Ich bin Ihr Nespresso-Assistent. Wie kann ich Ihnen heute helfen?" }
  ])
  const [newMessage, setNewMessage] = useState("")
  
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

  // Function to setup calendar day hover effects
  const setupCalendarHoverEffects = () => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // First, remove any existing event listeners to prevent duplicates
      document.querySelectorAll('.calendar-day.has-event').forEach(day => {
        const clone = day.cloneNode(true);
        day.parentNode?.replaceChild(clone, day);
      });
      
      const eventPlaceholder = document.querySelector('.event-placeholder');
      const eventDetails = document.querySelector('.event-details');
      const eventDate = document.querySelector('.event-date');
      const eventTitle = document.querySelector('.event-title');
      const eventTime = document.querySelector('.event-time');
      const eventLocation = document.querySelector('.event-location');
      const eventIndicator = document.querySelector('.event-indicator');
      
      // Add event listeners to all days with events
      document.querySelectorAll('.calendar-day.has-event').forEach(day => {
        day.addEventListener('mouseenter', () => {
          // Get event data from data attributes
          const date = day.getAttribute('data-event-date');
          const type = day.getAttribute('data-event-type');
          const title = day.getAttribute('data-event-title');
          const time = day.getAttribute('data-event-time');
          const location = day.getAttribute('data-event-location');
          
          // Update event details with null checks
          if (eventTitle) eventTitle.textContent = title || '';
          if (eventTime) eventTime.textContent = time || '';
          if (eventLocation) eventLocation.textContent = location || '';
          
          // Set the indicator color with null check
          if (eventIndicator) {
            eventIndicator.className = `event-indicator w-1 h-full self-stretch rounded-full ${type || 'coffee'}`;
          }
          
          // Show details, hide placeholder with null checks
          if (eventPlaceholder) eventPlaceholder.classList.add('hidden');
          if (eventDetails) eventDetails.classList.remove('hidden');
        });
        
        day.addEventListener('mouseleave', () => {
          // Hide details, show placeholder after a short delay
          setTimeout(() => {
            if (!document.querySelector('.calendar-day.has-event:hover')) {
              if (eventPlaceholder) eventPlaceholder.classList.remove('hidden');
              if (eventDetails) eventDetails.classList.add('hidden');
            }
          }, 100);
        });
      });
    }
  };

  // Function to set up sliding tab indicator
  const setupTabIndicator = () => {
    if (typeof window !== 'undefined') {
      // Create or get the tab indicator element
      let tabIndicator = document.querySelector('.tab-sliding-indicator');
      const tabsContainer = document.querySelector('.tab-animation-container');
      
      if (!tabIndicator && tabsContainer) {
        // Create indicator if it doesn't exist
        tabIndicator = document.createElement('span');
        tabIndicator.className = 'tab-sliding-indicator';
        tabsContainer.appendChild(tabIndicator);
      }
      
      // Find active tab and position indicator
      const activeTab = document.querySelector('.tab-trigger[data-state="active"]');
      if (activeTab && tabIndicator && tabsContainer) {
        const tabWidth = activeTab.getBoundingClientRect().width;
        const tabLeft = activeTab.getBoundingClientRect().left - tabsContainer.getBoundingClientRect().left;
        
        // Set indicator position and width
        const indicator = tabIndicator as HTMLElement;
        
        // Add arrival class to trigger wobble animation only when arriving
        indicator.classList.add('arriving');
        indicator.style.width = `${tabWidth}px`;
        indicator.style.transform = `translateX(${tabLeft}px)`;
        
        // Remove arrival class after animation completes to reset for next tab change
        setTimeout(() => {
          indicator.classList.remove('arriving');
        }, 600); // Match transition duration
      }
    }
  };

  // Run setup on client side after render and when tab changes
  useEffect(() => {
    // Add a small delay to ensure the DOM has updated
    const timer = setTimeout(() => {
      setupCalendarHoverEffects();
      setupTabIndicator();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    setChatMessages([...chatMessages, { sender: "user", message: newMessage }])
    setNewMessage("")
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: "ai", 
        message: "Danke für Ihre Nachricht. Unser Team wird sich bald mit Ihnen in Verbindung setzen." 
      }])
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-coffee-50 relative">
      {/* Add the styles */}
      <style jsx global>{marqueeStyles}</style>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-coffee-100 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-mocha-100 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-coffee-50 opacity-30 blur-3xl"></div>
      </div>
      
      {/* Breaking News Banner (conditionally displayed) */}
      <div className="bg-coffee-700 text-white py-2 overflow-hidden">
        <div className="container flex items-center">
          <Badge variant="outline" className="bg-white text-coffee-700 mr-3 uppercase px-2 py-1 text-xs font-bold shrink-0">Breaking News</Badge>
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
            <Coffee className="h-6 w-6 text-coffee-700" />
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
                <AvatarFallback className="bg-coffee-100 text-coffee-800">MP</AvatarFallback>
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
                      background: "linear-gradient(to right, rgba(224, 209, 185, 1), rgba(125, 89, 55, 1))" 
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
                            <div className="w-1 self-stretch rounded-full bg-coffee-600"></div>
                            <div>
                              <h4 className="font-medium">Nespresso Promotion</h4>
                              <p className="text-sm text-muted-foreground">09:00 - 17:00 • Mariahilfer Str.</p>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-coffee-500/10 text-coffee-700 hover:bg-coffee-500/20 border-0">
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
                    {/* Event Preview Panel */}
                    <div className="event-preview-panel mb-6 border border-gray-100 rounded-lg p-4 h-[70px] flex items-center justify-center text-center">
                      <div className="event-placeholder text-muted-foreground text-sm">
                        TO-DOs werden hier dynamisch angezeigt wenn man über einen Tag mit einem To-do hovered
                      </div>
                      <div className="event-details hidden w-full">
                        <div className="event-info">
                          <div className="event-item flex items-center gap-2">
                            <div className="event-indicator w-1 h-full self-stretch rounded-full"></div>
                            <div className="flex-1">
                              <h4 className="event-title font-medium text-sm"></h4>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="event-time"></span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="event-location"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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
                        <div className="calendar-day has-event" data-event-date="15. April 2025" data-event-type="coffee" data-event-title="Nespresso Promotion" data-event-time="09:00-17:00" data-event-location="Mariahilfer Str.">15</div>
                        <div className="calendar-day">16</div>
                        <div className="calendar-day">17</div>
                        <div className="calendar-day has-event" data-event-date="18. April 2025" data-event-type="blue" data-event-title="Barista Training" data-event-time="14:00-16:00" data-event-location="Online Zoom">18</div>
                        <div className="calendar-day weekend">19</div>
                        <div className="calendar-day weekend">20</div>
                        
                        {/* Week 4 */}
                        <div className="calendar-day">21</div>
                        <div className="calendar-day has-event" data-event-date="22. April 2025" data-event-type="amber" data-event-title="Coffee Tasting Event" data-event-time="11:00-15:00" data-event-location="Stephansplatz">22</div>
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
      
      {/* AI Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        <div className={`chat-window ${isChatOpen ? 'visible' : 'hidden'} w-64 md:w-72 bg-white rounded-2xl shadow-lg overflow-hidden absolute bottom-20 right-0`}>
          {/* Chat Header */}
          <div className="bg-coffee-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              <h3 className="font-medium">Nespresso Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="p-4 message-container flex-1 h-[350px]">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-3 max-w-[80%] ${msg.sender === "ai" ? "message-ai ml-0" : "message-user ml-auto"} p-3`}>
                {msg.message}
              </div>
            ))}
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="border-t p-3 flex gap-2">
            <Input 
              placeholder="Schreiben Sie eine Nachricht..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 focus-visible:ring-coffee-500"
            />
            <Button type="submit" size="icon" className="bg-coffee-700 hover:bg-coffee-800">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
        
        {/* Chat Button */}
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-coffee-700 hover:bg-coffee-800 chat-button"
          size="icon"
        >
          <Coffee className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

// Add this to the global CSS or create a new CSS file for these animations
// This can be added using a style tag since this is a client component
const marqueeStyles = `
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-marquee {
  animation: marquee 25s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 25s linear infinite;
}

.tabs-container .tab-animation-container {
  position: relative;
}

/* Style for the JavaScript-created sliding indicator */
.tab-sliding-indicator {
  position: absolute;
  bottom: 0;
  height: 3px;
  background-color: rgb(125, 89, 55);
  border-radius: 9999px;
  z-index: 1;
  /* Use a simple, smooth animation for departure */
  transition: transform 0.3s ease-out, width 0.3s ease-out;
}

/* Apply bouncy animation only when arriving at new tab */
.tab-sliding-indicator.arriving {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-trigger {
  background: transparent !important;
  font-weight: 500;
  border-radius: 0.375rem;
  position: relative;
  transition: color 0.2s ease;
}

.tab-trigger[data-state="active"] {
  color: rgb(62, 46, 30);
  font-weight: 600;
}

/* Hide the default indicator since we're using our custom one */
.tab-trigger[data-state="active"]::before {
  content: none;
}

.termine-tabs .termine-tab {
  position: relative;
  transition: color 0.2s ease;
  font-weight: 400;
}

.termine-tabs .termine-tab::after {
  content: "";
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  bottom: -2px;
  height: 2px;
  background-color: rgb(125, 89, 55);
  transform: scaleX(0);
  opacity: 0;
  transition: all 0.2s ease;
}

.termine-tabs .termine-tab.active {
  font-weight: 500;
  color: rgb(62, 46, 30);
}

.termine-tabs .termine-tab.active::after {
  transform: scaleX(1);
  opacity: 1;
}

.termine-tabs .termine-tab:hover {
  color: rgb(125, 89, 55);
}

.calendar-container {
  position: relative;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.75rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem 0.5rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  transition: all 0.15s ease;
  cursor: default;
  position: relative;
}

.calendar-day.prev-month,
.calendar-day.next-month {
  color: rgb(163, 163, 163);
}

.calendar-day.weekend {
  color: rgb(125, 89, 55);
}

.calendar-day::after {
  content: "";
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 9999px;
  background-color: transparent;
}

.calendar-day.has-event {
  cursor: pointer;
}

.termine-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease;
}

.termine-item:hover {
  background-color: rgb(250, 250, 250);
}

.card-stat-button:hover {
  background-color: rgb(246, 241, 235);
  border-color: rgb(179, 139, 88);
  color: rgb(125, 89, 55);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.4) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(203, 213, 225, 0.4);
  border-radius: 9999px;
}

.calendar-nav:hover {
  background-color: rgb(246, 241, 235);
  color: rgb(125, 89, 55);
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

/* Event preview panel styling */
.event-preview-panel {
  background-color: rgba(250, 250, 250, 0.7);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  transition: none;
}

.event-details {
  width: 100%;
  text-align: left;
}

.calendar-day.has-event {
  position: relative;
  z-index: 1;
}

.calendar-day.has-event::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(125, 89, 55, 0.06);
  border-radius: 0.375rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: -1;
}

.calendar-day.has-event:hover::before {
  opacity: 1;
}

.calendar-day.has-event:hover {
  color: rgb(125, 89, 55);
  font-weight: 500;
}

.calendar-day.has-event::after {
  bottom: 10%;
}

/* Event indicators by type */
.event-indicator.coffee {
  background-color: rgb(125, 89, 55);
}

.event-indicator.blue {
  background-color: rgb(59, 130, 246);
}

.event-indicator.amber {
  background-color: rgb(245, 158, 11);
}

.event-indicator.purple {
  background-color: rgb(139, 92, 246);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(125, 89, 55, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(125, 89, 55, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(125, 89, 55, 0);
  }
}

.chat-button {
  animation: pulse 2s infinite;
}

.chat-window {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom right;
}

.chat-window.hidden {
  transform: scale(0.95);
  opacity: 0;
  pointer-events: none;
}

.chat-window.visible {
  transform: scale(1);
  opacity: 1;
}

.message-container {
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.4) transparent;
}

.message-container::-webkit-scrollbar {
  width: 4px;
}

.message-container::-webkit-scrollbar-track {
  background: transparent;
}

.message-container::-webkit-scrollbar-thumb {
  background-color: rgba(203, 213, 225, 0.4);
  border-radius: 9999px;
}

.message-ai {
  background-color: #f8f5f1;
  border-radius: 12px 12px 12px 0;
}

.message-user {
  background-color: #7d5937;
  color: white;
  border-radius: 12px 12px 0 12px;
}
`;

// Add the style tag to inject the CSS
export function BreakingNewsStyles() {
  return <style jsx global>{marqueeStyles}</style>
} 