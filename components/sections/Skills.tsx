'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Brain, 
  Database, 
  Server, 
  Eye,
  Container,
  Zap
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Mobile Development',
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Flutter', level: 90, icon: '📱' },
        { name: 'Dart', level: 85, icon: '🎯' },
      ],
    },
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Python', level: 95, icon: '🐍' },
        { name: 'C++', level: 80, icon: '⚡' },
      ],
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Machine Learning', level: 85, icon: '🤖' },
        { name: 'Deep Learning', level: 80, icon: '🧠' },
        { name: 'Computer Vision', level: 75, icon: '👁️' },
      ],
    },
    {
      title: 'Backend & Database',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'SQL', level: 85, icon: '🗄️' },
        { name: 'FastAPI', level: 80, icon: '⚡' },
      ],
    },
    {
      title: 'Tools & Technologies',
      icon: Container,
      color: 'from-indigo-500 to-purple-500',
      skills: [
        { name: 'Docker', level: 75, icon: '🐳' },
        { name: 'Electron', level: 70, icon: '⚛️' },
      ],
    },
  ];

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

  return (
    <section id="skills" className="section-padding bg-gray-950">
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
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit built through continuous learning and hands-on experience
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="glass-card p-8 group hover:glow-effect transition-all duration-300"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300 font-medium">
                          <span className="text-lg">{skill.icon}</span>
                          {skill.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Skills Tags */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
              Additional Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Git & GitHub',
                'React',
                'TensorFlow',
                'PyTorch',
                'OpenCV',
                'Pandas',
                'NumPy',
                'Firebase',
                'PostgreSQL',
                'Google Colab'
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-gray-300 text-sm font-medium hover:border-purple-400/50 transition-all duration-200 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;