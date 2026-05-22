import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authService, projectsService } from './services';
import type { Project } from './database.types';
import type { User } from '@supabase/supabase-js';

interface FabulaContextType {
  user: User | null;
  loading: boolean;
  project: Project | null;
  projects: Project[];
  setProject: (project: Project | null) => void;
  refreshProjects: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const FabulaContext = createContext<FabulaContextType | undefined>(undefined);

export function FabulaProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // Load user and projects on mount
  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          const allProjects = await projectsService.getAll();
          setProjects(allProjects);
          
          // Select first project or last active
          if (allProjects.length > 0) {
            setProject(allProjects[0]);
          }
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };

    init();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
      
      if (session?.user) {
        const allProjects = await projectsService.getAll();
        setProjects(allProjects);
        if (allProjects.length > 0 && !project) {
          setProject(allProjects[0]);
        }
      } else {
        setProjects([]);
        setProject(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProjects = useCallback(async () => {
    if (!user) return;
    const allProjects = await projectsService.getAll();
    setProjects(allProjects);
  }, [user]);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
    setProjects([]);
    setProject(null);
  }, []);

  return (
    <FabulaContext.Provider
      value={{
        user,
        loading,
        project,
        projects,
        setProject,
        refreshProjects,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </FabulaContext.Provider>
  );
}

export function useFabula() {
  const context = useContext(FabulaContext);
  if (context === undefined) {
    throw new Error('useFabula must be used within a FabulaProvider');
  }
  return context;
}
