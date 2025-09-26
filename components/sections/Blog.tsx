'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';

const Blog = () => {
  const blogPosts = [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-500';
      case 'Draft':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section id="blog" className="section-padding bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black gradient-text mb-6">
              Blog & Insights
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sharing knowledge, experiences, and insights from the world of software development and technology
            </p>
          </motion.div>

          {/* Placeholder Content */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="glass-card p-12">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Nothing yet, soon perhaps :)
              </h3>
              <p className="text-gray-300 text-lg">
                I'm working on some exciting content to share with you. Stay tuned!
              </p>
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="glass-card p-8 lg:p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-4xl mb-4">📬</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                Stay Updated
              </h3>
              <p className="text-gray-300">
                Get notified when I publish new articles about software development, AI, and technology trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <BookOpen size={20} />
                  Subscribe
                </motion.button>
              </div>
              <p className="text-xs text-gray-400">
                No spam, ever. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;