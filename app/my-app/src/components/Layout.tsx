import { useState, useEffect } from 'react';
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
  ChevronDown,
} from 'lucide-react';
import { useFabula } from '../lib/FabulaContext';
import { Editor } from './Editor';
import { MindMap } from './MindMap';
import { Encyclopedia } from './Encyclopedia';
import { Timeline } from './Timeline';
import { QuickAdd } from './QuickAdd';
import { AuthPanel } from './AuthPanel';

export type ViewType = 'manuscript' | 'encyclopedia' | 'mindmap' | 'timeline';

interface LayoutProps {
  initialView?: ViewType;
}

export const Layout = ({ initialView = 'manuscript' }: LayoutProps) => {
  const { isAuthenticated, loading, project, projects, setProject } = useFabula();
  const [currentView, setCurrentView] = useState<ViewType>(initialView);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showProjectSelector, setShowProjectSelector] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Redirect to login if not authenticated
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-fabula-bg dark:bg-fabula-bg-dark">
        <div className="flex items-center gap-3 text-fabula-text-secondary">
          <div className="w-5 h-5 border-2 border-fabula-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={`h-full w-full transition-colors duration-300 ${darkMode ? 'bg-fabula-bg-dark text-fabula-text-dark' : 'bg-fabula-bg text-fabula-text'}`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-fabula-surface-dark transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
        <AuthPanel />
      </div>
    );
  }

  const navItems = [
    { id: 'manuscript' as ViewType, label: 'Mon Manuscrit', icon: BookOpen },
    { id: 'encyclopedia' as ViewType, label: 'Encyclopédie', icon: Library },
    { id: 'mindmap' as ViewType, label: 'Carte Mentale', icon: GitBranch },
    { id: 'timeline' as ViewType, label: 'Chronologie', icon: Clock },
  ];

  const renderView = () => {
    if (!project) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Feather className="w-12 h-12 text-fabula-text-secondary mx-auto mb-4" strokeWidth={1} />
            <h3 className="text-lg font-semibold mb-2">Aucun projet sélectionné</h3>
            <p className="text-sm text-fabula-text-secondary mb-4">Créez un nouveau projet pour commencer.</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'manuscript':
        return <Editor focusMode={focusMode} projectId={project.id} />;
      case 'mindmap':
        return <MindMap projectId={project.id} />;
      case 'encyclopedia':
        return <Encyclopedia projectId={project.id} />;
      case 'timeline':
        return <Timeline projectId={project.id} />;
      default:
        return <Editor focusMode={focusMode} projectId={project.id} />;
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

        {/* Project Selector */}
        {project && !sidebarCollapsed && (
          <div className="px-3 py-2 border-b border-fabula-border dark:border-fabula-border-dark">
            <button
              onClick={() => setShowProjectSelector(!showProjectSelector)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-fabula-surface-dark border border-fabula-border dark:border-fabula-border-dark hover:shadow-subtle transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-fabula-accent flex-shrink-0" />
              <span className="text-sm font-medium truncate flex-1 text-left">{project.title}</span>
              <ChevronDown className={`w-3 h-3 text-fabula-text-secondary transition-transform ${showProjectSelector ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>
            
            {showProjectSelector && (
              <div className="mt-1 bg-white dark:bg-fabula-surface-dark rounded-lg border border-fabula-border dark:border-fabula-border-dark shadow-float dark:shadow-float-dark overflow-hidden">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setProject(p); setShowProjectSelector(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${p.id === project.id ? 'bg-fabula-accent-subtle text-fabula-accent' : 'hover:bg-gray-50 dark:hover:bg-fabula-surface'}`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.id === project.id ? 'bg-fabula-accent' : 'bg-fabula-text-secondary'}`} />
                    <span className="truncate">{p.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                disabled={!project}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? `${darkMode ? 'bg-fabula-surface-dark text-fabula-text-dark' : 'bg-white text-fabula-text'} shadow-subtle` 
                    : `${darkMode ? 'text-fabula-text-dark-secondary hover:bg-fabula-surface-dark' : 'text-fabula-text-secondary hover:bg-white/60'} hover:text-fabula-text`
                  }
                  ${sidebarCollapsed ? 'justify-center' : ''}
                  ${!project ? 'opacity-40 cursor-not-allowed' : ''}
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.5} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions + Auth */}
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

        {/* Auth Panel */}
        {!sidebarCollapsed && <AuthPanel />}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {renderView()}
        {!focusMode && project && <QuickAdd />}
      </main>
    </div>
  );
};
