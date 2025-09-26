import { AlertTriangle, Shield, Skull } from 'lucide-react';

export default function Description() {
  const categories = [
    {
      title: "Faritra Mena",
      icon: Skull,
      iconColor: "text-red-600",
      description: "Korotana, Lalana tapaka, Feno Mpandroba, Vono olona..."
    },
    {
      title: "Faritra Mavo",
      icon: AlertTriangle,
      iconColor: "text-yellow-500",
      description: "Korotana, lalana tapaka..."
    },
    {
      title: "Faritra Maintso",
      icon: Shield,
      iconColor: "text-green-500", 
      description: "Lavitra ny fitokonana sy ny fandrobana, tsy misy ataorana"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
       Tahan'ny fahalemana
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className={`${category.iconColor} mb-3 flex justify-center`}>
                <IconComponent size={40} />
              </div>
              <h2 className="text-lg font-semibold mb-3 text-black">
                {category.title}
              </h2>
              <p className="text-gray-600 text-xs leading-relaxed">
                {category.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}