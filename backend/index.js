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
    [1, {
        users: [ 'P9WFZD1nL7ZMkclAAAB' ],
        privateOrNot: false,
        maxUsers: 12,
        creator: [ 'P9WFZD1nL7ZMkclAAAB' ]
    }],
]);

// Connexion du joueur à l'app
io.on("connection", (socket) => {

    // Création d'une partie
    socket.on("create_game_room", ({privateOrNot}) => {
        let roomID;

        do {
            roomID = Math.round(Math.random() * 100);
        } while (gameRooms.has(roomID));

        gameRooms.set(roomID, { users: [socket.id], privateOrNot: privateOrNot, maxUsers: 10, creator: socket.id });

        socket.join(roomID);
        socket.emit("game_room_created", {roomID, roomCreated: gameRooms.get(roomID)});
    })

    // Joindre une game publique aléatoire
    socket.on("join_random_room", () => {
        for (const index of gameRooms.keys()) {
            const room = gameRooms.get(index);

            if (! room.privateOrNot && (room.users.length + 1 <= room.maxUsers)) {
                socket.join(index);
                socket.emit("random_room_joined", { roomID: index, roomJoined: room });
                break;
            }
        }
    })

    // Envoi du message au reste des personnes dans la partie
    socket.on("message", ({ message, roomID }) => {
        socket.to(roomID).emit("receiveMessage", { receivedMessage: message });
    });
})

server.listen(3001, () => {
  console.log("Server running on port 3001");
})