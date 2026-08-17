'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardHome() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    predictions: 0,
    bookmarks: 0,
    scholarships: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      setUser(authUser);

      // Fetch user stats
      const [pred, book, scholar] = await Promise.all([
        supabase
          .from('predictions')
          .select('id', { count: 'exact' })
          .eq('user_id', authUser.id),
        supabase
          .from('bookmarks')
          .select('id', { count: 'exact' })
          .eq('user_id', authUser.id),
        supabase.rpc('count_scholarships', { user_id: authUser.id }),
      ]);

      setStats({
        predictions: pred.count || 0,
        bookmarks: book.count || 0,
        scholarships: scholar.data || 0,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8 pb-24 sm:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Let's find your perfect college today
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
        >
          {[
            {
              icon: '⚡',
              label: 'Predictions',
              value: stats.predictions,
              color: 'from-purple-400 to-purple-600',
            },
            {
              icon: '📌',
              label: 'Bookmarks',
              value: stats.bookmarks,
              color: 'from-blue-400 to-blue-600',
            },
            {
              icon: '💰',
              label: 'Scholarships',
              value: stats.scholarships,
              color: 'from-amber-400 to-amber-600',
            },
          ].map((stat) => (
            <Card key={stat.label} glassmorphism>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} text-white flex items-center justify-center text-2xl mb-3`}>
                {stat.icon}
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/dashboard/predictor">
              <Card hover glassmorphism className="cursor-pointer text-center py-8">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-1">New Prediction</h3>
                <p className="text-sm text-gray-600">Find your matched colleges</p>
              </Card>
            </Link>
            <Link href="/dashboard/scholarships">
              <Card hover glassmorphism className="cursor-pointer text-center py-8">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-gray-900 mb-1">Find Scholarships</h3>
                <p className="text-sm text-gray-600">Discover funding opportunities</p>
              </Card>
            </Link>
            <Link href="/dashboard/map">
              <Card hover glassmorphism className="cursor-pointer text-center py-8">
                <div className="text-4xl mb-3">🗺️</div>
                <h3 className="font-bold text-gray-900 mb-1">College Map</h3>
                <p className="text-sm text-gray-600">Explore colleges by location</p>
              </Card>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
