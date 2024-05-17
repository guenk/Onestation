const db = require("../utils/database");

class RoleModel {
  /**
   * Récupérer toutes les informations du role
   * @param {number} idRole - L'identifiant du rôle
   * @returns {Promise<Object>} Une promesse contenant les informations du jeu .
   */
  static async getRoles() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Role";
      db.all(query, [], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Récupérer le rôle d'un utilisateur
   * @param {number} label - le rôle
   * @returns {Promise<Object>} Une promesse contenant l'id du rôle indiqué.
   */
  static async getIdByLabel(label) {
    return new Promise((resolve, reject) => {
      const query = "SELECT id_role FROM Role WHERE label = ?";
      db.get(query, [label], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Récupérer le rôle d'un utilisateur
   * @param {number} idRole - L'identifiant du rôle
   * @returns {Promise<Object>} Une promesse contenant les informations du jeu .
   */
  static async getById(idRole) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Role WHERE id_role = ?";
      db.get(query, [idRole], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = RoleModel;
