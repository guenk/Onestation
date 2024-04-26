import React from 'react';
import './style.scss'; 


const Rules = () => {
  return (
    <div className="rules-container"> {/* Ajoute cette classe pour englober et centrer le contenu */}
      <div className="rules">
        <h1>Règles du Jeu</h1>
        <p>Bienvenue sur la page des règles. Voici comment jouer :</p>
        
        <div className="rule-section">
          <h3>À chaque tour de rôle, les joueurs doivent faire deviner un mot en dessinant.</h3>
          <h2>Si tu es le dessinateur :</h2>
          <p>Choisis parmi 10 mots dans la liste proposée celui de ton choix.</p>
          <p>Le temps pour dessiner est de 80 secondes.</p>
          <p>Interdiction de faire deviner le mot en l'écrivant !</p>
        </div>

        <div className="rule-section">
          <h2>Si tu es la personne qui devine :</h2>
          <p>Tu disposes de 80 secondes pour taper le mot dans le Chat.</p>
          <p>Sois rapide pour amasser le plus de points possibles !</p>
        </div>

      </div>
    </div>
  );
}

export default Rules;