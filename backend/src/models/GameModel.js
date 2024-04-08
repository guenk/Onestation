const db = require("../utils/database.js");

class GamerModel {
  /**
   * Afficher les infos du jeu
   * @param {number} idGame - L'identifiant du jeu.
   * @returns {Promise<Object>} Une promesse contenant les informations du jeu .
   */
  static async findById(idGame) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Game WHERE idGame = ?";
      db.get(query, [idGame], (err, row) => {
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
