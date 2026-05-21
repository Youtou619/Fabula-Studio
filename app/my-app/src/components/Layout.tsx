import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Library,
  GitBranch,
  Clock,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  Feather,
  ChevronLeft,
} from 'lucide-react';
import { Editor } from './Editor';
import { MindMap } from './MindMap';
import { Encyclopedia } from './Encyclopedia';
import { Timeline } from './Timeline';
import { QuickAdd } from './QuickAdd';

export type ViewType = 'manuscript' | 'encyclopedia' | 'mindmap' | 'timeline';

interface LayoutProps {
  initialView?: ViewType;
}

export const Layout: React.FC<LayoutProps> = ({ initialView = 'manuscript' }) => {
  const [currentView, setCurrentView] = useState<ViewType>(initialView);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { id: 'manuscript' as ViewType, label: 'Mon Manuscrit', icon: BookOpen },
    { id: 'encyclopedia' as ViewType, label: 'Encyclopédie', icon: Library },
    { id: 'mindmap' as ViewType, label: 'Carte Mentale', icon: GitBranch },
    { id: 'timeline' as ViewType, label: 'Chronologie', icon: Clock },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'manuscript':
        return <Editor focusMode={focusMode} />;
      case 'mindmap':
        return <MindMap />;
      case 'encyclopedia':
        return <Encyclopedia />;
      case 'timeline':
        return <Timeline />;
      default:
        return <Editor focusMode={focusMode} />;
    }
  };

  return (
    <div className={`flex h-full w-full transition-colors duration-300 ${darkMode ? 'bg-fabula-bg-dark text-fabula-text-dark' : 'bg-fabula-bg text-fabula-text'}`}>
      {/* Sidebar */}
      <aside
        className={`
          flex-shrink-0 flex flex-col transition-all duration-500 ease-smooth border-r
          ${darkMode ? 'border-fabula-border-dark' : 'border-fabula-border'}
          ${sidebarCollapsed ? 'w-16 opacity-60 hover:opacity-100' : 'w-60'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-14 px-4 ${sidebarCollapsed ? 'justify-center' : 'justify-between'} border-b ${darkMode ? 'border-fabula-border-dark' : 'border-fabula-border'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Feather className="w-5 h-5 text-fabula-accent" strokeWidth={1.5} />
              <span className="font-semibold text-sm tracking-tight">Fabula</span>
            </div>
          )}
          {sidebarCollapsed && <Feather className="w-5 h-5 text-fabula-accent" strokeWidth={1.5} />}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1 rounded-md hover:bg-fabula-accent-subtle transition-colors ${sidebarCollapsed ? 'hidden' : 'block'}`}
          >
            <ChevronLeft className="w-4 h-4 text-fabula-text-secondary" strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? `${darkMode ? 'bg-fabula-surface-dark text-fabula-text-dark' : 'bg-white text-fabula-text'} shadow-subtle` 
                    : `${darkMode ? 'text-fabula-text-dark-secondary hover:bg-fabula-surface-dark' : 'text-fabula-text-secondary hover:bg-white/60'} hover:text-fabula-text`
                  }
                  ${sidebarCollapsed ? 'justify-center' : ''}
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.5} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`p-2 border-t ${darkMode ? 'border-fabula-border-dark' : 'border-fabula-border'} space-y-1`}>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
              ${focusMode ? 'text-fabula-accent' : darkMode ? 'text-fabula-text-dark-secondary hover:text-fabula-text-dark' : 'text-fabula-text-secondary hover:text-fabula-text'}
              ${darkMode ? 'hover:bg-fabula-surface-dark' : 'hover:bg-white/60'}
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? (focusMode ? 'Quitter le mode focus' : 'Mode focus') : undefined}
          >
            {focusMode ? <Minimize2 className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <Maximize2 className="w-[18px] h-[18px]" strokeWidth={1.5} />}
            {!sidebarCollapsed && <span>{focusMode ? 'Quitter le focus' : 'Mode focus'}</span>}
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
              ${darkMode ? 'text-fabula-text-dark-secondary hover:text-fabula-text-dark hover:bg-fabula-surface-dark' : 'text-fabula-text-secondary hover:text-fabula-text hover:bg-white/60'}
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? (darkMode ? 'Mode clair' : 'Mode sombre') : undefined}
          >
            {darkMode ? <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />}
            {!sidebarCollapsed && <span>{darkMode ? 'Mode clair' : 'Mode sombre'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {renderView()}
        {!focusMode && <QuickAdd />}
      </main>
    </div>
  );
};
