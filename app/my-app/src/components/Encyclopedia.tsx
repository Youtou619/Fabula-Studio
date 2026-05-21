import React, { useState } from 'react';
import { mockCharacters, mockLocations } from '../data/mockData';
import type { Character } from '../data/mockData';
import { Search, Plus, Tag, MapPin, Users, LayoutGrid, List } from 'lucide-react';

export const Encyclopedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'characters' | 'locations'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  interface EncyclopediaItem {
    id: string;
    name: string;
    type: 'character' | 'location';
    color: string;
    description?: string;
    role?: string;
    tags?: string[];
  }

  const allItems: EncyclopediaItem[] = [
    ...mockCharacters.map(c => ({ ...c, type: 'character' as const })),
    ...mockLocations.map(l => ({ ...l, type: 'location' as const, role: l.type, color: '#6b7280' })),
  ];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'characters' && item.type === 'character') ||
      (activeTab === 'locations' && item.type === 'location');
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: 'all' as const, label: 'Tout', icon: LayoutGrid },
    { id: 'characters' as const, label: 'Personnages', icon: Users },
    { id: 'locations' as const, label: 'Lieux', icon: MapPin },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-8 py-5 border-b border-fabula-border dark:border-fabula-border-dark">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Encyclopédie</h1>
            <p className="text-xs text-fabula-text-secondary mt-0.5">{allItems.length} fiches · {mockCharacters.length} personnages · {mockLocations.length} lieux</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-fabula-accent text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-subtle">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Nouvelle fiche
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fabula-text-secondary" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Rechercher une fiche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-fabula-border dark:border-fabula-border-dark bg-white dark:bg-fabula-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-fabula-accent/20 focus:border-fabula-accent transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-fabula-surface-dark">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                    ${activeTab === tab.id 
                      ? 'bg-white dark:bg-fabula-surface text-fabula-text dark:text-fabula-text-dark shadow-subtle' 
                      : 'text-fabula-text-secondary hover:text-fabula-text'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-fabula-surface-dark">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-fabula-surface shadow-subtle text-fabula-text dark:text-fabula-text-dark' : 'text-fabula-text-secondary'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-fabula-surface shadow-subtle text-fabula-text dark:text-fabula-text-dark' : 'text-fabula-text-secondary'}`}
            >
              <List className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => item.type === 'character' && setSelectedCharacter(item as Character)}
                className="group bg-white dark:bg-fabula-surface-dark rounded-2xl border border-fabula-border dark:border-fabula-border-dark p-5 hover:shadow-float dark:hover:shadow-float-dark hover:border-fabula-accent/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                    >
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm group-hover:text-fabula-accent transition-colors">{item.name}</h3>
                      <p className="text-[10px] text-fabula-text-secondary uppercase tracking-wider font-medium mt-0.5">
                        {item.role || item.type}
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-fabula-text-secondary mt-3 leading-relaxed line-clamp-2">
                  {item.description || ''}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-fabula-accent-subtle text-fabula-accent text-[10px] font-medium">
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white dark:bg-fabula-surface-dark rounded-xl border border-fabula-border dark:border-fabula-border-dark hover:shadow-subtle transition-all cursor-pointer"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                  style={{ backgroundColor: 'color' in item ? item.color : '#6b7280' }}
                >
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-xs text-fabula-text-secondary">{item.role || item.type}</p>
                </div>
                <p className="text-xs text-fabula-text-secondary flex-1 truncate hidden md:block">
                  {item.description || ''}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setSelectedCharacter(null)}>
          <div className="w-full max-w-lg bg-white dark:bg-fabula-surface-dark rounded-2xl shadow-float dark:shadow-float-dark border border-fabula-border dark:border-fabula-border-dark p-8 m-4 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-medium"
                  style={{ backgroundColor: selectedCharacter.color }}
                >
                  {selectedCharacter.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedCharacter.name}</h2>
                  <p className="text-sm text-fabula-accent font-medium">{selectedCharacter.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCharacter(null)} className="text-fabula-text-secondary hover:text-fabula-text">✕</button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-fabula-text-secondary uppercase tracking-wider">Description</label>
                <p className="text-sm mt-1.5 leading-relaxed">{selectedCharacter.description}</p>
              </div>

              {selectedCharacter.motivation && (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-fabula-bg-dark border border-fabula-border dark:border-fabula-border-dark">
                  <label className="text-xs font-medium text-fabula-text-secondary uppercase tracking-wider">Motivation</label>
                  <p className="text-sm mt-1">{selectedCharacter.motivation}</p>
                </div>
              )}

              {selectedCharacter.secret && (
                <div className="p-4 rounded-xl bg-fabula-accent-subtle border border-fabula-accent/10">
                  <label className="text-xs font-medium text-fabula-accent uppercase tracking-wider">Secret</label>
                  <p className="text-sm mt-1 text-fabula-accent">{selectedCharacter.secret}</p>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-fabula-text-secondary uppercase tracking-wider">Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCharacter.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fabula-accent-subtle text-fabula-accent text-xs font-medium">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
