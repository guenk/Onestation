import {useState,useEffect} from 'react'

const Game = ({ socket, roomID }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    function sendMessage() {
        setMessages(messages => [...messages, message])
        socket.emit('message', { message, roomID })
    }

    useEffect(() => {
        socket.on('receiveMessage', ({ receivedMessage }) => {
            console.log("bonjour");
            setMessages(messages => [...messages, receivedMessage])
        })
    }, [])

    function handleSubmit(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            sendMessage(message, roomID)
            setMessage('')
        }
    }

    return (
        <>
            <div className="flex justify-center gap-10">
                <p>Round 1 sur 3</p>
                <p>En attente</p>
            </div>

            <div className="flex justify-center gap-5">
                <div className="flex gap-5">
                    <img className="w-20 h-auto aspect-square" src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <div className="flex flex-col justify-center">
                        <p>Jean</p>
                        300 points
                    </div>
                </div>

                <div className="w-6/12 bg-slate-300"></div>

                <div className="flex flex-col gap-3 p-5 bg-slate-100">
                    <div className="flex flex-col">
                        {
                            messages.map((message, index) => {
                                return <p key={index}>{message}</p>
                            })
                        }
                    </div>
                    <input
                        type="text"
                        placeholder="Tapez votre message ici"
                        onInput={(e) => { setMessage(e.target.value)}}
                        onKeyUp={handleSubmit}
                        value={message}
                    />
                </div>
            </div>
        </>
    );
}
 
export default Game;