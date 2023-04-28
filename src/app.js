import express from "express";
import router from "./routes/prod.router.js";
import routerCart from "./routes/cart.router.js";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

//puertos
const PUERTO = 8080
const WS_PORT = 3050;

//inicio servers express
const server = express()
const httpServer = server.listen(WS_PORT, () => {
  console.log(`Servidor socketio iniciado en puerto ${WS_PORT}`);
});
const wss = new Server(httpServer, {
  cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
  }
});
export default wss
wss.on('connection', (socket) => {
  
});


server.use(express.json())
server.use(express.urlencoded({ extended: true }));

// Endpoints API REST
server.use('/',router)
server.use('/',routerCart)

// Motor de plantillas
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './src/views');

server.listen(PUERTO, ()=>{
  console.log(`Servidor iniciado en puerto ${PUERTO}`)
})