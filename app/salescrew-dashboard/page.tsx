"use client"

import { useState } from "react"
import Link from "next/link"
import { Coffee, Bell, Calendar, FileText, Users, BarChart4, MessageSquare, Settings, User, Phone, X, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function SalesCrewDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: "ai", message: "Hallo! Ich bin Ihr Nespresso-Assistent. Wie kann ich Ihnen heute helfen?" }
  ])
  const [newMessage, setNewMessage] = useState("")
  
  // Mock data for the dashboard
  const promotorTeam = [
    { id: 1, name: "Max Müller", role: "Senior Promotor", status: "active", events: 12 },
    { id: 2, name: "Sophie Bauer", role: "Promotor", status: "active", events: 8 },
    { id: 3, name: "Tobias Hofer", role: "Junior Promotor", status: "training", events: 3 },
    { id: 4, name: "Lisa Brunner", role: "Promotor", status: "inactive", events: 5 },
  ]
  
  const upcomingEvents = [
    { id: 1, title: "Team Meeting", date: "12. Apr 2025", time: "10:00 - 11:30", status: "scheduled" },
    { id: 2, name: "Quarterly Planning", date: "16. Apr 2025", time: "09:00 - 16:00", status: "scheduled" },
    { id: 3, name: "New Product Briefing", date: "20. Apr 2025", time: "14:00 - 16:00", status: "pending" },
  ]
  
  const notifications = [
    { id: 1, title: "Neuer Promotor beantragt Schulung", time: "Vor 1 Stunde", read: false },
    { id: 2, title: "Neue Verkaufsberichte verfügbar", time: "Vor 5 Stunden", read: false },
    { id: 3, title: "Verfügbarkeitsanfrage von Max Müller", time: "Vor 1 Tag", read: true },
  ]
  
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Add the styles for the chat assistant */}
      <style jsx global>{`
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
      `}</style>
      
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
                2
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-emerald-100 text-emerald-800">SC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">SalesCrew Manager</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-6 md:py-8">
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-3xl font-bold">SalesCrew Dashboard</h1>
          <p className="text-muted-foreground">Übersicht und Verwaltung deines Promotor-Teams</p>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="reports">Berichte</TabsTrigger>
            <TabsTrigger value="chats">Kommunikation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Aktive Promotoren</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground mt-1">+2 seit letztem Monat</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Geplante Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground mt-1">In den nächsten 30 Tagen</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Verfügbarkeitsrate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground mt-1">+5% im Vergleich zum Vormonat</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Durchschn. Bewertung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5</div>
                  <p className="text-xs text-muted-foreground mt-1">Basierend auf 45 Bewertungen</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Team Overview */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    <span>Promotor-Team</span>
                  </CardTitle>
                  <CardDescription>Übersicht deines Teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {promotorTeam.map(member => (
                      <div key={member.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant={
                            member.status === 'active' ? 'default' : 
                            member.status === 'training' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {member.status === 'active' ? 'Aktiv' : 
                             member.status === 'training' ? 'Training' : 'Inaktiv'}
                          </Badge>
                          <span className="ml-3 text-sm">{member.events} Events</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">Alle Team-Mitglieder</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-emerald-600" />
                    <span>Meldungen & Aufgaben</span>
                  </CardTitle>
                  <CardDescription>Neueste Benachrichtigungen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-start gap-3 border-b pb-3">
                        <div className={`mt-1 h-2 w-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-red-500'}`} />
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">Alle Benachrichtigungen</Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col h-24 py-2">
                <Users className="h-6 w-6 mb-1" />
                <span>Team verwalten</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 py-2">
                <Calendar className="h-6 w-6 mb-1" />
                <span>Event planen</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 py-2">
                <BarChart4 className="h-6 w-6 mb-1" />
                <span>Berichte</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 py-2">
                <Phone className="h-6 w-6 mb-1" />
                <span>Support</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="team">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Team-Verwaltung</h3>
              <p className="text-muted-foreground">Hier kannst du dein Team verwalten, neue Mitglieder hinzufügen und Schulungen planen.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Event-Planung</h3>
              <p className="text-muted-foreground">Hier kannst du Events planen, Promotoren zuweisen und Ressourcen verwalten.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Berichte und Analysen</h3>
              <p className="text-muted-foreground">Hier findest du Berichte und Analysen zu Verkäufen, Performance und Kundenfeedback.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="chats">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Kommunikation</h3>
              <p className="text-muted-foreground">Hier kannst du mit deinem Team kommunizieren und Nachrichten verwalten.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* AI Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        <div className={`chat-window ${isChatOpen ? 'visible' : 'hidden'} w-64 md:w-72 h-[500px] bg-white rounded-2xl shadow-lg overflow-hidden absolute bottom-20 right-0`}>
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
          <div className="p-4 message-container flex-1 h-[380px]">
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

