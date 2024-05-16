import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/authActions.js";
import { Tooltip } from "react-tooltip";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profil = () => {
	const { user, token } = useSelector((state) => state.auth);
	const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const avatarFileName = user?.avatar.split("/").pop();

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

  // dispatch toast success for update profil
  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

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
        <ToastContainer />
        <div className="mt-6 mx-auto max-w-xl bg-[#F7F6F6] rounded-3xl p-5">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <div className="mb-4 sm:mb-0 sm:mr-4">
              <div className="w-40 h-40 overflow-hidden rounded-full avatar">
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/static/${avatarFileName}`}
                  alt="avatar"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="text-lg text-center sm:text-left">
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
          <div className="flex justify-center mt-4">
            <Link to={`/profil/modification/${user?.id_gamer}`}>
              <button
                data-tip
                data-tooltip-id="tooltip-modification"
                data-tooltip-content="Modifier mon profil"
                className="me-5"
              >
                <FontAwesomeIcon icon={faPen} className="text-[#0B8DFD] icon" />
                <Tooltip id="tooltip-modification" effect="solid"></Tooltip>
              </button>
            </Link>
            <button
              onClick={handleShow}
              data-tip
              data-tooltip-id="tooltip-suppression"
              data-tooltip-content="Supprimer mon profil"
              className="ms-5"
            >
              <FontAwesomeIcon icon={faTrash} className="text-[#FE2C65] icon" />
              <Tooltip id="tooltip-suppression" effect="solid"></Tooltip>
            </button>
          </div>
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
  );
};

export default Profil;
