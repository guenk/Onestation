import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function GamePlayers({ players }) {
	const user = useSelector((state) => state.auth.user);
	const [initializedPlayers, setInitializedPlayers] = useState([]);

	useEffect(() => {
		// Initialize player points at the beginning of the game
		if (players.length > 0) {
			const updatedPlayers = players.map((player) => ({
				...player,
				points: player.points || 0,
			}));
			setInitializedPlayers(updatedPlayers);
		}
	}, [players]);

	return (
		<div id="game-players" className="flex gap-5 h-20">
			{initializedPlayers.map((player, index) => (
				<div key={index} className="player flex items-center gap-5">
					<img
						className="w-20 aspect-square rounded-xl"
						src={player.avatarUrl}
						alt={player.name}
					/>
					<div className="flex flex-col justify-center">
						<p>{player.name}</p>
						<p>{player.points} points</p>
					</div>
				</div>
			))}
		</div>
	);
}
