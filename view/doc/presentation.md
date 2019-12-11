Architecture
------------

L'architecture du projet est construite sous la forme Model-View-Controller. A la racine du projet,
on trouve donc les modules suivants:
* model, qui contient les modèles utilisés par l'outil et la base de données.
* view, qui contient tous les fichiers relatifs à l'interface graphique.
* controller, qui contient tous les fichiers relatifs à la gestion des interactions avec la base de données.</br>

On trouve également les répertoires:
* issue, qui contient des informations relatives aux issues pour chaque sprint lors de la conception du projet.
* task, qui contient des informations relatives aux tâches pour chaque sprint lors de la conception du projet.
* doc, qui contient des informations sur les différents aspects du projet.
* test, qui contient les tests réalisés lors de la conception du projet.

Technologies utilisées
----------------------

Pour le front-end, les langages HTML, CSS et JavaScript ont été utilisé. Pour faciliter la mise en place de
l'interface graphique, le projet a été réalisé avec le framework Bootstrap. 
Pour le back-end, la base de données NoSQL est gérée à l'aide de MongoDB. Les interactions entre l'outil et
la base de données sont gérées avec Express.js.
