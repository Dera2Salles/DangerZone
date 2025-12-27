import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Building2, Home, Key, TrendingUp } from 'lucide-react';

const PROPERTIES = [
  {
    id: 1,
    title: 'Modern Seaside Villa',
    location: 'Cannes, French Riviera',
    price: '€4,250,000',
    description: 'Stunning contemporary villa with panoramic sea views, infinity pool, and private beach access.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80',
    type: 'Sale',
    features: ['5 Beds', '6 Baths', '450m²']
  },
  {
    id: 2,
    title: 'Historic Penthouse',
    location: 'Paris, 7th Arrondissement',
    price: '€2,800,000',
    description: 'Elegant duplex penthouse with Eiffel Tower views, original moldings, and wrap-around terrace.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1680&q=80',
    type: 'Sale',
    features: ['3 Beds', '2 Baths', '180m²']
  },
  {
    id: 3,
    title: 'Luxury Eco-Lodge',
    location: 'Chamonix, Alps',
    price: '€3,100,000',
    description: 'Sustainable luxury chalet featuring floor-to-ceiling windows, spa facilities, and ski-in/ski-out access.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1365&q=80',
    type: 'Sale',
    features: ['6 Beds', '5 Baths', '320m²']
  }
];

const SERVICES = [
  {
    icon: Home,
    title: 'Property Sales',
    description: 'Expert guidance through the buying and selling process of luxury real estate assets.'
  },
  {
    icon: Building2,
    title: 'Property Management',
    description: 'Comprehensive management services for your high-value investment properties.'
  },
  {
    icon: TrendingUp,
    title: 'Investment Advice',
    description: 'Strategic analysis and market insights to maximize your real estate portfolio.'
  },
  {
    icon: Key,
    title: 'Concierge Services',
    description: 'Exclusive relocation assistance and lifestyle management for new property owners.'
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-card/50">
      <div className="container mx-auto px-4">
        
        {/* Featured Properties */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Exclusive Listings</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-brand-primary-navy dark:text-white">Featured Properties</h2>
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
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
             <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white gap-2 group">
                View All Properties 
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"/>
             </Button>
          </div>
        </div>

        {/* Services */}
        <div>
           <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-brand-primary-navy dark:text-white">Premium Services</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Beyond buying and selling, we offer a full suite of services tailored to the needs of the modern investor and homeowner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <Card key={index} className="border border-brand-mint/30 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-brand-mint/20 rounded-full flex items-center justify-center mb-4 text-brand-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg text-brand-primary-navy dark:text-gray-100">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
