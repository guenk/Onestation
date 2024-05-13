import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/authActions.js";

const Profil = () => {
	const { user, token } = useSelector((state) => state.auth);
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const avatarFileName = user.avatar.split("/").pop();

	//modal management
	const handleShow = () => setShowModal(true);

	const handleClose = () => {
		setShowModal(false);
	};
	// delete management
	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			await fetch(`http://localhost:3001/api/gamer/${user.id_gamer}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch(logout());
			navigate("/");
		} catch (err) {
			console.error("Error deleting user:", err);
		}
	};

  return (
    <div>
      <Header />
      <div className="bg-profil">
        <div className="font-bold text-center text-2xl mt-20 ">
          <h2>
            <span className="text-[#FE2C65]">Bienvenue </span>
            <span className="text-[#FFB401]">sur Guess </span>
            <span className="text-[#0B8DFD]">My Draw !</span>
          </h2>
          <h2 className="text-[#FE2C65] my-16">Mon compte</h2>
        </div>
        <div className="mt-6 mx-auto max-w-xl bg-[#F7F6F6] rounded-3xl p-5 flex justify-between">
          <div className="flex items-center">
            <div className="w-40 h-40 overflow-hidden rounded-full">
              <img
                src={user?.avatar}
                alt="avatar"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="text-lg ml-6">
              <p className="pb-2">
                Pseudo: <span className="text-gray-500">{user?.pseudo}</span>{" "}
              </p>
              <p className="pb-2">
                Email: <span className="text-gray-500">{user?.email}</span>
              </p>
              <p>
                Mot de passe:{" "}
                <span className="text-gray-500">************</span>{" "}
              </p>
            </div>
          </div>
          <div className="self-top text-2xl">
            <Link to={`/profil/modification/${user?.id_gamer}`}>
              <button>
                <FontAwesomeIcon icon={faPen} className="text-[#0B8DFD] me-5" />
              </button>
            </Link>
              <button onClick={handleShow}>
                <FontAwesomeIcon icon={faTrash} className="text-[#FE2C65]" />
              </button>
            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg text-sm">
                  <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                  <div className="mt-10 flex justify-end">
                    <button
                      className="bg-[#FE2C65] text-white px-4 py-2 rounded mr-4 hover:font-bold"
                      onClick={handleDelete}
                    >
                      Supprimer
                    </button>
                    <button
                      className="bg-[#FFB401] text-white px-4 py-2 rounded hover:font-bold"
                      onClick={handleClose}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
