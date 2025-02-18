# tasks

Application de gestion de tâches

# Subject

Vous allez créer une application de gestion de tâches où un utilisateur peut créer, modifier, marquer comme terminées et supprimer des tâches. L'application sera construite avec Ruby on Rails pour l'API backend et Vue.js avec TypeScript pour le frontend.

Détails du test
Partie 1: Backend avec Ruby on Rails (API REST)
Création de l'API :

Créez une API RESTful avec Ruby on Rails qui permet de gérer les tâches. Les tâches doivent avoir les attributs suivants :
id (integer, auto-incrémenté)
title (string)
description (string, optionnel)
status (enum : ['pending', 'completed'])
created_at (datetime)
updated_at (datetime)
Implémentez les routes RESTful suivantes :
GET /tasks : Liste toutes les tâches.
GET /tasks/:id : Détaille une tâche spécifique.
POST /tasks : Crée une nouvelle tâche.
PUT /tasks/:id : Met à jour une tâche.
DELETE /tasks/:id : Supprime une tâche.
Validation :

Implémentez des validations pour assurer que :
Le title est obligatoire.
Le status est l'un des types définis.
Tests :

Écrivez des tests avec RSpec pour vérifier les fonctionnalités de votre API (tests de création, mise à jour, suppression et récupération de tâches).
Authentification (bonus) :

Ajoutez un système d'authentification simple avec token JWT (JSON Web Token) pour sécuriser les routes. L'API ne doit être accessible qu'aux utilisateurs authentifiés.
Partie 2: Frontend avec Vue.js et TypeScript
Création de l'interface utilisateur :

Créez une application Vue.js qui permet d'interagir avec l'API backend que vous avez créée. Utilisez TypeScript pour une meilleure gestion du typage et des erreurs.
Affichez une liste de tâches récupérées depuis l'API.
Permettez à l'utilisateur de :
Ajouter une nouvelle tâche.
Modifier une tâche existante.
Supprimer une tâche.
Marquer une tâche comme terminée.
Composants Vue.js :

Utilisez des composants Vue pour afficher et interagir avec les tâches.
Assurez-vous que les états de l'application sont gérés correctement, par exemple, en utilisant vuex pour la gestion de l'état ou la composition API de Vue 3.
Interaction avec l'API :

Utilisez axios (ou fetch) pour interagir avec l'API backend.
Implémentez un système de gestion des erreurs (ex. : afficher un message d'erreur si une tâche ne peut pas être supprimée).
UI/UX (bonus) :

Ajoutez une interface utilisateur basique mais fonctionnelle avec des boutons, des champs de formulaire et un design simple (CSS ou frameworks comme TailwindCSS ou Bootstrap peuvent être utilisés).
Livrables attendus
Backend :

Code source complet de l’API Ruby on Rails.
Tests RSpec pour les API.
README avec instructions pour lancer le projet (installation, exécution, tests, etc.).
Frontend :

Code source complet de l’application Vue.js avec TypeScript.
Instructions d’installation et d’exécution.

# Backend

## Configuration

Pour configurer le backend, suivez les étapes ci-dessous :

1. Installez les dépendances du projet avec `bundle install` :

```sh
bundle install
```

2. Créez la base de données avec la commande suivante :

```sh
rails db:create
```

3. Appliquez les migrations de la base de données :

```sh
rails db:migrate
```

4. Demandez le fichier `master.key` à l'administrateur du projet et placez-le dans le dossier `config`.

5. Configurez CORS pour permettre les requêtes depuis le frontend. Ouvrez le fichier `config/initializers/cors.rb` et configurez-le comme suit :

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:5173' # Remplacez par l'URL de votre frontend

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

6. Lancez le serveur Rails :

```sh
rails s
```

# Frontend

## Config

Ajoutez un fichier `.env` dans le dossier frontend et définissez la variable `VITE_API_BASE_URL` avec l'URL du serveur Rails :

```plaintext
VITE_API_BASE_URL=http://localhost:3000
```
