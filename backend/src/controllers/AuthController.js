const models = require("../models/AuthManager");
const { generateToken } = require("../middlewares/Auth");

const register = async (req, res) => {
  try {
    const { IdUtilisateur } = await models.registerUser(req.body);

    const token = generateToken({ IdUtilisateur, ...req.body });
    res
      .status(201)
      .json({ success: true, message: "Inscription réussie.", token });
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
    const { IdUtilisateur, Email } = await models.auth.authenticateUser(
      req.body
    );

    if (!IdUtilisateur) {
      res.status(401).json({
        success: false,
        message: "Aucun utilisateur trouvé avec ces informations.",
      });
    } else {
      const token = generateToken({ IdUtilisateur, Email });
      res.json({ success: true, message: "Connexion réussie.", token });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Erreur lors de la connexion." });
  }
};

module.exports = {
  register,
  login,
};
