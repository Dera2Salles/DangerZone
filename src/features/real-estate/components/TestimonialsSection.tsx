import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Isabelle & Marc Dubois',
    role: 'Home Buyers',
    image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Finding our dream villa on the Riviera seemed impossible until we met this team. Their dedication and market knowledge are truly unmatched.",
    rating: 5
  },
  {
    name: 'Thomas Anderson',
    role: 'Property Investor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Professionalism at its finest. They managed my portfolio acquisition with absolute precision and discretion. Highly recommended for serious investors.",
    rating: 5
  },
  {
    name: 'Sarah Jenning',
    role: 'Seller',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "They sold my property in record time and above the asking price. The marketing strategy was simply brilliant.",
    rating: 5
  },
  {
    name: 'Robert Fox',
    role: 'International Buyer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Relocating from overseas was complex, but Luxe Estates handled everything. A seamless transition to our new life.",
    rating: 5
  },
  {
    name: 'Emily Chen',
    role: 'Architect',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "As an architect, I appreciate their eye for quality. They only represent properties of the highest caliber.",
    rating: 5
  },
  {
    name: 'David & Sofia Miller',
    role: 'Vacation Home',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Our summer house in Provence is a dream. We couldn't appear happier with the service and the ongoing support.",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-brand-primary-navy/5 dark:bg-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"/>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"/>

      <div className="container mx-auto px-4 relative z-10 mb-12">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-brand-primary-navy dark:text-white">What Our Clients Say</h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
            ))}
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden mask-linear-gradient">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-50/50 dark:from-black to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-50/50 dark:from-black to-transparent" />
          
          <motion.div 
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 40, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((client, index) => (
              <div key={index} className="w-[350px] md:w-[400px]">
                <Card className="h-full border-none shadow-xl dark:bg-card/80 backdrop-blur-sm relative">
                  <div className="absolute top-6 right-8 text-brand-gold/20">
                    <Quote size={40} />
                  </div>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <img 
                      src={client.image} 
                      alt={client.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold"
                    />
                    <div>
                      <h4 className="font-bold text-brand-primary-navy dark:text-gray-100 truncate w-40">{client.name}</h4>
                      <span className="text-xs font-medium text-brand-secondary uppercase">{client.role}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4 relative z-10 line-clamp-4">
                      "{client.quote}"
                    </p>
                    <div className="flex gap-1">
                      {[...Array(client.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
