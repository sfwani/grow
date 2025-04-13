import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    
    if (contentType.includes("multipart/form-data")) {
      // Handle image analysis
      const data = await req.formData();
      const image = data.get("image") as File;
      
      if (!image) {
        return NextResponse.json(
          { error: "No image provided" },
          { status: 400 }
        );
      }

      // Convert image to base64
      const bytes = await image.arrayBuffer();
      const base64 = Buffer.from(bytes).toString('base64');

      const requestBody = {
        contents: [{
          parts: [
            { text: "Analyze this plant image for any signs of disease, health issues, or growth stage. Provide detailed observations and recommendations for care." },
            {
              inline_data: {
                mime_type: image.type,
                data: base64
              }
            }
          ]
        }]
      };

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Gemini API error:', result);
        throw new Error(result.error?.message || 'Failed to analyze image');
      }

      const text = result.candidates[0]?.content?.parts[0]?.text || 'No analysis available';
      return NextResponse.json({ analysis: text });

    } else {
      // Handle text messages
      const { prompt } = await req.json();
      
      if (!prompt) {
        return NextResponse.json(
          { error: "No prompt provided" },
          { status: 400 }
        );
      }

      const requestBody = {
        contents: [{
          parts: [
            { text: prompt }
          ]
        }]
      };

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Gemini API error:', result);
        throw new Error(result.error?.message || 'Failed to process request');
      }

      const text = result.candidates[0]?.content?.parts[0]?.text || 'No response available';
      return NextResponse.json({ analysis: text });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 