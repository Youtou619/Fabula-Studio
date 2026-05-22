export interface Project {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  description: string | null;
  type: 'novel' | 'rpg' | 'screenplay' | 'game' | 'other';
  status: 'draft' | 'active' | 'completed' | 'archived';
  settings: Record<string, unknown> | null;
}

export interface Character {
  id: string;
  created_at: string;
  project_id: string;
  name: string;
  role: string;
  avatar_url: string | null;
  description: string | null;
  motivation: string | null;
  secret: string | null;
  tags: string[];
  color: string;
  metadata: Record<string, unknown> | null;
  order_index: number;
}

export interface Location {
  id: string;
  created_at: string;
  project_id: string;
  name: string;
  type: string;
  description: string | null;
  parent_id: string | null;
  metadata: Record<string, unknown> | null;
  order_index: number;
}

export interface Event {
  id: string;
  created_at: string;
  project_id: string;
  title: string;
  date_label: string | null;
  description: string | null;
  chapter: number | null;
  character_ids: string[];
  location_ids: string[] | null;
  metadata: Record<string, unknown> | null;
  order_index: number;
}

export interface Relation {
  id: string;
  created_at: string;
  project_id: string;
  source_id: string;
  target_id: string;
  type: string;
  label: string;
  metadata: Record<string, unknown> | null;
}

export interface Chapter {
  id: string;
  created_at: string;
  project_id: string;
  title: string;
  number: number;
  content: string | null;
  summary: string | null;
  character_ids: string[] | null;
  event_ids: string[] | null;
  status: 'draft' | 'revised' | 'final';
  word_count: number;
  metadata: Record<string, unknown> | null;
}
