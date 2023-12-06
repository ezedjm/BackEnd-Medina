import { Router } from "express";
import { uploader } from "../utils.js";
import ProductManager from '../../managers/productManager.js';
import handlebars from "express-handlebars";

const router = Router();

const productsManagerInst = new ProductManager('./files/productos.json');

//GET de HANDLEBARS para todos los prod
router.get('/', async (req, res) => {
    try {
        const productos = await productsManagerInst.getAllProducts();
        res.render("home", { productos });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})


export default router;