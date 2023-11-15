import  ProductManager   from '../managers/productManager.js';
import express from "express";

// inicializo express en nuestra app
const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended:true}));

// instancio el productManager.js
const productManager = new ProductManager('../files/productos.json');

// 1er endpoint - traigo todos los productos
app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const productos = await productManager.getProducts(limit);
    //const productos = await productManager.getProducts();
    res.json({ productos });
});


// 2do endpoint - traigo productos por id
app.get('/products/:pid', (req, res) => {
    const idProducto = parseInt(req.params.pid);
    const producto = productManager.getProductById(idProducto);
    if (producto !== undefined) {
      res.json({ producto });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
