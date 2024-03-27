const express = require("express");
const gamerRouter = require("./src/routes/GamerRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/", gamerRouter);

// Démarrer le serveur
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
