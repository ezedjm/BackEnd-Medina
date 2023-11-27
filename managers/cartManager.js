import fs from "fs";
import path from "path";
import __dirname from "../src/utils.js";

class cartManager {
    constructor(pathFile){
        this.path = path.join(__dirname,`../files/${pathFile}`);
        this.carts = [];
        this.loadCarts();
    }


  // Método de carga
  loadCarts() {
    try {
      //leo archivo
      const data = fs.readFileSync(this.path, 'utf8');
      //cargo data del archivo en array
      this.carts = JSON.parse(data);
    } catch (error) {
      this.products = []
      console.log('Error en la carga de los CARTS.');
    }
  }

    // Método save
    saveCarts() {
        const data = JSON.stringify(this.carts, null, 2);
        fs.writeFileSync(this.path, data);
      }


//Creo nuevo carrito
  addCart(dataCarrito) {
    // Genero carrito como constante con la info que me padan por parametro
    const carrito = {
      id: dataCarrito.id,
      products: []
    };
    //Pusheo y guardo
    this.carts.push(carrito);
    this.saveCarts();
  }




  // Método GET de todo 
  getCarts() {
          return this.carts;
     }

  // Método GET x id
  getCartById(id) {
    //console.log(`Carrito buscado: ${id}.`);
    const carrito = this.carts.find((c) => c.id === id);
    if (carrito) {
      return carrito;
    } else {
      console.error(`Carrito ${id} no encontrado.`);
      return undefined;
    }
  }

// agrego pid a cid
  addProductToCart(cid, pid) {
    const cart = this.carts.find((c) => c.id === cid);
    if (cart) {
      const existeProducto = cart.products.find((p) => p.id === pid);
      if (existeProducto) {
        existeProducto.quantity += 1;
      } else {
        cart.products.push({ id: pid, quantity: 1 });
      }
      this.saveCarts();
      return cart.products;
    } else {
      console.error("Carrito no encontrado.");
      return undefined;
    }
  }
}



export {cartManager};