import { DashboardNav } from "@/components/layout/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Shield,
  Database,
  Mail,
  Phone,
  Building2,
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">הגדרות מערכת</h1>
            <p className="text-muted-foreground">נהל את ההגדרות האישיות והעסקיות שלך</p>
          </div>
          <Button className="bg-gradient-success hover:shadow-lg">
            <Save className="h-4 w-4 mr-2" />
            שמור שינויים
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">פרופיל אישי</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">שם פרטי</Label>
                  <Input id="firstName" defaultValue="יוסי" />
                </div>
                <div>
                  <Label htmlFor="lastName">שם משפחה</Label>
                  <Input id="lastName" defaultValue="כהן" />
                </div>
                <div>
                  <Label htmlFor="email">אימייל</Label>
                  <Input id="email" type="email" defaultValue="yossi@realsmart.co.il" />
                </div>
                <div>
                  <Label htmlFor="phone">טלפון</Label>
                  <Input id="phone" defaultValue="050-1234567" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="bio">אודות</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="ספר על עצמך ועל הניסיון שלך בנדל״ן..."
                    defaultValue="סוכן נדל״ן מקצועי עם 10 שנות ניסיון בשוק התל-אביבי. מתמחה בדירות יוקרה ונכסי השקעה."
                  />
                </div>
              </div>
            </Card>

            {/* Business Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">הגדרות עסקיות</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">שם החברה</Label>
                  <Input id="companyName" defaultValue="RealSmart נדל״ן" />
                </div>
                <div>
                  <Label htmlFor="licenseNumber">מספר רישיון</Label>
                  <Input id="licenseNumber" defaultValue="12345678" />
                </div>
                <div>
                  <Label htmlFor="companyPhone">טלפון משרד</Label>
                  <Input id="companyPhone" defaultValue="03-5551234" />
                </div>
                <div>
                  <Label htmlFor="companyEmail">אימייל משרד</Label>
                  <Input id="companyEmail" defaultValue="office@realsmart.co.il" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">כתובת משרד</Label>
                  <Input id="address" defaultValue="רחוב דיזנגוף 123, תל אביב" />
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-warning flex items-center justify-center">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">הגדרות התראות</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>התראות אימייל</Label>
                    <p className="text-sm text-muted-foreground">קבל התראות על לקוחות חדשים ופעילות במערכת</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>התראות SMS</Label>
                    <p className="text-sm text-muted-foreground">קבל הודעות טקסט על משימות דחופות</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>התראות דחופות</Label>
                    <p className="text-sm text-muted-foreground">התראות מיידיות על פעילות חשובה</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>סיכום שבועי</Label>
                    <p className="text-sm text-muted-foreground">קבל דוח שבועי על הפעילות שלך</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Theme Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">עיצוב ותצוגה</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>מצב כהה</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>צבעי חברה</Label>
                  <div className="w-8 h-8 rounded bg-gradient-primary"></div>
                </div>
                <div>
                  <Label>גודל גופן</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">קטן</Button>
                    <Button variant="default" size="sm">רגיל</Button>
                    <Button variant="outline" size="sm">גדול</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-warning flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">אבטחה</h3>
              </div>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  שנה סיסמה
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  אימות דו-שלבי
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  היסטוריית התחברויות
                </Button>
              </div>
            </Card>

            {/* Data Management */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">ניהול נתונים</h3>
              </div>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  ייצא נתונים
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  גיבוי אוטומטי
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  מחק חשבון
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">פעולות מהירות</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  שלח פידבק
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  צור קשר עם תמיכה
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  מדריך למשתמש
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;