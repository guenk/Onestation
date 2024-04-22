const GameCanvas = ({lancerPartie, customWords, setCustomWords, setChatMessageAuto}) => {
    function handleCustomWordsChange(value) {
        setCustomWords(value.split(','))
    }

    function handleStartClick() {
        if (customWords.length < 10) {
            setChatMessageAuto('Ajoutez un minimum de 10 mots');
        } else {
            lancerPartie();
        }
    }

    return (
        <div id="game-canvas" className="flex p-4 flex-col justify-center gap-5 bg-slate-100 border rounded-xl">


            <textarea name="customWords" id="customWords" cols="30" rows="10" className="rounded-xl p-2"
              placeholder="Ajouter un minimum de 10 mots, séparés par une , (virgule)" value={customWords}
              onChange={(e) => handleCustomWordsChange(e.target.value)}
            ></textarea>
            <button onClick={handleStartClick} className="p-4 bg-green-200 text-green-900 font-bold rounded-xl">Commencer</button>

        </div>
    );
};

export default GameCanvas;