import './App.css'
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
import CreateGame from "./components/CreateGame.jsx";
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
            <a href="/">S&apos;inscrire</a>
            <a href="/login">Se connecter</a>
        </nav>

        <h1>Guess My Draw</h1>

        <CreateGame username={username} setUsername={setUsername} joinRoom={joinRoom} createRoom={createRoom}></CreateGame>

        <input type="text" placeholder="Message..." onChange={(e) => handleMessage(e)}/>
        <button onClick={() => {sendMessage()}}>Send a message</button>
        <h1>Message :</h1>
        <p>{ room }</p>
    </>
    )
}

export default App