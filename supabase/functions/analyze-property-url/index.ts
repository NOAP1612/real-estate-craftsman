import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting property URL analysis');
    
    const { url } = await req.json();
    
    if (!url) {
      throw new Error('URL is required');
    }

    console.log('Analyzing URL:', url);

    // Try to fetch website content with multiple approaches
    let html = '';
    let fetchMethod = 'direct';
    
    try {
      const websiteResponse = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'he,en-US;q=0.7,en;q=0.3',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!websiteResponse.ok) {
        throw new Error(`HTTP ${websiteResponse.status}: ${websiteResponse.statusText}`);
      }

      html = await websiteResponse.text();
      console.log('Fetched HTML content, length:', html.length);
      
    } catch (fetchError) {
      console.log('Direct fetch failed:', fetchError.message);
      
      // Fallback: Use basic URL analysis without content fetching
      fetchMethod = 'fallback';
      const urlObj = new URL(url);
      html = `<title>נכס מ-${urlObj.hostname}</title><meta property="og:title" content="נכס מ-${urlObj.hostname}">`;
      console.log('Using fallback method due to fetch failure');
    }

    // Use OpenAI to analyze the content
    const systemPrompt = fetchMethod === 'fallback' 
      ? 'אתה מומחה לניתוח נכסי נדל"ן. על בסיס הקישור שניתן, נסה לחלץ מידע בסיסי על הנכס. החזר JSON תקין עם השדות הבאים: title, price, location, rooms, bathrooms, area, description, features. אם אין מידע זמין לשדה מסוים, השתמש ב-null.'
      : 'אתה מומחה לניתוח נכסי נדל"ן. נתח את תוכן HTML של אתר הנכס וחלץ את המידע הרלוונטי. החזר JSON תקין עם השדות הבאים: title, price, location, rooms, bathrooms, area, description, features. אם אין מידע זמין לשדה מסוים, השתמש ב-null.';
    
    const userContent = fetchMethod === 'fallback'
      ? `נתח את הקישור הזה וחלץ מידע בסיסי על הנכס: ${url}`
      : `נתח את תוכן HTML הזה וחלץ פרטי נכס: ${html.slice(0, 12000)}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userContent
          }
        ],
        max_completion_tokens: 1000,
        temperature: 0.1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error ${response.status}:`, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const analysisResult = data.choices[0].message.content;
    
    console.log('OpenAI analysis result:', analysisResult);

    try {
      const propertyData = JSON.parse(analysisResult);
      
      return new Response(JSON.stringify({ 
        success: true, 
        data: propertyData,
        originalUrl: url,
        fetchMethod: fetchMethod
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      
      // Return structured data even if parsing fails
      const hostname = new URL(url).hostname;
      return new Response(JSON.stringify({
        success: true,
        data: {
          title: `נכס מ-${hostname}`,
          price: null,
          location: null,
          rooms: 3,
          bathrooms: 2,
          area: null,
          description: `נכס שנמצא ב-${hostname}. ${analysisResult}`,
          features: []
        },
        originalUrl: url,
        fetchMethod: fetchMethod,
        note: 'לא הצלחנו לנתח את הקישור במלואו, אנא עדכן את הפרטים ידנית'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in analyze-property-url function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});