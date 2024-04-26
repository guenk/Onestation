import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux"; // Déjà importé
import CreateGame from "./components/creategame/CreateGame.jsx";
import GameState from "./components/gamestate/GameState.jsx";
import Chat from "./components/chat/Chat.jsx";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import Header from "./components/header/Header";
import Profil from "./pages/profil/Profil";
import { PersistGate } from "redux-persist/integration/react";

const socket = io("http://localhost:3001");

function App() {
  const [room, setRoom] = useState({ roomID: null, room: null });
  const [messageAuto, setMessageAuto] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  // Normally stored in DB
  const profil = {
    username: "Jean Patrick",
    color: "#FF6F61",
  };

  function joinRoom(roomID) {
    const queryParameters = new URLSearchParams(window.location.search);
    roomID = Number(queryParameters.toString().split("=")[0].trim());

    if (roomID === undefined) {
      socket.emit("join_random_room", { profil });
    } else {
      socket.emit("join_room", { roomID, profil });
    }
  }

  function createRoom(profil, privateOrNot) {
    socket.emit("create_game_room", { profil, privateOrNot });
  }

  useEffect(() => {
    socket.emit("home_room", { profil });

    socket.on("home_room_joined", ({ roomID, roomJoined }) => {
      setRoom({ roomID, room: roomJoined });
    });

    socket.on("game_room_created", ({ roomID, roomCreated }) => {
      setRoom({ roomID, room: roomCreated });
      if (roomID !== 0 && roomID !== null) {
        setMessageAuto(
          `${profil.username} est maintenant propriétaire de la partie`
        );
      }
    });

    socket.on("room_joined", ({ roomID, roomJoined }) => {
      setRoom({ roomID, room: roomJoined });
    });

    return () => {
      socket.off("home_room_joined");
      socket.off("game_room_created");
      socket.off("random_room_joined");
    };
  }, [profil.username]);

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
              <Header/>
                {/* <div className="authentication-status">
                  {isAuthenticated
                    ? `Logged in with token: ${token}`
                    : "Not logged in"}
                </div> */}
                {room.roomID === null || room.roomID === 0 ? (
                  <div className="flex h-screen justify-evenly">
                    <div className="flex flex-col items-center justify-center flex-1 gap-5">
                      <h1 className="mb-8 text-4xl font-bold">Guess My Draw</h1>
                      <CreateGame
                        joinRoom={joinRoom}
                        createRoom={createRoom}
                        profil={profil}
                      />
                    </div>
                    <div className="h-full p-5">
                      <Chat
                        socket={socket}
                        roomID={room.roomID}
                        profil={profil}
                      ></Chat>
                    </div>
                  </div>
                ) : (
                  <GameState
                    socket={socket}
                    roomID={room.roomID}
                    room={room.room}
                    profil={profil}
                    messageAuto={messageAuto}
                    setMessageAuto={setMessageAuto}
                  ></GameState>
                )}
              </>
            }
          />
          <Route path="/profile" element={<Profil />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
