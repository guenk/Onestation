import '../css/Login.css';

function CreateGame({ joinRoom, createRoom, profil }) {
    return (
        <div className="flex justify-center gap-5">
            <button className="px-6 py-4 font-bold text-green-900 bg-green-200 rounded-xl disabled:bg-gray-200 disabled:text-gray-400" onClick={() => { joinRoom() }} disabled={profil.username === undefined}>Jouer</button>
            <button className="px-6 py-4 font-bold text-blue-900 bg-blue-200 rounded-xl disabled:bg-gray-200 disabled:text-gray-400" onClick={() => { createRoom(profil, true) }} disabled={profil.username === undefined}>Créer une room privée</button>
        </div>
    );
}

export default CreateGame;