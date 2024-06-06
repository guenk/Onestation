const db = require("../utils/database");

class GamerModel {
  /**
   * Recherche un joueur par son identifiant et renvoie uniquement certaines données et son rôle.
   * @param {number} idGamer - L'identifiant du joueur.
   * @returns {Promise<Object>} Une promesse contenant les informations du joueur trouvé.
   */
  static getById(idGamer) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT *
      FROM Gamer 
      INNER JOIN Role ON Gamer.id_role = Role.id_role 
      WHERE id_gamer = ?
      `;
      db.get(query, [idGamer], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row : {});
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
        "UPDATE Gamer SET pseudo = ?, email = ?, password = ?, avatar = ? WHERE id_gamer = ?";
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
      const query = "DELETE FROM Gamer WHERE id_gamer = ?";
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
