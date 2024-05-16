import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import Header from "../../components/header/Header";
import { updateUser } from "../../redux/authActions";
import { validateInputs } from "../../utils/errorInputs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfil = () => {
	const { user, token } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const avatarFileName = user?.avatar.split("/").pop();

  const [formData, setFormData] = useState({
    pseudo: user.pseudo,
    email: user.email,
    avatar: user.avatar,
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [isModified, setIsModified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsModified(true);
  };

  const imageNumbers = Array.from({ length: 11 }, (_, i) => i + 1); // Génère un tableau de 1 à 11
	const initialImageIndex = 5; // L'index initial correspondant à l'image 6 (av6.png)
	const [currentIndex, setCurrentIndex] = useState(initialImageIndex);

	// Fonction pour récupérer l'URL de l'image actuelle
	const getImageUrl = (index) => `http://localhost:8080/static/av${index}.png`;

	// Fonction de gestion du clic
	const handleClick = () => {
		setCurrentIndex((prevIndex) => {
			// Calcul du nouvel index, en revenant à 1 si on dépasse 11
			const newIndex = prevIndex >= 11 ? 1 : prevIndex + 1;
			return newIndex;
		});
	};

	// update management
	const handleSubmit = async (e) => {
		e.preventDefault();

    const updatedFormData = {};
    const inputErrors = validateInputs(formData);

    if (Object.keys(inputErrors).length > 0) {
      setFormError(inputErrors);
      return;
    }

    try {
      if (formData.pseudo !== user.pseudo) {
        updatedFormData.pseudo = formData.pseudo;
      }
      if (formData.email !== user.email) {
        updatedFormData.email = formData.email;
      }
      if (formData.avatar !== user.avatar) {
        updatedFormData.avatar = formData.avatar;
      }
      if (formData.password !== "") {
        updatedFormData.password = formData.password;
      }

      const response = await fetch(
        `http://localhost:3001/api/gamer/${user.id_gamer}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorCode);
      }

      setIsModified(false);
      dispatch(
        updateUser(
          updatedFormData.pseudo,
          updatedFormData.email,
          updatedFormData.avatar
        )
      );

      navigate(`/profil/${user.id_gamer}`, {
        state: {
          successMessage: "Votre profil a bien été modifié avec succès !",
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      switch (error.message) {
        case "invalidInput":
          toast.error("Merci de respecter le format requis");
          break;
        case "loginExist":
          toast.error("Un utilisateur avec ce pseudo existe déjà.");
          break;
        case "emailExist":
          toast.error("Un utilisateur avec cet email existe déjà.");
          break;
        default:
          toast.error("Erreur lors de la modification de votre profil !");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="updateProfil">
        <div className="font-bold text-center text-2xl mt-20 ">
          <h2>
            <span className="text-[#FE2C65]">Bienvenue </span>
            <span className="text-[#FFB401]">sur Guess </span>
            <span className="text-[#0B8DFD]">My Draw !</span>
          </h2>
          <h2 className="my-16 mb-10">
            <span className="text-[#FFB401]">Modifier </span>
            <span className="text-[#0B8DFD]">mon </span>
            <span className="text-[#FE2C65]">profil </span>
          </h2>
        </div>
        <div className="flex justify-center">
          <Link
            to={`/profil/${user.id_gamer}`}
            className="text-blue-500 underline"
          >
            <button type="button" className="buttonBack">
              Retour
            </button>
          </Link>
        </div>
        <div className="mt-6 mx-auto max-w-xl bg-[#F7F6F6] rounded-3xl p-5">
          <form
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
            <div className="flex justify-center items-center">
              <label className="w-40 h-40 overflow-hidden rounded-full border avatar">
                <img
                className="h-full w-full object-cover object-center hover:opacity-75 cursor-pointer"
                  src={getImageUrl(currentIndex)}
                  alt="avatar"
                  onClick={handleClick}
                />
              </label>
              {/* TODO: wip */}
              {/* <input
                id="avatarInput"
                type="file"
                hidden
                name="avatar"
                className="mx-4 my-2 border border-0"
                // onChange={}
              />
              <label
                htmlFor="avatarInput"
                className="avatarTooltip px-2 position-absolute bottom-0 start-100 translate-middle-x"
              >
                <div
                  className="flex items-center gap-2"
                  data-tip
                  data-tooltip-id="tooltip-profil"
                  data-tooltip-content="Changer mon avatar"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <Tooltip id="tooltip-profil" effect="solid"></Tooltip>
                </div>
              </label> */}
              </div>
              <div className="sm:col-span-1 flex flex-col">
                  <label className="pb-2 w-32"> Pseudo: </label>
                  <input
                    type="text"
                    name="pseudo"
                    value={formData.pseudo}
   
                    onChange={handleChange}
                    className="border rounded px-3 py-1 mb-4"
                  />
                  {formError.pseudo && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative">
                    {formError.pseudo}
                  </div>
                )}
                </div>

                <label className="pb-2 w-32">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded px-3 py-1"
                />

                <label className="py-4">Mot de passe:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="*********"
                  value={formData.password}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 mb-4"
                />
                {formError.password && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative ">
                    {formError.password}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="mt-5" disabled={!isModified}>
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
