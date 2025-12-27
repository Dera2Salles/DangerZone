import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Linkedin, Mail, Twitter } from 'lucide-react';

const TEAM = [
  {
    name: 'Sarah Montgomery',
    role: 'Fondatrice & Directrice',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Avec plus de 15 ans dans l\'immobilier de luxe, Sarah a négocié certaines des transactions les plus importantes de la ville.'
  },
  {
    name: 'James Sterling',
    role: 'Consultant Senior',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'James se spécialise dans les propriétés historiques et les portefeuilles d\'investissement à haute valeur.'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Directrice Design',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Elena donne vie aux intérieurs avec son esthétique primée et son souci du détail.'
  },
  {
    name: 'Michael Chen',
    role: 'Immobilier Commercial',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Expert en acquisitions commerciales et opportunités de développement dans les marchés émergents.'
  }
];

export function TeamSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Nos Experts</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-brand-primary-navy dark:text-white">Rencontrez l'Équipe</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"/>
          <p className="max-w-2xl mx-auto mt-6 text-gray-600 dark:text-gray-300">
            Un groupe diversifié de leaders de l'industrie dédiés à fournir des résultats exceptionnels pour nos clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, index) => (
            <Card key={index} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-card">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 py-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <a href="#" className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
              <CardHeader className="text-center pb-2">
                <h3 className="text-xl font-bold text-brand-primary-navy dark:text-white">{member.name}</h3>
                <span className="text-sm font-medium text-brand-primary uppercase tracking-wider">{member.role}</span>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
