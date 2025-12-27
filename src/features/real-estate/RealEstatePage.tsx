import { motion } from 'framer-motion';
import { AboutSection } from './components/AboutSection';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';

export function RealEstatePage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      
      {/* Simple Footer */}
      <footer className="bg-brand-primary-navy py-12 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Luxe Estates</h3>
            <p className="text-gray-400 text-sm">© 2025 Luxe Estates Agency. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-300">
             <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-brand-gold transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
