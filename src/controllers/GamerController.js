const GamerModel = require("../models/GamerModel.js");

const getById = async (req, res) => {
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

const updateGamer = async (req, res) => {
  const { id } = req.params;
  const { pseudo, email, password, avatar } = req.body;

  try {
    const result = await GamerModel.updateGamer(
      id,
      pseudo,
      email,
      password,
      avatar
    );
    res.status(200).json({ success: true, message: "Mise à jour effectuée!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteGamer = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await GamerModel.deleteGamer(id);
    res.status(200).json({ success: true, message: "Joueur supprimé!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getById,
  updateGamer,
  deleteGamer,
};
