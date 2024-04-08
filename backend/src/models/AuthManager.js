const AbstractManager = require("./AbstractManager");
const bcrypt = require("bcrypt");
const db = require("../utils/database");
const RoleModels = require("../models/RoleModels");

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
    const defaultRole = await RoleModels.findIdByLabel("Gamer");
  
    // Préparation et exécution de la requête d'insertion
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Gamer (pseudo, email, password, id_role) VALUES (?, ?, ?, ?)`;
      db.get(
        query,
        [pseudo, email, hashedPassword, defaultRole.id_role],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row ? [row] : []);
          }
        }
      );
    });
  }

  static async authenticateUser({ email, password }) {
    const users = await this.findByEmail(email);
    if (users.length === 0) {
      throw new Error("Aucun utilisateur trouvé avec cet email.");
    }

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Mot de passe incorrect.");
    }

    return { IdUtilisateur: user.IdUtilisateur, email: user.email }; // Retourne un objet utilisateur simplifié
  }
}

module.exports = AuthManager;
