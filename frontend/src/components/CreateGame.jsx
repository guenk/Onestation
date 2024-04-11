import './css/Login.css';

function CreateGame({ joinRoom, createRoom, profil }) {
    return (
        <div className="flex justify-center gap-5">
            <button className="px-6 py-4 font-bold text-green-900 bg-green-200 rounded-xl" onClick={() => { joinRoom() }}>Jouer</button>
            <button className="px-6 py-4 font-bold text-blue-900 bg-blue-200 rounded-xl" onClick={() => { createRoom(true, profil.username) }}>Créer une room privée</button>
        </div>
    );
}

export default CreateGame;