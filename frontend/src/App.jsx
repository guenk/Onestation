import './App.css'
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
import CreateGame from "./components/CreateGame";
import Game from "./components/Game"
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import { Link } from 'react-router-dom';
const socket = io('http://localhost:3001')

function App() {
    const [room, setRoom] = useState();

    function joinRoom(roomID) {
        if (roomID === undefined) {
            socket.emit("join_random_room");
        }
    }

    function createRoom(privateOrNot) {
        socket.emit("create_game_room", { privateOrNot });
    }

    useEffect(() => {
        socket.on('game_room_created', (roomID, roomCreated) => {
            setRoom({ roomID, roomCreated })
        })

        socket.on('random_room_joined', ({ roomID, roomJoined }) => {
            setRoom({ roomID, roomJoined });
        })
    }, [])

    return (
    <>
        <nav className="flex justify-end gap-5 p-4 font-bold text-white bg-blue-300 align-center">
            <Link to="/register">S&apos;inscrire</Link>
            <Link to="/login">Se connecter</Link>
        </nav>

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                    <>
                        <h1 className="m-8 text-4xl font-bold text-center">Guess My Draw</h1>
                        <CreateGame joinRoom={joinRoom} createRoom={createRoom} />

                        {
                            room &&
                            <Game socket={socket} roomID={room.roomID}></Game>
                        }
                    </>
                } />
            </Routes>
        </>
    )
}

export default App