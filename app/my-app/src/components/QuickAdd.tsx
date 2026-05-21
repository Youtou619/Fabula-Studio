import React, { useState } from 'react';
import { Plus, FileText, Users, MapPin, Calendar, X } from 'lucide-react';

export const QuickAdd: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { icon: FileText, label: 'Chapitre', color: 'text-blue-500' },
    { icon: Users, label: 'Personnage', color: 'text-emerald-500' },
    { icon: MapPin, label: 'Lieu', color: 'text-amber-500' },
    { icon: Calendar, label: 'Événement', color: 'text-purple-500' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {/* Menu d'options */}
      <div className={`
        flex flex-col gap-2 transition-all duration-300 origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4 pointer-events-none'}
      `}>
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.label}
              className="flex items-center gap-3 pl-3 pr-4 py-2.5 bg-white dark:bg-fabula-surface-dark rounded-xl shadow-float dark:shadow-float-dark border border-fabula-border dark:border-fabula-border-dark hover:shadow-lg transition-all group"
            >
              <Icon className={`w-4 h-4 ${option.color}`} strokeWidth={1.5} />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center shadow-float dark:shadow-float-dark transition-all duration-300
          ${isOpen 
            ? 'bg-white dark:bg-fabula-surface-dark text-fabula-text dark:text-fabula-text-dark rotate-45' 
            : 'bg-fabula-accent text-white hover:bg-blue-700 hover:scale-105'
          }
        `}
      >
        {isOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Plus className="w-6 h-6" strokeWidth={1.5} />}
      </button>
    </div>
  );
};
