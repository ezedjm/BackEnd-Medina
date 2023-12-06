import { Router } from "express";
import ProductManager from '../../managers/productManager.js';


const router = Router();  

const productsManagerInst = new ProductManager('./files/productos.json');

router.get('/', async (req, res) => {
    try {
      const productos = await productsManagerInst.getAllProducts();
      res.render("realTimeProducts", { productos });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });






export default router;