const GamerModel = require("../models/GamerModel");
const Joi = require("joi");
const { passwordRegex } = require("./AuthController");

const validateInput = (data) => {
  const schema = Joi.object({
    pseudo: Joi.string().trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().regex(new RegExp(passwordRegex)).trim(),
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

  const { error } = validateInput(req.body);

  if (error) {
    return res.status(400).json({
      errorCode: "invalidInput",
      errorMessage: "invalid input",
    });
  }

  const { pseudo, email, password, avatar } = req.body;

  try {
    await GamerModel.updateGamer(id, pseudo, email, password, avatar);
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
