//Socket CLIENTE

import { Router } from "express";
import { uploader } from "../utils.js";
import ProductManager from '../../managers/productManager.js';
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import http from 'http';
import io from "socket.io-client";


//const createProductsRouter = (io) => {
    const socketServer = io();

// creo función del router que recibe el objeto io
//const createRealTimeRouter = (io) => {
    const router = Router();    
  
    const productsManagerInst = new ProductManager('./files/productos.json');
  
    //GET de WEBSOCKET.IO para todos los prod
    router.get('/', async (req, res) => {
      try {
        const productos = await productsManagerInst.getAllProducts();
        res.render("realTimeProducts", { productos });
      } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
  
    // config Socket.io para escuchar eventos
    socketServer.on('connection', socket => {
      console.log('Usuario conectado a WebSocket');
  
      // manejo evento desconexión
      socket.on('disconnect', () => {
        console.log('Usuario desconectado de WebSocket');
      });
      
      socket.on('actualizarLista', () => {
        console.log('actualizar la lista a todos los clientes');
      });
    });
  
    //return router;
  //};
  
  //export default createRealTimeRouter;/**/
  export default router;

