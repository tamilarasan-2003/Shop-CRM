const db = require("../config/db");


const getAllProducts = (callback) => {
    const sql = "SELECT * FROM products";

    db.query(sql, callback);
};


const getProductById = (id, callback) => {
    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [id], callback);
};



const createProduct = (product, callback) => {

    const sql = `
        INSERT INTO products
        (
            name,
            category,
            price,
            stock,
            available,
            image
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        product.name,
        product.category,
        product.price,
        product.stock,
        product.available,
        product.image
    ];

    db.query(sql, values, callback);
};

const updateProduct = (id, product, callback) => {

    let sql;
    let values;

    if (product.image) {

        sql = `
            UPDATE products
            SET
                name = ?,
                category = ?,
                price = ?,
                stock = ?,
                available = ?,
                image = ?
            WHERE id = ?
        `;

        values = [
            product.name,
            product.category,
            product.price,
            product.stock,
            product.available,
            product.image,
            id
        ];

    }

    else {

        sql = `
            UPDATE products
            SET
                name = ?,
                category = ?,
                price = ?,
                stock = ?,
                available = ?
            WHERE id = ?
        `;

        values = [
            product.name,
            product.category,
            product.price,
            product.stock,
            product.available,
            id
        ];
    }


    db.query(sql, values, callback);
};


const deleteProduct = (id, callback) => {

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], callback);
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};