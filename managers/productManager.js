import fs from 'fs';

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.autoIncrId = 1;
    this.loadProducts();
  }

  // Método carga
  loadProducts() {
    try {
      //leo archivo
      const data = fs.readFileSync(this.path, 'utf8');
      //cargo data del archivo en array
      this.products = JSON.parse(data);
      
      const lastProduct = this.products[this.products.length - 1];
      if (lastProduct) {
        this.autoIncrId = lastProduct.id + 1;
      }
    } catch (error) {
      this.products = []
      console.log('Error en la carga.');
      console.log(error);
    }
  }

  // Método save
  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  
  // Metodo para agregar Producto
  addProduct(dataProducto) {
    //Chequeo campos vacíos
    if (!dataProducto.title || !dataProducto.description || !dataProducto.price || !dataProducto.thumbnail || !dataProducto.code || !dataProducto.stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }
    // Chequeo que no se repitan los códigos de producto
    if (this.products.some((product) => product.code === dataProducto.code)) {
      console.error("El código del producto ya existe.");
      return;
    }
    // Genero producto como constante
    const product = {
      id: this.autoIncrId++,
      title: dataProducto.title,
      description: dataProducto.description,
      price: dataProducto.price,
      thumbnail: dataProducto.thumbnail,
      code: dataProducto.code,
      stock: dataProducto.stock,
    };
    //Pusheo y guardo
    this.products.push(product);
    this.saveProducts();
  }

// get All para handlebars
getAllProducts() {
    return this.products;
}

  // Método get de todo con limit agregado
  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }

  // Método get x id
  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado.");
      return undefined;
    }
  }

  // Método actualizar
  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct, id };
      this.saveProducts();
    } else {
      console.error("Producto no encontrado.");
    }
  }

  // Método delete
  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    } else {
      console.error("Producto no encontrado.");
    }
  }
}

export default ProductManager;
