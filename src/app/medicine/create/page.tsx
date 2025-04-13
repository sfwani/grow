'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Medicine } from '@/types/medicines'

interface Ingredient {
  plantId: string
  plantName: string
  amount: string
}

export default function CreateMedicinePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [] as Ingredient[],
    uses: [] as string[],
    preparation: '',
    dosage: '',
    imageUrl: '',
    difficulty: 'Easy' as Medicine['difficulty'],
    category: 'Tea' as Medicine['category'],
    time: '',
    shelf_life: ''
  })
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    plantId: '',
    plantName: '',
    amount: ''
  })
  const [newUse, setNewUse] = useState('')

  const handleAddIngredient = () => {
    if (newIngredient.plantId && newIngredient.plantName && newIngredient.amount) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, { ...newIngredient }]
      })
      setNewIngredient({ plantId: '', plantName: '', amount: '' })
    }
  }

  const handleRemoveIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    })
  }

  const handleAddUse = () => {
    if (newUse.trim()) {
      setFormData({
        ...formData,
        uses: [...formData.uses, newUse.trim()]
      })
      setNewUse('')
    }
  }

  const handleRemoveUse = (index: number) => {
    setFormData({
      ...formData,
      uses: formData.uses.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create medicine')
      }

      setIsSubmitted(true)
      setTimeout(() => {
        router.push('/medicine')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create medicine')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Add New Medicine</h1>
          <Link
            href="/medicine"
            className="px-4 py-2 text-sm border rounded hover:bg-accent transition-colors"
          >
            Cancel
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 text-red-500 bg-red-500/10 rounded">
            {error}
          </div>
        )}

        {isSubmitted ? (
          <div className="mb-4 p-4 text-emerald-500 bg-emerald-500/10 rounded text-center">
            <p className="font-medium">Thank you for your contribution!</p>
            <p className="text-sm mt-1">Your medicine has been submitted for approval.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 rounded border bg-background"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 rounded border bg-background h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ingredients</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Plant ID"
                      value={newIngredient.plantId}
                      onChange={(e) => setNewIngredient({ ...newIngredient, plantId: e.target.value })}
                      className="flex-1 p-2 rounded border bg-background"
                    />
                    <input
                      type="text"
                      placeholder="Plant Name"
                      value={newIngredient.plantName}
                      onChange={(e) => setNewIngredient({ ...newIngredient, plantName: e.target.value })}
                      className="flex-1 p-2 rounded border bg-background"
                    />
                    <input
                      type="text"
                      placeholder="Amount"
                      value={newIngredient.amount}
                      onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
                      className="flex-1 p-2 rounded border bg-background"
                    />
                    <button
                      type="button"
                      onClick={handleAddIngredient}
                      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <span className="flex-1">{ingredient.plantName}</span>
                        <span className="flex-1">{ingredient.amount}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Uses</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a use"
                      value={newUse}
                      onChange={(e) => setNewUse(e.target.value)}
                      className="flex-1 p-2 rounded border bg-background"
                    />
                    <button
                      type="button"
                      onClick={handleAddUse}
                      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.uses.map((use, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <span className="flex-1">{use}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveUse(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="preparation" className="block text-sm font-medium mb-2">
                  Preparation Method
                </label>
                <textarea
                  id="preparation"
                  value={formData.preparation}
                  onChange={(e) => setFormData({ ...formData, preparation: e.target.value })}
                  className="w-full p-2 rounded border bg-background h-24"
                  required
                />
              </div>

              <div>
                <label htmlFor="dosage" className="block text-sm font-medium mb-2">
                  Dosage Instructions
                </label>
                <textarea
                  id="dosage"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full p-2 rounded border bg-background"
                  required
                />
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Medicine['difficulty'] })}
                  className="w-full p-2 rounded border bg-background"
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Medicine['category'] })}
                  className="w-full p-2 rounded border bg-background"
                  required
                >
                  <option value="Tea">Tea</option>
                  <option value="Tincture">Tincture</option>
                  <option value="Poultice">Poultice</option>
                  <option value="Salve">Salve</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Oil">Oil</option>
                  <option value="Balm">Balm</option>
                </select>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium mb-2">
                  Preparation Time
                </label>
                <input
                  id="time"
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-2 rounded border bg-background"
                  placeholder="e.g., 30 minutes"
                  required
                />
              </div>

              <div>
                <label htmlFor="shelf_life" className="block text-sm font-medium mb-2">
                  Shelf Life
                </label>
                <input
                  id="shelf_life"
                  type="text"
                  value={formData.shelf_life}
                  onChange={(e) => setFormData({ ...formData, shelf_life: e.target.value })}
                  className="w-full p-2 rounded border bg-background"
                  placeholder="e.g., 6 months"
                  required
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2 rounded border bg-background"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link
                href="/medicine"
                className="px-4 py-2 text-sm border rounded hover:bg-accent transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500 transition-colors text-sm border border-emerald-500/20 disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : isSubmitted ? 'Submitted for Approval' : 'Create Medicine'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 