const db = require("../utils/database.js");

class GamerModel {
  /**
   * Recherche un joueur par son identifiant.
   * @param {number} idGamer - L'identifiant du joueur.
   * @returns {Promise<Object>} Une promesse contenant les informations du joueur trouvé.
   */
  static findById(idGamer) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT *, Role.label
      FROM Gamer 
      INNER JOINT Role ON Gamer.idRole = Role.idRole 
      WHERE idGamer = ?
      `;
      db.get(query, [idGamer], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Met à jour les informations d'un joueur.
   * @param {number} idGamer - L'identifiant du joueur.
   * @param {string} pseudo - Le pseudo du joueur.
   * @param {string} email - L'email du joueur.
   * @param {string} password - Le mot de passe du joueur.
   * @param {string} avatar - L''avatar du joueur.
   * @returns {Promise<Object>} Une promesse contenant le résultat de la mise à jour.
   */
  static updateGamer(idGamer, pseudo, email, password, avatar) {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE Gamer SET pseudo = ?, email = ?, password = ?, avatar = ? WHERE idGamer = ?";
      db.run(query, [pseudo, email, password, avatar, idGamer], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Supprime un joueur.
   * @param {number} idGamer  L'identifiant du joueur à supprimer.
   * @returns {Promise<Object>} Une promesse contenant le résultat de la suppression.
   */
  static async deleteGamer(idGamer) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Gamer WHERE idGamer = ?";
      db.get(query, [idGamer], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = GamerModel;
