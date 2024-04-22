import Chat from '../chat/Chat.jsx'
import GameBar from "../gamebar/GameBar.jsx";
import {useEffect, useState} from "react";
import GameCanvas from "../gamecanvas/GameCanvas.jsx";
import GamePlayers from "../gameplayers/GamePlayers.jsx"
import GameToolbar from "../gametoolbar/GameToolbar.jsx";
import './GameState.css'

const GameState = ({ socket, roomID, profil, messageAuto, setMessageAuto }) => {
    const labels = {
        1: "En attente",
        2: "Devinez le mot",
        3: "Dessinez le mot"
    };

    const [gameState, setGameState] = useState(1);
    const [round, setRound]=  useState(1);
    const [label, setLabel] = useState('En attente');
    const [chatMessageAuto, setChatMessageAuto] = useState();

    // function handleGameState() {
    //     switch (gameState) {
    //         case 1:
    //             setLabel(labels[1]);
    //             setRound(1);
    //             break;
    //     }
    // }

    useEffect(() => {
        setChatMessageAuto(messageAuto);
    }, [messageAuto, setMessageAuto])

    return (
        <div id="game-board" className="m-4">
            <GameBar round={round} label={label}></GameBar>

            <GamePlayers />

            <GameCanvas />

            <Chat socket={socket} roomID={roomID} profil={profil} chatMessageAuto={chatMessageAuto}
                  setChatMessageAuto={setChatMessageAuto}></Chat>

            <GameToolbar roomID={roomID}></GameToolbar>
        </div>
    );
}

export default GameState;