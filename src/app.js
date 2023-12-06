import ProductManager from '../managers/productManager.js';
import express from "express";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebarsRouter from './routes/handlebars.router.js';
import realTimeRouterWSIO from './routes/realTimeWSIO.router.js';
import __dirname from './utils.js';
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import http from 'http';


// inicializo express en mi app
const app = express();
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Sirvo la carpeta public de archivos estaticos
app.use(express.static(`${__dirname}/public`));

// creo e inicio servidor HTTP
const servidorHTTP = app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
/*//const servidorHTTP = http.createServer(app);
// Inicio el servidor HTTP
servidorHTTP.listen(PORT, () => {
  console.log(`Servidor HTTP funcionando en el puerto: ${PORT}`);
});*/


// defino el endpoint de los products y le aplico su router, pasando el objeto IO
app.use('/api/products', productsRouter);

  //creo e inicio servidor SOCKET
  const servidorSocket = new Server(servidorHTTP);
  //console.log(`Servidor SOCKET creado`);

  // adjunto io a la aplicación para que esté disponible en las solicitudes
 // app.set('io', servidorSocket);

  // defino endpoint de REAL TIME para mostrar productos con Web Socket IO 
//app.use('/realtimeproducts', realTimeRouterWSIO(servidorSocket));
app.use ('/realtimeproducts', realTimeRouterWSIO);




//inicio motor handlebars
app.engine("handlebars", handlebars.engine());
//seteo las vistas de handlebars
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");



// defino el endpoint de los carts y le aplico su router
app.use('/api/carts', cartsRouter);

// defino endpoint de handlebars para mostrar los productos en /
app.use('/homehandlebars', handlebarsRouter);



// manejo de eventos de Web Socket
  servidorSocket.on("connection", socket => {
    console.log('Cliente conectado');

    socket.on("disconnection", () => {
      console.log('Cliente desconectado');
    });
    /*socket.on("actualizarLista", () => {
      location.reload();
    });*/
  });
