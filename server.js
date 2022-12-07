const express = require("express");
const morgan = require("morgan");
const app = express();
// luego cambiar a archivo .json
let products = [
    {
        id: 1,
        name: "laptop",
        price: 3000,

    }
];


app.use(morgan('dev'));
//para importar json y verlos 
app.use(express.json());


app.get('/products', (req, res) => {

    res.json(products);
});


app.post('/products', (req, res) => {

    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    // respuesta mostrando el producto recordar el stringify para leer array
    res.send(`creando productos ${JSON.stringify(newProduct)}`);

});


app.put('/products/:id', (req, res) => {

    const newData = req.body
    const { id } = req.params
    // recordar parse int al buscar id ya que entra como string
    const productFound = products.find((product) => product.id === parseInt(id))

    if (!productFound)
        return res.status(404).json({
            message: "Producto no encontrado"
        })


    products = products.map((product) => product.id === parseInt(id)
        ? { ...product, ...newData }
        : products)
    res.json({
        message: "Producto actualizado"
    });

});


app.delete('/products/:id', (req, res) => {

    const { id } = req.params
    // recordar parse int al buscar id ya que entra como string
    const productFound = products.find((product) => product.id === parseInt(id))

    if (!productFound)
        return res.status(404).json({
            message: "Producto no encontrado"
        })

    products = products.filter((product) => product.id !== parseInt(id))
    res.status(202).send();

});


app.get('/products/:id', (req, res) => {

    const { id } = req.params
    // recordar parse int al buscar id ya que entra como string
    const productFound = products.find((product) => product.id === parseInt(id))

    if (!productFound)
        return res.status(404).json({
            message: "Producto no encontrado"
        })

    res.json(productFound);

});


app.use((req, res) => {

    res.status(404).send(`Not Found`);

});


app.listen(3000);
console.log(`Server on Port ${3000}`);