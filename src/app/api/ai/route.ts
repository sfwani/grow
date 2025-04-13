import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Check if API key exists
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Simple markdown to HTML converter
function markdownToHtml(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/\n/g, '<br>') // Line breaks
    .replace(/- (.*?)(?:\n|$)/g, '<li>$1</li>') // List items
    .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>') // Unordered lists
    .replace(/\d+\. (.*?)(?:\n|$)/g, '<li>$1</li>') // Numbered list items
    .replace(/(<li>.*?<\/li>)+/g, '<ol>$&</ol>'); // Ordered lists
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is missing');
      return NextResponse.json(
        { error: 'AI service is not properly configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const prompt = `You are a wise survivor in a post-apocalyptic wasteland. A fellow survivor has asked you for advice. Respond in a way that reflects the harsh reality of the wasteland, using appropriate post-apocalyptic terminology and considering the limited resources available. Be practical, specific, and focus on survival techniques. Use a tone that's both knowledgeable and weary from years of survival. Avoid modern conveniences and focus on what's realistically available in a world where infrastructure has collapsed.

Use markdown formatting in your response:
- Use **bold** for important warnings or critical information
- Use *italics* for emphasis or dramatic effect
- Use bullet points (-) for lists of items or steps
- Use numbered lists (1., 2., etc.) for sequential instructions

Question: ${question}

Answer:`;

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      
      if (!result.response) {
        throw new Error('No response from Gemini API');
      }

      const text = result.response.text();
      if (!text) {
        throw new Error('Empty response from Gemini API');
      }

      const htmlContent = markdownToHtml(text);
      return NextResponse.json({ answer: htmlContent });
    } catch (error) {
      const apiError = error as Error;
      console.error('Gemini API Error:', apiError);
      console.error('Error details:', {
        message: apiError.message,
        stack: apiError.stack,
        name: apiError.name
      });
      return NextResponse.json(
        { error: 'Failed to generate response from AI service. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error in guide API:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
} 