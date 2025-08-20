import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

export interface BusinessSettings {
  companyName: string;
  licenseNumber: string;
  companyPhone: string;
  companyEmail: string;
  address: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  urgentNotifications: boolean;
  weeklyDigest: boolean;
}

export interface ThemeSettings {
  darkMode: boolean;
  fontSize: 'small' | 'normal' | 'large';
  companyColors: string;
}

export const useSettings = () => {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "יוסי",
    lastName: "כהן",
    email: "yossi@realsmart.co.il",
    phone: "050-1234567",
    bio: "סוכן נדל״ן מקצועי עם 10 שנות ניסיון בשוק התל-אביבי. מתמחה בדירות יוקרה ונכסי השקעה."
  });

  const [business, setBusiness] = useState<BusinessSettings>({
    companyName: "RealSmart נדל״ן",
    licenseNumber: "12345678",
    companyPhone: "03-5551234",
    companyEmail: "office@realsmart.co.il",
    address: "רחוב דיזנגוף 123, תל אביב"
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    urgentNotifications: true,
    weeklyDigest: false
  });

  const [theme, setTheme] = useState<ThemeSettings>({
    darkMode: false,
    fontSize: 'normal',
    companyColors: '#primary'
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const updateBusiness = (updates: Partial<BusinessSettings>) => {
    setBusiness(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "הגדרת התראות עודכנה",
      description: "השינוי נשמר אוטומטית",
    });
  };

  const updateTheme = (updates: Partial<ThemeSettings>) => {
    setTheme(prev => ({ ...prev, ...updates }));
    toast({
      title: "הגדרות תצוגה עודכנו",
      description: "השינויים יחולו מיד",
    });
  };

  const saveChanges = () => {
    if (!hasUnsavedChanges) {
      toast({
        title: "אין שינויים לשמירה",
        description: "כל ההגדרות עדכניות",
      });
      return;
    }

    toast({
      title: "שומר שינויים...",
      description: "השינויים נשמרים במערכת",
    });

    setTimeout(() => {
      setHasUnsavedChanges(false);
      toast({
        title: "השינויים נשמרו בהצלחה",
        description: "כל ההגדרות עודכנו במערכת",
      });
    }, 1500);
  };

  const changePassword = () => {
    toast({
      title: "שינוי סיסמה",
      description: "פתיחת טופס שינוי סיסמה",
    });
  };

  const enableTwoFactor = () => {
    toast({
      title: "אימות דו-שלבי",
      description: "הגדרת אימות דו-שלבי לחשבון שלך",
    });
  };

  const viewLoginHistory = () => {
    toast({
      title: "היסטוריית התחברויות",
      description: "מציג את כל ההתחברויות האחרונות לחשבון",
    });
  };

  const exportData = () => {
    toast({
      title: "ייצוא נתונים",
      description: "מכין את כל הנתונים שלך לייצוא...",
    });

    setTimeout(() => {
      toast({
        title: "ייצוא הושלם",
        description: "הנתונים שלך נשמרו בקובץ ZIP",
      });
    }, 3000);
  };

  const setupAutoBackup = () => {
    toast({
      title: "גיבוי אוטומטי",
      description: "הגדרת גיבוי אוטומטי שבועי לנתונים שלך",
    });
  };

  const deleteAccount = () => {
    toast({
      title: "מחיקת חשבון",
      description: "פעולה זו דורשת אישור נוסף ולא ניתנת לביטול",
      variant: "destructive"
    });
  };

  const sendFeedback = () => {
    toast({
      title: "שליחת פידבק",
      description: "פתיחת טופס פידבק למוקד התמיכה",
    });
  };

  const contactSupport = () => {
    toast({
      title: "צור קשר עם תמיכה",
      description: "פתיחת חלון צ'אט עם נציג תמיכה",
    });
  };

  const openUserGuide = () => {
    toast({
      title: "מדריך למשתמש",
      description: "פתיחת המדריך המלא לשימוש במערכת",
    });
  };

  return {
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
  };
};