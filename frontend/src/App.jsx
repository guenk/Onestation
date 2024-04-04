import './App.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {
    function sendMessage() {
        socket.emit('message', 'Hello world')
    }

  return (
    <>
        <input type="text" placeholder="Message..."/>
        <button onClick={() => {sendMessage()}}>Send a message</button>
    </>
  )
}

export default App