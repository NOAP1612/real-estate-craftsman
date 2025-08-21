import { DashboardNav } from "@/components/layout/dashboard-nav";
import { PropertyCard } from "@/components/ui/property-card";
import { FacebookEmbed } from "@/components/ui/facebook-embed";
import { AddPropertyDialog } from "@/components/ui/add-property-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { useProperties } from "@/hooks/useProperties";
import { 
  Building2,
  Plus,
  Filter,
  Search,
  Grid3X3,
  List,
  MapPin,
  DollarSign,
  Facebook,
  Share2
} from "lucide-react";

const Properties = () => {
  const { 
    properties, 
    searchTerm, 
    setSearchTerm, 
    addProperty, 
    filterProperties, 
    toggleViewMode 
  } = useProperties();

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">ניהול נכסים</h1>
            <p className="text-muted-foreground">נהל את תיק הנכסים שלך בצורה חכמה ויעילה</p>
          </div>
          <AddPropertyDialog onPropertyAdded={addProperty}>
            <Button className="bg-gradient-success hover:shadow-lg">
              <Plus className="h-5 w-5 mr-2" />
              הוסף נכס חדש
            </Button>
          </AddPropertyDialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">סה״כ נכסים</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">למכירה</p>
                <p className="text-2xl font-bold">16</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-warning flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">להשכרה</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">נמכרו השבוע</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              רשימת נכסים
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              פוסטים מפייסבוק
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            {/* Search and Filters */}
            <Card className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="חיפוש נכסים לפי מיקום, מחיר או תיאור..."
                    className="pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={filterProperties}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    סינון
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={toggleViewMode}
                  >
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    תצוגה
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={toggleViewMode}
                  >
                    <List className="h-4 w-4 mr-2" />
                    רשימה
                  </Button>
                </div>
              </div>
            </Card>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facebook" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Facebook Embed Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">פוסטים מפייסבוק</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      הצג ועקוב אחרי פוסטים של נכסים מפייסבוק
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    שתף ברשת
                  </Button>
                </div>

                <FacebookEmbed />
              </div>

              {/* Tips and Info */}
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center">
                      <Facebook className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">איך להשתמש?</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1877F2] mt-2" />
                      <p>היכנס לפוסט הרצוי בפייסבוק</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1877F2] mt-2" />
                      <p>לחץ על "..." ובחר "העתק קישור"</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1877F2] mt-2" />
                      <p>הדבק את הקישור בטופס למעלה</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1877F2] mt-2" />
                      <p>הפוסט יוצג עם כל הפרטים והתגובות</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">יתרונות המעקב</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-success flex items-center justify-center">
                        <span className="text-white text-xs font-bold">📊</span>
                      </div>
                      <div>
                        <p className="font-medium">מעקב אחרי engagement</p>
                        <p className="text-muted-foreground">לייקים, תגובות ושיתופים</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <span className="text-white text-xs font-bold">💬</span>
                      </div>
                      <div>
                        <p className="font-medium">תגובות ופניות</p>
                        <p className="text-muted-foreground">מעקב אחרי לקוחות פוטנציאליים</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-warning flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🎯</span>
                      </div>
                      <div>
                        <p className="font-medium">ניתוח ביצועים</p>
                        <p className="text-muted-foreground">איזה נכסים מושכים יותר תשומת לב</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
};

export default Properties;