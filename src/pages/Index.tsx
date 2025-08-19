import { DashboardNav } from "@/components/layout/dashboard-nav";
import { StatsCard } from "@/components/ui/stats-card";
import { PropertyCard } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Calendar,
  Plus,
  Filter,
  Search,
  BarChart3,
  Clock,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-real-estate.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Index = () => {
  // Sample data
  const stats = [
    {
      title: "נכסים פעילים",
      value: "24",
      icon: Building2,
      trend: "+12% מהחודש הקודם",
      trendDirection: "up" as const
    },
    {
      title: "לקוחות חדשים",
      value: "8",
      icon: Users,
      trend: "+5 השבוע",
      trendDirection: "up" as const
    },
    {
      title: "מכירות החודש",
      value: "₪1.2M",
      icon: TrendingUp,
      trend: "+18% מהחודש הקודם",
      trendDirection: "up" as const
    },
    {
      title: "פגישות היום",
      value: "6",
      icon: Calendar,
      trend: "4 נותרו",
      trendDirection: "neutral" as const
    }
  ];

  const recentProperties = [
    {
      id: "1",
      title: "דירת פנטהאוס מדהימה",
      price: "₪3,200,000",
      location: "תל אביב, רמת אביב",
      bedrooms: 4,
      bathrooms: 3,
      area: "120 מ״ר",
      image: property1,
      status: "for-sale" as const,
      views: 152
    },
    {
      id: "2", 
      title: "וילה מודרנית עם גינה",
      price: "₪15,000/חודש",
      location: "רעננה, השכונה החדשה",
      bedrooms: 5,
      bathrooms: 4,
      area: "200 מ״ר",
      image: property2,
      status: "for-rent" as const,
      views: 89
    },
    {
      id: "3",
      title: "דירה חדשה במגדל יוקרה",
      price: "₪2,800,000",
      location: "הרצליה פיתוח",
      bedrooms: 3,
      bathrooms: 2,
      area: "95 מ״ר",
      image: property3,
      status: "sold" as const,
      views: 234
    }
  ];

  const todayTasks = [
    { id: 1, task: "פגישה עם משפחת כהן - 10:00", completed: true },
    { id: 2, task: "צילום נכס ברמת גן - 14:00", completed: false },
    { id: 3, task: "חתימה על חוזה - 16:30", completed: false },
    { id: 4, task: "שיחת מעקב עם דוד לוי", completed: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-64 bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          <div className="relative container mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">
                ברוכים הבאים ל-RealSmart
              </h1>
              <p className="text-xl opacity-90 mb-6">
                הפלטפורמה החכמה לניהול נדל״ן מקצועי. כל מה שאתה צריך במקום אחד.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                  <Plus className="h-5 w-5 mr-2" />
                  הוסף נכס חדש
                </Button>
                <Button variant="secondary" size="lg">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  צפה בדוחות
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              trendDirection={stat.trendDirection}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Properties */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">נכסים אחרונים</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  סינון
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  חיפוש
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                />
              ))}
            </div>
          </div>

          {/* Today's Tasks Sidebar */}
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">משימות היום</h3>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="space-y-3">
                {todayTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <CheckCircle 
                      className={`h-4 w-4 ${
                        task.completed 
                          ? 'text-secondary' 
                          : 'text-muted-foreground'
                      }`}
                    />
                    <span 
                      className={`text-sm ${
                        task.completed 
                          ? 'line-through text-muted-foreground' 
                          : 'text-foreground'
                      }`}
                    >
                      {task.task}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                הוסף משימה
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">סטטיסטיקות מהירות</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">שיעור הצלחה</span>
                  <span className="font-semibold text-secondary">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">זמן מכירה ממוצע</span>
                  <span className="font-semibold">45 ימים</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ליידים חדשים</span>
                  <span className="font-semibold text-accent">+23</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;