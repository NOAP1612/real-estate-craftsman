import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SalesData {
  month: string;
  sales: number;
  deals: number;
}

export interface TopProperty {
  id: string;
  name: string;
  views: number;
  inquiries: number;
  status: 'sold' | 'for-sale' | 'for-rent';
}

export interface ClientStat {
  type: string;
  count: string | number;
  change: string;
}

export const useReports = () => {
  const { toast } = useToast();
  
  const [dateRange, setDateRange] = useState('6-months');
  const [reportType, setReportType] = useState('all');

  const salesData: SalesData[] = [
    { month: "ינואר", sales: 850000, deals: 3 },
    { month: "פברואר", sales: 1200000, deals: 4 },
    { month: "מרץ", sales: 980000, deals: 2 },
    { month: "אפריל", sales: 1450000, deals: 5 },
    { month: "מאי", sales: 1100000, deals: 3 },
    { month: "יוני", sales: 1680000, deals: 6 }
  ];

  const topProperties: TopProperty[] = [
    { id: "1", name: "פנטהאוס בתל אביב", views: 456, inquiries: 23, status: "sold" },
    { id: "2", name: "וילה ברעננה", views: 389, inquiries: 18, status: "for-sale" },
    { id: "3", name: "דירה בהרצליה", views: 334, inquiries: 15, status: "for-rent" },
    { id: "4", name: "בית בכפר סבא", views: 298, inquiries: 12, status: "for-sale" },
    { id: "5", name: "דירת גן בגבעתיים", views: 267, inquiries: 11, status: "sold" }
  ];

  const clientStats: ClientStat[] = [
    { type: "לקוחות חדשים", count: 24, change: "+18%" },
    { type: "פגישות בוצעו", count: 67, change: "+12%" },
    { type: "עסקאות נסגרו", count: 8, change: "+25%" },
    { type: "שיעור המרה", count: "12%", change: "+3%" }
  ];

  const filterReports = () => {
    toast({
      title: "סינון דוחות",
      description: "פתיחת אפשרויות סינון מתקדמות",
    });
  };

  const exportReport = () => {
    toast({
      title: "ייצוא דוח",
      description: "הדוח מיוצא בפורמט Excel...",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "ייצוא הושלם",
        description: "הדוח נשמר בהצלחה למכשיר שלך",
      });
    }, 2000);
  };

  const exportToPDF = () => {
    toast({
      title: "ייצוא ל-PDF",
      description: "יוצר קובץ PDF...",
    });
    
    setTimeout(() => {
      toast({
        title: "PDF נוצר בהצלחה",
        description: "הדוח במפורמט PDF מוכן להורדה",
      });
    }, 2000);
  };

  const scheduleAutoReport = () => {
    toast({
      title: "דוח אוטומטי מתוזמן",
      description: "הדוח יישלח אוטומטית כל שבוע לאימייל שלך",
    });
  };

  const generateDetailedReport = () => {
    toast({
      title: "יוצר דוח מפורט",
      description: "אוסף נתונים ויוצר דוח מקיף...",
    });
    
    setTimeout(() => {
      toast({
        title: "דוח מפורט מוכן",
        description: "הדוח המפורט כולל כל הנתונים והגרפים",
      });
    }, 3000);
  };

  const changeDateRange = (range: string) => {
    setDateRange(range);
    toast({
      title: "טווח תאריכים עודכן",
      description: `הדוח מציג נתונים של ${range}`,
    });
  };

  return {
    salesData,
    topProperties,
    clientStats,
    dateRange,
    reportType,
    setReportType,
    filterReports,
    exportReport,
    exportToPDF,
    scheduleAutoReport,
    generateDetailedReport,
    changeDateRange
  };
};