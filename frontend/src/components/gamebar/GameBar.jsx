const GameBar = ({round, label}) => {
    return (
        <div id="game-bar" className="flex justify-center gap-10">
            <p>Round {round} sur 3</p>
            <p>{label}</p>
        </div>
    );
};

export default GameBar;