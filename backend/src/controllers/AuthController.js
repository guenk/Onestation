const models = require("../models/AuthManager");
const { generateToken } = require("../middlewares/Auth");
const Joi = require("joi");
const AuthManager = require("../models/AuthManager");
const RoleModel = require("../models/RoleModel");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%&*()_+]{10,32}$/;

/**
 * Validate register input using a Joi schema.
 * @param {object} data - The data to be validated.
 * @param {string} data.email - email
 * @param {string} data.password - password.
 * @param {string} data.login - login.
 * @returns {Joi.ValidationResult<object>} - The result of the validation.
 */
const validateInput = (data) => {
  const schema = Joi.object({
    pseudo: Joi.string().min(5).trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().regex(new RegExp(passwordRegex)).trim(),
  });

  return schema.validate(data);
};

const register = async (req, res) => {
  try {
    const { error } = validateInput(req.body);

    if (error) {
      return res.status(400).json({
        errorCode: "invalidInput",
        errorMessage: "Champs non valides",
      });
    }
    // Check if user already exist: same pseudo
    const doesPseudoAlreadyExist = await AuthManager.findByPseudo(
      req.body.pseudo
    );

    if (doesPseudoAlreadyExist.length > 0) {
      return res.status(409).json({
        errorCode: "loginExist",
        errorMessage: "Un utilisateur avec ce pseudo existe déjà.",
      });
    }

    // Check if user already exist: same email
    const doesEmailAlreadyExist = await AuthManager.findByEmail(req.body.email);

    if (doesEmailAlreadyExist.length > 0) {
      return res.status(409).json({
        errorCode: "emailExist",
        errorMessage: "Un utilisateur avec cet email existe déjà.",
      });
    }

    const response = await models.registerUser(req.body);

    if (!response || !response.IdUtilisateur || !response.email) {
      throw new Error(
        "Les informations utilisateur sont requises pour générer un token."
      );
    }

    // Générer le token uniquement si les informations utilisateur sont disponibles
    const { IdUtilisateur, email, avatar } = response; // Inclure l'avatar dans la réponse
    const token = generateToken({ IdUtilisateur, email });

    console.log("Token généré: ", token); // Ajout du log
    res
      .status(201)
      .json({ success: true, message: "Inscription réussie.", token, avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      errorCode: "generalError",
      errorMessage: "Erreur lors de l'inscription.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = validateInput(req.body);

    if (error) {
      return res.status(400).json({
        errorCode: "invalidInput",
        errorMessage: "Champs non valides",
      });
    }

    // Check if user exist (search by login / email)
    const doesUserExistByPseudo = await AuthManager.findByPseudo(
      req.body.pseudo
    );

    console.log("doesEXISTEpseudo", doesUserExistByPseudo);
    const doesUserExistByEmail = await AuthManager.findByEmail(req.body.email);

    console.log("doesEXISTEmail", doesUserExistByEmail);

    if (
      doesUserExistByPseudo.length === 0 ||
      doesUserExistByEmail.length === 0
    ) {
      return res.status(409).json({
        errorCode: "invalidCombinaison",
        errorMessage: "Informations non valides",
      });
    }

    console.log("Requête de connexion reçue:", req.body); // Ajout du log
    const { id_gamer, email, pseudo, avatar, id_role } =
      await models.authenticateUser(req.body);
    console.log("Utilisateur trouvé avec les informations suivantes:", {
      id_gamer,
      email,
    }); // Ajout du log

    // get role label
    const role = await RoleModel.getById(id_role);

    if (!id_gamer) {
      console.log("Aucun utilisateur trouvé avec ces informations.");
      res.status(401).json({
        success: false,
        message: "Aucun utilisateur trouvé avec ces informations.",
      });
    } else {
      console.log("Connexion réussie pour l'utilisateur:", {
        id_gamer,
        email,
      }); // Ajout du log
      const token = generateToken({ id_gamer, email });
      res.json({
        success: true,
        message: "Connexion réussie.",
        token,
        user: { id_gamer, email, pseudo, avatar, role },
      });
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
  passwordRegex,
};
