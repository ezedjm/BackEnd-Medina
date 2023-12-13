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

try {
  // inicializo express en mi app
  const app = express();
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));

  // Sirvo la carpeta public de archivos estaticos
  app.use(express.static(`${__dirname}/public`));

  // creo e inicio servidor HTTP
  const servidorHTTP = http.createServer(app);
  /*const servidorHTTP = app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
  });*/

  //creo e inicio servidor SOCKET
  const io = new Server(servidorHTTP);
  //console.log(`Servidor SOCKET creado`);

  // creo una instancia de ProductManager
  const productsManagerInst = new ProductManager('./files/productos.json');

  //inicio motor handlebars
  app.engine("handlebars", handlebars.engine());
  //seteo las vistas de handlebars
  app.set("views", __dirname + "/views");
  app.set("view engine", "handlebars");



  // defino el endpoint de los products y le aplico su router, pasando el objeto IO
  //app.use('/api/products', productsRouter);
  app.use('/api/products', productsRouter(io, productsManagerInst));

  // defino endpoint de REAL TIME para mostrar productos con Web Socket IO 
  //app.use('/realtimeproducts', realTimeRouterWSIO(io));
  //realTimeRouterWSIO.io(io);
  app.use('/realtimeproducts', realTimeRouterWSIO(io, productsManagerInst));

  // defino el endpoint de los carts y le aplico su router
  app.use('/api/carts', cartsRouter);

  // defino endpoint de handlebars para mostrar los productos en /
  app.use('/homehandlebars', handlebarsRouter);



  // manejo de eventos de Web Socket
  io.on("connection", (socket) => {
    console.log('Cliente conectado');

    socket.on("disconnect", () => {
      console.log('Cliente desconectado');
    });

    /*socket.on("actualizarLista", () => {
      location.reload();
    });*/
  });

// Iniciar el servidor
const PORT = 8080;
servidorHTTP.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});


} catch (error) {
  console.error('Error al iniciar el servidor:', error);
}