const db = require("../utils/database");

class RoleModel {
  roles = ["Admin", "Moderator", "Gamer", "GameHoster", "GamePlayer"];

  /**
   * Récupère tous les rôles définis dans le but de pouvoir les modifier en dynamique dans le front.
   * Pas de modification du role via la bdd.
   * @returns {Array<string>}
   */
  get Role() {
    return this.roles;
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
}

module.exports = RoleModel;
