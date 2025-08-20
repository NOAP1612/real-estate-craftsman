import { DashboardNav } from "@/components/layout/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import { useClients } from "@/hooks/useClients";
import { 
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  Calendar,
  Building2,
  TrendingUp,
  Clock
} from "lucide-react";

const Clients = () => {
  const { 
    clients, 
    searchTerm, 
    setSearchTerm, 
    addClient, 
    callClient, 
    sendEmail, 
    scheduleMeeting 
  } = useClients();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "negotiating": return "bg-blue-500";
      case "viewing": return "bg-yellow-500";
      case "lead": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "פעיל";
      case "negotiating": return "במשא ומתן";
      case "viewing": return "צופה בנכסים";
      case "lead": return "ליד חדש";
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">ניהול לקוחות</h1>
            <p className="text-muted-foreground">נהל את קשרי הלקוחות שלך ועקוב אחרי ההזדמנויות</p>
          </div>
          <Button className="bg-gradient-success hover:shadow-lg" onClick={addClient}>
            <Plus className="h-5 w-5 mr-2" />
            הוסף לקוח חדש
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">סה״כ לקוחות</p>
                <p className="text-2xl font-bold">127</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">לקוחות פעילים</p>
                <p className="text-2xl font-bold">34</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-warning flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">דורשים מעקב</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">עסקאות חתומות</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-6 mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="חיפוש לקוחות לפי שם, טלפון או אימייל..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(client.status)}`} />
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(client.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={getPriorityColor(client.priority) as any}>
                  {client.priority === "high" && "עדיפות גבוהה"}
                  {client.priority === "medium" && "עדיפות בינונית"}
                  {client.priority === "low" && "עדיפות נמוכה"}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.interestedIn}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">תקציב: </span>
                  <span className="text-secondary">{client.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">קשר אחרון: {client.lastContact}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => callClient(client.id)}>
                  <Phone className="h-4 w-4 mr-2" />
                  התקשר
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => sendEmail(client.id)}>
                  <Mail className="h-4 w-4 mr-2" />
                  שלח מייל
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => scheduleMeeting(client.id)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  קבע פגישה
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Clients;