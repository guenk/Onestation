const GamePlayers = ({}) => {
    return (
        <div id="game-players" className="flex gap-5 h-20">
            <img className="w-20 aspect-square rounded-xl"
                 src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                 alt=""/>
            <div className="flex flex-col justify-center">
                <p>Jean</p>
                300 points
            </div>
        </div>
    );
};

export default GamePlayers;