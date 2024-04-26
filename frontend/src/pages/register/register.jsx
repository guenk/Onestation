import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ajout pour la redirection
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginpicone from '../../assets/mainlogo.webp';

import "./style.scss";

export default function Register() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook pour la navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', { // Assurez-vous que l'URL est correcte
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Récupération de la réponse en cas d'erreur
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      const data = await response.json(); // Extraction des données de la réponse
      console.log('Inscription réussie:', data);
      toast.success("Inscription réussie !");
      navigate('/login'); // Rediriger vers la page de connexion ou autre selon le besoin
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      toast.error(error.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mainregister">
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <img className="loginpicone" src={loginpicone} alt="Logo" />
          <label>Pseudo:</label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      </div>
    </>
  );
}