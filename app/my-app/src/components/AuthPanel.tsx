import { useState } from "react";
import { useFabula } from '../lib/FabulaContext';
import { authService, projectsService } from '../lib/services';
import { Feather, Mail, LogIn, LogOut, Plus } from 'lucide-react';

export function AuthPanel() {
  const { user, isAuthenticated, signOut, refreshProjects, setProject } = useFabula();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signInWithMagicLink(email);
      setSent(true);
    } catch (error) {
      console.error('Magic link error:', error);
      alert('Erreur lors de l\'envoi du lien. Vérifiez votre email.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      const newProject = await projectsService.create({
        title: 'Mon premier univers',
        description: 'Commencez à construire votre monde...',
        type: 'novel',
        status: 'draft',
        settings: {},
      });
      await refreshProjects();
      setProject(newProject);
    } catch (error) {
      console.error('Create project error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-full max-w-sm bg-white dark:bg-fabula-surface-dark rounded-2xl border border-fabula-border dark:border-fabula-border-dark p-8 shadow-float dark:shadow-float-dark">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-fabula-accent flex items-center justify-center">
              <Feather className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">Bienvenue sur Fabula</h2>
          <p className="text-sm text-fabula-text-secondary text-center mb-6">
            Connectez-vous pour commencer à créer vos univers.
          </p>

          {sent ? (
            <div className="text-center p-4 rounded-xl bg-fabula-accent-subtle border border-fabula-accent/10">
              <p className="text-sm text-fabula-accent font-medium">✉️ Lien envoyé !</p>
              <p className="text-xs text-fabula-text-secondary mt-1">
                Vérifiez votre boîte mail et cliquez sur le lien pour vous connecter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fabula-text-secondary" strokeWidth={1.5} />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-fabula-border dark:border-fabula-border-dark bg-white dark:bg-fabula-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-fabula-accent/20 focus:border-fabula-accent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-fabula-accent text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" strokeWidth={1.5} />
                {loading ? 'Envoi...' : 'Se connecter avec email'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-fabula-border dark:border-fabula-border-dark">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-fabula-accent/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-fabula-accent">
            {user?.email?.charAt(0).toUpperCase() || '?'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{user?.email}</p>
        </div>
      </div>
      
      <div className="mt-3 space-y-1">
        <button
          onClick={handleCreateProject}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-fabula-accent bg-fabula-accent-subtle hover:bg-fabula-accent/15 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          Nouveau projet
        </button>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-fabula-text-secondary hover:bg-white/60 dark:hover:bg-fabula-surface-dark transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
          Déconnexion
        </button>
      </div>
    </div>
  );
}
