const GameCanvas = ({}) => {
    return (
        <div id="game-canvas" className="flex p-4 flex-col justify-center gap-5 bg-slate-100 border rounded-xl">
                <textarea name="customWords" id="customWords" cols="30" rows="10" className="rounded-xl p-2"
                                  placeholder="Ajouter un minimum de 10 mots, séparés par une , (virgule)"></textarea>
                <button className="p-4 bg-green-200 text-green-900 font-bold rounded-xl">Commencer</button>
        </div>
    );
};

export default GameCanvas;