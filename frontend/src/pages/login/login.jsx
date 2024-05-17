import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../redux/authActions";
import loginpicone from "../../assets/navbarpic2.png";
import { validateInputs } from "../../utils/errorInputs";
import "./style.scss";

export default function Login() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Ajout de useDispatch

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputErrors = validateInputs({ pseudo, password });

    if (Object.keys(inputErrors).length > 0) {
      setFormError(inputErrors);
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
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

      const data = await response.json();
      const { token, user } = data;
      console.log("Connexion réussie:", data);
      dispatch(loginSuccess(token, user));
      toast.success("Connexion réussie !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      switch (error.message) {
        case "invalidInput":
          toast.error("Merci de respecter le format requis");
          break;
        case "invalidCombinaison":
          toast.error(
            "Identifiants (pseudo / email) et/ou mot de passe incorrect."
          );
          break;
        default:
          toast.error(error.message || "Erreur lors de la connexion.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mainlogin">
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Se connecter</button>
          <div className="text-center mt-4">
            <Link to={"/register"}>
              Vous n'avez pas encore de compte?
              <button type="button" className="mt-3">
                S'inscrire
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
