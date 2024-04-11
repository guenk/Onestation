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
    [0, {
        users: [ 'Kilian' ], // Liste d'utilisateurs de la salle de jeux
        privateOrNot: false, // Salle de jeux publique
        maxUsers: 12, // Nombre d'utilisateurs autorisés
        creator: [ 'Kilian' ] // ID de l'utilisateur/la socket ayant créé la salle de jeux
    }],
    [1, {
        users : [ 'Jean Patrick' ],
        privateOrNot: false,
        maxUsers: 10,
        creator: [ 'Jean Patrick' ]
    }]
]);

// Connexion du joueur à l'app
io.on("connection", (socket) => {

    // Joindre le chat publique à la connexion
    socket.on('home_room', () => {
        socket.join(0);
        gameRooms.get(0).users.push(socket.id);
        socket.emit("home_room_joined", { roomID: 0, roomJoined: gameRooms.get(0) });
    })

    // Création d'une partie
    socket.on("create_game_room", ({profil, privateOrNot}) => {
        let roomID;

        do {
            roomID = Math.round(Math.random() * 100);
        } while (gameRooms.has(roomID));

        gameRooms.set(roomID, { users: [profil.username], privateOrNot: privateOrNot, maxUsers: 10, creator: socket.id });

        socket.join(roomID);
        socket.emit("game_room_created", {roomID, roomCreated: gameRooms.get(roomID)});
    })

    // Joindre une game publique aléatoire
    socket.on("join_random_room", (profil) => {
        for (const roomID of gameRooms.keys()) {
            const room = gameRooms.get(roomID);

            if (! room.privateOrNot && (room.users.length + 1 <= room.maxUsers)) {
                socket.join(roomID);
                room.users.push(profil.username);
                socket.emit("random_room_joined", { roomID, roomJoined: room });
                break;
            }
        }
    })

    // Envoi du message au reste des personnes dans la partie
    socket.on("message", ({ message, roomID, profil }) => {
        socket.to(roomID).emit("receiveMessage", { receivedMessage: message, sender: profil });
    });
})

server.listen(3001, () => {
  console.log("Server running on port 3001");
})