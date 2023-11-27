import { Router } from "express";
import { cartManager } from "../../managers/cartManager.js";

const router = Router();

const cartsManagerInst = new cartManager('../files/carts.json');

/*//todos los carts
router.get('/carts', async (req, res)=>{
    
    const carritos = await cartsManagerInst.getCarts();
    //si existe lo muestro
    if (carritos !== undefined){
        //res.json({ carritos });
       
} else {
    //si no muestro error
    res.status(404).json({ error: 'Carritos es undefined.' });
}
});*/


//GET Cart x id
router.get ('/:cid', async (req, res)=>{
    //traigo el id que ingresa por parametro
    const idCarrito = req.params.cid;
    //genero const de lo que busco y lo manejo con manager para ver que trae
    const carritoBuscado = await cartsManagerInst.getCartById(idCarrito);
    //si existe lo muestro
    if (carritoBuscado !== undefined){
        res.json({ carritoBuscado });
} else {
    //si no muestro error
    res.status(404).json({ error: `Carrito ${idCarrito} no encontrado.` });
}
});

//POST - crea nuevo carrito
router.post ('/', async (req, res)=>{
    //genero const con el nuevo carrito a crear
    const newCart = {
        id : generarIdUnico(),
        products : []
    };
    //lo envio al manager con el metodo addCart 
    cartsManagerInst.addCart(newCart)
    //mensaje al front de success y muestro newCart
    res.send({
        status: "success",
        msg: newCart
    });
    });

    function generarIdUnico() {
        return Date.now().toString(12) + Math.random().toString(12).substr(2);
    }

// POST - agrega Producto con ID y CANTIDAD en carrito existente    
router.post ('/:cid/product/:pid', async (req, res)=>{
//traigo params de IDs
    const cid = req.params.cid;
    const pid = parseInt(req.params.pid);
    //genero const de lo que busco y lo manejo con manager para ver que trae
    const carritoBuscado = await cartsManagerInst.addProductToCart(cid,pid);
    //si devuelve algo
    if (carritoBuscado !== undefined){
        //mensaje success
        res.send({
            status: "success"
        });

} else {
    //si no muestro error
    res.status(404).json({ error: 'Carrito no encontrado.' });
}
});





export default router;