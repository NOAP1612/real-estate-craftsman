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
      // Remove existing Facebook SDK if present
      const existingScript = document.getElementById('facebook-jssdk');
      if (existingScript) {
        existingScript.remove();
      }

      // Add Facebook SDK div
      if (!document.getElementById('fb-root')) {
        const fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';
        document.body.appendChild(fbRoot);
      }

      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v19.0&appId=your-app-id';
      
      script.onload = () => {
        console.log('Facebook SDK loaded');
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v19.0'
          });
        }
      };

      script.onerror = () => {
        console.error('Failed to load Facebook SDK');
      };

      document.head.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Processing Facebook URL:', postUrl);
      
      // Validate and clean Facebook URL
      let cleanUrl = postUrl.trim();
      
      // Handle different Facebook URL formats
      if (cleanUrl.includes('facebook.com/share/p/')) {
        // This is a new Facebook share URL format - convert to post format
        const shareId = cleanUrl.split('/p/')[1]?.split('/')[0];
        if (shareId) {
          // For now, we'll use the original URL but let user know about limitations
          console.log('Detected new Facebook share URL format');
        }
      }
      
      if (!cleanUrl.includes('facebook.com')) {
        throw new Error('אנא הכנס קישור פייסבוק תקין');
      }

      // Generate embed HTML with better error handling
      const embedCode = `
        <div class="fb-post" 
             data-href="${cleanUrl}" 
             data-width="500" 
             data-show-text="true"
             data-lazy="true">
          <blockquote cite="${cleanUrl}" class="fb-xfbml-parse-ignore">
            <div style="padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 8px;">
              <p>טוען פוסט פייסבוק...</p>
              <p style="margin: 10px 0;">אם הפוסט לא נטען, ייתכן שהוא פרטי או שהקישור אינו תקין</p>
              <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="color: #1877F2;">
                צפה בפוסט בפייסבוק
              </a>
            </div>
          </blockquote>
        </div>
      `;

      setEmbedHtml(embedCode);

      // Trigger Facebook SDK to parse new content with retry mechanism
      const parseWithRetry = (attempts = 0) => {
        if (window.FB && window.FB.XFBML) {
          console.log('Parsing Facebook content, attempt:', attempts + 1);
          window.FB.XFBML.parse();
        } else if (attempts < 5) {
          setTimeout(() => parseWithRetry(attempts + 1), 500);
        } else {
          console.warn('Facebook SDK not available after multiple attempts');
        }
      };

      setTimeout(() => parseWithRetry(), 100);

      toast({
        title: "הפוסט נוסף בהצלחה",
        description: "אם הפוסט לא נטען, בדוק שהקישור תקין והפוסט ציבורי",
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
              placeholder="https://www.facebook.com/username/posts/123456789 או https://www.facebook.com/share/p/abc123"
              required
              className="mt-1 text-sm"
            />
            <div className="text-xs text-muted-foreground mt-1 space-y-1">
              <p>• העתק את הקישור המלא לפוסט מפייסבוק</p>
              <p>• הפוסט חייב להיות ציבורי כדי שניתן יהיה להציג אותו</p>
              <p>• פוסטים פרטיים או של דפים עם הגבלות לא יוצגו</p>
            </div>
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

      <div className="fb-post-container" style={{ minHeight: '200px' }}>
        <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
        <div className="mt-2 text-xs text-muted-foreground">
          אם הפוסט לא נטען כראוי, נסה לרענן את הדף או לבדוק שהקישור תקין
        </div>
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