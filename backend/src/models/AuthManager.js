const AbstractManager = require("./AbstractManager");
const bcrypt = require("bcrypt");
const db = require("../utils/database");

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
          resolve(row);
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

    // Ajout du role Joueur par défaut
    const defaultRole = `SELECT id_role FROM Role WHERE label = 'Gamer'`;
    // Préparation et exécution de la requête d'insertion
    const query = `INSERT INTO ${this.table} (pseudo, email, password, idRole) VALUES (?, ?, ?, ?)`;
    try {
      const [result] = await this.database.query(query, [
        pseudo,
        email,
        hashedPassword,
        defaultRole.id_role,
      ]);
      console.info("Résultat de l'insertion:", result);
      return { IdUtilisateur: result.insertId };
    } catch (error) {
      console.error("Erreur lors de l'insertion:", error);
      throw error; // Relance l'erreur pour la gestion externe
    }
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
