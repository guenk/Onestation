import Chat from "../chat/Chat.jsx";
import GameBar from "../gamebar/GameBar.jsx";
import { useEffect, useState } from "react";
import GameCanvas from "../gamecanvas/GameCanvas.jsx";
import GamePlayers from "../gameplayers/GamePlayers.jsx";
import GameToolbar from "../gametoolbar/GameToolbar.jsx";
import Points from "../points/Points.jsx";
import "./GameState.scss";

const GameState = ({
	socket,
	roomID,
	room,
	profil,
	messageAuto,
	setMessageAuto,
}) => {
	const labels = {
		1: "En attente",
		2: "Devinez le mot",
		3: "Dessinez le mot",
	};

	const [etape, setEtape] = useState(0);
	const [round, setRound] = useState(1);
	const [label, setLabel] = useState("En attente");
	const [chatMessageAuto, setChatMessageAuto] = useState();
	const [words, setWords] = useState("");
	const [currentPlayer, setCurrentPlayer] = useState(null);
	const [players, setPlayers] = useState([]);

	function changerEtape(etapeEnCours, mot = null) {
		switch (etapeEnCours) {
			case 1:
				setLabel("En attente");
				socket.emit("new_step", {
					roomID,
					customWords: words,
					etapeEnCours: 1,
				});
				break;

			case 2:
				socket.emit("new_step", {
					roomID,
					customWords: mot,
					etapeEnCours: 2,
				});
		}
	}

	useEffect(() => {
		setChatMessageAuto(messageAuto);
	}, [messageAuto, setMessageAuto]);

	useEffect(() => {
		socket.on(
			"game_started",
			({ etapeEnCours, currentPlayer, chosenWords, players }) => {
				setEtape(etapeEnCours);
				setCurrentPlayer(currentPlayer);
				setWords(chosenWords);
				setPlayers(players.map((player) => ({ ...player, points: 0 })));
			}
		);

		socket.on("word_chosen", ({ etapeEnCours, word }) => {
			setEtape(etapeEnCours);
			setWords(word);
		});

		socket.on("update_points", (updatedPlayers) => {
			setPlayers(updatedPlayers);
		});
	});

	return (
		<div id="game-board" className="m-4">
			<GameBar
				round={round}
				label={label}
				etape={etape}
				words={words}
				socket={socket}
				player={currentPlayer}
			></GameBar>

			<GamePlayers players={players} />

			<GameCanvas
				socket={socket}
				room={room}
				etape={etape}
				changerEtape={changerEtape}
				words={words}
				setWords={setWords}
				setChatMessageAuto={setChatMessageAuto}
				player={currentPlayer}
			></GameCanvas>

			<Chat
				socket={socket}
				roomID={roomID}
				profil={profil}
				chatMessageAuto={chatMessageAuto}
				setChatMessageAuto={setChatMessageAuto}
				player={currentPlayer}
				etape={etape}
			></Chat>

			<GameToolbar
				roomID={roomID}
				setChatMessageAuto={setChatMessageAuto}
			></GameToolbar>
			<Points players={players} />
		</div>
	);
};

export default GameState;
