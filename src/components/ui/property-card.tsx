import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Bed, Bath, Square, Eye, Edit, Share } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  status: "for-sale" | "for-rent" | "sold" | "rented";
  views?: number;
  className?: string;
}

export function PropertyCard({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  image,
  status,
  views = 0,
  className
}: PropertyCardProps) {
  const { toast } = useToast();

  const handleView = () => {
    toast({
      title: "צפייה בנכס",
      description: `פתיחת פרטי הנכס: ${title}`,
    });
  };

  const handleEdit = () => {
    toast({
      title: "עריכת נכס",
      description: `עריכת הנכס: ${title}`,
    });
  };

  const handleShare = () => {
    toast({
      title: "שיתוף נכס",
      description: `הנכס ${title} נשתף בהצלחה`,
    });
  };
  const getStatusColor = () => {
    switch (status) {
      case "for-sale": return "bg-secondary text-secondary-foreground";
      case "for-rent": return "bg-primary text-primary-foreground";
      case "sold": return "bg-accent text-accent-foreground";
      case "rented": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "for-sale": return "למכירה";
      case "for-rent": return "להשכרה";
      case "sold": return "נמכר";
      case "rented": return "הושכר";
      default: return "";
    }
  };

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl bg-card border border-border/50",
      "shadow-card hover:shadow-card-hover transition-all duration-300",
      "hover:border-primary/20 hover:-translate-y-1",
      className
    )}>
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Status Badge */}
        <Badge className={cn(
          "absolute top-3 right-3 text-xs font-semibold shadow-md",
          getStatusColor()
        )}>
          {getStatusText()}
        </Badge>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            variant="secondary" 
            className="h-8 w-8 p-0"
            onClick={handleView}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="h-8 w-8 p-0"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="h-8 w-8 p-0"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        </div>

        <div className="text-2xl font-bold text-primary">
          {price}
        </div>

        {/* Property Features */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{area}</span>
            </div>
          </div>
          
          {views > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <Eye className="h-3 w-3" />
              <span>{views}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}