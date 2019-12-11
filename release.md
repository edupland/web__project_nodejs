<h2>Release 2.0 du 06/12/2019</h2>

<h3>Déploiement avec Heroku</h3>

Après avoir ouvert son navigateur, l'utilisateur a juste à se connecter à l'adresse suivante:</br>
https://cdp-ropert-dupland-tomas.000webhostapp.com

<h3>Déploiement avec Docker</h3>

Après avoir téléchargé la release, l'utilisateur doit se placer dans la racine du projet (plus specifiquement là où se trouve le fichier *docker-compose.yml*).
Celui-ci lance ensuite la commande suivante dans son terminal:</br>
*docker-compose up --build*

Ensuite l'utilisateur n'a plus qu'à rentrer la commande suivante pour se connecter à la page d'accueil du projet:</br>
*firefox ./front/index.html*

<h3>Tests</h3>

Pour lancer les tests, l'utilisateur doit rentrer les commandes suivantes:


<h3>Issues</h3>

Les issues réalisées pour cette release sont les suivantes:

id | User story | Difficulté | Priorité | Planification
:---: | :--- | :---: | :---: | :---:
US9 | En tant que PROPRIETAIRE je souhaite pouvoir gérer un projet que j'ai créé. Dans la liste de mes projets, les projets dont je suis propriétaire auraient à proximité un bouton "Editer" permettant leur modification. En appuyant dessus, je suis redirigé vers la page de gestion du projet. Depuis cette page, des champs éditables contenant le titre et la description du projet sélectionné sont affichés. En bas de la page, des boutons "Sauvegarder" et "Retour" sont affichés. L'appui sur le bouton "Sauvegarder" met à jour les modifications réalisées, l'appui sur le bouton "Retour" ne prend en compte aucune modification et me redirige vers la page de mes projets. Afin de gérer l'évolution d'un projet, je souhaite que cette fonctionnalité soit réalisée. | 1 | BASSE | Sprint 2
US10 | En tant que PROPRIETAIRE je souhaite pouvoir gérer les membres qui participent à un projet que j'ai créé. Dans la liste de mes projets, les projets dont je suis propriétaire auraient à proximité un bouton "Gérer" permettant leur gestion. En appuyant dessus, je suis redirigé vers la page de gestion des membres du projet. Cette page contient deux groupes : "Clients" et "Développeurs". Chaque groupe est associé à une barre de recherche : les utilisateurs sont recherchés par leur login en fonction de mot-clés, et le résultat de la recherche est affiché sous la forme d'une liste. A partir de cette liste, je peux alors choisir quel(s) utilisateur(s) ajouter au groupe associé sur le projet dont je suis propriétaire. En bas de la page, des boutons "Sauvegarder" et "Retour" sont affichés. L'appui sur le bouton "Sauvegarder" met à jour les modifications réalisées, l'appui sur le bouton "Retour" ne prend en compte aucune modification et me redirige vers la page de mes projets. Afin de gérer l'organisation d'un projet, je souhaite que cette fonctionnalité soit réalisée. | 2 | BASSE | Sprint 2
US11 | En tant que DÉVELOPPEUR je souhaite créer une issue. Après avoir sélectionné un projet, l'outil me reconduirait vers une nouvelle fenêtre. Celle-ci me proposerait un menu sur le côté gauche avec les boutons ISSUES, TÂCHES, RELEASES, TESTS et DOCUMENTATION. Lorsque je clique sur ISSUES, une liste des issues et un bouton AJOUTER en haut s'affichent. En cliquant sur celui-ci, une fenêtre pop-up s'ouvrirait qui afficherait les champs suivant à remplir : EN TANT QUE, JE SOUHAITE et AFIN DE. Tant que tous ces champs ne sont pas remplis, le bouton "VALIDER" de cette fenêtre serait grisé. Une fois la validation possible, l'issue est ajoutée à la liste des issues. Afin d'ajouter des issues à mon projet, je souhaite que cette fonctionnalité soit réalisée. | 1 | ÉLEVÉE | Sprint 2
US12 | En tant que DÉVELOPPEUR je souhaite créer une tâche. Après avoir sélectionné un projet, l'outil me reconduirait vers une nouvelle fenêtre. Celle-ci me proposerait un menu sur le côté gauche avec les ISSUES, les TÂCHES, les RELEASES, les TESTS et la DOCUMENTATION. Lorsque je clique sur les TÂCHES, la liste des tâches et un bouton AJOUTER en haut s'affichent. En cliquant sur celui-ci, le logiciel ouvrirait une fenêtre pop-up avec un seul champ TÂCHE. Tant que ce champ n'est pas rempli, le bouton VALIDER sera grisé. Une fois la validation possible, la tâche sera ajoutée à la liste de tâche. Afin d'ajouter des tâches à mon projet, je souhaite que cette fonctionnalité soit réalisée. | 1 | ÉLEVÉE | Sprint 2
US13 | En tant que DÉVELOPPEUR je souhaite créer un test. Après avoir sélectionné un projet, l'outil me reconduirait vers une nouvelle fenêtre. Celle-ci me proposerait un menu sur le côté gauche avec les ISSUES, les TÂCHES, les RELEASES, les TESTS et la DOCUMENTATION. Lorsque je clique sur les TESTS, la liste de tests et un bouton AJOUTER en haut s'affichent. En cliquant sur celui-ci, le logiciel ouvrirait une fenêtre pop-up qui afficherait les champs suivants : GIVEN, WHEN et THEN. Il y aurait des petits boutons "+" après les champs GIVEN et THEN pour ajouter des champs AND. Tant que tous les champs ne sont pas remplis, le bouton VALIDER sera grisé. Une fois la validation possible, le test sera ajouté à la liste de tests. Afin d'ajouter des tests à mon projet, je souhaite que cette fonctionnalité soit réalisée. | 1 | BASSE | Sprint 2