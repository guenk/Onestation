import './App.css'
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
import CreateGame from "./components/creategame/CreateGame.jsx";
import GameState from "./components/gamestate/GameState.jsx"
import Chat from "./components/chat/Chat.jsx"
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import { Link } from 'react-router-dom';
const socket = io('http://localhost:3001')

function App() {
    const [room, setRoom] = useState({ roomID: null, room: null });
    const [messageAuto, setMessageAuto] = useState();

    // Normalement stocké en BDD 
    const profil = {
        username: "Jean Patrick",
        color: '#FF6F61'
    }

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
        })

        socket.on('game_room_created', ({roomID, roomCreated}) => {
            setRoom({ roomID, room: roomCreated })

            if (roomID !== 0 && roomID !== null) {
                setMessageAuto(profil.username + ' est maintenant propriétaire de la partie');
            }
        })

        socket.on('random_room_joined', ({ roomID, roomJoined }) => {
            setRoom({ roomID, room: roomJoined });
        })
    }, [profil.username])

    return (
        <>
            <nav className="flex justify-end gap-5 p-5 font-bold text-white bg-blue-300 align-center">
                <Link to="/register">S&apos;inscrire</Link>
                <Link to="/login">Se connecter</Link>
            </nav>

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                    <>
                        {
                            room.roomID === null || room.roomID === 0 ?
                                <div className="flex h-[calc(100%-64px)] justify-evenly">
                                    <div className='flex flex-col items-center justify-center flex-1 gap-5'>
                                        <h1 className="mb-8 text-4xl font-bold">Guess My Draw</h1>
                                        <CreateGame joinRoom={joinRoom} createRoom={createRoom} profil={profil} />
                                    </div>

                                    <div className='h-full p-5'>
                                        <Chat socket={socket} roomID={room.roomID} profil={profil}></Chat>
                                    </div>
                                </div>
                            :
                                <GameState socket={socket} roomID={room.roomID} profil={profil} messageAuto={messageAuto} setMessageAuto={setMessageAuto}></GameState>
                        }
                    </>
                } />
            </Routes>
        </>
    )
}

export default App;