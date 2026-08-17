'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import StatsSection from '@/components/StatsSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="container flex items-center justify-between h-16">
          <div className="font-bold text-xl">🎓 CollegeMatch AI</div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              ✨ India's #1 AI College Advisor
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
          >
            Find Your Dream College with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              AI
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Answer 9 questions → Get matched with 8 perfect colleges. Based on
            2026 cutoff trends, placements, and your preferences.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/dashboard/predictor">
              <Button variant="primary" size="lg" fullWidth>
                Start Your Match →
              </Button>
            </Link>
            <Link href="/dashboard/scholarships">
              <Button variant="outline" size="lg" fullWidth>
                Find Scholarships
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-20"
        >
          <StatsSection />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container py-20 border-t border-gray-200">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-black text-center mb-12">
            Everything You Need
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'AI College Matcher',
                desc: 'Personalized college recommendations',
              },
              {
                icon: '💰',
                title: 'Scholarship Finder',
                desc: '₹2.5 Cr in scholarships found',
              },
              {
                icon: '📊',
                title: 'Cutoff Calculator',
                desc: 'Instant TNEA cutoff prediction',
              },
              {
                icon: '🗺️',
                title: 'College Map',
                desc: 'Interactive map of 500+ colleges',
              },
              {
                icon: '📈',
                title: 'Placement Tracker',
                desc: 'Real placement data by college',
              },
              {
                icon: '💬',
                title: 'AI Counsellor',
                desc: '24/7 personalized assistance',
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card hover glassmorphism>
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/dashboard/scholarships">Scholarships</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#">Twitter</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            © 2026 CollegeMatch AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
