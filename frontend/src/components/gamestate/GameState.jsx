import Chat from "../chat/Chat.jsx";
import GameBar from "../gamebar/GameBar.jsx";
import { useEffect, useState } from "react";
import GameCanvas from "../gamecanvas/GameCanvas.jsx";
import GamePlayers from "../gameplayers/GamePlayers.jsx";
import GameToolbar from "../gametoolbar/GameToolbar.jsx";
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
  const [currentDrawer, setCurrentDrawer] = useState(null);

  function changerEtape(etapeEnCours, round, mot = null) {
    switch (etapeEnCours) {
      case 1:
        setLabel("En attente");
        socket.emit("new_step", {
          roomID,
          customWords: words,
          etapeEnCours: 1,
          round: round,
        });
        break;

      case 2:
        try {
          socket.emit("new_step", {
            roomID,
            customWords: mot,
            etapeEnCours: 2,
            round: round,
          });
        } catch (e) {
          console.log(e);
        }
    }
  }

  useEffect(() => {
    setChatMessageAuto(messageAuto);
  }, [messageAuto, setMessageAuto]);

  useEffect(() => {
    socket.on(
      "game_started",
      ({ etapeEnCours, currentDrawer, chosenWords }) => {
        setCurrentDrawer(currentDrawer);
        setWords(chosenWords);
        setEtape(etapeEnCours);
      },
    );

    socket.on("word_chosen", ({ etapeEnCours, word }) => {
      setEtape(etapeEnCours);
      setWords(word);
    });

    socket.on("victory", ({ winner, nextDrawer }) => {
      setEtape(3);
      setCurrentDrawer(winner); // On se sert du même state pour éviter de créer un state inutile

      setTimeout(() => {
        setRound(round + 1);

        if (nextDrawer.id === socket.id) {
          changerEtape(1, round + 1);
        }
      }, 5000);
    });
  }, []);

  return (
    <div id="game-board" className="m-4">
      <GameBar
        round={round}
        label={label}
        etape={etape}
        words={words}
        socket={socket}
        drawer={currentDrawer}
      ></GameBar>

      <GamePlayers socket={socket} roomID={roomID} />

      <GameCanvas
        socket={socket}
        roomID={roomID}
        room={room}
        etape={etape}
        round={round}
        changerEtape={changerEtape}
        words={words}
        setWords={setWords}
        setChatMessageAuto={setChatMessageAuto}
        drawer={currentDrawer}
      ></GameCanvas>

      <Chat
        socket={socket}
        roomID={roomID}
        profil={profil}
        chatMessageAuto={chatMessageAuto}
        setChatMessageAuto={setChatMessageAuto}
        drawer={currentDrawer}
        etape={etape}
      ></Chat>

      <GameToolbar
        roomID={roomID}
        setChatMessageAuto={setChatMessageAuto}
      ></GameToolbar>
    </div>
  );
};

export default GameState;