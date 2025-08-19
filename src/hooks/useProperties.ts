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
    toast({
      title: "הוספת נכס",
      description: "פונקציונליות הוספת נכס תפותח בקרוב",
    });
  };

  const viewProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    toast({
      title: "צפייה בנכס",
      description: `פתיחת פרטי הנכס: ${property?.title}`,
    });
  };

  const editProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    toast({
      title: "עריכת נכס",
      description: `עריכת הנכס: ${property?.title}`,
    });
  };

  const shareProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    toast({
      title: "שיתוף נכס",
      description: `הנכס ${property?.title} נשתף בהצלחה`,
    });
  };

  const filterProperties = () => {
    toast({
      title: "סינון נכסים",
      description: "פונקציונליות סינון תפותח בקרוב",
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
    viewMode,
    searchTerm,
    setSearchTerm,
    addProperty,
    viewProperty,
    editProperty,
    shareProperty,
    filterProperties,
    toggleViewMode
  };
};