import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import CreateGame from "./components/CreateGame";
import Game from "./components/Game";
import Chat from "./components/Chat";
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const socket = io('http://localhost:3001');

function App() {
    const [room, setRoom] = useState({ roomID: null, room: null });

    // Normalement stocké en BDD 
    const profil = {
        username: "Jean Patrick",
        color: '#FF6F61'
    };

    function joinRoom(roomID) {
        if (roomID === undefined) {
            socket.emit("join_random_room", { profil });
        }
    }

    function createRoom(profil, privateOrNot) {
        socket.emit("create_game_room", { profil, privateOrNot });
    }

    useEffect(() => {
        socket.emit('home_room');

        socket.on('home_room_joined', ({roomID, roomJoined}) => {
            setRoom({ roomID, room: roomJoined })
        });

        socket.on('game_room_created', ({roomID, roomCreated}) => {
            setRoom({ roomID, room: roomCreated })
        });

        socket.on('random_room_joined', ({ roomID, roomJoined }) => {
            setRoom({ roomID, room: roomJoined });
        });
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <>
                            { /* -- Partie accueil -- */ }
                            <div className="flex h-screen bg-black justify-evenly">
                                <div className='flex flex-col items-center justify-center flex-1 gap-5'>
                                    <h1 className="mb-8 text-4xl font-bold">Guess My Draw</h1>
                                    <CreateGame joinRoom={joinRoom} createRoom={createRoom} profil={profil} />
                                </div>
                                
                                <div className='h-full p-5'>
                                    <Chat socket={socket} roomID={room.roomID} profil={profil}></Chat>
                                </div>
                            </div>

                            {
                                // -- Partie salle de jeux --
                                room.roomID != null && room.roomID != 0 ?
                                <Game socket={socket} roomID={room.roomID} profil={profil}></Game> : ''
                            }
                        </>
                    } />
                </Routes>
            </PersistGate>
        </Provider>
    );
}

export default App;