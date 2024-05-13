const models = require("../models/AuthManager");
const gamerModels = require("../models/GamerModel");
const { generateToken } = require("../middlewares/Auth");

const register = async (req, res) => {
  try {
    const response = await models.registerUser(req.body);

    if (!response || !response.IdUtilisateur || !response.email) {
      throw new Error(
        "Les informations utilisateur sont requises pour générer un token."
      );
    }

    // Générer le token uniquement si les informations utilisateur sont disponibles
    const { IdUtilisateur, email, avatar } = response; // Inclure l'avatar dans la réponse
    const token = generateToken({ IdUtilisateur, email });

    console.log("Token généré:", token); // Ajout du log
    res.status(201).json({ success: true, message: "Inscription réussie.", token, avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'inscription.",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    console.log("Requête de connexion reçue:", req.body); // Ajout du log
    const { id_gamer, email, pseudo, avatar, id_role } = await models.authenticateUser(req.body);
    console.log("Utilisateur trouvé avec les informations suivantes:", {
      id_gamer,
      email
    }); // Ajout du log

    if (!id_gamer) {
      console.log("Aucun utilisateur trouvé avec ces informations.");
      res.status(401).json({
        success: false,
        message: "Aucun utilisateur trouvé avec ces informations.",
      });
    } else {
      // const user = await gamerModels.getById(IdUtilisateur);
      console.log("Connexion réussie pour l'utilisateur:", {
        id_gamer,
        email,
      }); // Ajout du log
      const token = generateToken({ id_gamer, email });
      res.json({ success: true, message: "Connexion réussie.", token, user: { id_gamer, email, pseudo, avatar, id_role} });
    }
  } catch (err) {
    console.error("Erreur lors de la connexion:", err); // Ajout du log
    res
      .status(500)
      .json({ success: false, message: "Erreur lors de la connexion." });
  }
};

module.exports = {
  register,
  login,
};
