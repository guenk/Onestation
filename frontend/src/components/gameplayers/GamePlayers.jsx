import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/authActions";

const GamePlayers = ({ socket, roomID }) => {

	const [players, setPlayers] = useState([]);

	useEffect(() => {
				socket.on("player_joined", ({ players }) => {
					setPlayers(players);
				});

				socket.on("player_left", ({ players }) => {
					setPlayers(players);
				})
	});

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

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div id="game-players" className="flex flex-col gap-5 p-5 bg-slate-100 border rounded-xl">
			{
				players.map((player) => {
					return (
						<div key={player.id} className="flex gap-5 items-center justify-center">
							<img
								className="h-8 w-8 rounded-full"
								src={`${import.meta.env.VITE_BACKEND_URL}/static/${player?.profil.avatar?.split("/").pop()}`}
								alt="Description de l'image"
							/>
							<p>{player.profil.username}</p>
						</div>
					);
				})
			}
		</div>
	);
};

export default GamePlayers;