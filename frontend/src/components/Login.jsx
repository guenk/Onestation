import './css/Login.css';

function Login({ joinRoom, createRoom }) {
    return (
        <form action="" id="formLogin">
            <input type="text" placeholder="Entrez votre pseudo"/>
            <button className="inline" onClick={joinRoom}>Jouer</button>
            <button className="inline" onClick={createRoom}>Créer une room privée</button>
        </form>
    );
}

export default Login;