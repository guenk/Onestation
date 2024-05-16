const GamerModel = require("../models/GamerModel");
const AuthManager = require("../models/AuthManager");
const Joi = require("joi");
const { passwordRegex } = require("./AuthController");
const bcrypt = require("bcrypt");

const validateInput = (data) => {
  const schema = Joi.object({
    pseudo: Joi.string().trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().regex(new RegExp(passwordRegex)).trim(),
    avatar: Joi.string().allow(""),
  });

  return schema.validate(data);
};

const validateUpdateInput = (data) => {
  const schema = Joi.object({
    pseudo: Joi.string().trim().allow(""),
    email: Joi.string().email().trim().allow(""),
    password: Joi.string().regex(new RegExp(passwordRegex)).trim().allow(""),
    avatar: Joi.string().allow(""),
  });

  return schema.validate(data);
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const gamer = await GamerModel.getById(id);
    if (gamer) {
      res.status(200).json(gamer);
    } else {
      res.status(404).json({ message: `Aucun joueur trouvé avec l'ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const editGamer = async (req, res) => {
  const { id } = req.params;
  const { error } = validateUpdateInput(req.body);

  if (error) {
    return res.status(400).json({
      errorCode: "invalidInput",
      errorMessage: "invalid input",
    });
  }

  const { pseudo, email, password, avatar } = req.body;

  try {
    const currentUser = await GamerModel.getById(id);
    let updatedPseudo = currentUser.pseudo;
    let updatedEmail = currentUser.email;
    let updatedPassword = currentUser.password;
    let updatedAvatar = currentUser.avatar;

    if (pseudo && pseudo !== currentUser.pseudo) {
      const doesPseudoAlreadyExist = await AuthManager.findByPseudo(pseudo);
      if (doesPseudoAlreadyExist.length > 0) {
        return res.status(409).json({
          errorCode: "loginExist",
          errorMessage: "Un utilisateur avec ce pseudo existe déjà.",
        });
      }
      updatedPseudo = pseudo;
    }
    if (email && email !== currentUser.email) {
      const doesEmailAlreadyExist = await AuthManager.findByEmail(email);
      if (doesEmailAlreadyExist.length > 0) {
        return res.status(409).json({
          errorCode: "emailExist",
          errorMessage: "Un utilisateur avec cet email existe déjà.",
        });
      }
      updatedEmail = email;
    }
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updatedPassword = hashPassword;
    }
    if (avatar && avatar !== currentUser.avatar) {
      updatedAvatar = avatar;
    }

    await GamerModel.updateGamer(
      id,
      updatedPseudo,
      updatedEmail,
      updatedPassword,
      updatedAvatar
    );
    res.status(200).json({ success: true, message: "Mise à jour effectuée!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const removeGamer = async (req, res) => {
  const { id } = req.params;

  try {
    await GamerModel.deleteGamer(id);
    res.status(200).json({ success: true, message: "Joueur supprimé!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  findById,
  editGamer,
  removeGamer,
};
