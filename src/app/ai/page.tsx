"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Leaf, Send, Sparkles, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

export default function AIGuidePage() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (e: { target: { value: string } }) => {
    setMessage(e.target.value);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeImage = async (file: File) => {
    try {
      setIsAnalyzing(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      setMessages((prev: Message[]) => [...prev, {
        role: "assistant",
        content: data.analysis,
      }]);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setMessages((prev: Message[]) => [...prev, {
        role: "assistant",
        content: "Sorry, I couldn't analyze the image. Please try again with a different image or check if the image format is supported (JPEG, PNG).",
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessages((prev: Message[]) => [...prev, {
          role: "assistant",
          content: "Please upload an image file (JPEG, PNG).",
        }]);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessages((prev: Message[]) => [...prev, {
          role: "assistant",
          content: "Please upload an image smaller than 5MB.",
        }]);
        return;
      }

      setSelectedImage(file);
      
      // Add image preview message
      setMessages((prev: Message[]) => [...prev, {
        role: "user",
        content: "Analyzing image for plant health issues...",
        image: URL.createObjectURL(file)
      }]);

      // Analyze the image
      await analyzeImage(file);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    
    // Add user message
    setMessages((prev: Message[]) => [...prev, {
      role: "user",
      content: userMessage
    }]);

    // Clear input
    setMessage("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev: Message[]) => [...prev, {
        role: "assistant",
        content: data.analysis,
      }]);
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages((prev: Message[]) => [...prev, {
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again.",
      }]);
    }
  };

  const features: Feature[] = [
    {
      title: "Visual Analysis",
      description: "Get instant diagnosis of plant diseases and health issues",
      icon: "🔍",
    },
    {
      title: "Treatment Plans",
      description: "Receive detailed treatment recommendations",
      icon: "💊",
    },
    {
      title: "Prevention Tips",
      description: "Learn how to prevent future plant health issues",
      icon: "🛡️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black relative overflow-hidden">
      {/* Atmospheric elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_70%)]" />
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      <div className="absolute -top-40 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-60 -right-20 w-72 h-72 bg-emerald-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute -bottom-40 left-40 w-80 h-80 bg-emerald-500/4 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="container mx-auto px-4 py-12 relative">
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20">
                <Leaf className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-4xl font-bold text-white">Plant Disease Diagnosis</h1>
            </div>
            <p className="text-lg text-emerald-300/80">
              Upload a photo of your plant for instant health analysis and treatment recommendations
            </p>
          </div>

          <div className="space-y-6">
            {/* Main Upload Area (shown when no messages) */}
            {messages.length === 0 && (
              <Card className="relative overflow-hidden border-emerald-500/20 bg-black/40 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
                <div className="relative p-8">
                  <div className="max-w-2xl mx-auto space-y-8">
                    {/* Large Upload Button */}
                    <div className="text-center space-y-4">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <Button
                        variant="outline"
                        className="w-full h-48 bg-emerald-500/10 border-2 border-dashed border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 flex flex-col items-center justify-center space-y-3"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isAnalyzing}
                      >
                        <ImageIcon className="w-12 h-12" />
                        <div className="space-y-1">
                          <p className="text-lg font-medium">Click to upload a plant photo</p>
                          <p className="text-sm text-emerald-500/60">Supports JPEG, PNG (max 5MB)</p>
                        </div>
                      </Button>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex flex-col items-center text-center p-6 rounded-lg bg-emerald-500/5 border border-emerald-500/10 space-y-2"
                        >
                          <div className="text-3xl">{feature.icon}</div>
                          <h3 className="font-medium text-emerald-400">{feature.title}</h3>
                          <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Chat Interface (shown after upload) */}
            {messages.length > 0 && (
              <Card className="relative overflow-hidden border-emerald-500/20 bg-black/40 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
                <div className="relative p-6 space-y-4">
                  {/* Chat Display Area */}
                  <div 
                    ref={chatContainerRef}
                    className="h-[500px] rounded-xl bg-black/40 border border-emerald-500/20 overflow-y-auto scroll-smooth p-6 space-y-4"
                  >
                    <div className="flex items-start space-x-4 animate-slide-up">
                      <div className="p-2 rounded-lg bg-emerald-500/20 backdrop-blur-sm">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-emerald-400 font-medium mb-2">Plant Health Assistant</p>
                        <p className="text-gray-300">
                          Hello! I can help diagnose plant health issues and provide treatment recommendations. Upload a photo or ask me any questions about plant care.
                        </p>
                      </div>
                    </div>

                    {/* Messages */}
                    {messages.map((msg: Message, index: number) => (
                      <div 
                        key={index} 
                        className={cn(
                          "flex items-start space-x-4 animate-slide-up transition-opacity",
                          msg.role === "assistant" ? "opacity-90" : "opacity-100"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg backdrop-blur-sm",
                          msg.role === "assistant" 
                            ? "bg-emerald-500/20" 
                            : "bg-blue-500/20"
                        )}>
                          {msg.role === "assistant" ? (
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-blue-400" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          {msg.image && (
                            <div className="mb-2 relative group">
                              <img 
                                src={msg.image} 
                                alt="Plant analysis" 
                                className="rounded-lg max-w-[300px] border border-emerald-500/20 transition-transform group-hover:scale-105" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                            </div>
                          )}
                          <ReactMarkdown
                            components={{
                              p: ({children}: {children: React.ReactNode}) => <p className="text-gray-300 prose prose-invert prose-sm max-w-none">{children}</p>,
                              ul: ({children}: {children: React.ReactNode}) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                              ol: ({children}: {children: React.ReactNode}) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
                              li: ({children}: {children: React.ReactNode}) => <li className="text-gray-300">{children}</li>,
                              a: ({children, href}: {children: React.ReactNode, href?: string}) => <a href={href} className="text-emerald-400 hover:text-emerald-300">{children}</a>,
                              strong: ({children}: {children: React.ReactNode}) => <strong className="text-emerald-400 font-semibold">{children}</strong>,
                              em: ({children}: {children: React.ReactNode}) => <em className="text-emerald-300">{children}</em>,
                              code: ({children}: {children: React.ReactNode}) => <code className="bg-emerald-500/10 text-emerald-300 rounded px-1">{children}</code>,
                              blockquote: ({children}: {children: React.ReactNode}) => <blockquote className="border-l-2 border-emerald-500/20 pl-4 italic">{children}</blockquote>,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}

                    {isAnalyzing && (
                      <div className="flex items-center justify-center space-x-2 text-emerald-400/80 animate-pulse p-4">
                        <Sparkles className="w-5 h-5" />
                        <span>Analyzing plant health...</span>
                      </div>
                    )}
                  </div>

                  {/* Input Area with Upload Option */}
                  <div className="flex space-x-3 pt-2">
                    <Button
                      variant="outline"
                      className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isAnalyzing}
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Analyze Another Plant
                    </Button>
                    <Input
                      placeholder="Ask follow-up questions about plant health..."
                      value={message}
                      onChange={handleInputChange}
                      className="flex-1 bg-black/40 border-emerald-500/20 text-gray-300 placeholder:text-gray-500 focus-visible:ring-emerald-500/50"
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isAnalyzing}
                    />
                    <Button 
                      className="bg-emerald-500/80 hover:bg-emerald-500/90 text-black font-medium"
                      onClick={handleSendMessage}
                      disabled={isAnalyzing || !message.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 