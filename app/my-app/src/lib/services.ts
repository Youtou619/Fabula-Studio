import { supabase } from './supabase';
import type { Project, Character, Location, Event, Relation, Chapter } from './database.types';

// ==========================================
// PROJECTS
// ==========================================
export const projectsService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(project: Omit<Project, 'id' | 'created_at' | 'user_id'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ==========================================
// CHARACTERS
// ==========================================
export const charactersService = {
  async getAll(projectId: string): Promise<Character[]> {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('project_id', projectId)
      .order('order_index');
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Character | null> {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(character: Omit<Character, 'id' | 'created_at'>): Promise<Character> {
    const { data, error } = await supabase
      .from('characters')
      .insert(character)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Character>): Promise<Character> {
    const { data, error } = await supabase
      .from('characters')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('characters')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ==========================================
// LOCATIONS
// ==========================================
export const locationsService = {
  async getAll(projectId: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('project_id', projectId)
      .order('order_index');
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Location | null> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(location: Omit<Location, 'id' | 'created_at'>): Promise<Location> {
    const { data, error } = await supabase
      .from('locations')
      .insert(location)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Location>): Promise<Location> {
    const { data, error } = await supabase
      .from('locations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ==========================================
// EVENTS
// ==========================================
export const eventsService = {
  async getAll(projectId: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('project_id', projectId)
      .order('chapter')
      .order('order_index');
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(event: Omit<Event, 'id' | 'created_at'>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ==========================================
// RELATIONS
// ==========================================
export const relationsService = {
  async getAll(projectId: string): Promise<Relation[]> {
    const { data, error } = await supabase
      .from('relations')
      .select('*')
      .eq('project_id', projectId);
    if (error) throw error;
    return data || [];
  },

  async create(relation: Omit<Relation, 'id' | 'created_at'>): Promise<Relation> {
    const { data, error } = await supabase
      .from('relations')
      .insert(relation)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Relation>): Promise<Relation> {
    const { data, error } = await supabase
      .from('relations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('relations')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ==========================================
// CHAPTERS
// ==========================================
export const chaptersService = {
  async getAll(projectId: string): Promise<Chapter[]> {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('project_id', projectId)
      .order('number');
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Chapter | null> {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(chapter: Omit<Chapter, 'id' | 'created_at'>): Promise<Chapter> {
    const { data, error } = await supabase
      .from('chapters')
      .insert(chapter)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Chapter>): Promise<Chapter> {
    const { data, error } = await supabase
      .from('chapters')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('chapters')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ==========================================
// AUTH HELPERS
// ==========================================
export const authService = {
  async signInWithMagicLink(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
    return data;
  },

  async signInWithProvider(provider: 'google' | 'github') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
