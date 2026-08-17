'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { motion } from 'framer-motion';

interface College {
  id: number;
  name: string;
  state: string;
  type: string;
  nirf_rank: number;
  avg_package_lpa: number;
  website: string;
}

interface CollegeGridProps {
  state?: string;
  limit?: number;
}

export default function CollegeGrid({ state, limit = 12 }: CollegeGridProps) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          limit: limit.toString(),
          ...(state && { state }),
        });

        const res = await fetch(`/api/colleges?${params}`);
        if (!res.ok) throw new Error('Failed to fetch colleges');

        const { data } = await res.json();
        setColleges(data);
        setError(null);
      } catch (err) {
        console.error('College fetch error:', err);
        setError('Failed to load colleges');
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [state, limit]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No colleges found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college, i) => (
        <motion.div
          key={college.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card hover glassmorphism className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">
                  {college.name}
                </h3>
                <Badge variant="info">{college.type}</Badge>
              </div>
              <div className="text-2xl font-bold text-purple-600 text-right ml-2">
                #{college.nirf_rank}
              </div>
            </div>

            {/* Location */}
            <p className="text-sm text-gray-600 mb-4">
              📍 {college.state}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 font-medium">Avg Package</p>
                <p className="text-lg font-bold text-gray-900">
                  {college.avg_package_lpa}L
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 font-medium">NIRF Rank</p>
                <p className="text-lg font-bold text-gray-900">
                  #{college.nirf_rank}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {college.website && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(college.website, '_blank')}
                >
                  Visit
                </Button>
              )}
              <Button variant="primary" size="sm" className="flex-1">
                Compare
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
