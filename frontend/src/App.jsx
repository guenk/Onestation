import './App.css'
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
import CreateGame from "./components/CreateGame.jsx";
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/login'; 
import Register from '../pages/register/register';
import { Link } from 'react-router-dom';
const socket = io('http://localhost:3001')

function App() {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState('');

    function joinRoom(e) {
        e.preventDefault();

        if (room !== "") {
            socket.emit("join_room", room);
        }
    }

    function createRoom(e) {
        e.preventDefault();
        socket.emit("create_room");
    }

    function sendMessage() {
        socket.emit('message', { message, room })
    }

    function handleMessage(e) {
        setMessage(e.target.value)
    }

    function handleRoom(e) {
        setRoom(e.target.value)
    }

    useEffect(() => {
        socket.on('receivemessage', (data) => {
            setMessageReceived(data.message)
        })

        socket.on('room_created', (data) => {
            setRoom(data.room)
        })
    }, [])

    return (
        <>
            <nav>
            <Link to="/register">S'inscrire</Link>
            <Link to="/login">Se connecter</Link>
            </nav>

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                    <>
                        <h1>Guess My Draw</h1>
                        <CreateGame username={username} setUsername={setUsername} joinRoom={joinRoom} createRoom={createRoom} />
                        <input type="text" placeholder="Message..." onChange={handleMessage} />
                        <button onClick={sendMessage}>Send a message</button>
                        <h1>Message :</h1>
                        <p>{messageReceived}</p>
                    </>
                } />
            </Routes>
        </>
    )
}

export default App