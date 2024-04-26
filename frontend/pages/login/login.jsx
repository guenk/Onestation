import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from '../../src/redux/authActions';
import loginpicone from '../../src/assets/mainlogo.webp';
import "./style.scss";

export default function Login() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, email, password }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      console.log("Connexion réussie:", data);
      dispatch(loginSuccess(data.token, data.user));
      // Dispatch de l'action loginSuccess avec le token et les infos utilisateurs
      toast.success("Connexion réussie !");
      navigate("/"); // Redirection vers la page d'accueil
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      toast.error("Erreur lors de la connexion.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mainlogin">
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </>
  );
}
