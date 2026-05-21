# Progress — État d'Avancement : Fabula

> Dernière mise à jour : 2026-05-21

---

## 1. Vue d'Ensemble des Phases

| Phase | Statut | Complétion | Commentaire |
|-------|--------|------------|-------------|
| 1. Fondation | 🟡 En cours | 35% | Structure OpenStrat validée, interface MVP complète, stack technique figée |
| 2. Différenciation | ⚪ À venir | 0% | Attend la validation du MVP et du graphe temporel |
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
| D06 | Librairie de visualisation : React Flow (@xyflow/react) pour le graphe | 2026-05-21 | ✅ Validée |

---

## 3. Chantiers Terminés

- [x] Initialisation du projet Fabula avec la structure OpenStrat
- [x] Rédaction du PICTURE.md, roadmap.md et progress.md (placeholders remplacés)
- [x] Création des agents secondaires (`@fabula-frontend`, `@fabula-backend`, `@fabula-data-model`, `@fabula-content`)
- [x] Création des skills complémentaires (`Fabula-user-research`, `Fabula-feature-spec`)
- [x] Mise à jour de l'agent principal avec les sous-agents métier adaptés
- [x] **Création de l'interface complète React + Tailwind + TypeScript**
  - Layout avec sidebar rétractable, mode sombre, mode focus
  - Éditeur intelligent avec Smart Tags (`@mentions`) et tooltips flottants
  - Carte mentale interactive avec React Flow (drag & drop, labels de relations, panneau de détails)
  - Encyclopédie (vue grille + liste, recherche, filtres, modale de détails)
  - Chronologie interactive (expansion au clic, badges personnages)
  - Quick Add flottant (bouton d'action rapide)
- [x] Choix et validation de la stack technique (React 19 + TS + Tailwind + Vite + React Flow + Lucide)
- [x] Compilation réussie et serveur local opérationnel (`http://localhost:5173`)

---

## 4. Chantiers en Cours

| ID | Chantier | Priorité | Statut | Responsable | Prochaine étape |
|----|----------|----------|--------|-------------|-----------------|
| C01 | Validation utilisateur (interviews créateurs) | P0 | 🟡 | @fabula-main + @fabula-user-research | Contacter 5 profils et conduire les premières interviews |
| C03 | Modélisation des entités MVP (Personnage, Lieu, Événement) | P1 | 🟡 | @fabula-data-model | Spécification avec @fabula-feature-spec |
| C05 | Persistance des données (backend/API) | P1 | 🔵 | @fabula-backend | Choisir entre Firebase, Supabase, ou API Node custom |
| C06 | Remplacement de l'éditeur contentEditable par un vrai éditeur riche | P1 | 🔵 | @fabula-frontend | Benchmark TipTap / ProseMirror / Slate |

---

## 5. Chantiers Planifiés (Backlog)

| ID | Chantier | Priorité | Dépendances |
|----|----------|----------|-------------|
| B01 | Développement du MVP connecté (fiches + graphe + persistance) | P0 | Persistance + éditeur riche |
| B02 | Onboarding et templates de fiches par profil | P1 | MVP fonctionnel |
| B03 | Implémentation de la carte mentale temporelle | P1 | Graphe statique validé + persistance |
| B04 | Système de cartographie des mondes | P2 | MVP + feedback utilisateurs |
| B05 | Mise en place du modèle freemium | P2 | MVP public et base d'utilisateurs |
| B06 | Synchronisation cloud et multi-device | P2 | Architecture backend validée |
| B07 | Landing page et collecte d'emails | P2 | Design validé |
| B08 | Export des données (JSON, Markdown, PDF) | P3 | Modèle de données stable |

---

## 6. Dette & Risques

| ID | Type | Description | Gravité | Mitigation |
|----|------|-------------|---------|------------|
| R01 | Risque | Adoption par des créateurs déjà installés sur Notion/Obsidian/World Anvil | 🔴 Haute | Interviews approfondies + différenciation forte sur le graphe temporel |
| R02 | Risque | Complexité technique du graphe relationnel temporel (performance, UX) | 🔴 Haute | Prototype rapide (preuve de concept) avant intégration dans le MVP |
| R03 | Risque | Charge de développement web + desktop simultanément | 🟡 Moyenne | Prioriser le web responsive d'abord ; desktop en PWA ou Electron ensuite |
| R04 | Dette | Choix technique rapide pour le MVP | 🟡 Moyenne | Documenter les hypothèses et prévoir un refactoring à la Phase 2 |
| R05 | Risque | Monétisation freemium mal calibrée | 🟡 Moyenne | Tests A/B sur les limites de la version gratuite dès le lancement public |
| R06 | **Dette** | **L'éditeur utilise contentEditable (pas de vrai WYSIWYG)** | 🟡 **Moyenne** | **Remplacer par TipTap/ProseMirror dès que possible** |
| R07 | **Risque** | **L'application est 100% statique (pas de persistance)** | 🔴 **Haute** | **Prioriser la connexion à un backend dans la prochaine session** |

---

## 7. Métriques Clés

| Métrique | Valeur Actuelle | Cible J01 | Tendance |
|----------|-----------------|-----------|----------|
| Interviews utilisateurs réalisées | 0 | 10 | ➖ |
| Utilisateurs inscrits (landing) | 0 | 50 | ➖ |
| Univers créés | 0 | 20 | ➖ |
| Entités modélisées | 3 (mock) | 3 (réelles) | 📈 |
| Composants UI développés | 6 | 6 | ✅ |
| Compilation / Build | ✅ Réussi | ✅ Stable | ✅ |
| Satisfaction (NPS) | — | 30 | ➖ |

---

## Session End — Fabula
Date : 2026-05-21
Durée : ~2 heures

### Livrables
- [Agent principal] : Mise à jour de Fabula-main.md avec cible, problème, sous-agents et skills
- [4 Agents secondaires] : `@fabula-frontend`, `@fabula-backend`, `@fabula-data-model`, `@fabula-content`
- [2 Skills complémentaires] : `Fabula-user-research` et `Fabula-feature-spec`
- [PICTURE.md] : Vision cible complète avec 5 décisions stratégiques figées
- [progress.md + roadmap.md] : État réel et plan d'action sur 3 ans
- [Interface React complète] : Layout, Editor, MindMap, Encyclopedia, Timeline, QuickAdd
- [Stack technique validée] : React 19 + TypeScript + Tailwind v3 + Vite + React Flow + Lucide
- [Serveur local] : Application accessible sur `http://localhost:5173`

### Mise à jour Progress
- Chantiers terminés : Structure OpenStrat, Interface MVP, Choix stack, Prototype graphe
- Chantiers en cours : Interviews utilisateurs, Modélisation entités, Persistance, Éditeur riche
- Nouveaux backlog : Landing page, Export de données

### Blocages & Risques
- [R06] L'éditeur contentEditable est une dette technique → Remplacer par TipTap/ProseMirror
- [R07] Zero persistance (refresh = perte de données) → Prioriser backend dans la prochaine session

### Priorités suivantes
1. **Connecter un backend (Firebase/Supabase)** — L'interface est prête mais sans données persistantes c'est une démo
2. **Remplacer l'éditeur par TipTap** — Pour un vrai WYSIWYG avec mentions natives

### Notes
L'interface est visuellement aboutie et alignée avec la vision "zéro friction". La prochaine session doit impérativement ajouter la persistance pour transformer la démo en vrai produit testable.
