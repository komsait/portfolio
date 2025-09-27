'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Github, ExternalLink, Calendar, Tag, ArrowRight, Play } from 'lucide-react';
import { useRef, useState } from 'react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const projects = [
    {
      id: 1,
      title: 'EXPLORATORY DATA ANALYSIS',
      subtitle: 'Financial Transaction Dataset',
      description: 'A comprehensive EDA pipeline on financial transaction datasets, covering data extraction from PostgreSQL, cleaning, preprocessing, outlier detection, feature engineering, and advanced visualizations.',
      story: 'This project was born from the need to understand complex financial transaction patterns while providing meaningful insights through advanced statistical analysis and visualization techniques.',
      features: [
        'Data extraction from PostgreSQL databases',
        'Data cleaning and preprocessing',
        'Advanced outlier detection and treatment',
        'Feature engineering for users, cards, and transactions',
        'Interactive data visualizations with Matplotlib & Seaborn',
        'Export to SQL for downstream analytics and Power BI dashboards'
      ],
      image: 'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=800',
      mockupImage: 'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'PostgreSQL', 'Pandas', 'Matplotlib', 'Seaborn', 'Power BI'],
      github: 'https://github.com/komsait/EDA-Financial-Transactions',
      demo: 'https://github.com/komsait/EDA-Financial-Transactions',
      status: 'Completed',
      category: 'Data Analysis',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 2,
      title: 'BRAIN TUMOR AI DETECTOR',
      subtitle: 'Deep Learning for Medical Imaging',
      description: 'An AI-powered web application for detecting and segmenting brain tumors in MRI images using deep learning models. Features both classification and segmentation capabilities with a user-friendly FastAPI interface.',
      story: 'This project began as an exploration into applying deep learning to medical imaging. I wanted to solve a real-world problem: detecting brain tumors from MRI scans. The journey included data preparation, model development, evaluation using accuracy and precision metrics, and deployment into a FastAPI web application with Docker containerization.',
      features: [
        'Classification: Predicts tumor presence using InceptionV3 transfer learning',
        'Segmentation: U-Net model generates tumor mask overlays',
        'Web App: User-friendly FastAPI interface for upload and results',
        'Deployment: Fully containerized with Docker for cloud deployment',
        'Stateless API: Processes results without storing patient data',
        'Visualization: Returns overlay images with tumor highlighted in red',
        'Logging: Records predictions with timestamps for monitoring'
      ],
      image: '/tumoraidetector.png',
      mockupImage: '/tumoraidetector.png',
      technologies: ['Python', 'TensorFlow', 'Keras', 'InceptionV3', 'U-Net', 'FastAPI', 'Docker', 'OpenCV', 'NumPy', 'Matplotlib'],
      github: 'https://github.com/komsait/AI-BrainTumorDetection',
      demo: 'https://tumorai.tahoonkhaled.com',
      status: 'Completed',
      category: 'AI/ML',
      color: 'from-pink-500 to-pink-700'
    }
  ];

  // Transform values for zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500';
      case 'Completed':
        return 'bg-blue-500';
      case 'Beta':
        return 'bg-yellow-500';
      case 'In Development':
        return 'bg-purple-500';
      case 'Coming Soon':
        return 'bg-orange-500';
      case 'Planning':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section id="projects" className="relative min-h-screen bg-gray-950">
      {/* Projects Overview Section - Zoomed Out */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, opacity }}
          className="text-center z-10"
        >
          <h1 className="text-8xl md:text-9xl font-black gradient-text mb-8 tracking-tight">
            PROJECTS
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our work is the product of careful analysis, creative thinking, and a commitment to excellence.
          </p>
        </motion.div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Individual Project Sections */}
      <div ref={containerRef} className="relative">
        {projects.map((project, index) => {
          const projectRef = useRef<HTMLDivElement>(null);
          const isInView = useInView(projectRef, { 
            margin: "-20% 0px -20% 0px"
          });

          return (
            <motion.div
              key={project.id}
              ref={projectRef}
              className={`relative min-h-screen flex items-center justify-center ${
                index % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900'
              }`}
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ 
                opacity: isInView ? 1 : 0.3,
                scale: isInView ? 1 : 0.8
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                {/* Project Mockup */}
                <div className="relative">
                  <motion.div
                    className={`relative p-8 rounded-2xl bg-gradient-to-br ${project.color} shadow-2xl`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Mobile Mockup */}
                    <div className="relative mx-auto w-64 h-[500px] bg-black rounded-[2rem] p-2 shadow-2xl">
                      <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden relative">
                        <img
                          src={project.mockupImage}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-4 right-4 text-white">
                          <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                          <p className="text-sm opacity-90">{project.description}</p>
                        </div>
                      </div>
                    </div>
                    
                  </motion.div>
                </div>

                {/* Project Details */}
                <div className={`space-y-8 ${isInView ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}>
                  {/* Project Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </span>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                          {project.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                      {project.title}
                    </h2>
                    
                    <p className="text-lg text-gray-300 mb-6">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Project Story */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">The Story</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {project.story}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm font-medium border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-semibold transition-all duration-200 border border-gray-600"
                    >
                      <Github size={18} />
                      View Code
                    </motion.a>
                    
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-200 glow-effect"
                    >
                      <Play size={18} />
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default Projects;