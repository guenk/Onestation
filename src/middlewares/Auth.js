const jwt = require('jsonwebtoken');

// Clé secrète
const SECRET_KEY = 'gyfNtfLR/7JZefCb4WmstHGQCQzCGcfiVvUrMe4CaTE=';

// Middleware pour authentifier les tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Fonction pour générer un JWT
const generateToken = (email, password) => {
  // Remplacez cette fonction par l'appel à votre modèle de base de données pour authentifier l'utilisateur
  // et obtenir son ID et son email.

  // Fonction fictive pour illustrer l'exemple
  const authenticateUser = (email, password) => {
    if (email === 'utilisateur@example.com' && password === 'motdepasse') {
      return { IdUtilisateur: 1, Email: email };
    }
    return null;
  };

  const user = authenticateUser(email, password);

  if (!user) return res.sendStatus(401);

  return jwt.sign({ userId: user.IdUtilisateur, email: user.Email }, SECRET_KEY, { expiresIn: '24h' });
};

module.exports = { authenticateToken, generateToken };