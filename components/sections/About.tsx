'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Code, Lightbulb } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="section-padding bg-gradient-to-b from-gray-950 to-gray-900">
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
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate about creating innovative solutions that bridge the gap between complex problems and elegant code
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Code className="text-purple-400" size={28} />
                  My Journey
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I'm a passionate software engineer and computer science student with a deep fascination for how technology can transform ideas into reality. Currently pursuing my Bachelor's in Computer Science (Software Engineering) at UTM, I'm dedicated to mastering the art of building applications that not only function seamlessly but also create meaningful impact.
                  </p>
                  <p>
                    My journey in tech began during the COVID-19 pandemic in 2020, when I first started learning to code. I began with Swift, then explored Flutter, web development, and Python. This curiosity eventually led me to pursue my degree at UTM, where I've continued to grow as a developer.
                  </p>
                  <p>
                    Along the way, I've also developed a strong interest in artificial intelligence. With the rise of tools like ChatGPT, Gemini, and Claude during my university years, I became fascinated with AI's potential and started diving deeper into it. I'm excited to keep learning and contributing in this space.
                  </p>
                  <p>
                    When I'm not coding, you'll probably find me watching a movie or a TV show—or brainstorming the next big idea that could change how we interact with technology.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Education & Achievements */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <GraduationCap className="text-purple-400" size={28} />
                  Education
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Bachelor of Computer Science
                    </h4>
                    <p className="text-purple-400 mb-2">Software Engineering</p>
                    <p className="text-gray-400">Universiti Teknologi Malaysia (UTM)</p>
                    <p className="text-sm text-gray-500 mt-2">Currently Pursuing</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      AI Diploma
                    </h4>
                    <p className="text-blue-400 mb-2">Artificial Intelligence & Machine Learning</p>
                    <p className="text-gray-400">Instant Software Solutions</p>
                    <p className="text-sm text-blue-500 mt-2">Currently Taking</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Lightbulb className="text-purple-400" size={28} />
                  What Drives Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Innovation',
                    'Problem Solving',
                    'Clean Code',
                    'User Experience',
                    'Open Source',
                    'Continuous Learning',
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-500/30 text-center"
                    >
                      <p className="text-white font-medium">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;