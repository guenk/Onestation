import './css/Login.css';

function CreateGame({ joinRoom, createRoom }) {
    return (
        <div className="flex justify-center gap-5">
            <button className="px-4 py-2 bg-green-200 rounded-xl" onClick={() => { joinRoom() }}>Jouer</button>
            <button className="px-4 py-2 bg-blue-200 rounded-xl" onClick={() => { createRoom(true) }}>Créer une room privée</button>
        </div>
    );
}

export default CreateGame;