import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Share,
  Upload,
  Image,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

declare global {
  interface Window {
    FB: any;
  }
}

interface FacebookEmbedProps {
  onAdd?: (embedData: any) => void;
}

interface CustomPost {
  id: string;
  authorName: string;
  authorImage?: string;
  content: string;
  imageUrl?: string;
  postedAt: string;
  likes: number;
  comments: number;
  shares: number;
  type: 'embed' | 'screenshot' | 'custom';
}

export function FacebookEmbed({ onAdd }: FacebookEmbedProps) {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("embed");
  const [postUrl, setPostUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [embedHtml, setEmbedHtml] = useState("");
  const [posts, setPosts] = useState<CustomPost[]>([]);
  
  // Custom post form fields
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
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

  const validateFacebookUrl = (url: string): { isValid: boolean; message: string; type: string } => {
    if (!url.includes('facebook.com')) {
      return { isValid: false, message: 'זה לא קישור פייסבוק תקין', type: 'error' };
    }
    
    if (url.includes('/groups/')) {
      return { isValid: false, message: 'פוסטים מקבוצות פרטיות לא נתמכים', type: 'error' };
    }
    
    if (url.includes('/share/p/')) {
      return { isValid: false, message: 'קישורי שיתוף חדשים לא נתמכים - נסה להעתיק את הקישור הישיר לפוסט', type: 'warning' };
    }
    
    if (!url.includes('/posts/') && !url.includes('/photo') && !url.includes('/videos/')) {
      return { isValid: false, message: 'זה לא נראה כמו קישור לפוסט ספציפי', type: 'warning' };
    }
    
    return { isValid: true, message: 'הקישור נראה תקין', type: 'success' };
  };

  const handleEmbedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validation = validateFacebookUrl(postUrl.trim());
      
      if (!validation.isValid) {
        throw new Error(validation.message);
      }

      const cleanUrl = postUrl.trim();
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

      const newPost: CustomPost = {
        id: Date.now().toString(),
        authorName: "פוסט פייסבוק",
        content: "פוסט מוטמע מפייסבוק",
        postedAt: new Date().toLocaleString('he-IL'),
        likes: 0,
        comments: 0,
        shares: 0,
        type: 'embed'
      };

      setPosts(prev => [newPost, ...prev]);
      setEmbedHtml(embedCode);

      // Parse Facebook content
      setTimeout(() => {
        if (window.FB && window.FB.XFBML) {
          window.FB.XFBML.parse();
        }
      }, 100);

      toast({
        title: "פוסט נוסף בהצלחה",
        description: "הפוסט מפייסבוק נוסף לרשימה",
      });

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomPostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!authorName.trim() || !content.trim()) {
        throw new Error('אנא מלא את השם והתוכן');
      }

      const newPost: CustomPost = {
        id: Date.now().toString(),
        authorName: authorName.trim(),
        content: content.trim(),
        imageUrl: imagePreview || undefined,
        postedAt: new Date().toLocaleString('he-IL'),
        likes: Math.floor(Math.random() * 100) + 10,
        comments: Math.floor(Math.random() * 20) + 2,
        shares: Math.floor(Math.random() * 10) + 1,
        type: 'custom'
      };

      setPosts(prev => [newPost, ...prev]);

      toast({
        title: "פוסט נוצר בהצלחה",
        description: "הפוסט הפנימי נוסף לרשימה",
      });

      // Reset form
      setAuthorName("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setShowForm(false);

    } catch (error) {
      toast({
        title: "שגיאה",
        description: error instanceof Error ? error.message : "שגיאה ביצירת הפוסט",
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

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  if (!showForm && posts.length === 0) {
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
            <h3 className="font-semibold text-foreground">הוסף תוכן פייסבוק</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowForm(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="embed">הטמעה</TabsTrigger>
            <TabsTrigger value="screenshot">צילום מסך</TabsTrigger>
            <TabsTrigger value="custom">פוסט מותאם</TabsTrigger>
          </TabsList>

          <TabsContent value="embed" className="space-y-4">
            <form onSubmit={handleEmbedSubmit} className="space-y-4">
              <div>
                <Label htmlFor="postUrl">קישור לפוסט פייסבוק</Label>
                <Input
                  id="postUrl"
                  type="url"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  placeholder="https://www.facebook.com/username/posts/123456789"
                  required
                  className="mt-1"
                />
                {postUrl && (
                  <div className="mt-2">
                    {(() => {
                      const validation = validateFacebookUrl(postUrl);
                      const Icon = validation.type === 'success' ? CheckCircle : AlertTriangle;
                      const colorClass = validation.type === 'success' ? 'text-green-600' : 
                                       validation.type === 'warning' ? 'text-yellow-600' : 'text-red-600';
                      return (
                        <div className={`flex items-center gap-2 text-xs ${colorClass}`}>
                          <Icon className="h-3 w-3" />
                          <span>{validation.message}</span>
                        </div>
                      );
                    })()}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-2 space-y-1">
                  <p>✅ פוסטים ציבוריים מדפים עסקיים</p>
                  <p>✅ פוסטים ציבוריים מפרופילים אישיים</p>
                  <p>❌ פוסטים מקבוצות פרטיות</p>
                  <p>❌ קישורי שיתוף חדשים (/share/p/)</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isLoading || !validateFacebookUrl(postUrl).isValid}
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
                >
                  {isLoading ? "מוסיף..." : "הטמע פוסט"}
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
          </TabsContent>

          <TabsContent value="screenshot" className="space-y-4">
            <div className="text-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                העלה צילום מסך של הפוסט מפייסבוק
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="screenshot-upload"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={() => document.getElementById('screenshot-upload')?.click()}
              >
                <Image className="h-4 w-4 mr-2" />
                בחר תמונה
              </Button>
            </div>
            
            {imagePreview && (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-96 object-contain" />
                </div>
                <form onSubmit={handleCustomPostSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="authorName">שם המפרסם</Label>
                    <Input
                      id="authorName"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="שם המפרסם בפייסבוק"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">תוכן הפוסט</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="תיאור הפוסט או תוכן נוסף..."
                      required
                      className="min-h-20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "יוצר..." : "צור פוסט"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      ביטול
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <form onSubmit={handleCustomPostSubmit} className="space-y-4">
              <div>
                <Label htmlFor="customAuthorName">שם המפרסם</Label>
                <Input
                  id="customAuthorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="שם הסוכן או המפרסם"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customContent">תוכן הפוסט</Label>
                <Textarea
                  id="customContent"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="תכתוב תוכן הפוסט - תיאור הנכס, מחיר, פרטים..."
                  required
                  className="min-h-32"
                />
              </div>
              <div>
                <Label>תמונה (אופציונלי)</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="custom-image-upload"
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('custom-image-upload')?.click()}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    הוסף תמונה
                  </Button>
                </div>
                {imagePreview && (
                  <div className="mt-4 border rounded-lg overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-contain" />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "יוצר..." : "צור פוסט"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  ביטול
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.authorName}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{post.postedAt}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deletePost(post.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {post.type === 'embed' && embedHtml && (
            <div className="fb-post-container mb-4" style={{ minHeight: '200px' }}>
              <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
            </div>
          )}

          <div className="mb-4">
            <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
          </div>

          {post.imageUrl && (
            <div className="mb-4 border rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt="Post content" 
                className="w-full max-h-96 object-contain"
              />
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes} לייקים</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments} תגובות</span>
              </div>
              <div className="flex items-center gap-1">
                <Share className="h-4 w-4" />
                <span>{post.shares} שיתופים</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              {post.type === 'embed' && 'פוסט מוטמע מפייסבוק'}
              {post.type === 'screenshot' && 'פוסט שנוצר מצילום מסך'}
              {post.type === 'custom' && 'פוסט פנימי שנוצר במערכת'}
            </p>
          </div>
        </Card>
      ))}

      <Card className="p-6 border-dashed border-2 hover:border-primary/50 transition-colors">
        <div className="text-center">
          <Facebook className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">הוסף תוכן פייסבוק</h3>
          <p className="text-sm text-muted-foreground mb-4">
            הטמע פוסטים, העלה צילומי מסך או צור פוסטים מותאמים
          </p>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            הוסף תוכן
          </Button>
        </div>
      </Card>
    </div>
  );
}