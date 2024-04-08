const jwt = require('jsonwebtoken');

// Clé secrète
const SECRET_KEY = 'gyfNtfLR/7JZefCb4WmstHGQCQzCGcfiVvUrMe4CaTE=';

// Middleware pour authentifier les tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.sendStatus(401); // Pas de token fourni

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403); // Token invalide
    req.user = decoded;
    next();
  });
};

// Fonction pour générer un JWT basé sur un objet utilisateur
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id_gamer, email: user.email }, // Utilisation de la casse correcte
    SECRET_KEY, 
    { expiresIn: '24h' }
  );
};

module.exports = { authenticateToken, generateToken };