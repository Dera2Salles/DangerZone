import { Button } from '@/components/ui/button';
import { Award, ShieldCheck, Users } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-24 bg-white dark:bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Grid */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern Interior" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg mt-12"
              />
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Property Exterior" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary-navy text-white p-8 rounded-full shadow-2xl text-center backdrop-blur-md border-[6px] border-white dark:border-gray-800">
              <span className="block text-4xl font-bold">25+</span>
              <span className="text-xs uppercase tracking-widest text-brand-gold">Years</span>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">About Us</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-6 text-brand-primary-navy dark:text-white leading-tight">
              A Tradition of <br/> 
              <span className="text-brand-primary">Excellence & Trust</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Founded on the principles of integrity and dedicated service, our agency has established itself as the premier authority in luxury real estate. We check every detail to ensure your journey to finding the perfect home is seamless.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { icon: ShieldCheck, title: "Trusted Legal Support", text: "Comprehensive legal guidance through every step." },
                { icon: Award, title: "Market Leaders", text: "Recognized as the top agency for 5 consecutive years." },
                { icon: Users, title: "Client-Centric", text: "Your dreams and requirements are our sole priority." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-cream/50 flex items-center justify-center text-brand-primary-dark">
                    <item.icon className="h-6 w-6"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-brand-primary-navy dark:text-gray-100">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-brand-primary text-white hover:bg-brand-primary-dark rounded-full px-8">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
