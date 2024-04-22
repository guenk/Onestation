import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginpicone from '../../src/assets/mainlogo.webp';
import mainpic from '../../src/assets/mainpic.png';
import "./style.scss";

export default function Register() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo, email, password }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      const data = await response.json();
      console.log('Inscription réussie:', data);
      // Gérer la réussite, par exemple en redirigeant l'utilisateur ou en stockant le token JWT
      toast.success("Inscription réussie !");
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      toast.error("Erreur lors de l'inscription.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mainregister">
      <form onSubmit={handleSubmit} className="register-form">
        <div>
        <img className="loginpicone" src={loginpicone} alt="loginpicone" />
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