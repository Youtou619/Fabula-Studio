export interface Character {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  description: string;
  motivation?: string;
  secret?: string;
  tags: string[];
  color: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  description: string;
  parentId?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  characterIds: string[];
  chapter?: number;
}

export interface Relation {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
  label: string;
}

export const mockCharacters: Character[] = [
  {
    id: 'c1',
    name: 'Aeliana Voss',
    role: 'Protagoniste',
    description: 'Une archiviste de la Citadelle des Ombres, découvrant des secrets qui menacent l\'ordre établi.',
    motivation: 'Protéger la vérité historique',
    secret: 'Elle est la dernière descendante du roi déchu',
    tags: ['Personnage principal', 'Archiviste', 'Citadelle'],
    color: '#3b82f6',
  },
  {
    id: 'c2',
    name: 'Kaelen Thorne',
    role: 'Antagoniste',
    description: 'Le Grand Inquisiteur, obsédé par le contrôle de l\'information.',
    motivation: 'Maintenir l\'ordre à tout prix',
    secret: 'Il a détruit ses propres archives familiales',
    tags: ['Inquisiteur', 'Antagoniste', 'Autorité'],
    color: '#ef4444',
  },
  {
    id: 'c3',
    name: 'Mira Soleil',
    role: 'Alliée',
    description: 'Une ingénieure de l\'Undercity, experte en mécanismes anciens.',
    motivation: 'Libérer la connaissance des masses',
    secret: 'Elle espionne pour le Conseil des Artisans',
    tags: ['Ingénieure', 'Undercity', 'Alliée'],
    color: '#10b981',
  },
  {
    id: 'c4',
    name: 'Orion Vane',
    role: 'Mentor',
    description: 'Un érudit excentrique vivant en marge de la société.',
    motivation: 'Préserver les savoirs interdits',
    secret: 'Il a été l\'ancien mentor de Kaelen',
    tags: ['Mentor', 'Érudit', 'Marginal'],
    color: '#f59e0b',
  },
  {
    id: 'c5',
    name: 'Lyra Nox',
    role: 'Personnage secondaire',
    description: 'Une messagère clandestine reliant les résistants.',
    motivation: 'Venger sa famille disparue',
    secret: 'Elle est une infiltrée du régime',
    tags: ['Messagère', 'Résistance', 'Infiltrée'],
    color: '#8b5cf6',
  },
];

export const mockLocations: Location[] = [
  { id: 'l1', name: 'Citadelle des Ombres', type: 'Bâtiment', description: 'Le centre du pouvoir et des archives.', parentId: 'l3' },
  { id: 'l2', name: 'Undercity', type: 'Quartier', description: 'Les bas-fonds mécaniques de la métropole.', parentId: 'l3' },
  { id: 'l3', name: 'Métropole d\'Aether', type: 'Ville', description: 'La capitale du monde connu.', parentId: 'l4' },
  { id: 'l4', name: 'Royaume d\'Aether', type: 'Royaume', description: 'Le royaume dominant de l\'ère actuelle.' },
  { id: 'l5', name: 'Archives Interdites', type: 'Lieu secret', description: 'Section scellée de la Citadelle.', parentId: 'l1' },
];

export const mockEvents: Event[] = [
  { id: 'e1', title: 'L\'Incident des Archives', date: 'An 847, Mois du Gel', description: 'Aeliana découvre un document compromettant.', characterIds: ['c1', 'c2'], chapter: 1 },
  { id: 'e2', title: 'La Rencontre', date: 'An 847, Mois du Gel', description: 'Mira et Aeliana se rencontrent dans l\'Undercity.', characterIds: ['c1', 'c3'], chapter: 2 },
  { id: 'e3', title: 'Le Sacrifice', date: 'An 847, Mois de l\'Éther', description: 'Orion révèle un secret millénaire.', characterIds: ['c1', 'c4', 'c2'], chapter: 5 },
  { id: 'e4', title: 'La Trahison', date: 'An 847, Mois du Feu', description: 'Lyra révèle sa véritable allégeance.', characterIds: ['c3', 'c5'], chapter: 8 },
  { id: 'e5', title: 'La Révolte', date: 'An 848, Mois du Renouveau', description: 'Le soulèvement des artisans.', characterIds: ['c1', 'c3', 'c5'], chapter: 12 },
];

export const mockRelations: Relation[] = [
  { id: 'r1', sourceId: 'c1', targetId: 'c2', type: 'conflict', label: 'Ennemis' },
  { id: 'r2', sourceId: 'c1', targetId: 'c3', type: 'alliance', label: 'Alliées' },
  { id: 'r3', sourceId: 'c1', targetId: 'c4', type: 'mentor', label: 'Mentor' },
  { id: 'r4', sourceId: 'c2', targetId: 'c4', type: 'past', label: 'Ancien disciple' },
  { id: 'r5', sourceId: 'c3', targetId: 'c5', type: 'suspicion', label: 'Soupçons' },
  { id: 'r6', sourceId: 'c2', targetId: 'c5', type: 'secret', label: 'Manipule' },
];
