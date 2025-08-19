import { DashboardNav } from "@/components/layout/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  PenTool,
  Plus,
  Download,
  Share2,
  Palette,
  Image,
  Type,
  Smartphone,
  Monitor,
  Printer
} from "lucide-react";

const Designer = () => {
  const templates = [
    {
      id: "1",
      name: "באנר למכירה - קלאסי",
      category: "sale",
      size: "1080x1080",
      type: "instagram"
    },
    {
      id: "2", 
      name: "סטורי להשכרה",
      category: "rent",
      size: "1080x1920",
      type: "story"
    },
    {
      id: "3",
      name: "פליירמודעת וואטסאפ",
      category: "whatsapp",
      size: "800x600",
      type: "flyer"
    },
    {
      id: "4",
      name: "שלט חוצות",
      category: "print",
      size: "300x200",
      type: "billboard"
    },
    {
      id: "5",
      name: "באנר פייסבוק",
      category: "facebook",
      size: "1200x628",
      type: "social"
    },
    {
      id: "6",
      name: "כרטיס ביקור דיגיטלי",
      category: "business",
      size: "600x400",
      type: "card"
    }
  ];

  const recentDesigns = [
    {
      id: "1",
      name: "דירה בתל אביב - למכירה",
      created: "היום",
      downloads: 5
    },
    {
      id: "2",
      name: "וילה ברעננה - להשכרה", 
      created: "אתמול",
      downloads: 12
    },
    {
      id: "3",
      name: "פנטהאוס בהרצליה",
      created: "לפני 3 ימים",
      downloads: 8
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sale": return "bg-green-500";
      case "rent": return "bg-blue-500"; 
      case "whatsapp": return "bg-emerald-500";
      case "print": return "bg-purple-500";
      case "facebook": return "bg-blue-600";
      case "business": return "bg-gray-600";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "instagram": return Smartphone;
      case "story": return Smartphone;
      case "flyer": return Printer;
      case "billboard": return Monitor;
      case "social": return Share2;
      case "card": return Type;
      default: return Image;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">מעצב באנרים וגרפיקה</h1>
            <p className="text-muted-foreground">צור באנרים מקצועיים ומותאמים אישית בקלות</p>
          </div>
          <Button className="bg-gradient-success hover:shadow-lg">
            <Plus className="h-5 w-5 mr-2" />
            יצירה חדשה
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <PenTool className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">עיצובים יצרת</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center">
                <Download className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">הורדות החודש</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-warning flex items-center justify-center">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">שיתופים</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">תבניות זמינות</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6 text-foreground">תבניות עיצוב</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => {
                const IconComponent = getTypeIcon(template.type);
                return (
                  <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg ${getCategoryColor(template.category)} flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {template.size}
                      </span>
                    </div>
                    
                    <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-lg mb-4 flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <h3 className="font-medium text-foreground mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.type === "instagram" && "מותאם לפוסט אינסטגרם"}
                      {template.type === "story" && "מותאם לסטורי"}
                      {template.type === "flyer" && "מותאם לשיתוף"}
                      {template.type === "billboard" && "מותאם להדפסה"}
                      {template.type === "social" && "מותאם לרשתות חברתיות"}
                      {template.type === "card" && "מותאם לכרטיס ביקור"}
                    </p>
                    
                    <Button variant="outline" className="w-full">
                      השתמש בתבנית
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Designs Sidebar */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-foreground">עיצובים אחרונים</h2>
            <div className="space-y-4">
              {recentDesigns.map((design) => (
                <Card key={design.id} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Image className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">{design.name}</h4>
                      <p className="text-xs text-muted-foreground">נוצר {design.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{design.downloads} הורדות</span>
                    <span>PNG • HD</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      הורד
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-3 w-3 mr-1" />
                      שתף
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Start Card */}
            <Card className="p-6 mt-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="text-center">
                <PenTool className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">התחל ליצור</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  צור באנר חדש עם הנכסים שלך בקלות
                </p>
                <Button className="w-full bg-gradient-primary">
                  יצירה מהירה
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designer;