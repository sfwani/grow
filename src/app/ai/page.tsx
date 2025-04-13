'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const PRE_WRITTEN_PROMPTS = [
  {
    title: 'Water Purification',
    question: 'How can I purify water in the wasteland without modern equipment?',
    icon: '💧'
  },
  {
    title: 'Food Preservation',
    question: 'What are the best ways to preserve food without electricity?',
    icon: '🥫'
  },
  {
    title: 'Shelter Building',
    question: 'How can I build a sturdy shelter using only natural materials?',
    icon: '🏠'
  },
  {
    title: 'First Aid',
    question: 'What are essential first aid techniques when medical supplies are limited?',
    icon: '🏥'
  },
  {
    title: 'Radiation Protection',
    question: 'How can I protect myself from radiation in contaminated areas?',
    icon: '☢️'
  },
  {
    title: 'Navigation',
    question: 'How can I navigate without GPS or modern maps?',
    icon: '🧭'
  }
];

export default function GuidePage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer');
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (promptQuestion: string) => {
    setQuestion(promptQuestion);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gradient-to-b from-background to-background/95">
      <div className="relative w-full max-w-4xl">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-destructive/5 rounded-full blur-3xl" />
        
        {/* Main content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-lg border p-6 shadow-lg"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground/90 mb-6">Wasteland Survival Guide</h1>
            <p className="text-xl text-muted-foreground mb-8">
              In these dark times, knowledge is your greatest weapon. Ask your questions, survivor. Our AI guide will help you navigate the dangers of the wasteland.
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground/90 mb-4">Quick Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRE_WRITTEN_PROMPTS.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePromptClick(prompt.question)}
                    className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:bg-accent transition-colors text-left"
                  >
                    <div className="flex flex-col space-y-2">
                      <span className="text-3xl">{prompt.icon}</span>
                      <h3 className="font-semibold text-foreground/90">{prompt.title}</h3>
                      <p className="text-sm text-muted-foreground">{prompt.question}</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-foreground/90 mb-2">
                  Your Question, Survivor
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-4 py-2 bg-card text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:outline-none border"
                  rows={4}
                  placeholder="How do I purify water in the wasteland?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Consulting the Archives...' : 'Seek Wisdom'}
              </button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20"
              >
                {error}
              </motion.div>
            )}

            {answer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-card rounded-lg border prose prose-invert max-w-none"
              >
                <h2 className="text-2xl font-semibold text-foreground/90 mb-4">Wasteland Wisdom</h2>
                <div 
                  className="text-foreground/90 whitespace-pre-wrap [&>p]:mb-4 [&>strong]:text-primary [&>em]:text-primary/80 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
} 