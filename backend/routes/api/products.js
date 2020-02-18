const router = require('express').Router();
const Product = require('../../models/Product');
const auth = require('../../middleware/auth')

// @route GET api/products - Get All products
// @access Public
router.get('/', (req, res) => {
    Product.find()
        .then(data => res.status(200).json(data));
});

// @route POST api/products - Create a product
// @access Public
router.post('/', auth, (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        bundle_quantity: req.body.bundle_quantity,
        bundle_price: req.body.bundle_price,
    });
    newProduct.save().then(data => res.status(201).json(data));
});


// @route GET api/products/:id - Get a product
// @access Public
router.get('/:id', auth, (req, res) => {
    Product.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({error: "Product not found"}))
});

// @route DELETE api/products/:id - Delete a product
// @access Public
router.delete('/:id', auth, (req, res) => {
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.status(200).json({success: true})))
        .catch(err => res.status(404).json({error: "Product not found"}))
});

module.exports = router;