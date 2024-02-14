import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../dao/mongomanagers/productManagerMongo.js";
import CartManager from '../dao/mongomanagers/cartManagerMongo.js';
import Swal from "sweetalert2";

const cmanager = new CartManager();
const pmanager = new ProductManager()

const router = Router()



router.get("/", async (req, res) => {
    const listadeproductos = await pmanager.getProducts()
    res.render("home", { listadeproductos })
})

router.get("/realtimeproducts", (req, res) => {

    res.render("realtimeproducts")
})

router.get("/cart/65c28522c1483aaada1fb25c", async (req, res) => {
    const productsInCart = await cmanager.getCartById("65c28522c1483aaada1fb25c")
    const productList = Object.values(productsInCart.products)
    res.render("partials/cart", { productList })
})


router.delete('/delete-to-cart', async (req, res) => {
    try {
        const { productId } = req.body;

        const removeCartProduct = await cmanager.removeProductFromCart("65c28522c1483aaada1fb25c", productId);

        res.json({ success: true, message: 'Producto eliminado del carrito' });
      } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ message: 'Error al agregar producto al carrito' });
      }
});

router.post('/add-to-cart', async (req, res) => {
    try {
      const { productId } = req.body;
  
      const cart = await cmanager.getCartById("65c28522c1483aaada1fb25c");
  
      if (productId) {
        const id = productId;
        const productDetails = await pmanager.getProductById(productId);
        const addedProduct = await cmanager.addProductInCart("65c28522c1483aaada1fb25c", productDetails, id);
      }
  
      res.json({ success: true, message: 'Producto agregado al carrito' });
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      res.status(500).json({ message: 'Error al agregar producto al carrito' });
    }
  });
  




router.get("/chat", (req, res) => {
    res.render("chat")
})


export default router
