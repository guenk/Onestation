import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ajout pour la redirection
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginpicone from "../../assets/navbarpic2.png";
import { Link } from "react-router-dom";
import { validateInputs } from "../../utils/errorInputs";

import "./style.scss";

export default function Register() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate(); // Hook pour la navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputErrors = validateInputs({ pseudo, password });

    if (Object.keys(inputErrors).length > 0) {
      setFormError(inputErrors);
    }
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Récupération de la réponse en cas d'erreur
        throw new Error(errorData.errorCode);
      }

      await response.json(); // Extraction des données de la réponse

      toast.success("Inscription réussie !");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      switch (error.message) {
        case "invalidInput":
          toast.error("Merci de respecter le format requis");
          break;
        case "emailExist":
          toast.error("Un utilisateur avec cet email existe déjà.");
          break;
        case "loginExist":
          toast.error("Un utilisateur avec ce pseudo existe déjà.");
          break;
        default:
          toast.error(error.message || "Erreur lors de l'inscription.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mainregister">
        <form onSubmit={handleSubmit} className="register-form">
          <div>
            <Link to={"/"}>
              <img className="loginpicone" src={loginpicone} alt="Logo" />
            </Link>
            <label>Pseudo:</label>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
            {formError.pseudo && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative">
                {formError.pseudo}
              </div>
            )}
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
            {formError.password && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative">
                {formError.password}
              </div>
            )}
          </div>
          <button type="submit">S'inscrire</button>
          <div className="text-center mt-4">
            <Link to={"/login"}>
              Vous avez déjà un compte?
              <button type="button" className="mt-3">
                {" "}
                Se connecter
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
