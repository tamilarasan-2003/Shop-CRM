const express = require("express");

const router = express.Router();

const productController =
    require("../controllersView/productController");

const upload =
    require("../middleware/upload");


router.get(
    "/",
    productController.getProducts
);


router.get(
    "/:id",
    productController.getProduct
);

router.post(
    "/",
    upload.single("image"),
    productController.createProduct
);


router.put(
    "/:id",
    upload.single("image"),
    productController.updateProduct
);

router.delete(
    "/:id",
    productController.deleteProduct
);

module.exports = router;