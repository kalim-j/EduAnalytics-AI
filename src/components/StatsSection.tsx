'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

interface Stats {
  totalStudents: number;
  totalColleges: number;
  totalPredictions: number;
  matchAccuracy: number;
  scholarshipsFound: number;
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    {
      label: 'Students Guided',
      value: (stats.totalStudents / 100000).toFixed(1) + 'L+',
      icon: '👥',
      color: 'from-blue-400 to-blue-600',
    },
    {
      label: 'Match Accuracy',
      value: stats.matchAccuracy + '%',
      icon: '🎯',
      color: 'from-purple-400 to-purple-600',
    },
    {
      label: 'Colleges Listed',
      value: stats.totalColleges + '+',
      icon: '🏫',
      color: 'from-green-400 to-green-600',
    },
    {
      label: 'Scholarships Found',
      value: '₹' + (stats.scholarshipsFound / 10000000).toFixed(0) + 'Cr+',
      icon: '💰',
      color: 'from-amber-400 to-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card hover glassmorphism>
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-xl mb-3`}>
              {item.icon}
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              {item.label}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {item.value}
            </p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
