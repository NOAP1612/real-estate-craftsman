import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Link, Loader2 } from "lucide-react";

const propertySchema = z.object({
  title: z.string().min(1, "נדרש שם הנכס"),
  price: z.string().min(1, "נדרש מחיר"),
  location: z.string().min(1, "נדרש מיקום"),
  rooms: z.number().min(1, "נדרש מספר חדרים"),
  bathrooms: z.number().min(1, "נדרש מספר חדרי רחצה"),
  area: z.string().min(1, "נדרש שטח"),
  description: z.string().optional(),
  status: z.enum(["for-sale", "for-rent", "sold"]),
  url: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface AddPropertyDialogProps {
  onPropertyAdded: (property: any) => void;
  children: React.ReactNode;
}

export const AddPropertyDialog = ({ onPropertyAdded, children }: AddPropertyDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      price: "",
      location: "",
      rooms: 3,
      bathrooms: 2,
      area: "",
      description: "",
      status: "for-sale",
      url: "",
    },
  });

  const analyzeUrl = async (url: string) => {
    if (!url) return;
    
    setIsAnalyzing(true);
    toast({
      title: "מנתח קישור...",
      description: "אנא המתן בזמן שאנו חולצים את פרטי הנכס",
    });

    try {
      const { data, error } = await supabase.functions.invoke('analyze-property-url', {
        body: { url }
      });

      if (error) throw error;

      if (data.success) {
        const propertyData = data.data;
        
        // Update form with analyzed data
        if (propertyData.title) form.setValue('title', propertyData.title);
        if (propertyData.price) form.setValue('price', propertyData.price);
        if (propertyData.location) form.setValue('location', propertyData.location);
        if (propertyData.rooms) form.setValue('rooms', parseInt(propertyData.rooms) || 3);
        if (propertyData.bathrooms) form.setValue('bathrooms', parseInt(propertyData.bathrooms) || 2);
        if (propertyData.area) form.setValue('area', propertyData.area);
        if (propertyData.description) form.setValue('description', propertyData.description);

        // Show different messages based on analysis quality
        if (data.fetchMethod === 'fallback' || data.note) {
          toast({
            title: "ניתוח חלקי הושלם",
            description: data.note || "חולצו פרטים בסיסיים, אנא השלם את החסרים ידנית",
            variant: "default",
          });
        } else {
          toast({
            title: "ניתוח הושלם!",
            description: "פרטי הנכס חולצו בהצלחה מהקישור",
          });
        }
      }
    } catch (error) {
      console.error('Error analyzing URL:', error);
      
      // Fill basic info even on error
      const hostname = new URL(url).hostname;
      form.setValue('title', `נכס מ-${hostname}`);
      
      toast({
        title: "שגיאה בניתוח הקישור",
        description: `לא הצלחנו לנתח את ${hostname}. הוספנו כותרת בסיסית, אנא מלא את שאר הפרטים ידנית`,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      const propertyData = {
        title: data.title,
        price: data.price, // Keep price as string
        location: data.location,
        bedrooms: data.rooms,
        bathrooms: data.bathrooms,
        area: data.area,
        status: data.status,
        views: 0,
      };

      onPropertyAdded(propertyData);
      
      toast({
        title: "נכס נוסף בהצלחה",
        description: "הנכס החדש נוסף למערכת",
      });

      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "שגיאה בהוספת נכס",
        description: "אירעה שגיאה בעת הוספת הנכס",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">הוספת נכס חדש</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* URL Analysis Section */}
            <div className="p-4 border rounded-lg bg-muted/50">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>קישור לנכס (אופציונלי)</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="הדבק קישור מאתר נדל״ן..."
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={!field.value || isAnalyzing}
                        onClick={() => analyzeUrl(field.value)}
                      >
                        {isAnalyzing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Link className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>שם הנכס</FormLabel>
                    <FormControl>
                      <Input placeholder="דירת פנטהאוס מדהימה..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מחיר</FormLabel>
                    <FormControl>
                      <Input placeholder="₪3,200,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>סטטוס</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="for-sale">למכירה</option>
                        <option value="for-rent">להשכרה</option>
                        <option value="sold">נמכר</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>מיקום</FormLabel>
                    <FormControl>
                      <Input placeholder="תל אביב, רמת אביב" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>חדרים</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>חדרי רחצה</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>שטח</FormLabel>
                    <FormControl>
                      <Input placeholder="120 מ״ר" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>תיאור (אופציונלי)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="תיאור מפורט של הנכס..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                ביטול
              </Button>
              <Button
                type="submit"
                className="bg-gradient-success hover:shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                הוסף נכס
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};