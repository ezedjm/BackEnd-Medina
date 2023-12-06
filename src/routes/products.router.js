import { Router } from "express";
import { uploader } from "../utils.js";
import ProductManager from '../../managers/productManager.js';
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import http from 'http';
import io from "socket.io-client";


const createProductsRouter = (io) => {
    //const socketServer = io();
const router = Router();

const productsManagerInst = new ProductManager('./files/productos.json');


// GET todos los productos
router.get('/', async (req, res) => {
    //res.send({productsManagerInst}) 
    const limit = req.query.limit;
    const productos = await productsManagerInst.getProducts(limit);
    //const productos = await productManager.getProducts();
    res.json({ productos });
})

// GET producto x ID
router.get('/:pid', (req, res) => {
    const idProducto = parseInt(req.params.pid);
    const productoBuscado = productsManagerInst.getProductById(idProducto);
    if (productoBuscado !== undefined) {
        res.json({ productoBuscado });
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
})

//POST - agrega Producto
router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        productsManagerInst.addProduct(newProduct);

        // emitir evento de nuevo producto
        //req.app.get('io').emit("productoNuevo", newProduct);
        console.log(`agrego ${JSON.stringify(newProduct)}`);
        socketServer.emit("actualizarLista");

        res.send({
            status: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


//PUT - actualiza Producto
router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const actualizacionDeProducto = req.body;
    productsManagerInst.updateProduct(pid, actualizacionDeProducto);
    res.send({
        status: "success",
        msg: `Producto ${pid} actualizado.`
    })
})

//DELETE - elimina Producto
router.delete("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        productsManagerInst.deleteProduct(pid);

        // emitir evento de producto eliminado
        socketServer.emit("actualizarLista");

        res.send({
            status: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


/*router.post('/', uploader.single('imgACargar'), (req, res)=>{
//guardo nombre del archivo de img
const filename = req.file.filename;

if (!filename) {
    return res.send({
        status:"error",
        error: "no se cargo la imagen"
    })
} 

    const producto = req.body;
    producto.thumbnail = `http://localhost:8080/img/${filename}`;

    producto.push(producto)
    res.send({
        status: "success",
        msg: productsArray
    }) 
})*/

//export default router;
return router;
};

export default createProductsRouter;