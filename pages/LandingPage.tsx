
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Zap, Tag, Layers, ArrowRight, Github } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  React.useEffect(() => {
    document.title = "AI Image Tagger | Next-Gen Vision Analysis";
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-content-100 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-6 z-10 relative">
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="px-4 py-2 rounded-full bg-base-200 border border-base-300 text-brand-primary text-sm font-semibold tracking-wider uppercase shadow-sm">
                Next-Gen AI Vision
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-content-100 via-brand-primary to-brand-secondary">
              Understand Images <br /> Like Never Before
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Unlock the power of Generative AI to tag, describe, and analyze your visuals with unprecedented accuracy using CLIP, BLIP, and BERT.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => navigate('/app')}
                className="group relative px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Start Tagging Now</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shimmer" />
              </button>
              
              <a
                href="https://github.com/kruth-s/AI-Powered-Image-Tagging-using-Generative-Vision-Language-Models" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-base-200 hover:bg-base-300 text-content-100 font-bold rounded-xl transition-all duration-300 border border-base-300 hover:border-brand-primary/50 flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                <span>View Source</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-base-200 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to analyze your images with state-of-the-art AI models.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<Camera className="w-8 h-8 text-brand-primary" />}
              title="Advanced Vision Models"
              description="Leverages CLIP & BLIP for deep semantic understanding of image content and context."
              delay={0}
            />
            <FeatureCard 
              icon={<Tag className="w-8 h-8 text-brand-secondary" />}
              title="Intelligent Tagging"
              description="Automatically generates descriptive tags and keywords using KeyBERT extraction."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="Real-time Analysis"
              description="Get instant insights and detailed captions for any uploaded image in seconds."
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-base-100 border-t border-base-300">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AI Image Tagger. Built with ❤️ and Generative AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="p-8 rounded-2xl bg-base-100 border border-base-300 shadow-lg hover:shadow-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300 group"
    >
      <div className="w-14 h-14 rounded-xl bg-base-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-base-300 group-hover:border-brand-primary/30">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-content-100 group-hover:text-brand-primary transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default LandingPage;
