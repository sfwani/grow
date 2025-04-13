'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Survivor {
  id: string;
  name: string;
  initials: string;
  contributions: {
    plants: number;
    medicines: number;
    trades: number;
    total: number;
  };
  badge: string;
  specialty: string;
  rank?: string;
}

// Mock data - in real app, this would come from your database
const currentUser: Survivor = {
  id: 'current',
  name: 'You',
  initials: 'YU',
  contributions: {
    plants: 6,
    medicines: 3,
    trades: 4,
    total: 13
  },
  badge: '🌟',
  specialty: 'Rising Survivor',
  rank: 'A5'
};

const survivors: Survivor[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    initials: 'SC',
    contributions: {
      plants: 15,
      medicines: 8,
      trades: 12,
      total: 35
    },
    badge: '🌿',
    specialty: 'Master Botanist',
    rank: 'A1'
  },
  {
    id: '2',
    name: 'Max Rockatansky',
    initials: 'MR',
    contributions: {
      plants: 7,
      medicines: 4,
      trades: 25,
      total: 36
    },
    badge: '🔄',
    specialty: 'Trade Navigator',
    rank: 'A2'
  },
  {
    id: '3',
    name: 'Ellen Ripley',
    initials: 'ER',
    contributions: {
      plants: 10,
      medicines: 16,
      trades: 5,
      total: 31
    },
    badge: '🧪',
    specialty: 'Medicine Crafter',
    rank: 'A3'
  },
  {
    id: '4',
    name: 'Joel Miller',
    initials: 'JM',
    contributions: {
      plants: 10,
      medicines: 10,
      trades: 10,
      total: 30
    },
    badge: '⚖️',
    specialty: 'Balanced Survivor',
    rank: 'A4'
  },
  {
    id: '5',
    name: 'Aloy',
    initials: 'AL',
    contributions: {
      plants: 8,
      medicines: 12,
      trades: 8,
      total: 28
    },
    badge: '🎯',
    specialty: 'Resource Scout',
    rank: 'A5'
  }
];

const ContributionStat = ({ icon, value, label }: { icon: string; value: number; label: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-black/40 border border-emerald-500/20 flex items-center justify-center text-lg shadow-lg shadow-emerald-900/20 backdrop-blur-sm group-hover:border-emerald-500/30 transition-colors">
      {icon}
    </div>
    <div>
      <div className="text-emerald-400 font-medium text-lg group-hover:text-emerald-300 transition-colors">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  </div>
);

const InitialsAvatar = ({ initials, size = 'medium', badge }: { initials: string; size?: 'small' | 'medium' | 'large'; badge?: string }) => {
  const sizeClasses = {
    small: 'w-12 h-12 text-lg',
    medium: 'w-16 h-16 text-xl',
    large: 'w-24 h-24 text-3xl'
  };

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} rounded-full bg-black/80 border-2 border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 shadow-xl shadow-emerald-900/30 backdrop-blur-sm relative overflow-hidden group-hover:border-emerald-500/50 transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)]" />
        <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{initials}</span>
      </div>
      {badge && (
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-black/80 flex items-center justify-center border-2 border-emerald-500/30 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
          {badge}
        </div>
      )}
    </div>
  );
};

const TopThreePodium = ({ survivors }: { survivors: Survivor[] }) => {
  const positions = [1, 0, 2]; // Order: 2nd, 1st, 3rd
  
  const medalColors: Record<number, string> = {
    0: 'from-yellow-500 to-yellow-600',
    1: 'from-gray-300 to-gray-400',
    2: 'from-amber-600 to-amber-700'
  };

  const podiumHeights: Record<number, string> = {
    0: 'h-40',
    1: 'h-32',
    2: 'h-28'
  };
  
  return (
    <div className="flex justify-center items-end gap-12 mb-20 pt-12">
      {positions.map((position) => {
        const survivor = survivors[position];
        const isFirst = position === 0;
        
        return (
          <motion.div
            key={survivor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: position * 0.2 }}
            className={`relative flex flex-col items-center ${isFirst ? 'mb-[-40px]' : ''} group`}
          >
            <div className={`relative ${isFirst ? 'scale-110' : ''}`}>
              {/* Glowing background effect */}
              <div className={`absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500`} />
              
              {/* Medal with gradient */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${medalColors[position]} flex items-center justify-center text-black font-bold text-2xl shadow-lg border-2 border-black/10 group-hover:scale-110 transition-transform duration-300`}>
                  {position === 0 ? '1' : position === 1 ? '2' : '3'}
                </div>
              </div>

              {/* Avatar with specialty icon */}
              <div className="relative">
                <div className={`rounded-full bg-black/90 p-1.5 backdrop-blur-lg shadow-2xl border-2 border-emerald-500/30 ${isFirst ? 'scale-110' : ''} group-hover:border-emerald-500/50 transition-all duration-300`}>
                  <div className={`w-28 h-28 rounded-full bg-black flex items-center justify-center font-bold text-5xl text-emerald-400 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/5" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)]" />
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{survivor.initials}</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-black/90 flex items-center justify-center border-2 border-emerald-500/30 shadow-xl backdrop-blur-sm text-xl group-hover:scale-110 transition-transform duration-300">
                  {survivor.badge}
                </div>
              </div>
            </div>

            {/* Name and stats */}
            <div className={`mt-8 text-center ${isFirst ? 'scale-110' : ''}`}>
              <div className="font-bold text-white text-2xl mb-2 drop-shadow-lg">{survivor.name}</div>
              <div className="text-emerald-400 font-medium text-md mb-4">{survivor.specialty}</div>
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-emerald-300/80">🌱</span>
                  <span className="text-emerald-400 font-medium">{survivor.contributions.plants}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-emerald-300/80">🧪</span>
                  <span className="text-emerald-400 font-medium">{survivor.contributions.medicines}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-emerald-300/80">🔄</span>
                  <span className="text-emerald-400 font-medium">{survivor.contributions.trades}</span>
                </div>
              </div>
              <div className="text-5xl font-bold text-emerald-400 mb-2 drop-shadow-lg group-hover:text-emerald-300 transition-colors">
                {survivor.contributions.total}
              </div>
              <div className="text-sm text-emerald-300/60">Total Contributions</div>
            </div>

            {/* Podium platform */}
            <div className={`mt-8 ${podiumHeights[position]} w-40 relative group`}>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-emerald-900/50 rounded-t-lg border-2 border-emerald-500/20 backdrop-blur-sm overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:100%_8px]" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function LeaderboardPage() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const sortedSurvivors = [...survivors].sort((a, b) => b.contributions.total - a.contributions.total);
  const remainingSurvivors = sortedSurvivors.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black relative overflow-hidden">
      {/* Enhanced atmospheric elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_70%)]" />
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      <div className="absolute -top-40 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-60 -right-20 w-72 h-72 bg-emerald-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute -bottom-40 left-40 w-80 h-80 bg-emerald-500/4 rounded-full blur-3xl animate-pulse delay-2000" />
      
      <div className="container max-w-6xl py-12 px-4 relative">
        <div className="relative space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold tracking-tight text-white mb-2 drop-shadow-2xl"
            >
              Survival Elite
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-5 py-1.5 rounded-full bg-black/40 border border-emerald-500/20 backdrop-blur-sm"
            >
              <p className="text-emerald-400 text-lg font-medium">
                Top Contributors for {currentMonth}
              </p>
            </motion.div>
          </div>

          {/* Top 3 Podium */}
          <TopThreePodium survivors={sortedSurvivors} />

          {/* Your Rank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-8 rounded-2xl border border-emerald-500/20 bg-black/40 backdrop-blur-sm shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent rounded-2xl" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-500/10 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium border border-emerald-500/20">
                  Your Progress
                </div>
              </div>
              <div className="flex items-center gap-8">
                <InitialsAvatar initials={currentUser.initials} size="large" badge={currentUser.badge} />
                <div>
                  <div className="text-white font-bold text-xl mb-1">{currentUser.name}</div>
                  <div className="text-emerald-400 font-medium">{currentUser.specialty}</div>
                </div>
                <div className="flex gap-8 ml-auto">
                  <ContributionStat icon="🌱" value={currentUser.contributions.plants} label="Plants" />
                  <ContributionStat icon="🧪" value={currentUser.contributions.medicines} label="Medicines" />
                  <ContributionStat icon="🔄" value={currentUser.contributions.trades} label="Trades" />
                  <div className="pl-8 border-l border-emerald-500/20">
                    <div className="text-4xl font-bold text-emerald-400 mb-1">
                      {currentUser.contributions.total}
                    </div>
                    <div className="text-sm text-emerald-300/60">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Remaining Survivors */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-emerald-500/50 ml-2">Other Survivors</h2>
            {remainingSurvivors.map((survivor, index) => (
              <motion.div
                key={survivor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-xl border border-emerald-500/20 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 group shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                <div className="relative flex items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-black/60 border border-emerald-500/30 flex items-center justify-center text-lg font-bold text-emerald-400 shadow-lg">
                      {survivor.rank}
                    </div>
                    <InitialsAvatar initials={survivor.initials} size="medium" badge={survivor.badge} />
                    <div>
                      <div className="font-bold text-white text-lg mb-1">{survivor.name}</div>
                      <div className="text-emerald-400 font-medium">{survivor.specialty}</div>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-8">
                    <ContributionStat icon="🌱" value={survivor.contributions.plants} label="Plants" />
                    <ContributionStat icon="🧪" value={survivor.contributions.medicines} label="Medicines" />
                    <ContributionStat icon="🔄" value={survivor.contributions.trades} label="Trades" />
                    <div className="pl-8 border-l border-emerald-500/20">
                      <div className="text-3xl font-bold text-emerald-400 mb-1">
                        {survivor.contributions.total}
                      </div>
                      <div className="text-sm text-emerald-300/60">Total</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 