const GameBar = ({ round, label, etape, words, socket, drawer }) => {
  if (etape === 2) {
    if (socket.id === drawer.id) {
      return (
        <div id="game-bar" className="flex justify-center gap-10">
          <p>Round {round} sur 3</p>
          <div>
            <p>Dessinez ce mot</p>
            <h5 className="text-center font-bold">{words}</h5>
          </div>
        </div>
      );
    } else {
      return (
        <div id="game-bar" className="flex justify-center gap-10">
          <p>Round {round} sur 3</p>
          <div>
            <p>Devinez ce mot</p>
            <h5 className="font-bold text-center">
              {[...words].map((letter, index) => {
                if (letter === " ") {
                  return <span key={index}>&nbsp;&nbsp;</span>;
                } else {
                  return " _ ";
                }
              })}
            </h5>
          </div>
        </div>
      );
    }
  }
};

export default GameBar;