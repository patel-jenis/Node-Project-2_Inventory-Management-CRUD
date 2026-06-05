const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

let products = [];

const server = express();

server.set("view engine", "ejs");
server.use(bodyParser.urlencoded());

server.get("/", (req, res) => {
    res.render("index");
})

server.get("/view-inventory", (req, res) => {
    res.render("view", { products });
})

server.get("/edit-inventory/:id", (req, res) => {
    let { id } = req.params;

    let product = products.find((prd) => {
        return prd.id == id;
    })

    res.render("edit", { product });
})

server.get("/delete-inventory/:id", (req, res) => {
    let { id } = req.params;

    let remainingProducts = products.filter((prd) => {
        return prd.id != id;
    })

    products = remainingProducts;

    res.redirect("/view-inventory");
})

server.get("/view-inventory/:id", (req, res) => {
    let { id } = req.params;

    let product = products.find(
        prd => prd.id == id
    );

    res.render("product", { product });
})

server.post("/add-inventory", (req, res) => {
    console.log("req.body ", req.body);

    let obj = {
        ...req.body,
        id: Date.now(),
    }

    products.push(obj);
    console.log("Products: ", products);

    res.redirect("/view-inventory");
})

server.post("/update-inventory", (req, res) => {
    console.log("Update Imnventory", req.body);

    let newInventory = products.map((prd) => {
        if (prd.id == req.body.id) {
            return {
                ...prd,
                ...req.body
            };
        } else {
            return prd;
        }
    })

    products = newInventory;

    res.redirect("/view-inventory");
})

server.listen(port, (err) => {
    if (!err) {
        console.log("Server is running on port:", port);
    }
})