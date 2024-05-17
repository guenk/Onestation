import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/authActions";

const GamePlayers = () => {
	const dispatch = useDispatch();

	// Sélectionner les informations du joueur depuis le store Redux
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	// Mettre à jour l'id_role du joueur si nécessaire
	useEffect(() => {
		if (user && user.id_role !== 3) {
			const { pseudo, email, avatar } = user;
			dispatch(updateUser(pseudo, email, avatar));
		}
	}, [dispatch, user?.id_role, user?.pseudo, user?.email, user?.avatar]);

	// Récupérer le nom du fichier avatar
	const avatarFileName = user?.avatar?.split("/").pop();

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div id="game-players" className="flex gap-5 h-20">
			<img
				className="h-8 w-8 rounded-full"
				src={`${import.meta.env.VITE_BACKEND_URL}/static/${avatarFileName}`}
				alt="Description de l'image"
			/>
			<div className="flex flex-col justify-center">
				<p>{user.pseudo}</p>0 points
			</div>
		</div>
	);
};

export default GamePlayers;
