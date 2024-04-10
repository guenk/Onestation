const RoleModel = require("../models/RoleModel");

const findById = async (req, res) => {
  const { id } = req.body;

  try {
    const role = await RoleModel.getById(id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: `Rôle non trouvé: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  findById,
};
