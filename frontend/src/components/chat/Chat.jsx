import {useState,useEffect} from 'react'

const Chat = ({ socket, roomID, profil, chatMessageAuto, setChatMessageAuto }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    function sendMessage() {
        setMessages(messages => [...messages, {message, sender: profil }])
        socket.emit('message', { message, roomID, profil })
    }

    useEffect(() => {
        socket.on('receiveMessage', ({ receivedMessage, sender }) => {
            setMessages(messages => [...messages, {message: receivedMessage, sender}])
        })
    }, [socket])

    useEffect(() => {
        if (chatMessageAuto !== undefined && chatMessageAuto !== '')
            setMessages(messages => [...messages, {message: chatMessageAuto, sender: { username: 'Bot'}}])
    }, [chatMessageAuto, setChatMessageAuto])

    function handleSubmit(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            sendMessage(message, roomID)
            setMessage('')
        }
    }

    return (
        <div id="game-chat" className="flex flex-col justify-end flex-1 h-full border rounded-xl bg-slate-100">
            <div className="flex flex-col gap-2 p-3 overflow-auto">
                {
                    messages.map((message, index) => {
                        return <p key={index}><span style={{ color: message.sender.color, fontWeight: 'bold' }}>{message.sender.username}{": "}</span> {message.message}</p>
                    })
                }
            </div>
            <input
                className='p-5'
                type="text"
                placeholder="Tapez votre message ici"
                onInput={(e) => { setMessage(e.target.value)}}
                onKeyUp={handleSubmit}
                value={message}
            />
        </div>
    );
}
 
export default Chat;