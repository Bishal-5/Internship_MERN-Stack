const router = require('express').Router();
const productController = require('../controllers/product.controller');

// Route to add a new product
router.post('/add', productController.addProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/list', productController.listProducts);
router.get('/detail/:id', productController.getProductDetail);

module.exports = router;