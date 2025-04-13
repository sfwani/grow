'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type PlantFormData = {
  name: string;
  description: string;
  category: 'Food' | 'Medicinal';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  growthTime: string;
  imageUrl: string;
  requirements: {
    water: string;
    sun: string;
  };
  uses: {
    primary: string;
    secondary: string[];
  };
};

export default function CreatePlantPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<PlantFormData>({
    name: '',
    description: '',
    category: 'Food',
    difficulty: 'Medium',
    growthTime: '',
    imageUrl: '/placeholder-plant.jpg',
    requirements: {
      water: 'Medium',
      sun: 'Full Sun'
    },
    uses: {
      primary: '',
      secondary: []
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Show success message immediately without API call
    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/plants');
    }, 2000);
    
    setIsLoading(false);
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Plant</h1>
            <p className="mt-2 text-muted-foreground">
              Share your knowledge of survival plants with the community
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
            {error}
          </div>
        )}

        {isSubmitted ? (
          <div className="mb-4 p-4 text-emerald-500 bg-emerald-500/10 rounded text-center">
            <p className="font-medium">Thank you for your contribution!</p>
            <p className="text-sm mt-1">Your plant has been submitted for approval.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Plant Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded border bg-card p-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded border bg-card p-2 text-sm min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'Food' | 'Medicinal' })}
                    className="w-full rounded border bg-card p-2 text-sm"
                  >
                    <option value="Food">Food</option>
                    <option value="Medicinal">Medicinal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="difficulty">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                    className="w-full rounded border bg-card p-2 text-sm"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="growthTime">
                  Growth Time
                </label>
                <input
                  id="growthTime"
                  type="text"
                  value={formData.growthTime}
                  onChange={(e) => setFormData({ ...formData, growthTime: e.target.value })}
                  className="w-full rounded border bg-card p-2 text-sm"
                  placeholder="e.g., 3-4 months"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="water">
                    Water Needs
                  </label>
                  <select
                    id="water"
                    value={formData.requirements.water}
                    onChange={(e) => setFormData({
                      ...formData,
                      requirements: { ...formData.requirements, water: e.target.value }
                    })}
                    className="w-full rounded border bg-card p-2 text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="sun">
                    Sunlight Needs
                  </label>
                  <select
                    id="sun"
                    value={formData.requirements.sun}
                    onChange={(e) => setFormData({
                      ...formData,
                      requirements: { ...formData.requirements, sun: e.target.value }
                    })}
                    className="w-full rounded border bg-card p-2 text-sm"
                  >
                    <option value="Full Sun">Full Sun</option>
                    <option value="Partial Sun">Partial Sun</option>
                    <option value="Shade">Shade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="primaryUse">
                  Primary Use
                </label>
                <input
                  id="primaryUse"
                  type="text"
                  value={formData.uses.primary}
                  onChange={(e) => setFormData({
                    ...formData,
                    uses: { ...formData.uses, primary: e.target.value }
                  })}
                  className="w-full rounded border bg-card p-2 text-sm"
                  placeholder="e.g., Food source, Medicine, etc."
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link
                href="/plants"
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className={`px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500 transition-colors text-sm border border-emerald-500/20 ${
                  (isLoading || isSubmitted) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Submitting...' : isSubmitted ? 'Submitted for Approval' : 'Create Plant'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 