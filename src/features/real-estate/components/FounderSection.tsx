import { Quote } from 'lucide-react';

export function FounderSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-card relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-brand-primary-navy/5 hidden lg:block opacity-30" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Lorraine Andrainiony" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-gold rounded-2xl -z-10 hidden md:block" />
            
            {/* Quote Badge */}
            <div className="absolute bottom-10 -left-6 bg-brand-white glassmorphism p-6 rounded-xl shadow-xl max-w-xs hidden md:block backdrop-blur-md bg-white/90 dark:bg-black/80 border-l-4 border-brand-primary">
              <Quote className="h-8 w-8 text-brand-gold mb-2" />
              <p className="text-sm font-medium italic text-gray-700 dark:text-gray-300">
                "Faire découvrir Madagascar autrement, à travers des hébergements d'exception."
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm mb-2 block">La Fondatrice</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-brand-primary-navy dark:text-white">
              Lorraine Andrainiony
            </h2>
            <h3 className="text-xl text-brand-gold font-medium mb-8">Property Manager</h3>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Diplômée en tourisme et passionnée par l’hospitalité, Lorraine évolue dans le secteur de l’hôtellerie depuis plus de 12 ans. Animée par l’envie de faire découvrir Madagascar autrement, elle s’est donnée pour mission d’offrir à des voyageurs d’exception un accès à des hébergements de haut standing.
              </p>
              <p>
                L’aventure a commencé en 2018, dans la ville de Vatomandry, avec la sous-location d’un premier appartement. Puis, la crise sanitaire de 2020 l’oblige à mettre temporairement son activité en pause.
              </p>
              <p>
                Mais loin de s’arrêter là, elle rebondit après la pandémie, en relançant son activité avec enthousiasme, tout en élargissant son portefeuille : plusieurs propriétaires lui confient désormais la gestion de leurs biens.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center gap-8">
              <div className="text-center">
                <span className="block text-3xl font-bold text-brand-primary-navy dark:text-white">12+</span>
                <span className="text-xs uppercase text-gray-500 tracking-wider">Années d'Expérience</span>
              </div>
              <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <span className="block text-3xl font-bold text-brand-primary-navy dark:text-white">2018</span>
                <span className="text-xs uppercase text-gray-500 tracking-wider">Début de l'Aventure</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
