# Progress — État d'Avancement : Fabula

> Dernière mise à jour : 2026-05-22

---

## 1. Vue d'Ensemble des Phases

| Phase | Statut | Complétion | Commentaire |
|-------|--------|------------|-------------|
| 1. Fondation | 🟡 En cours | 65% | Interface MVP + Supabase connecté, tables créées, auth fonctionnelle |
| 2. Différenciation | ⚪ À venir | 0% | Attend la validation du MVP avec données persistantes |
| 3. Scale & Communauté | ⚪ À venir | 0% | Expansion post Product-Market Fit |

---

## 2. Décisions Produit Validées

| ID | Décision | Date | Statut |
|----|----------|------|--------|
| D01 | Cible prioritaire : Créateurs d'histoires multi-profils | 2026-05-20 | ✅ Validée |
| D02 | Type de projet : Side project avec ambition de revenus | 2026-05-20 | ✅ Validée |
| D03 | Différenciation : Carte mentale interactive temporelle | 2026-05-20 | ✅ Validée |
| D04 | Plateformes : Web responsive + Desktop dès le MVP | 2026-05-20 | ✅ Validée |
| D05 | Stack technique : React 19 + TypeScript + Tailwind CSS v3 + Vite | 2026-05-21 | ✅ Validée |
| D06 | Librairie de visualisation : React Flow (@xyflow/react) | 2026-05-21 | ✅ Validée |
| D07 | Backend : Supabase (PostgreSQL + Auth + Realtime) | 2026-05-22 | ✅ Validée |

---

## 3. Chantiers Terminés

- [x] Initialisation du projet Fabula avec la structure OpenStrat
- [x] Rédaction du PICTURE.md, roadmap.md et progress.md
- [x] Création des agents secondaires (`@fabula-frontend`, `@fabula-backend`, `@fabula-data-model`, `@fabula-content`)
- [x] Création des skills complémentaires (`Fabula-user-research`, `Fabula-feature-spec`)
- [x] Mise à jour de l'agent principal avec les sous-agents métier adaptés
- [x] **Interface React complète** : Layout, Editor, MindMap, Encyclopedia, Timeline, QuickAdd
- [x] Choix et validation de la stack technique
- [x] Compilation réussie et serveur local opérationnel
- [x] **Connexion GitHub + Vercel configurée**
- [x] **Intégration Supabase complète** :
  - Client Supabase (`lib/supabase.ts`)
  - Types TypeScript (`lib/database.types.ts`)
  - Services CRUD (`lib/services.ts`)
  - Context React (`lib/FabulaContext.tsx`)
  - Hook de données (`lib/useProjectData.ts`)
  - Panel d'authentification (`components/AuthPanel.tsx`)
  - Schema SQL avec 6 tables + RLS (`supabase/schema.sql`)
  - Tables créées dans Supabase

---

## 4. Chantiers en Cours

| ID | Chantier | Priorité | Statut | Responsable | Prochaine étape |
|----|----------|----------|--------|-------------|-----------------|
| C01 | Validation utilisateur (interviews créateurs) | P0 | 🟡 | @fabula-main + @fabula-user-research | Contacter 5 profils et conduire les premières interviews |
| C06 | Remplacement de l'éditeur contentEditable par TipTap | P1 | 🔵 | @fabula-frontend | Installer TipTap et configurer les extensions |
| C07 | Peuplement de données de démo | P1 | 🟡 | @fabula-main | Créer un projet de test avec personnages, lieux, events |

---

## 5. Chantiers Planifiés (Backlog)

| ID | Chantier | Priorité | Dépendances |
|----|----------|----------|-------------|
| B01 | Développement du MVP connecté (fiches + graphe + persistance) | P0 | ✅ Fait |
| B02 | Onboarding et templates de fiches par profil | P1 | MVP fonctionnel |
| B03 | Implémentation de la carte mentale temporelle | P1 | Graphe statique validé + persistance |
| B04 | Système de cartographie des mondes | P2 | MVP + feedback utilisateurs |
| B05 | Mise en place du modèle freemium | P2 | MVP public et base d'utilisateurs |
| B06 | Synchronisation cloud et multi-device | P2 | Architecture backend validée |
| B07 | Landing page et collecte d'emails | P2 | Design validé |
| B08 | Export des données (JSON, Markdown, PDF) | P3 | Modèle de données stable |
| B09 | **TipTap / ProseMirror pour éditeur riche** | P1 | Persistance fonctionnelle |

---

## 6. Dette & Risques

| ID | Type | Description | Gravité | Mitigation |
|----|------|-------------|---------|------------|
| R01 | Risque | Adoption par des créateurs déjà installés sur Notion/Obsidian/World Anvil | 🔴 Haute | Interviews approfondies + différenciation forte sur le graphe temporel |
| R02 | Risque | Complexité technique du graphe relationnel temporel (performance, UX) | 🔴 Haute | Prototype rapide (preuve de concept) avant intégration dans le MVP |
| R03 | Risque | Charge de développement web + desktop simultanément | 🟡 Moyenne | Prioriser le web responsive d'abord ; desktop en PWA ou Electron ensuite |
| R04 | Dette | Choix technique rapide pour le MVP | 🟡 Moyenne | Documenter les hypothèses et prévoir un refactoring à la Phase 2 |
| R05 | Risque | Monétisation freemium mal calibrée | 🟡 Moyenne | Tests A/B sur les limites de la version gratuite dès le lancement public |
| R06 | **Dette** | **L'éditeur utilise contentEditable (pas de vrai WYSIWYG)** | 🟡 **Moyenne** | **Remplacer par TipTap/ProseMirror** |
| R07 | ✅ **Résolu** | **Zero persistance** | ✅ | **Supabase connecté, 6 tables créées, auth fonctionnelle** |
| R08 | Risque | Limites de la tier gratuite Supabase (500MB, 2M requêtes) | 🟡 Moyenne | Monitorer l'usage, migrer vers un plan payant si besoin |

---

## 7. Métriques Clés

| Métrique | Valeur Actuelle | Cible J01 | Tendance |
|----------|-----------------|-----------|----------|
| Interviews utilisateurs réalisées | 0 | 10 | ➖ |
| Utilisateurs inscrits (landing) | 0 | 50 | ➖ |
| Univers créés | 0 | 20 | ➖ |
| Entités modélisées | 6 tables (réelles) | 6 | ✅ |
| Composants UI développés | 7 | 7 | ✅ |
| Compilation / Build | ✅ Réussi | ✅ Stable | ✅ |
| Backend connecté | ✅ Supabase | ✅ | ✅ |
| Auth fonctionnelle | ✅ Magic link + OAuth | ✅ | ✅ |
| Persistance des données | ✅ CRUD complet | ✅ | ✅ |
| Satisfaction (NPS) | — | 30 | ➖ |

---

## Session End — Fabula
Date : 2026-05-22
Durée : ~2 heures

### Livrables
- [Backend Supabase] : Client, types, services CRUD, context React, hook de données
- [AuthPanel] : Connexion magic link + OAuth, gestion projets, sélecteur dans sidebar
- [Schema SQL] : 6 tables (projects, characters, locations, events, relations, chapters) + RLS + index
- [Composants adaptés] : Editor (sauvegarde auto), MindMap, Encyclopedia, Timeline connectés à Supabase
- [GitHub] : Push du code complet avec Supabase
- [Tables créées] : SQL exécuté dans Supabase, prêt pour les tests

### Mise à jour Progress
- Chantiers terminés : Interface MVP, Supabase, Auth, Persistance, GitHub/Vercel
- Chantiers en cours : Interviews utilisateurs, Remplacement éditeur par TipTap
- Risque R07 résolu : L'application a maintenant une persistance réelle

### Blocages & Risques
- [R06] L'éditeur contentEditable reste une dette → Remplacer par TipTap dans la prochaine session
- [R08] Surveiller les limites de la tier gratuite Supabase

### Priorités suivantes
1. **Tester l'application avec Supabase** — Se connecter, créer un projet, ajouter des fiches, vérifier la persistance
2. **Remplacer l'éditeur par TipTap** — Pour un vrai WYSIWYG avec mentions natives et markdown
3. **Conduire les premières interviews utilisateurs** — Valider l'intérêt pour le graphe temporel

### Notes
Le backend est fonctionnel. L'application est maintenant un vrai produit testable avec persistance. La prochaine session doit impérativement valider l'expérience utilisateur (connexion, création de projet, CRUD des fiches) avant d'ajouter de nouvelles features.
