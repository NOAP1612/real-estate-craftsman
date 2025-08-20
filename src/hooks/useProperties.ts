import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  status: 'for-sale' | 'for-rent' | 'sold';
  views: number;
}

export const useProperties = () => {
  const { toast } = useToast();
  
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      title: "דירת פנטהאוס מדהימה",
      price: "₪3,200,000",
      location: "תל אביב, רמת אביב",
      bedrooms: 4,
      bathrooms: 3,
      area: "120 מ״ר",
      image: property1,
      status: "for-sale",
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
      status: "for-rent",
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
      status: "sold",
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
      status: "for-sale",
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
      status: "for-rent",
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
      status: "for-sale",
      views: 298
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProperty = () => {
    const newProperty: Property = {
      id: (properties.length + 1).toString(),
      title: "נכס חדש",
      price: "₪0",
      location: "מיקום חדש",
      bedrooms: 3,
      bathrooms: 2,
      area: "0 מ״ר",
      image: property1,
      status: "for-sale",
      views: 0
    };
    
    setProperties(prev => [newProperty, ...prev]);
    toast({
      title: "נכס נוסף בהצלחה",
      description: "אפשר לערוך את פרטי הנכס החדש",
    });
  };

  const viewProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    // Update views count
    setProperties(prev => 
      prev.map(p => 
        p.id === propertyId 
          ? { ...p, views: p.views + 1 }
          : p
      )
    );
    
    toast({
      title: "צפייה בנכס",
      description: `פתיחת פרטי הנכס: ${property.title}`,
    });
  };

  const editProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    toast({
      title: "עריכת נכס",
      description: `פתיחת טופס עריכה לנכס: ${property?.title}`,
    });
  };

  const shareProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    // Simulate sharing process
    toast({
      title: "משתף נכס...",
      description: "יוצר קישור שיתוף",
    });

    setTimeout(() => {
      toast({
        title: "נכס שותף בהצלחה",
        description: `קישור לנכס "${property.title}" הועתק ללוח`,
      });
    }, 1500);
  };

  const filterProperties = () => {
    toast({
      title: "סינון נכסים",
      description: "פתיחת אפשרויות סינון מתקדמות",
    });
  };

  const deleteProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    setProperties(prev => prev.filter(p => p.id !== propertyId));
    toast({
      title: "נכס נמחק",
      description: `הנכס "${property?.title}" הוסר מהרשימה`,
    });
  };

  const updatePropertyStatus = (propertyId: string, newStatus: Property['status']) => {
    setProperties(prev => 
      prev.map(p => 
        p.id === propertyId 
          ? { ...p, status: newStatus }
          : p
      )
    );
    
    const property = properties.find(p => p.id === propertyId);
    toast({
      title: "סטטוס נכס עודכן",
      description: `סטטוס הנכס "${property?.title}" עודכן בהצלחה`,
    });
  };

  const duplicateProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const newProperty: Property = {
      ...property,
      id: (properties.length + 1).toString(),
      title: `${property.title} - עותק`,
      views: 0
    };

    setProperties(prev => [newProperty, ...prev]);
    toast({
      title: "נכס שוכפל",
      description: `נוצר עותק של "${property.title}"`,
    });
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
    toast({
      title: "שינוי תצוגה",
      description: `מצב תצוגה שונה ל${viewMode === 'grid' ? 'רשימה' : 'רשת'}`,
    });
  };

  return {
    properties: filteredProperties,
    allProperties: properties,
    viewMode,
    searchTerm,
    setSearchTerm,
    addProperty,
    viewProperty,
    editProperty,
    shareProperty,
    filterProperties,
    toggleViewMode,
    deleteProperty,
    updatePropertyStatus,
    duplicateProperty
  };
};