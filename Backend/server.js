const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

require("./config/db");

const productRoutes =
    require("./routes/productRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


app.use(
    "/api/products",
    productRoutes
);


app.get("/", (req, res) => {

    res.json({
        message: "Tea Shop Backend Running"
    });

});


const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});