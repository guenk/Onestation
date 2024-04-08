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
    methos: ["GET", "POST", "PUT"],
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


io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
        socket.to(data.room).emit("receivemessage", data);
    });

    socket.on("join_room", (data) => {
        socket.join(data);
    })

    socket.on("create_room", () => {
        let room = Math.round(Math.random() * 10);
        socket.join(room);
        socket.emit("room_created", { room });
    })
})

server.listen(3001, () => {
  console.log("Server running on port 3001");
})