import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Plus, 
  X, 
  Facebook, 
  ExternalLink,
  User,
  Calendar,
  Heart,
  MessageCircle,
  Share
} from "lucide-react";

declare global {
  interface Window {
    FB: any;
  }
}

interface FacebookEmbedProps {
  onAdd?: (embedData: any) => void;
}

export function FacebookEmbed({ onAdd }: FacebookEmbedProps) {
  const [showForm, setShowForm] = useState(false);
  const [postUrl, setPostUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [embedHtml, setEmbedHtml] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load Facebook SDK
    if (!window.FB) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v18.0';
      document.head.appendChild(script);

      script.onload = () => {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        });
      };
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate Facebook URL
      if (!postUrl.includes('facebook.com')) {
        throw new Error('אנא הכנס קישור פייסבוק תקין');
      }

      // Generate embed HTML
      const embedCode = `
        <div class="fb-post" 
             data-href="${postUrl}" 
             data-width="500" 
             data-show-text="true">
          <blockquote cite="${postUrl}" class="fb-xfbml-parse-ignore">
            <p>טוען פוסט פייסבוק...</p>
            <a href="${postUrl}">צפה בפוסט</a>
          </blockquote>
        </div>
      `;

      setEmbedHtml(embedCode);

      // Trigger Facebook SDK to parse new content
      if (window.FB) {
        setTimeout(() => {
          window.FB.XFBML.parse();
        }, 100);
      }

      toast({
        title: "הצלחה!",
        description: "הפוסט נוסף בהצלחה",
      });

      if (onAdd) {
        onAdd({
          url: postUrl,
          embedHtml: embedCode,
          addedAt: new Date().toISOString()
        });
      }

      setPostUrl("");
      setShowForm(false);

    } catch (error) {
      toast({
        title: "שגיאה",
        description: error instanceof Error ? error.message : "שגיאה בהוספת הפוסט",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearEmbed = () => {
    setEmbedHtml("");
    setPostUrl("");
  };

  if (!showForm && !embedHtml) {
    return (
      <Card className="p-6 border-dashed border-2 hover:border-primary/50 transition-colors">
        <div className="text-center">
          <Facebook className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">הוסף פוסט פייסבוק</h3>
          <p className="text-sm text-muted-foreground mb-4">
            הצג פוסטים של נכסים מפייסבוק עם פרטי הפרסום
          </p>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            הוסף פוסט פייסבוק
          </Button>
        </div>
      </Card>
    );
  }

  if (showForm) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Facebook className="h-5 w-5 text-[#1877F2]" />
            <h3 className="font-semibold text-foreground">הוסף פוסט פייסבוק</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowForm(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="postUrl">קישור לפוסט פייסבוק</Label>
            <Input
              id="postUrl"
              type="url"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://www.facebook.com/user/posts/123456789"
              required
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              העתק את הקישור המלא לפוסט מפייסבוק
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
            >
              {isLoading ? "מוסיף..." : "הוסף פוסט"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowForm(false)}
            >
              ביטול
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Facebook className="h-5 w-5 text-[#1877F2]" />
          <h3 className="font-semibold text-foreground">פוסט פייסבוק</h3>
          <a 
            href={postUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearEmbed}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="fb-post-container">
        <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
      </div>

      {/* Mock engagement stats */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>45 לייקים</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>12 תגובות</span>
          </div>
          <div className="flex items-center gap-1">
            <Share className="h-4 w-4" />
            <span>8 שיתופים</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">יוסי כהן - סוכן נדל״ן</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>פורסם לפני 2 שעות</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          פוסט זה מוצג כחלק מהמעקב אחרי פעילות הנכס ברשתות החברתיות
        </p>
      </div>
    </Card>
  );
}