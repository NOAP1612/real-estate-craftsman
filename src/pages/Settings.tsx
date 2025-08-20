import { DashboardNav } from "@/components/layout/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useSettings } from "@/hooks/useSettings";
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
  const { 
    profile, 
    business, 
    notifications, 
    theme,
    hasUnsavedChanges,
    updateProfile, 
    updateBusiness, 
    toggleNotification, 
    updateTheme,
    saveChanges,
    changePassword,
    enableTwoFactor,
    viewLoginHistory,
    exportData,
    setupAutoBackup,
    deleteAccount,
    sendFeedback,
    contactSupport,
    openUserGuide
  } = useSettings();
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
          <Button className="bg-gradient-success hover:shadow-lg" onClick={saveChanges}>
            <Save className="h-4 w-4 mr-2" />
            {hasUnsavedChanges ? "שמור שינויים" : "הכל שמור"}
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
                  <Input 
                    id="firstName" 
                    value={profile.firstName}
                    onChange={(e) => updateProfile({ firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">שם משפחה</Label>
                  <Input 
                    id="lastName" 
                    value={profile.lastName}
                    onChange={(e) => updateProfile({ lastName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">אימייל</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">טלפון</Label>
                  <Input 
                    id="phone" 
                    value={profile.phone}
                    onChange={(e) => updateProfile({ phone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="bio">אודות</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="ספר על עצמך ועל הניסיון שלך בנדל״ן..."
                    value={profile.bio}
                    onChange={(e) => updateProfile({ bio: e.target.value })}
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
                  <Input 
                    id="companyName" 
                    value={business.companyName}
                    onChange={(e) => updateBusiness({ companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNumber">מספר רישיון</Label>
                  <Input 
                    id="licenseNumber" 
                    value={business.licenseNumber}
                    onChange={(e) => updateBusiness({ licenseNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companyPhone">טלפון משרד</Label>
                  <Input 
                    id="companyPhone" 
                    value={business.companyPhone}
                    onChange={(e) => updateBusiness({ companyPhone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail">אימייל משרד</Label>
                  <Input 
                    id="companyEmail" 
                    value={business.companyEmail}
                    onChange={(e) => updateBusiness({ companyEmail: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">כתובת משרד</Label>
                  <Input 
                    id="address" 
                    value={business.address}
                    onChange={(e) => updateBusiness({ address: e.target.value })}
                  />
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
                  <Switch 
                    checked={notifications.emailNotifications}
                    onCheckedChange={() => toggleNotification('emailNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>התראות SMS</Label>
                    <p className="text-sm text-muted-foreground">קבל הודעות טקסט על משימות דחופות</p>
                  </div>
                  <Switch 
                    checked={notifications.smsNotifications}
                    onCheckedChange={() => toggleNotification('smsNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>התראות דחופות</Label>
                    <p className="text-sm text-muted-foreground">התראות מיידיות על פעילות חשובה</p>
                  </div>
                  <Switch 
                    checked={notifications.urgentNotifications}
                    onCheckedChange={() => toggleNotification('urgentNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>סיכום שבועי</Label>
                    <p className="text-sm text-muted-foreground">קבל דוח שבועי על הפעילות שלך</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyDigest}
                    onCheckedChange={() => toggleNotification('weeklyDigest')}
                  />
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
                  <Switch 
                    checked={theme.darkMode}
                    onCheckedChange={(checked) => updateTheme({ darkMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>צבעי חברה</Label>
                  <div className="w-8 h-8 rounded bg-gradient-primary"></div>
                </div>
                <div>
                  <Label>גודל גופן</Label>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant={theme.fontSize === 'small' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => updateTheme({ fontSize: 'small' })}
                    >
                      קטן
                    </Button>
                    <Button 
                      variant={theme.fontSize === 'normal' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => updateTheme({ fontSize: 'normal' })}
                    >
                      רגיל
                    </Button>
                    <Button 
                      variant={theme.fontSize === 'large' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => updateTheme({ fontSize: 'large' })}
                    >
                      גדול
                    </Button>
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
                <Button variant="outline" className="w-full justify-start" onClick={changePassword}>
                  שנה סיסמה
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={enableTwoFactor}>
                  אימות דו-שלבי
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={viewLoginHistory}>
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
                <Button variant="outline" className="w-full justify-start" onClick={exportData}>
                  ייצא נתונים
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={setupAutoBackup}>
                  גיבוי אוטומטי
                </Button>
                <Button variant="destructive" className="w-full justify-start" onClick={deleteAccount}>
                  מחק חשבון
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">פעולות מהירות</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={sendFeedback}>
                  <Mail className="h-4 w-4 mr-2" />
                  שלח פידבק
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={contactSupport}>
                  <Phone className="h-4 w-4 mr-2" />
                  צור קשר עם תמיכה
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={openUserGuide}>
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  מדריך למשתמש
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Settings;