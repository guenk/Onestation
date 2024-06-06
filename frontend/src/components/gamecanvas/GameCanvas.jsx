import { useEffect } from "react";
import Canva from "../../components/canva/Canva";

const GameCanvas = ({
  socket,
  roomID,
  room,
  etape,
  round,
  changerEtape,
  words,
  setWords,
  setChatMessageAuto,
  drawer,
}) => {
	function handleCustomWordsChange(value) {
		setWords(value.split(","));
	}

	function handleStartClick() {
		if (words.length < 10) {
			setChatMessageAuto("Ajoutez un minimum de 10 mots");
		} else {
			changerEtape(1, 1);
		}
	}

  function handleWordChosen(e) {
    changerEtape(2, round, e.target.textContent);
  }

	switch (etape) {
		case 0:
			return (
				<div
					id="game-canvas"
					className="flex p-4 flex-col justify-center gap-5 bg-slate-100 border rounded-xl"
				>
					{socket.id === room.creator ? (
						<>
							<textarea
								name="customWords"
								id="customWords"
								cols="30"
								rows="10"
								className="rounded-xl p-2"
								placeholder="Ajouter un minimum de 10 mots, séparés par une , (virgule)"
								value={words}
								onChange={(e) => handleCustomWordsChange(e.target.value)}
							></textarea>
							<button
								onClick={handleStartClick}
								className="p-4 bg-green-200 text-green-900 font-bold rounded-xl"
							>
								Commencer
							</button>
						</>
					) : (
						<div className="text-center">
							En attente du propriétaire du jeu...
						</div>
					)}
				</div>
			);

    case 1:
      return (
        <div className="flex p-4 flex-col justify-center gap-5 bg-slate-100 border rounded-xl">
          {drawer.id === socket.id ? (
            <>
              <p className="text-center">Choisissez un mot</p>
              <div className="flex gap-2">
                {
                  words.map((e, index) => {
                  return (
                    <button
                      onClick={handleWordChosen}
                      className="bg-blue-300 rounded-xl py-2 px-4 font-bold text-white hover:bg-blue-400 active:bg-blue-500"
                      key={index}
                    >
                      {e}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            drawer.profil.username + " est en train de choisir un mot..."
          )}
        </div>
      );

    case 2:
      return (
        <Canva socket={socket} roomID={roomID} />
      );

    case 3:
      return (
        <div className="flex p-4 flex-col justify-center gap-5 bg-slate-100 border rounded-xl">
          {drawer.profil.username} a gagné !
        </div>
      );
  }
};

export default GameCanvas;