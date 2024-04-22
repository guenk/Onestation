import Chat from '../components/Chat'
import GameBar from "./GameBar.jsx";
import {useEffect, useState} from "react";
import GameCanvas from "./GameCanvas.jsx";
import GamePlayers from "./GamePlayers.jsx"
import GameToolbar from "./GameToolbar.jsx";

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
        <>
            <div className="m-4 flex">
                <GameBar round={round} label={label}></GameBar>

                <GamePlayers />

                <GameCanvas />

                <Chat socket={socket} roomID={roomID} profil={profil} chatMessageAuto={chatMessageAuto}
                      setChatMessageAuto={setChatMessageAuto}></Chat>
            </div>

            <GameToolbar roomID={roomID}></GameToolbar>
        </>
    )
        ;
}

export default GameState;