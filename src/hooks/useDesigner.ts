import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Template {
  id: string;
  name: string;
  category: 'sale' | 'rent' | 'whatsapp' | 'print' | 'facebook' | 'business';
  size: string;
  type: 'instagram' | 'story' | 'flyer' | 'billboard' | 'social' | 'card';
}

export interface Design {
  id: string;
  name: string;
  created: string;
  downloads: number;
  template?: Template;
}

export const useDesigner = () => {
  const { toast } = useToast();
  
  const [templates] = useState<Template[]>([
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
  ]);

  const [recentDesigns, setRecentDesigns] = useState<Design[]>([
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
  ]);

  const [activeDesign, setActiveDesign] = useState<Design | null>(null);

  const createNewDesign = () => {
    toast({
      title: "יצירה חדשה",
      description: "פתיחת עורך הגרפיקה לעיצוב חדש",
    });
  };

  const useTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    const newDesign: Design = {
      id: Date.now().toString(),
      name: `עיצוב חדש - ${template.name}`,
      created: "עכשיו",
      downloads: 0,
      template
    };

    setRecentDesigns(prev => [newDesign, ...prev]);
    setActiveDesign(newDesign);

    toast({
      title: "תבנית נבחרה",
      description: `פתיחת עורך עם תבנית: ${template.name}`,
    });
  };

  const downloadDesign = (designId: string) => {
    const design = recentDesigns.find(d => d.id === designId);
    if (!design) return;

    // Update download count
    setRecentDesigns(prev => 
      prev.map(d => 
        d.id === designId 
          ? { ...d, downloads: d.downloads + 1 }
          : d
      )
    );

    toast({
      title: "הורדת עיצוב",
      description: `מוריד את העיצוב "${design.name}" בחיות גבוהה`,
    });

    setTimeout(() => {
      toast({
        title: "הורדה הושלמה",
        description: "הקובץ נשמר במכשיר שלך",
      });
    }, 2000);
  };

  const shareDesign = (designId: string) => {
    const design = recentDesigns.find(d => d.id === designId);
    if (!design) return;

    toast({
      title: "שיתוף עיצוב",
      description: `יוצר קישור שיתוף לעיצוב "${design.name}"`,
    });

    setTimeout(() => {
      toast({
        title: "קישור נוצר בהצלחה",
        description: "הקישור הועתק ללוח. אפשר לשתף אותו עכשיו",
      });
    }, 1500);
  };

  const quickCreate = () => {
    toast({
      title: "יצירה מהירה",
      description: "בחר נכס מהרשימה ליצירת באנר מהירה",
    });
  };

  const duplicateDesign = (designId: string) => {
    const design = recentDesigns.find(d => d.id === designId);
    if (!design) return;

    const newDesign: Design = {
      ...design,
      id: Date.now().toString(),
      name: `${design.name} - עותק`,
      created: "עכשיו",
      downloads: 0
    };

    setRecentDesigns(prev => [newDesign, ...prev]);

    toast({
      title: "עיצוב שוכפל",
      description: `נוצר עותק של "${design.name}"`,
    });
  };

  const deleteDesign = (designId: string) => {
    const design = recentDesigns.find(d => d.id === designId);
    if (!design) return;

    setRecentDesigns(prev => prev.filter(d => d.id !== designId));

    toast({
      title: "עיצוב נמחק",
      description: `"${design.name}" הוסר מהרשימה`,
    });
  };

  const editDesign = (designId: string) => {
    const design = recentDesigns.find(d => d.id === designId);
    if (!design) return;

    setActiveDesign(design);

    toast({
      title: "פתיחת עורך",
      description: `עורך את "${design.name}"`,
    });
  };

  const exportDesign = (designId: string, format: 'PNG' | 'JPG' | 'PDF' | 'SVG') => {
    const design = recentDesigns.find(d => d.id === designId);
    if (!design) return;

    toast({
      title: `ייצוא ל-${format}`,
      description: `מכין את "${design.name}" לייצוא...`,
    });

    setTimeout(() => {
      toast({
        title: "ייצוא הושלם",
        description: `הקובץ במפורמט ${format} מוכן להורדה`,
      });
    }, 2000);
  };

  return {
    templates,
    recentDesigns,
    activeDesign,
    createNewDesign,
    useTemplate,
    downloadDesign,
    shareDesign,
    quickCreate,
    duplicateDesign,
    deleteDesign,
    editDesign,
    exportDesign
  };
};