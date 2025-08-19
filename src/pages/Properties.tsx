import { DashboardNav } from "@/components/layout/dashboard-nav";
import { PropertyCard } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Building2,
  Plus,
  Filter,
  Search,
  Grid3X3,
  List,
  MapPin,
  DollarSign
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Properties = () => {
  const properties = [
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
    },
    {
      id: "4",
      title: "בית פרטי עם בריכה",
      price: "₪4,500,000",
      location: "כפר סבא",
      bedrooms: 6,
      bathrooms: 4,
      area: "250 מ״ר",
      image: property1,
      status: "for-sale" as const,
      views: 78
    },
    {
      id: "5",
      title: "דירת גן מרווחת",
      price: "₪12,000/חודש",
      location: "גבעתיים",
      bedrooms: 4,
      bathrooms: 3,
      area: "140 מ״ר",
      image: property2,
      status: "for-rent" as const,
      views: 156
    },
    {
      id: "6",
      title: "פנטהאוס עם נוף לים",
      price: "₪5,200,000",
      location: "נתניה",
      bedrooms: 5,
      bathrooms: 4,
      area: "180 מ״ר",
      image: property3,
      status: "for-sale" as const,
      views: 298
    }
  ];

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
          <Button className="bg-gradient-success hover:shadow-lg">
            <Plus className="h-5 w-5 mr-2" />
            הוסף נכס חדש
          </Button>
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

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="חיפוש נכסים לפי מיקום, מחיר או תיאור..."
                className="pr-10"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                סינון
              </Button>
              <Button variant="outline">
                <Grid3X3 className="h-4 w-4 mr-2" />
                תצוגה
              </Button>
              <Button variant="outline">
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
      </div>
    </div>
  );
};

export default Properties;