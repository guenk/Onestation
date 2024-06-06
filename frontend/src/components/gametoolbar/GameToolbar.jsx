const GameToolbar = ({ roomID, setChatMessageAuto }) => {
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText("localhost:5173/?" + roomID);
      setChatMessageAuto("Lien d'invitation copié");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="game-toolbar" className="rounded-xl overflow-hidden flex">
      <input
        className="bg-slate-100 p-4 grow"
        type="text"
        value={"localhost:5173/?" + roomID}
        readOnly
      />
      <button
        className="bg-blue-300 p-4 font-bold text-white hover:bg-blue-400 active:bg-blue-500"
        onClick={copyToClipboard}
      >
        Copier
      </button>
    </div>
  );
};

export default GameToolbar;