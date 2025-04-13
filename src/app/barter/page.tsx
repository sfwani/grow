'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BarterItem {
  id: string;
  name: string;
  description: string;
  category: 'Food' | 'Medicine' | 'Tools' | 'Weapons' | 'Resources';
  condition: 'New' | 'Good' | 'Fair' | 'Poor';
  imageUrl: string;
  owner: {
    name: string;
    avatar: string;
    rating: number;
  };
  isUserListing?: boolean;
}

// Add new interface for trade proposals
interface TradeProposal {
  itemId: string;
  itemName: string;
  ownerName: string;
  proposedItem: string;
}

const mockItems: BarterItem[] = [
  {
    id: '1',
    name: 'Combat Knife',
    description: 'High-quality survival knife, perfect for hunting and crafting. Carbon steel blade with serrated edge.',
    category: 'Tools',
    condition: 'Good',
    imageUrl: '/images/barter/knife.jpg',
    owner: {
      name: 'Sarah Connor',
      avatar: '/images/avatars/avatar1.jpg',
      rating: 4.8
    }
  },
  {
    id: '2',
    name: 'Medicinal Herbs Bundle',
    description: 'Freshly gathered medicinal herbs for natural remedies. Includes sage, yarrow, and echinacea.',
    category: 'Medicine',
    condition: 'New',
    imageUrl: '/images/barter/herbs.jpg',
    owner: {
      name: 'John Smith',
      avatar: '/images/avatars/avatar2.jpg',
      rating: 4.5
    }
  },
  {
    id: '3',
    name: 'Canned Food Cache',
    description: 'Long-lasting preserved food supplies. Mix of vegetables, fruits, and proteins. 20+ cans.',
    category: 'Food',
    condition: 'Good',
    imageUrl: '/images/barter/canned-food.jpg',
    owner: {
      name: 'Max Rockatansky',
      avatar: '/images/avatars/avatar3.jpg',
      rating: 4.9
    }
  },
  {
    id: '4',
    name: 'Advanced Water Filter',
    description: 'Portable water filtration system. Removes 99.9% of contaminants. Solar-powered.',
    category: 'Resources',
    condition: 'Fair',
    imageUrl: '/images/barter/water-filter.jpg',
    owner: {
      name: 'Ellen Ripley',
      avatar: '/images/avatars/avatar4.jpg',
      rating: 4.7
    }
  },
  {
    id: '5',
    name: 'Crossbow',
    description: 'Compound crossbow with scope. Silent and deadly. Includes 12 carbon arrows.',
    category: 'Weapons',
    condition: 'Good',
    imageUrl: '/images/barter/crossbow.jpg',
    owner: {
      name: 'Daryl Dixon',
      avatar: '/images/avatars/avatar5.jpg',
      rating: 4.9
    }
  },
  {
    id: '6',
    name: 'Solar Generator',
    description: 'Portable solar power station. 1000W output. Perfect for charging essential devices.',
    category: 'Resources',
    condition: 'New',
    imageUrl: '/images/barter/solar-generator.jpg',
    owner: {
      name: 'Aloy',
      avatar: '/images/avatars/avatar6.jpg',
      rating: 4.6
    }
  },
  {
    id: '7',
    name: 'First Aid Kit',
    description: 'Comprehensive medical supplies. Includes antibiotics, bandages, and surgical tools.',
    category: 'Medicine',
    condition: 'New',
    imageUrl: '/images/barter/medical-kit.jpg',
    owner: {
      name: 'Claire Redfield',
      avatar: '/images/avatars/avatar7.jpg',
      rating: 4.8
    }
  },
  {
    id: '8',
    name: 'Machete',
    description: 'Heavy-duty machete. Perfect for clearing paths and self-defense.',
    category: 'Weapons',
    condition: 'Good',
    imageUrl: '/images/barter/machete.jpg',
    owner: {
      name: 'Joel Miller',
      avatar: '/images/avatars/avatar8.jpg',
      rating: 4.7
    }
  },
  {
    id: '9',
    name: 'Dried Meat Stock',
    description: 'Preserved jerky and dried meats. High protein, long shelf life.',
    category: 'Food',
    condition: 'Good',
    imageUrl: '/images/barter/dried-meat.jpg',
    owner: {
      name: 'Carol Peletier',
      avatar: '/images/avatars/avatar9.jpg',
      rating: 4.5
    }
  },
  {
    id: '10',
    name: 'Multi-Tool Set',
    description: 'Professional grade multi-tools. Includes pliers, screwdrivers, and wire cutters.',
    category: 'Tools',
    condition: 'Fair',
    imageUrl: '/images/barter/tools.jpg',
    owner: {
      name: 'Marcus Wright',
      avatar: '/images/avatars/avatar10.jpg',
      rating: 4.4
    }
  },
  {
    id: '11',
    name: 'Ammunition Cache',
    description: 'Mixed ammunition box. Various calibers. Trade by type.',
    category: 'Weapons',
    condition: 'New',
    imageUrl: '/images/barter/ammo.jpg',
    owner: {
      name: 'Chris Redfield',
      avatar: '/images/avatars/avatar11.jpg',
      rating: 4.9
    }
  },
  {
    id: '12',
    name: 'Seeds Collection',
    description: 'Variety of vegetable and fruit seeds. Non-GMO, heirloom varieties.',
    category: 'Resources',
    condition: 'New',
    imageUrl: '/images/barter/seeds.jpg',
    owner: {
      name: 'Ellie Williams',
      avatar: '/images/avatars/avatar12.jpg',
      rating: 4.6
    }
  }
];

const categoryColors: Record<BarterItem['category'], string> = {
  Food: 'text-amber-400',
  Medicine: 'text-emerald-400',
  Tools: 'text-sky-400',
  Weapons: 'text-rose-400',
  Resources: 'text-violet-400'
};

const conditionColors: Record<BarterItem['condition'], string> = {
  New: 'text-emerald-400',
  Good: 'text-sky-400',
  Fair: 'text-amber-400',
  Poor: 'text-rose-400'
};

export default function BarterPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState<BarterItem[]>([]);
  const [isAddingListing, setIsAddingListing] = useState(false);
  const [editingItem, setEditingItem] = useState<BarterItem | null>(null);
  const [tradeModal, setTradeModal] = useState<{ isOpen: boolean; item: BarterItem | null }>({
    isOpen: false,
    item: null
  });
  const [tradeProposal, setTradeProposal] = useState<string>('');
  const [proposals, setProposals] = useState<TradeProposal[]>([]);
  const [newListing, setNewListing] = useState<Partial<BarterItem>>({
    name: '',
    description: '',
    category: 'Tools',
    condition: 'Good',
    imageUrl: '/barter/placeholder.jpg',
    owner: {
      name: 'You',
      avatar: '/avatars/default.jpg',
      rating: 5.0
    }
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load items from localStorage
    const savedItems = localStorage.getItem('userBarterItems');
    const savedProposals = localStorage.getItem('tradeProposals');
    const userItems = savedItems ? JSON.parse(savedItems) : [];
    const userProposals = savedProposals ? JSON.parse(savedProposals) : [];
    setItems([...mockItems, ...userItems]);
    setProposals(userProposals);
  }, []);

  const saveItems = (newItems: BarterItem[]) => {
    const userItems = newItems.filter(item => item.isUserListing);
    localStorage.setItem('userBarterItems', JSON.stringify(userItems));
    setItems(newItems);
  };

  const handleAddListing = () => {
    if (!newListing.name || !newListing.description) return;

    const newItem: BarterItem = {
      ...newListing as BarterItem,
      id: Date.now().toString(),
      isUserListing: true
    };

    const updatedItems = [...items, newItem];
    saveItems(updatedItems);
    setIsAddingListing(false);
    setNewListing({
      name: '',
      description: '',
      category: 'Tools',
      condition: 'Good',
      imageUrl: '/barter/placeholder.jpg',
      owner: {
        name: 'You',
        avatar: '/avatars/default.jpg',
        rating: 5.0
      }
    });
  };

  const handleEditListing = (item: BarterItem) => {
    const updatedItems = items.map((i: BarterItem) => 
      i.id === item.id ? { ...item, isUserListing: true } : i
    );
    saveItems(updatedItems);
    setEditingItem(null);
  };

  const handleDeleteListing = (itemId: string) => {
    const updatedItems = items.filter((item: BarterItem) => item.id !== itemId);
    saveItems(updatedItems);
  };

  const handleProposeTrade = () => {
    if (!tradeModal.item || !tradeProposal.trim()) return;

    const newProposal: TradeProposal = {
      itemId: tradeModal.item.id,
      itemName: tradeModal.item.name,
      ownerName: tradeModal.item.owner.name,
      proposedItem: tradeProposal.trim()
    };

    const updatedProposals = [...proposals, newProposal];
    localStorage.setItem('tradeProposals', JSON.stringify(updatedProposals));
    setProposals(updatedProposals);
    setTradeModal({ isOpen: false, item: null });
    setTradeProposal('');
  };

  const filteredItems = items.filter((item: BarterItem) => 
    (!selectedCategory || item.category === selectedCategory) &&
    (!searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Survival Barter</h1>
          <p className="mt-2 text-gray-400">
            Trade essential items for post-apocalyptic survival
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddingListing(true)}
            className="inline-flex items-center justify-center rounded-md bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 shadow hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50"
          >
            Add Listing
          </button>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !selectedCategory ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Items
          </button>
          {Object.keys(categoryColors).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? `bg-${category.toLowerCase()}-500/10 ${categoryColors[category as keyof typeof categoryColors]}`
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-700 bg-gray-800/50 text-sm text-gray-200 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50 placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item: BarterItem) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 text-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-gray-700"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold tracking-tight text-white">{item.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-300">{item.description}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-4 h-4 ${categoryColors[item.category]}`}
                  >
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4 0a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-xs font-medium ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-4 h-4 ${conditionColors[item.condition]}`}
                  >
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-xs font-medium ${conditionColors[item.condition]}`}>
                    {item.condition}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-700">
                  <Image
                    src={item.owner.avatar}
                    alt={item.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">{item.owner.name}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-amber-400"
                    >
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span className="font-mono">{item.owner.rating.toFixed(1)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setTradeModal({ isOpen: true, item })}
                  className="ml-auto inline-flex items-center justify-center rounded-md bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-400 shadow hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50"
                >
                  Propose Trade
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddingListing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">Add New Listing</h2>
            {/* Add your form fields here */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddingListing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddListing}
                className="px-4 py-2 text-sm font-medium bg-emerald-500/10 text-emerald-400 rounded-md hover:bg-emerald-500/20"
              >
                Add Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trade Proposal Modal */}
      {tradeModal.isOpen && tradeModal.item && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Propose Trade for {tradeModal.item.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Describe what you would like to offer in exchange for this item.
            </p>
            <textarea
              value={tradeProposal}
              onChange={(e) => setTradeProposal(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-700 bg-gray-800/50 text-gray-200 h-32 mb-4 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 shadow-inner placeholder:text-gray-600"
              placeholder="Describe your trade offer..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setTradeModal({ isOpen: false, item: null });
                  setTradeProposal('');
                }}
                className="px-4 py-2 text-sm border border-gray-700 rounded-md hover:bg-gray-800 transition-all duration-200 text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleProposeTrade}
                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-md hover:bg-emerald-500/20 transition-all duration-200 text-sm font-medium"
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 