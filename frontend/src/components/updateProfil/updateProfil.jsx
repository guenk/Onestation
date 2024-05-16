import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateUser } from "../../redux/authActions";

const UpdateProfil = () => {
	const { user, token } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

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
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			await fetch(`http://localhost:3001/api/gamer/${user.id_gamer}`, {
				method: "UPDATE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch(updateUser());
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
					<h2 className="text-[#FE2C65] my-16">Modifier son compte</h2>
				</div>
				<div className="mt-6 mx-auto max-w-xl bg-[#F7F6F6] rounded-3xl p-5 flex justify-between">
					<div className="flex items-center">
						<div className="w-40 h-40 overflow-hidden rounded-full">
							<img
								className="h-full w-full object-cover object-center hover:opacity-75 cursor-pointer "
								src={getImageUrl(currentIndex)}
								alt="Description de l'image"
								onClick={handleClick}
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
					<div className="self-top text-2xl"></div>
				</div>
			</div>
		</div>
	);
};

export default UpdateProfil;
