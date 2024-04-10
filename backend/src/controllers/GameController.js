const GameModel = require("../models/GameModel");

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await GameModel.getById(id);
    if (game) {
      res.status(200).json(game);
    } else {
      res
        .status(404)
        .json({ message: `Aucun jeu trouvé ne correspond à cet id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  findById,
};
