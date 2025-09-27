'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, MessageCircle } from 'lucide-react';

const Contact = () => {

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

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/komsait',
      color: 'hover:text-gray-400',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/khaledtahoon',
      color: 'hover:text-blue-400',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/601139338367',
      color: 'hover:text-green-400',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-gray-950 to-black">
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
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your ideas to life with cutting-edge technology and creative solutions.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">tahoonkhaled12@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">Malaysia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Availability</p>
                      <p className="text-white font-medium">Open to opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 ${social.color} text-gray-300`}
                      >
                        <Icon size={24} />
                      </motion.a>
                    );
                  })}
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Follow me for updates on my latest projects and tech insights.
                </p>
              </div>

            </motion.div>

          </div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center pt-16 border-t border-gray-800">
            <p className="text-gray-400 mb-4">
              © 2025 Khaled Tahoon.
            </p>
            <p className="text-gray-500 text-sm">
              Designed and developed with passion.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;