# Solvaco Freight — Site web (design)

## Contexte

Site vitrine public pour Solvaco Freight, division logistique/courtage de fret (dry van, reefer, flatbed, cross-border CA/US). Projet 100% séparé de:

- `solvaco-website` (Documents\Solvaco\07-Dev\solvaco-website) — site du volet construction/béton, ne pas toucher, ne partage aucun code
- `flatbed-broker` (Documents\flatbed-broker) — système interne d'opérations (TMS), pas un site public, ne partage aucun code

Aucun des deux projets existants n'est modifié par ce travail.

## Objectif

Double audience: shippers (clients qui veulent transporter du fret) et carriers/owner-operators (transporteurs à recruter). Le site sert trois actions:

1. Demander une soumission (shipper)
2. Devenir carrier (recrutement transporteur)
3. Suivre une charge (statut d'une charge existante)

Marché: Canada + USA (cross-border), donc site bilingue FR/EN avec toggle, comme `solvaco-website`.

## Stack

Next.js + TypeScript + Tailwind CSS. Choix par cohérence avec l'autre site Solvaco côté outils de dev (aucun code partagé — repos, déploiements et cycles de vie 100% indépendants).

## Branding

Réutilise le logo existant (`solvaco-website/public/logo.png` et `logo-original.png`, copié dans ce repo — pas de dépendance runtime vers l'autre repo). Palette plus colorée que le site béton (doré/sombre) — palette exacte (bleu logistique + accent) à fixer en implémentation, pas dans ce spec.

## Pages (6, multi-page — pas de one-pager)

1. **Accueil** — hero (logo, tagline), pitch court, 3 CTA vers Quote / Devenir Carrier / Suivi
2. **Services** — Dry Van, Reefer, Flatbed, Cross-border CA/US
3. **À propos** — histoire, équipe, lien avec la famille de marque Solvaco
4. **Devenir Carrier** — pitch recrutement + formulaire (nom, type équipement, zone desservie, contact)
5. **Suivi de charge** — formulaire "demander statut" (numéro de charge + email). Envoie une demande par courriel à l'équipe. **Pas de connexion live** au système interne `flatbed-broker`/TMS — hors scope pour cette version.
6. **Contact / Quote** — formulaire shipper (origine, destination, type de charge, poids, date souhaitée) + coordonnées de l'entreprise

Navigation: menu standard multi-page (6 liens), toggle FR/EN, CTA "Obtenir une soumission" visible sur toutes les pages.

## Formulaires (3: Carrier, Tracking, Quote)

- Validation côté client (champs requis, formats email/téléphone)
- Soumission via API route Next.js vers un service email (ex: Resend) — notifie l'équipe, pas de base de données pour cette version
- Message de succès/échec affiché après soumission
- Si le service email est indisponible: message d'erreur invitant à réessayer ou à appeler directement (pas de perte silencieuse de la demande)

## Hors scope (explicitement)

- Connexion live au TMS/`flatbed-broker` pour le tracking
- Base de données de soumissions
- Compte utilisateur / portail client
- Contenu multi-page pour le volet construction (déjà couvert par `solvaco-website`)

## Test

QA manuel dans le navigateur: 3 formulaires (soumission, échec, validation), navigation entre les 6 pages, toggle de langue, responsive mobile/desktop. Pas de suite de tests automatisés pour cette version (site vitrine simple).
