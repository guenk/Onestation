const GameCanvas = ({}) => {
    return (
        <div id="game-canvas" className="flex justify-center gap-5">
            <div className="w-6/12">
                        <textarea name="customWords" id="customWords" cols="30" rows="10"
                                  placeholder="Ajouter un minimum de 10 mots, séparés par une , (virgule)"></textarea>
                <button className="p-4 bg-green-200 text-green-900 font-bold rounded-xl">Commencer</button>
            </div>
        </div>
    );
};

export default GameCanvas;