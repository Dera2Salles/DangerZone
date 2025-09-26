
import { AlertTriangle, Shield, Skull } from 'lucide-react';

export const Quartier = () => { 
  const quartiers = [
    'Analakely',
    'Anosy',
    'Tsaralalana',
    'Antaninarenina',
    'Isoraka',
    'Ambatonakanga',
    'Faravohitra',
    '67 Ha (Cité des 67 hectares)',
    'Ambodin\'Isotry',
    'Ambohijatovo',
    'Andohalo',
    'Behoririka',
    'Antanimena',
    'Ambatoroka',
    'Ivandry',
    'Ambatobe',
    'Ankadifotsy',
    'Iavoloha',
    'Tanjombato',
    'Bevalala',
    'Soavina',
    'Fiadanana'
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white text-gray-800 flex flex-col gap-6 rounded-3xl border-4 py-8 px-6 shadow-xl">
      {quartiers.map((quartier, index) => (
        <div key={index} className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg border">
          <p className="text-lg font-medium">{quartier}</p>
          <div className="flex gap-4">
            <Skull className="text-red-600 w-6 h-6" />
            <AlertTriangle className="text-yellow-500 w-6 h-6" />
            <Shield className="text-green-500 w-6 h-6" />
          </div>
        </div>
      ))}
    </div>
  );
}