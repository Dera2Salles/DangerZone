import { Button } from '@/components/ui/button';
import { Award, HeartHandshake, Leaf, ShieldCheck } from 'lucide-react';

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
              <span className="text-xs uppercase tracking-widest text-brand-gold">Ans</span>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">À Propos</span>
            <h2 className="text-3xl lg:text-5xl font-bold mt-2 mb-6 text-brand-primary-navy dark:text-white leading-tight">
              Une Vision de <br/> 
              <span className="text-brand-primary">Luxe & Harmonie</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed italic border-l-4 border-brand-gold pl-4">
              "Devenir la référence incontestée de la gestion locative haut standing à Madagascar. Nous aspirons à bâtir un réseau d'hébergements d'exception, combinant innovation, qualité de services et ancrage locale."
            </p>

            <div className="grid grid-cols-1 gap-6 mb-10">
              {[
                { 
                  icon: Award, 
                  title: "Excellence", 
                  text: "Nous visons l’excellence dans chaque détail, de la qualité du service à l’élégance des lieux, afin de garantir une expérience à la fois haut de gamme et authentique." 
                },
                { 
                  icon: ShieldCheck, 
                  title: "Confiance", 
                  text: "Nous construisons des relations solides et durables fondées sur la transparence, l’intégrité et le respect mutuel." 
                },
                { 
                  icon: Leaf, 
                  title: "Nature et Harmonie", 
                  text: "Nous embrassons la nature comme une alliée essentielle : respect de l’environnement, valorisation des paysages et intégration douce dans les écosystèmes locaux." 
                },
                { 
                  icon: HeartHandshake, 
                  title: "Responsabilité", 
                  text: "Nous promouvons un tourisme durable et responsable, respectueux de l’humain, des traditions et de l’environnement." 
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-cream/50 flex items-center justify-center text-brand-primary-dark">
                    <item.icon className="h-6 w-6"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-brand-primary-navy dark:text-gray-100">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-brand-primary text-white hover:bg-brand-primary-dark rounded-full px-8">
              Découvrez Notre Travail
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
