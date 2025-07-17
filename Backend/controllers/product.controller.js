const { log } = require('winston');
const fileManager = require('../utils/fileManager');
const { generateResponse } = require('../utils/helper');

const productController = {
    // Add new product
    addProduct: async (req, res) => {
        try {
            let newProduct = req.body;
            const product = await fileManager.readData("product.json");
            const existingProduct = product.find(prod => prod.id === newProduct.id);

            // If product already exists, return error
            if (existingProduct) {
                return res
                    .status(400)
                    .json(generateResponse(false, "Product Already Exists", null, 400));
            }

            // Add new product to the list
            newProduct = await fileManager.appendData("product.json", newProduct);

            return res
                .status(201)
                .json(generateResponse(true, "Product Added Successfully", newProduct, 201));

        } catch (error) {
            console.error("Error adding product:", error);
            return res
                .status(500)
                .json(generateResponse(false, "Internal Server Error", null, 500));

        }
    },

    // Update product by ID
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const product = await fileManager.readData("product.json");
            const findProduct = product.find(prod => prod.id === parseInt(id));

            // If product not found, return error
            if (!findProduct) {
                return res
                    .status(404)
                    .json(generateResponse(false, "Product Not Found", null, 404));
            }

            // Update product details
            const updatedProd = await fileManager.updateData(id, "product.json", updateData);

            return res
                .status(200)
                .json(generateResponse(true, "Product Updated Successfully", updatedProd, 200));

        } catch (error) {
            return res
                .status(500)
                .json(generateResponse(false, "Failed to update product", null, 500));
        }
    },

    // Delete product by ID
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await fileManager.readData("product.json");
            const findProduct = await product.find(prod => prod.id === parseInt(id));

            // If product not found
            if (!findProduct) {
                return res
                    .status(401)
                    .json(generateResponse(false, "Product Not Found", null, 400));
            }

            await fileManager.deleteData("product.json", id);

            return res
            .status(200)
            .json(generateResponse(true, "Product Deleted!", null, 200));

        } catch (error) {
            return res
                .status(500)
                .json(generateResponse(false, "Failed to delete product", null, 500));

        }
    },

    // List of all products
    listProducts: async (_, res) => {
        try {
            const product = await fileManager.readData("product.json");

            if(!product){
                return res
                .status(400)
                .json(generateResponse(false, "Empty Product List", null, 400))
            }

            return res
            .status(200)
            .json(generateResponse(true, "All Product Fetched", product, 200));

        } catch (error) {
            return res
            .status(500)
            .json(generateResponse(false, "Internal Server Error!", null, 500));
        }
    },

    // Get product by id
    getProductDetail: async (req, res) => {
        try {
            const {id} = req.params;
            const product = await fileManager.readData("product.json");
            const getProduct = await product.find(prod=> prod.id === parseInt(id));

            if (!getProduct) {
                return res
                .status(400)
                .json(generateResponse(false, "Product Not Found!", null, 400));
            }

            return res
            .status(200)
            .json(generateResponse(true, "Product Fetched...", getProduct, 200));
            
        } catch (error) {
            return res
            .status(500)
            .json(generateResponse(false, "Internal Server Error!", null, 500));
        }
    },
};

module.exports = productController;