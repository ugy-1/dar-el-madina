# Réponses – TP Bootstrap 5 – Dar El Medina

## Partie 00

### Q0.2 – Pourquoi la version bundle de Bootstrap JS ?
Le fichier `bootstrap.bundle.min.js` inclut **Popper.js** en plus du JavaScript Bootstrap. Popper est indispensable pour positionner dynamiquement certains composants (tooltips, popovers, dropdowns). Sans la version bundle, les composants interactifs dépendant de Popper — et donc indirectement la navbar repliable, le carousel et le modal qui s'appuient sur le JS Bootstrap — peuvent ne pas fonctionner correctement.

### Q0.7 – Dossiers vides et Git
Après le premier `git push` (ou upload), les dossiers `data/` et `captures/` n'apparaissent pas sur GitHub s'ils sont vides car **Git ne versionne pas les dossiers vides**. Pour les conserver, on y ajoute un fichier placeholder (`.gitkeep`), ou on les remplit avec du contenu réel (ce qui est fait avec plats.json et les captures d'écran).

### Question de réflexion – Plusieurs petits commits vs un gros commit
- **Historique lisible** : on voit quand et pourquoi chaque partie a été faite.
- **Retour arrière ciblé** : on peut annuler une seule partie (`git revert`) sans perdre les autres.
- **Collaboration plus simple** : moins de conflits et de revues massives.
- **Preuve de progression** : l'historique des commits fait partie de la note.

---

## Partie 01

### Q1.1 – Classe utilitaire vs composant
- **Classe utilitaire** : style atomique unique (`mt-3`, `text-center`), aucune structure HTML imposée.
- **Composant** : ensemble cohérent de classes + structure HTML + parfois JS.

Composants **avec JS** : navbar (collapse), carousel, modal (aussi dropdown, tooltip, accordion, offcanvas).
Composants **sans JS** : card, badge, breadcrumb, progress, alert statique.

### Q1.3 – `navbar-toggler`
Sous 992 px, les liens sont masqués dans un menu hamburger.
`data-bs-toggle="collapse"` indique le type de composant à piloter, `data-bs-target="#id"` cible l'élément à replier.

### Q1.5 – `sticky-top` vs `fixed-top`
- `sticky-top` : la barre reste dans le flux puis se colle en haut au scroll ; le contenu n'est pas masqué.
- `fixed-top` : la barre sort du flux, il faut un padding-top sur le body pour ne pas cacher le contenu.

---

## Partie 02

### Q2.1 – Suppression de `.jumbotron`
En Bootstrap 5, `.jumbotron` a été retiré car il était redondant avec les utilitaires (`p-5`, `bg-*`, `rounded-*`, `display-*`, `lead`). Le supprimer allège le CSS, évite un composant rigide et encourage une composition flexible par utilitaires.

### Q2.3 – Rôles des classes
- `p-5` : padding global (3rem).
- `mb-4` : marge basse (1.5rem).
- `bg-body-tertiary` : fond gris clair adapté au thème.
- `rounded-3` : coins arrondis.
- `py-5` : padding vertical.
- `display-5` : grande taille de titre.
- `fw-bold` : gras.
- `fs-4` : taille de police (1.5rem).
- `col-md-8` : largeur 8/12 à partir de md (≥768px).
- `btn-lg` : bouton en grlande taile.

### Q2.5 – Dégradé noir semi-transparent
Il assombrit l'image de fond pour rendre le texte blanc lisible, quel que soit le contraste de la photo derrière.

---

## Partie 03

# Q3.3 – Cartes par ligne
- Mobile (< md) : 1 carte par ligne
- Tablette (md) : 2 cartes par ligne
- Desktop (lg+) : 3 cartes par ligne
##
### Q3.4 – Hauteurs inégales
Sans `h-100`, chaque carte prend la hauteur de son contenu. Avec `h-100` (et `d-flex flex-column`), toutes les cartes d'une ligne ont la même hauteur et le `card-footer` est aligné en bas grâce à `mt-auto`.

### Q3.6 – `card-group` vs grille
`card-group` colle les cartes sans gouttière et impose une même hauteur ; sur mobile elles s'empilent sans espacement. La grille `row-cols-*` + `g-4` est plus adaptée au mobile (espacement et breakpoints explicites).

### Question de réflexion – `.col` autour des cartes
Les `.col` gèrent la largeur et les gouttières (`g-4`). Sans elles, `g-4` ne s'applique pas et le responsive `row-cols-*` ne fonctionne pas.

---

## Partie 04

### Q4.1 – Classe `active`
Sans `active`, aucune diapositive n'est affichée au chargement (le carrousel reste vide jusqu'à interaction).

### Q4.5 – `data-bs-ride`
- `"carousel"` : défilement automatique au chargement.
- `"false"` : pas de défilement automatique (manuel uniquement).

### Q4.8 – Deux carrousels avec le même id
Les boutons du 2e carrousel ciblent `#carouselGalerie` (id du 1er) : ils contrôlent le premier carrousel. Les ids doivent être uniques dans une page HTML.

---

## Partie 05

### Q5.5 – Options de modale
- `modal-dialog-centered` : centrage vertical.
- `modal-lg` : largeur plus grande.
- `modal-dialog-scrollable` : scroll interne au body.
- `data-bs-backdrop="static"` : clic hors modale ne ferme pas.

On garde `modal-dialog-centered` + `modal-lg` pour le formulaire (confort visuel). `scrollable` est inutile ici (formulaire court). `static` est optionnel pour éviter la fermeture accidentelle.

### Q5.8 – Pourquoi une seule modale réutilisée ?
Une seule modale évite la duplication HTML, allège la page, centralise la logique JS et facilite la maintenance.

### Question de réflexion – `show` vs `shown`
- `show.bs.modal` : déclenché avant l'affichage (idéal pour remplir le contenu).
- `shown.bs.modal` : déclenché après affichage et transition (idéal pour `focus()` sur le premier champ).

---

## Partie 06

### Q6.1 – Erreurs JSON courantes
Virgule finale, guillemets simples au lieu de doubles, clés non entre guillemets, commentaires, apostrophes non échappées.

### Q6.7 – `fetch()` en `file://`
Sous `file://`, la politique CORS du navigateur bloque les requêtes `fetch()` vers des fichiers locaux. Il faut un serveur web (Live Server, GitHub Pages) pour que le navigateur autorise la requête.

### Question de réflexion – `plats.json`
Le restaurant modifie sa carte et ses prix sans toucher au HTML. Le gabarit JS reste identique, seul le fichier de données change : maintenance simple, cohérence garantie, délégation possible à un non-développeur.

---

## Partie 07

### Question de réflexion – GitHub Pages vs `file://`
GitHub Pages sert le site via HTTP(S) : `fetch()` fonctionne et CORS est OK. Les noms de fichiers doivent respecter la casse car GitHub Pages (Linux) est sensible à la casse, contrairement à Windows/macOS.
