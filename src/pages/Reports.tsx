import { DashboardNav } from "@/components/layout/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useReports } from "@/hooks/useReports";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Calendar,
  Download,
  Filter,
  FileText
} from "lucide-react";

const Reports = () => {
  const { 
    salesData, 
    topProperties, 
    clientStats, 
    filterReports, 
    exportReport, 
    exportToPDF, 
    scheduleAutoReport, 
    generateDetailedReport 
  } = useReports();

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">דוחות וניתוחים</h1>
            <p className="text-muted-foreground">עקוב אחרי הביצועים שלך וקבל תובנות עסקיות</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={filterReports}>
              <Filter className="h-4 w-4 mr-2" />
              סינון
            </Button>
            <Button className="bg-gradient-success hover:shadow-lg" onClick={exportReport}>
              <Download className="h-4 w-4 mr-2" />
              ייצא דוח
            </Button>
          </div>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">מכירות החודש</p>
                <p className="text-2xl font-bold">₪1.68M</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+23%</span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">עסקאות נסגרו</p>
                <p className="text-2xl font-bold">6</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+25%</span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-warning flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">לקוחות חדשים</p>
                <p className="text-2xl font-bold">24</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+18%</span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">שיעור המרה</p>
                <p className="text-2xl font-bold">12%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-500">-2%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">מכירות לפי חודש</h3>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                6 חודשים אחרונים
              </Button>
            </div>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full"
                        style={{ width: `${(data.sales / 1680000) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">₪{(data.sales / 1000000).toFixed(1)}M</span>
                    <span className="text-xs text-muted-foreground">{data.deals} עסקאות</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Properties */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">נכסים מובילים</h3>
            <div className="space-y-4">
              {topProperties.map((property, index) => (
                <div key={property.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{property.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {property.views} צפיות • {property.inquiries} פניות
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className={`px-2 py-1 rounded text-xs ${
                      property.status === 'sold' ? 'bg-green-100 text-green-700' :
                      property.status === 'for-sale' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {property.status === 'sold' && 'נמכר'}
                      {property.status === 'for-sale' && 'למכירה'}
                      {property.status === 'for-rent' && 'להשכרה'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Client Statistics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">סטטיסטיקות לקוחות</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {clientStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{stat.count}</span>
                </div>
                <p className="font-medium text-foreground mb-1">{stat.type}</p>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Report Actions */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2" onClick={generateDetailedReport}>
              <FileText className="h-4 w-4" />
              דוח מפורט
            </Button>
            <Button variant="outline" className="gap-2" onClick={exportToPDF}>
              <Download className="h-4 w-4" />
              ייצא ל-PDF
            </Button>
            <Button variant="outline" className="gap-2" onClick={scheduleAutoReport}>
              <Calendar className="h-4 w-4" />
              תזמן דוח אוטומטי
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Reports;