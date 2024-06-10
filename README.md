
# OneStation

OneStation est une application de Pictionary en ligne construite avec React pour le frontend et Node.js avec Express pour le backend. L'application permet aux utilisateurs de jouer au Pictionary en temps réel avec d'autres joueurs.

## Fonctionnalités

- 🎨 Jeu de Pictionary en temps réel
- 🖥️ Interface utilisateur moderne et réactive
- 🔒 Authentification des utilisateurs
- 🗄️ Stockage des données de jeu dans une base de données SQLite
- 📡 Notifications en temps réel via Socket.io

## Technologies utilisées

### Frontend

- React
- Redux
- React Router
- Tailwind CSS
- Socket.io-client
- Vite

### Backend

- Node.js
- Express
- Socket.io
- SQLite
- bcrypt pour le hachage des mots de passe
- jsonwebtoken pour l'authentification

## Installation

### Prérequis

- Node.js
- npm

### Frontend

1. **Clonez le dépôt :**

   \`\`\`bash
   git clone https://github.com/guenk/onestation.git
   cd onestation/frontend
   \`\`\`

2. **Installez les dépendances :**

   \`\`\`bash
   npm install
   \`\`\`

3. **Démarrez l'application en mode développement :**

   \`\`\`bash
   npm run dev
   \`\`\`

### Backend

1. **Accédez au répertoire backend :**

   \`\`\`bash
   cd ../backend
   \`\`\`

2. **Installez les dépendances :**

   \`\`\`bash
   npm install
   \`\`\`

3. **Démarrez le serveur en mode développement :**

   \`\`\`bash
   npm run dev
   \`\`\`

### Variables d'environnement

Créez un fichier \`.env\` dans le répertoire \`backend\` et ajoutez les variables suivantes :

\`\`\`plaintext
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=sqlite:./database.sqlite
\`\`\`

## Structure du projet


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
\`\`\`

## Contributions

Les contributions sont les bienvenues. Pour contribuer :

1. **Forkez le projet**
2. **Créez votre branche de fonctionnalité** (\`git checkout -b feature/ma-nouvelle-fonctionnalité\`)
3. **Commitez vos changements** (\`git commit -am 'Ajout d'une nouvelle fonctionnalité'\`)
4. **Pushez votre branche** (\`git push origin feature/ma-nouvelle-fonctionnalité\`)
5. **Ouvrez une Pull Request**

## Licence

Ce projet est sous licence MIT. Voir le fichier \`LICENSE\` pour plus de détails.
