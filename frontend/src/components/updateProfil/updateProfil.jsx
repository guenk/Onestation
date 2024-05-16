import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Header from "../../components/header/Header";
import { updateUser } from "../../redux/authActions";
import { validateInputs } from "../../utils/errorInputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const UpdateProfil = () => {
	const { user, token } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const avatarFileName = user?.avatar.split("/").pop();

	const [formData, setFormData] = useState({
		pseudo: "",
		email: "",
		avatar: "",
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

		const inputErrors = validateInputs({ pseudo, password });

		if (Object.keys(inputErrors).length > 0) {
			setFormError(inputErrors);
		}

		try {
			await fetch(`http://localhost:3001/api/gamer/${user.id_gamer}`, {
				method: "UPDATE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			setIsModified(false);
			dispatch(updateUser());
			navigate(`/profil/${user.id_gamer}`);
		} catch (err) {
			console.error("Error deleting user:", err);
		}
	};

	return (
		<div className="">
			<Header />
			<div className="updateProfil">
				<div className="font-bold text-center text-2xl mt-20 ">
					<h2>
						<span className="text-[#FE2C65]">Bienvenue </span>
						<span className="text-[#FFB401]">sur Guess </span>
						<span className="text-[#0B8DFD]">My Draw !</span>
					</h2>
					<h2 className="my-16">
						<span className="text-[#FFB401]">Modifier </span>
						<span className="text-[#0B8DFD]">mon </span>
						<span className="text-[#FE2C65]">profil </span>
					</h2>
				</div>
				<div className="mt-6 mx-auto max-w-xl bg-[#F7F6F6] rounded-3xl p-5 flex justify-between">
					<form
						onSubmit={handleSubmit}
						method="POST"
						action="/upload"
						encType="multipart/form-data"
					>
						<div className="flex items-center gap-5">
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
							<div className="grid grid-cols-1 gap-y-3">
								<div className="flex items-center">
									<label className="pb-2 w-32"> Pseudo: </label>
									<input
										type="text"
										name="pseudo"
										value={formData.pseudo}
										placeholder={user.pseudo}
										onChange={handleChange}
										className="border rounded px-3 py-1"
									/>
								</div>

								<div className="flex items-center">
									<label className="pb-2 w-32">Email:</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										placeholder={user.email}
										onChange={handleChange}
										className="border rounded px-3 py-1"
									/>
								</div>

								<div className="flex items-center">
									<label className="pb-2 w-32">Mot de passe:</label>
									<input
										type="password"
										name="password"
										value={formData.password}
										placeholder="*********"
										onChange={handleChange}
										className="border rounded px-3 py-1"
									/>
								</div>
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
