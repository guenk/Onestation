OneStation est une application de Pictionary en ligne construite avec React pour le frontend et Node.js avec Express pour le backend.
L'application permet aux utilisateurs de jouer au Pictionary en temps réel avec d'autres joueurs.

Fonctionnalités :

Jeu de Pictionary en temps réel
Interface utilisateur moderne et réactive
Authentification des utilisateurs
Stockage des données de jeu dans une base de données SQLite
Notifications en temps réel via Socket.io

Technologies utilisées :

Frontend

React,
Redux,
React Router,
Tailwind CSS,
Socket.io-client,
Vite,
Backend,
Node.js,
Express,
Socket.io,
SQLite,
bcrypt pour le hachage des mots de passe,
jsonwebtoken pour l'authentification

Installation :

Prérequis
Node.js
npm


Frontend

Clonez le dépôt :

Copier le code suivant : 

git clone https://github.com/votre-utilisateur/onestation.git
cd onestation/frontend

Installez les dépendances :

Copier le code suivant :
npm install

Démarrez l'application en mode développement :

Copier le code suivant :
npm run dev



Backend

Accédez au répertoire backend :

Copier le code suivant :
cd ../backend

Installez les dépendances

Copier le code suivant :

npm install

Démarrez le serveur en mode développement :

Copier le code suivant :
npm run dev


Variables d'environnement

Créez un fichier .env dans le répertoire backend et ajoutez les variables suivantes :

PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=sqlite:./database.sqlite



Structure du projet

frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── styles/
│   ├── utils/
│   └── App.jsx
│   └── main.jsx
│   └── index.css
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── .env
├── package.json
└── database.sqlite


Contributions
Les contributions sont les bienvenues. Pour contribuer :

Forkez le projet
Créez votre branche de fonctionnalité (git checkout -b feature/ma-nouvelle-fonctionnalité)
Commitez vos changements (git commit -am 'Ajout d'une nouvelle fonctionnalité')
Pushez votre branche (git push origin feature/ma-nouvelle-fonctionnalité)
Ouvrez une Pull Request
Licence
Ce projet est sous licence JOJO. Voir le fichier LICENSE pour plus de détails.
