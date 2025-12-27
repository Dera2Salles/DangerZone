import { Button } from '@/components/ui/button';
import { Compass, Map, Sun, Users } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section className="py-24 bg-brand-primary-navy/5 dark:bg-black/20">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Destinations & Découvertes</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6 text-brand-primary-navy dark:text-white">
            L'Évasion selon <span className="text-brand-gold">Ariel Hébergement</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Chez Ariel hébergement, tout a été conçu pour vous donner le choix parmi de nombreuses destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-lg border-l-4 border-brand-primary">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary-navy dark:text-white flex items-center gap-3">
                <Map className="h-6 w-6 text-brand-gold" />
                Des Destinations de Rêve
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Des plages paradisiaques, des montagnes majestueuses dans les hauts plateaux, des paysages de multiples couleurs, des immersions culturelles. Choisissez vos destinations idéales et réservez dès maintenant avant qu’il ne soit trop tard.
              </p>
            </div>

            <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-lg border-l-4 border-brand-gold">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary-navy dark:text-white flex items-center gap-3">
                <Users className="h-6 w-6 text-brand-gold" />
                Notre Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Vous offrir des séjours confortables et sans stress en famille ou entre amis.
              </p>
            </div>

            <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-lg border-l-4 border-brand-mint">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary-navy dark:text-white flex items-center gap-3">
                <Compass className="h-6 w-6 text-brand-gold" />
                Immersion Culturelle
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Grâce à nos partenaires créateurs d’évasion, vous allez pouvoir vous offrir les plus belles expériences d’immersion culturelle en valorisant les richesses naturelles et culturelles de notre grande île.
              </p>
            </div>

            <div className="pt-4">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-dark text-white rounded-full px-8 shadow-lg shadow-brand-primary/20">
                Explorer Nos Offres
              </Button>
            </div>
          </div>

          {/* Visuals */}
          <div className="grid grid-cols-2 gap-4 relative">
             <div className="space-y-4 pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1544979590-37e9b47cd705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Madagascar Beach" 
                  className="rounded-2xl shadow-lg object-cover h-64 w-full transform hover:scale-105 transition-transform duration-500"
                />
                <img 
                  src="https://images.unsplash.com/photo-1519092576140-523c93ee5c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Cultural Immersion" 
                  className="rounded-2xl shadow-lg object-cover h-48 w-full transform hover:scale-105 transition-transform duration-500"
                />
             </div>
             <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1520697207604-585aab632e8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Highlands" 
                  className="rounded-2xl shadow-lg object-cover h-48 w-full transform hover:scale-105 transition-transform duration-500"
                />
                <img 
                  src="https://images.unsplash.com/photo-1618221840003-88849b2caddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Relaxation" 
                  className="rounded-2xl shadow-lg object-cover h-64 w-full transform hover:scale-105 transition-transform duration-500"
                />
             </div>
             {/* Central Badge */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-card p-4 rounded-full shadow-2xl animate-pulse">
                <Sun className="h-10 w-10 text-brand-gold" />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
