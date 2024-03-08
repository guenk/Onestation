const connexionBD = require('./src/utils/connexionBD.js')

connexionBD.connect()
    .then(data => console.log("Connexion réussie"));