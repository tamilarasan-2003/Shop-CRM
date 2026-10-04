const productModel = require("../models/productModel");
const fs = require("fs");
const path = require("path");

const getProducts = (req, res) => {

    productModel.getAllProducts((err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to get products",
                error: err.message
            });
        }

        res.status(200).json(results);
    });
};

const getProduct = (req, res) => {

    const { id } = req.params;

    productModel.getProductById(
        id,
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to get product",
                    error: err.message
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            res.status(200).json(results[0]);
        }
    );
};

const createProduct = (req, res) => {

    const product = {

        name: req.body.name,

        category: req.body.category,

        price: req.body.price,

        stock: req.body.stock,

        available: req.body.available,

      
        image: req.file
            ? `/uploads/products/${req.file.filename}`
            : null
    };


    productModel.createProduct(
        product,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: "Failed to create product",
                    error: err.message
                });
            }


            res.status(201).json({

                message:
                    "Product created successfully",

                productId:
                    result.insertId,

                image:
                    product.image
            });
        }
    );
};

const updateProduct = (req, res) => {

    const { id } = req.params;
    productModel.getProductById(
        id,
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    message: "Failed to get product",
                    error: err.message
                });
            }


            if (results.length === 0) {

                return res.status(404).json({
                    message: "Product not found"
                });
            }


            const oldProduct = results[0];


            const product = {

                name: req.body.name,

                category: req.body.category,

                price: req.body.price,

                stock: req.body.stock,

                available: req.body.available
            };
            if (req.file) {

                product.image =
                    `/uploads/products/${req.file.filename}`;
            }


            productModel.updateProduct(
                id,
                product,
                (err, result) => {

                    if (err) {

                        return res.status(500).json({
                            message:
                                "Failed to update product",
                            error: err.message
                        });
                    }


                    if (result.affectedRows === 0) {

                        return res.status(404).json({
                            message:
                                "Product not found"
                        });
                    }

                    if (
                        req.file &&
                        oldProduct.image
                    ) {

                        const oldImagePath =
                            path.join(
                                __dirname,
                                "..",
                                oldProduct.image
                            );


                        if (
                            fs.existsSync(oldImagePath)
                        ) {

                            fs.unlinkSync(
                                oldImagePath
                            );
                        }
                    }


                    res.status(200).json({

                        message:
                            "Product updated successfully"
                    });
                }
            );
        }
    );
};

const deleteProduct = (req, res) => {

    const { id } = req.params;
    productModel.getProductById(
        id,
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    message:
                        "Failed to get product",
                    error: err.message
                });
            }


            if (results.length === 0) {

                return res.status(404).json({
                    message:
                        "Product not found"
                });
            }


            const product = results[0];
            productModel.deleteProduct(
                id,
                (err, result) => {

                    if (err) {

                        return res.status(500).json({
                            message:
                                "Failed to delete product",
                            error: err.message
                        });
                    }
                    
                    if (product.image) {

                        const imagePath =
                            path.join(
                                __dirname,
                                "..",
                                product.image
                            );


                        if (
                            fs.existsSync(imagePath)
                        ) {

                            fs.unlinkSync(
                                imagePath
                            );
                        }
                    }


                    res.status(200).json({

                        message:
                            "Product deleted successfully"
                    });
                }
            );
        }
    );
};


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};