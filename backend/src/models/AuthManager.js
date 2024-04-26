const AbstractManager = require("./AbstractManager");
const bcrypt = require("bcrypt");
const db = require("../utils/database");
const RoleModel = require("./RoleModel");

class AuthManager extends AbstractManager {
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT * FROM Gamer WHERE email = ?
      `;
      db.get(query, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? [row] : []);
        }
      });
    });
  }

  static async registerUser({ pseudo, email, password }) {
    // Vérification de l'email existant
    const existingUsers = await this.findByEmail(email);

    if (existingUsers.length > 0) {
        throw new Error("Un utilisateur avec cet email existe déjà.");
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajout du rôle "Joueur" par défaut
    const defaultRole = await RoleModel.getIdByLabel("Gamer");

    // Sélection aléatoire d'un avatar du dossier assets
    const avatars = [
        "backend/src/assets/av1.png",
        "backend/src/assets/av2.png",
        "backend/src/assets/av3.png",
        "backend/src/assets/av4.png",
        "backend/src/assets/av5.png",
        "backend/src/assets/av6.png",
        "backend/src/assets/av7.png",
        "backend/src/assets/av8.png",
        "backend/src/assets/av9.png",
        "backend/src/assets/av10.png",
        "backend/src/assets/av11.png"
        // Ajouter d'autres chemins selon les avatars disponibles
    ];
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];

    // Préparation et exécution de la requête d'insertion
    try {
        const result = await new Promise((resolve, reject) => {
            const query = `INSERT INTO Gamer (pseudo, email, password, id_role, avatar) VALUES (?, ?, ?, ?, ?)`;
            db.run(query, [pseudo, email, hashedPassword, defaultRole.id_role, avatar], function(err) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Utilisateur inséré avec succès. ID:", this.lastID);
                    resolve({ IdUtilisateur: this.lastID, email, avatar }); // Renvoyer les informations utilisateur
                }
            });
        });
        console.log("Informations utilisateur enregistrées:", result);
        return result;
    } catch (error) {
        console.error("Erreur lors de l'insertion:", error);
        throw error; // Relance l'erreur pour la gestion externe
    }
}

static async authenticateUser({ email, password }) {
  console.log("Email reçu pour l'authentification:", email); // Ajout du log
  const users = await this.findByEmail(email);
  console.log("Utilisateurs trouvés avec l'email:", users); // Ajout du log
  if (users.length === 0) {
      throw new Error("Aucun utilisateur trouvé avec cet email.");
  }

  const user = users[0];
  console.log("Mot de passe de l'utilisateur trouvé:", user.password); // Ajout du log
  const isValid = await bcrypt.compare(password, user.password);
  console.log("Mot de passe valide:", isValid); // Ajout du log

  if (!isValid) {
      throw new Error("Mot de passe incorrect.");
  }

  return { IdUtilisateur: user.id_gamer, email: user.email };
}
}

module.exports = AuthManager;
