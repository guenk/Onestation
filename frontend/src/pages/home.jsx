import Header from "../components/header/Header.jsx";
import CreateGame from "../components/creategame/CreateGame.jsx";
import Chat from "../components/chat/Chat.jsx";
import GameState from "../components/gamestate/GameState.jsx";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("http://localhost:3001");

const Home = () => {
  const [room, setRoom] = useState({ roomID: null, room: null });
  const [messageAuto, setMessageAuto] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Normally stored in DB
  const profil = {
    username: user?.pseudo,
    color: "#FF6F61",
    avatar: user?.avatar,
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
    <>
      <Header roomID={room.roomID} setRoom={setRoom}/>
      {/* <div className="authentication-status">
                  {isAuthenticated
                    ? `Logged in with token: ${token}`
                    : "Not logged in"}
                </div> */}
      {room.roomID == undefined || room.roomID == 0 ? (
        <div className="flex h-[calc(100%-140px)] justify-evenly">
          <div className="flex flex-col items-center justify-center flex-auto gap-5">
            <h1 className="mb-8 text-4xl font-bold">Guess My Draw</h1>
            <CreateGame
              joinRoom={joinRoom}
              createRoom={createRoom}
              profil={profil}
            />
          </div>
          <div className="h-full flex-auto p-5">
            <Chat
              socket={socket}
              roomID={room.roomID}
              profil={profil}
            ></Chat>
          </div>
        </div>
      ) : (
        // <h1>{room}</h1>
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
  );
};

export default Home;