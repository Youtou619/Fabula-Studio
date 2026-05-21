---
name: Fabula-feature-spec
description: Spécifier une nouvelle entité ou fonctionnalité avant développement avec user stories, modèle de données et critères d'acceptation
---

# Skill — Feature Spec : Fabula

> Projet : Fabula
> Type : Side project

---

## Quand utiliser

Utiliser ce skill avant de lancer le développement de toute nouvelle entité (Personnage, Lieu, Événement, Faction, etc.) ou fonctionnalité (graphe relationnel, timeline narrative, carte du monde, etc.). Ce skill garantit que le besoin utilisateur est clarifié et que le modèle de données est cohérent avant que `@fabula-frontend` et `@fabula-backend` interviennent.

---

## Inputs attendus

- Besoin utilisateur documenté (issue, retour de recherche, idée)
- Contraintes techniques connues (stack, limitations de visualisation)
- Dépendances avec d'autres entités ou features existantes

---

## Checklist de spécification

### 1. Définir le besoin utilisateur
- [ ] Formuler la user story : "En tant que [profil], je veux [action] afin de [bénéfice]"
- [ ] Identifier le problème résolu par cette feature
- [ ] Vérifier l'alignement avec la vision du PICTURE.md

### 2. Décrire le comportement fonctionnel
- [ ] Lister les scénarios principaux (happy path)
- [ ] Lister les scénarios alternatifs et d'erreur
- [ ] Définir les règles de validation métier
- [ ] Décrire l'interface utilisateur attendue (si visible)

### 3. Modéliser les données
- [ ] Identifier les entités impactées ou créées
- [ ] Définir les attributs et types
- [ ] Décrire les relations avec les entités existantes
- [ ] Soumettre à validation de `@fabula-data-model`

### 4. Définir les critères d'acceptation
- [ ] Critère 1 : [Condition mesurable de succès]
- [ ] Critère 2 : [Condition mesurable de succès]
- [ ] Critère 3 : [Condition mesurable de succès]
- [ ] Définir les tests automatisés nécessaires

### 5. Identifier les dépendances et risques
- [ ] Dépendances techniques (librairies, API)
- [ ] Dépendances fonctionnelles (autres features à livrer avant)
- [ ] Risques de performance ou de sécurité

---

## Output attendu

En sortie de ce skill, l'agent doit produire un document de spécification :

```text
## Feature Spec — Fabula
Feature : [Nom de la feature/entité]
Date : AAAA-MM-JJ
Auteur : [Agent]

### User Story
En tant que [profil], je veux [action] afin de [bénéfice].

### Description fonctionnelle
[Description détaillée des scénarios]

### Modèle de données
- Entité : [Nom]
  - Attributs : [Liste avec types]
  - Relations : [Entités liées + type de relation]

### Critères d'acceptation
- [ ] [Critère 1]
- [ ] [Critère 2]
- [ ] [Critère 3]

### Dépendances
- [Dépendance 1] → [Impact]

### Risques
- [Risque 1] → [Mitigation proposée]

### Estimation
- Complexité : [Faible / Moyenne / Élevée]
- Durée estimée : [X jours]
```
