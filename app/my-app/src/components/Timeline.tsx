import { useState } from 'react';
import { useProjectData } from '../lib/useProjectData';
import { Calendar, ChevronRight, Loader2 } from 'lucide-react';

interface TimelineProps {
  projectId: string;
}

export const Timeline = ({ projectId }: TimelineProps) => {
  const { events, characters, loading } = useProjectData(projectId);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const sortedEvents = [...events].sort((a, b) => (a.chapter || 0) - (b.chapter || 0));

  const getEventCharacters = (characterIds: string[]) => {
    return characterIds.map(id => characters.find(c => c.id === id)).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-fabula-accent" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-fabula-text-secondary text-sm">Aucun événement dans ce projet.</p>
          <p className="text-xs text-fabula-text-secondary mt-1">Ajoutez des événements depuis l'Encyclopédie ou le Quick Add.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-8 py-5 border-b border-fabula-border dark:border-fabula-border-dark">
        <h1 className="text-lg font-semibold tracking-tight">Chronologie</h1>
        <p className="text-xs text-fabula-text-secondary mt-0.5">{events.length} événements</p>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-12 px-8">
          {/* Ligne verticale */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-fabula-border via-fabula-accent/30 to-fabula-border dark:from-fabula-border-dark dark:via-fabula-accent/20 dark:to-fabula-border-dark" />

            <div className="space-y-12">
              {sortedEvents.map((event) => {
                const eventChars = getEventCharacters(event.character_ids);
                const isSelected = selectedEvent === event.id;

                return (
                  <div key={event.id} className="relative pl-20">
                    {/* Point sur la timeline */}
                    <div 
                      className={`absolute left-[29px] w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-pointer
                        ${isSelected 
                          ? 'bg-fabula-accent border-fabula-accent scale-125' 
                          : 'bg-white dark:bg-fabula-surface-dark border-fabula-border dark:border-fabula-border-dark hover:border-fabula-accent'
                        }
                      `}
                      onClick={() => setSelectedEvent(isSelected ? null : event.id)}
                    />

                    {/* Carte d'événement */}
                    <div 
                      className={`
                        group bg-white dark:bg-fabula-surface-dark rounded-2xl border transition-all duration-300 cursor-pointer
                        ${isSelected 
                          ? 'border-fabula-accent/30 shadow-float dark:shadow-float-dark' 
                          : 'border-fabula-border dark:border-fabula-border-dark hover:shadow-subtle'
                        }
                      `}
                      onClick={() => setSelectedEvent(isSelected ? null : event.id)}
                    >
                      <div className="p-5">
                        {/* Header de l'événement */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                              ${isSelected ? 'bg-fabula-accent text-white' : 'bg-gray-100 dark:bg-fabula-bg-dark text-fabula-text-secondary'}
                            `}>
                              {event.chapter || '?'}
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm group-hover:text-fabula-accent transition-colors">{event.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="w-3 h-3 text-fabula-text-secondary" strokeWidth={1.5} />
                                <span className="text-xs text-fabula-text-secondary">{event.date_label || 'Date inconnue'}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className={`
                            w-4 h-4 text-fabula-text-secondary transition-transform duration-300
                            ${isSelected ? 'rotate-90' : ''}
                          `} strokeWidth={1.5} />
                        </div>

                        {/* Description (visible si sélectionné) */}
                        <div className={`
                          overflow-hidden transition-all duration-500 ease-smooth
                          ${isSelected ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                        `}>
                          <p className="text-sm text-fabula-text-secondary leading-relaxed">
                            {event.description || 'Aucune description.'}
                          </p>

                          {/* Personnages impliqués */}
                          {eventChars.length > 0 && (
                            <div className="mt-4">
                              <label className="text-xs font-medium text-fabula-text-secondary uppercase tracking-wider">Personnages impliqués</label>
                              <div className="flex items-center gap-2 mt-2">
                                {eventChars.map((char) => (
                                  <div
                                    key={char!.id}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-fabula-bg-dark border border-fabula-border dark:border-fabula-border-dark"
                                  >
                                    <div 
                                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-medium"
                                      style={{ backgroundColor: char!.color }}
                                    >
                                      {char!.name.charAt(0)}
                                    </div>
                                    <span className="text-xs font-medium">{char!.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
