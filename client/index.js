const express = require("express");
const bodyParser = require("body-parser");
const client = require("./client");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    client.getAll(null, (err, data) => {
        if (!err) {
            res.send(data.customers);
        }
    });
});

app.post("/create", (req, res) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };
    client.insert(newCustomer, (err, data) => {
        if (err) throw err;
        console.log("customer created successfully", data);
        res.send({ message: "customer created successfully" });
    });
});

app.get("/customer/:id", (req, res) => {
    client.get({ id: req.body.customer_id }, (err, _) => {
        if (err) throw err;

        console.log("customer get successfully");
        res.send({ message: "customer get successfully" });
    });
});

app.post("/update", (req, res) => {
    // Implement update logic here
});

app.post("/remove/:id", (req, res) => {
    // Implement remove logic here
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server running at port ", PORT);
});
