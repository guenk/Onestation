const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const routes = require("./src/routes/routes");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/", routes);

// Démarrer le serveur
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

const gameRooms = new Map([
  [
    0,
    {
      users: [
        { id: "adzpdaozdkazd", profil: { username: "Bot", color: "#FF6F61" } },
      ], // Liste d'utilisateurs de la salle de jeux
      privateOrNot: false, // Salle de jeux publique
      maxUsers: 12, // Nombre d'utilisateurs autorisés
      creator: ["adzpdaozdkazd"], // ID de la socket ayant créé la salle de jeux
      customWords: [],
      etape: 0,
    },
  ],
]);

// Connexion du joueur à l'app
io.on("connection", (socket) => {
  // Joindre le chat publique à la connexion
  socket.on("home_room", (profil) => {
    socket.join(0);
    gameRooms.get(0).users.push({ id: socket.id, profil: profil });
    socket.emit("home_room_joined", {
      roomID: 0,
      roomJoined: gameRooms.get(0),
    });
  });

  // Création d'une partie
  socket.on("create_game_room", ({ profil, privateOrNot }) => {
    let roomID;

    do {
      roomID = Math.round(Math.random() * 100);
    } while (gameRooms.has(roomID));

    gameRooms.set(roomID, {
      users: [{ id: socket.id, profil: profil }],
      privateOrNot: privateOrNot,
      maxUsers: 10,
      creator: socket.id,
    });

    socket.join(roomID);
    socket.emit("game_room_created", {
      roomID,
      roomCreated: gameRooms.get(roomID),
    });
  });

  // Joindre une partie publique aléatoire
  socket.on("join_random_room", ({ profil }) => {
    for (const roomID of gameRooms.keys()) {
      const room = gameRooms.get(roomID);

      if (!room.privateOrNot && room.users.length + 1 <= room.maxUsers) {
        socket.join(roomID);
        room.users.push({ id: socket.id, profil: profil });
        socket.emit("room_joined", { roomID, roomJoined: room });
        break;
      }
    }
  });

  // Joindre une partie
  socket.on("join_room", ({ roomID, profil }) => {
    const room = gameRooms.get(roomID);

    if (room.users.length + 1 <= room.maxUsers) {
      socket.join(roomID);
      room.users.push({ id: socket.id, profil: profil });
      socket.emit("room_joined", { roomID, roomJoined: room });
    }
  });

  // Envoi du message au reste des personnes dans la partie
  socket.on("message", ({ message, roomID, profil }) => {
    socket
      .to(roomID)
      .emit("receiveMessage", { receivedMessage: message, sender: profil });
  });

  // Début d'une partie
  socket.on("new_step", ({ roomID, customWords, etapeEnCours }) => {
    let room = gameRooms.get(roomID);

    room.customWords = customWords;
    room.etape = etapeEnCours;

    switch (etapeEnCours) {
      case 1: // L'utilisateur choisi de façon aléatoire, choisi parmi trois mots aléatoire
        let currentPlayer =
          room.users[Math.floor(Math.random() * room.users.length)];
        let chosenWords = [];
        let customWordsCopy = room.customWords;

        for (let i = 0; i < 3; i++) {
          let random = Math.floor(Math.random() * customWordsCopy.length);
          chosenWords.push(customWordsCopy[random]);
          customWordsCopy.splice(random, 1);
        }

        io.to(roomID).emit("game_started", {
          etapeEnCours: room.etape,
          currentPlayer,
          chosenWords,
        });
        break;

      case 2: // Le mot choisi est envoyés à tout les sockets
        io.to(roomID).emit("word_chosen", {
          etapeEnCours: room.etape,
          word: customWords,
        });
        room.word = customWords;
        break;
    }
  });

  // Envoi du message au reste des personnes dans la partie
  socket.on("guess", ({ message, roomID, profil }) => {
    let room = gameRooms.get(roomID);

    if (message === room.word) {
      io.to(roomID).emit("victory", { profil });
    } else if (getNotSameCount(message, room.word)) {
      io.to(roomID).emit("close_to_guess", { profil });
    }
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});

// canard banc
// canard canapes
function getNotSameCount(str1, str2) {
  let str1Array = [...str1];
  let str2Array = [...str2];

  let countErreur = 0;

  for (let i = 0; i < str1Array.length; i++) {
    if (str1Array[i] !== str2Array[i]) {
      if (str2Array[i + 1] !== undefined && str1Array[i] !== str2Array[i + 1]) {
        if (
          str2Array[i - 1] !== undefined &&
          str1Array[i] !== str2Array[i - 1]
        ) {
          countErreur++;
        }
      }
    }
  }
}