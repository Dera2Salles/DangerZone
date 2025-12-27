import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Isabelle & Marc Dubois',
    role: 'Acheteurs',
    image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Trouver notre villa de rêve sur la Riviera semblait impossible jusqu'à ce que nous rencontrions cette équipe. Leur dévouement et connaissance du marché sont inégalés.",
    rating: 5
  },
  {
    name: 'Thomas Anderson',
    role: 'Investisseur Immobilier',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Le professionnalisme à son apogée. Ils ont géré mon acquisition de portefeuille avec une précision et une discrétion absolues. Hautement recommandé pour les investisseurs sérieux.",
    rating: 5
  },
  {
    name: 'Sarah Jenning',
    role: 'Vendeuse',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Ils ont vendu ma propriété en un temps record et au-dessus du prix demandé. La stratégie marketing était tout simplement brillante.",
    rating: 5
  },
  {
    name: 'Robert Fox',
    role: 'Acheteur International',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Déménager de l'étranger était complexe, mais Luxe Estates a tout géré. Une transition sans faille vers notre nouvelle vie.",
    rating: 5
  },
  {
    name: 'Emily Chen',
    role: 'Architecte',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "En tant qu'architecte, j'apprécie leur œil pour la qualité. Ils ne représentent que des propriétés du plus haut calibre.",
    rating: 5
  },
  {
    name: 'David & Sofia Miller',
    role: 'Maison de Vacances',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    quote: "Notre maison d'été en Provence est un rêve. Nous ne pourrions être plus heureux du service et du soutien continu.",
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
          <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Témoignages</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-brand-primary-navy dark:text-white">Ce que disent nos clients</h2>
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
