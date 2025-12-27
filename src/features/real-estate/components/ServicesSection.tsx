import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Check, PlusCircle, Sparkles } from 'lucide-react';

const PROPERTIES = [
  {
    id: 1,
    title: 'Villa Moderne Bord de Mer',
    location: 'Cannes, Côte d\'Azur',
    price: '€4,250,000',
    description: 'Somptueuse villa contemporaine avec vue panoramique mer, piscine à débordement et accès privé plage.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80',
    type: 'Vente',
    features: ['5 Lits', '6 SDB', '450m²']
  },
  {
    id: 2,
    title: 'Penthouse Historique',
    location: 'Paris, 7ème Arrondissement',
    price: '€2,800,000',
    description: 'Duplex élégant avec vue sur la Tour Eiffel, moulures d\'origine et terrasse panoramique.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1680&q=80',
    type: 'Vente',
    features: ['3 Lits', '2 SDB', '180m²']
  },
  {
    id: 3,
    title: 'Chalet Éco-Luxe',
    location: 'Chamonix, Alpes',
    price: '€3,100,000',
    description: 'Chalet de luxe durable avec baies vitrées, spa et accès ski-aux-pieds.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1365&q=80',
    type: 'Vente',
    features: ['6 Lits', '5 SDB', '320m²']
  }
];

const PACKAGES = [
  {
    title: 'Pack Essentiel',
    price: '10%',
    subtitle: 'du CA',
    description: 'Gestion efficace, visibilité optimisée',
    features: [
      'Optimisation des annonces (Airbnb, Booking.com)',
      'Gestion complète des messages voyageurs',
      'Ajustement dynamique des prix',
      'Suivi des réclamations et assurances',
      'Check-in / Check-out à distance'
    ],
    highlight: false
  },
  {
    title: 'Pack Prestige',
    price: '20%',
    subtitle: 'du CA',
    description: 'Gestion haut de gamme, tranquillité totale',
    features: [
      'Toutes les options du Pack Essentiel',
      'Support client 7j/7 réservations et litiges',
      'Accueil physique des voyageurs',
      'Entretien ménager 5 étoiles et blanchisserie',
      'Rapport mensuel (revenus & occupation)',
      'Gestion complète assurance et caution'
    ],
    highlight: true
  },
  {
    title: 'Conciergerie',
    price: 'Sur Devis',
    subtitle: 'Pack Spécial',
    description: 'Solutions sur mesure pour votre propriété',
    features: [
      'Set-up complet de la propriété',
      'Mise à jour et audit des annonces',
      'Gestion stratégique de prix',
      'Service client personnalisé',
      'Coordination de maintenance'
    ],
    highlight: false
  }
];

const EXTRAS = [
  { name: 'Création d’annonce', price: '110€ / logement' },
  { name: 'Guide Voyageur', price: '67 €' },
  { name: 'Branding & Identité', price: 'Sur devis' },
  { name: 'Conception graphique', price: 'Sur devis' },
  { name: 'Conception Logo', price: 'Sur devis' },
  { name: 'Conception site web', price: 'Sur devis' },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-card/50">
      <div className="container mx-auto px-4">
        
        {/* Featured Properties */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Propriétés Exclusives</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-brand-primary-navy dark:text-white">Biens à la Une</h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.map((property) => (
              <Card key={property.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-card">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-brand-primary/90 text-white hover:bg-brand-primary">
                    {property.type}
                  </Badge>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-bold text-xl">{property.price}</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-brand-primary-navy dark:text-gray-100 group-hover:text-brand-primary transition-colors">
                    {property.title}
                  </CardTitle>
                  <CardDescription className="text-brand-secondary flex items-center">
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                    {property.description}
                  </p>
                  <div className="flex gap-2 text-xs text-gray-500 font-medium">
                    {property.features.map((feature, i) => (
                      <span key={i} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-brand-primary-navy hover:bg-brand-primary text-white group-hover:shadow-md transition-all">
                    Voir Détails
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
             <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white gap-2 group">
                Voir toutes les propriétés 
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"/>
             </Button>
          </div>
        </div>

        {/* Management Packages */}
        <div className="mb-24">
           <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Nos Offres de Gestion</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-brand-primary-navy dark:text-white">Taillées pour Votre Succès</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Choisissez le niveau de service qui correspond parfaitement à vos objectifs d'investissement et à votre style de vie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PACKAGES.map((pkg, index) => (
              <Card 
                key={index} 
                className={`flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  pkg.highlight 
                    ? 'border-2 border-brand-gold shadow-xl scale-105 z-10 bg-white dark:bg-card' 
                    : 'border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-card/50'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 inset-x-0 bg-brand-gold text-brand-primary-navy text-xs font-bold uppercase tracking-widest text-center py-2">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pt-10 pb-6">
                  <h3 className="text-xl font-bold text-brand-primary-navy dark:text-white mb-2">{pkg.title}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-brand-primary">{pkg.price}</span>
                    <span className="text-gray-500 font-medium">{pkg.subtitle}</span>
                  </div>
                  <CardDescription className="pt-4 px-4 text-brand-secondary">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <Check className={`h-5 w-5 flex-shrink-0 ${pkg.highlight ? 'text-brand-gold' : 'text-brand-primary'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-primary-navy/5 dark:bg-card rounded-3xl p-8 md:p-12 border border-brand-primary/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand-gold/20 p-3 rounded-xl">
                 <Sparkles className="h-6 w-6 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-primary-navy dark:text-white">Extras & Options</h3>
                <p className="text-gray-500">Des services premium pour maximiser le potentiel de votre bien.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXTRAS.map((extra, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-black/20 rounded-xl border border-transparent hover:border-brand-border transition-colors">
                  <div className="flex items-center gap-3">
                    <PlusCircle className="h-4 w-4 text-brand-secondary" />
                    <span className="font-medium text-brand-primary-navy dark:text-gray-200">{extra.name}</span>
                  </div>
                  <Badge variant="secondary" className="bg-brand-mint/30 text-brand-primary-dark hover:bg-brand-mint/50">
                    {extra.price}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
