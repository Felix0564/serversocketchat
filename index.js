const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Autoriser toutes les origines (à adapter en production)
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('Un client est connecté');

  // Écoute les messages du client
  socket.on('message', (data) => {
    console.log('Message reçu:', data);

    // Renvoie le message à tous les clients connectés
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Un client est déconnecté');
  });
});

const PORT = process.env.PORT || 8080; // Utilise le port défini par Render ou 3001 en local
server.listen(PORT, () => {
  console.log(`Serveur Socket.IO en écoute sur le port ${PORT}`);
});

