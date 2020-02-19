const router = require('express').Router();
const Product = require('../../models/Product');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const FuzzySearch = require('fuzzy-search');

// @route GET api/products - Get All products
// @access Vendors / Customers
router.get('/', auth, (req, res) => {
    Product.find()
        .sort([[req.query.sort_by , req.query.asc]])
        .then(data => {
            const searcher = new FuzzySearch(data, ['name'])
            res.status(200).json(searcher.search(req.query.search));
        })
});

// @route GET api/products - Get All products
// @access Vendors
router.get('/:status', auth, (req, res) => {
    Product.find({status: req.params.status})
        .then(data => res.status(200).json(data));
});

// @route POST api/products - Create a product
// @access Vendors
router.post('/', auth, (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        bundle_quantity: req.body.bundle_quantity,
        bundle_price: req.body.bundle_price,
        vendor: req.user.id
    });
    newProduct.save().then(data => res.status(201).json(data));
});


// @route GET api/products/:id - Get a product
// @access Vendors
router.get('/:id', auth, (req, res) => {
    Product.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({error: "Product not found"}))
});

// @route GET api/products/:id - Get a product
// @access Vendors
router.put('/:id', auth, (req, res) => {
    Product.updateOne({ _id: req.params.id, status: "placed"}, {$set: {'status': "dispatched"}})
        .then(data => res.status(200).json({ msg: "product dispatched" }))
        .catch(err => res.status(404).json({error: "Error, Product not placed"}))
});

// @route DELETE api/products/:id - Delete a product
// @access Public
router.delete('/:id', auth, (req, res) => {
    Vendor.updateOne({ _id: req.params.id }, {$set: {status: "cancelled"}}, function (err){
        if (err) return console.error(err);
    })
});

module.exports = router;