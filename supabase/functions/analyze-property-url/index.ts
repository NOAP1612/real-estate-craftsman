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

    // Fetch website content
    const websiteResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!websiteResponse.ok) {
      throw new Error(`Failed to fetch website: ${websiteResponse.status}`);
    }

    const html = await websiteResponse.text();
    console.log('Fetched HTML content, length:', html.length);

    // Use OpenAI to analyze the content
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'אתה מומחה לניתוח נכסי נדל"ן. נתח את תוכן HTML של אתר הנכס וחלץ את המידע הרלוונטי. החזר JSON תקין עם השדות הבאים: title, price, location, rooms, bathrooms, area, description, features. אם אין מידע זמין לשדה מסוים, השתמש ב-null.'
          },
          {
            role: 'user',
            content: `נתח את תוכן HTML הזה וחלץ פרטי נכס: ${html.slice(0, 8000)}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.2
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisResult = data.choices[0].message.content;
    
    console.log('OpenAI analysis result:', analysisResult);

    try {
      const propertyData = JSON.parse(analysisResult);
      
      return new Response(JSON.stringify({ 
        success: true, 
        data: propertyData,
        originalUrl: url 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      
      // Return structured data even if parsing fails
      return new Response(JSON.stringify({
        success: true,
        data: {
          title: 'נכס מ-' + new URL(url).hostname,
          price: null,
          location: null,
          rooms: null,
          bathrooms: null,
          area: null,
          description: analysisResult,
          features: []
        },
        originalUrl: url
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