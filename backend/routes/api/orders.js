const router = require('express').Router();
const Order = require('../../models/Order');
const User = require('../../models/User');
const Product = require('../../models/Product');
const auth = require('../../middleware/auth');

// @route GET api/orders - Get All orders
// @access Customer only
router.get('/', auth, (req, res) => {
    Order.find({customer: req.user.id}).populate({
        path: "product"
    }).then(data => res.status(200).json(data));
});

// @route POST api/orders - Create a order
// @access Customer only 
router.post('/', auth, (req, res) => {
    const newOrder = new Order({
        customer: req.user.id,
        product: req.body.product,
        quantity: req.body.quantity,
    });
    Product.updateOne({ _id: req.body.product}, {$inc: {'bundle_quantity': req.body.quantity * -1}}, function (err){
        if (err) return console.error(err);
    })
    Product.updateOne({ bundle_quantity: 0, status: "waiting"}, {$set: {'status': "placed"}}, function (err){
        if (err) return console.error(err);
    })

    newOrder.save().then(data => res.status(201).json(data));
});

// @route POST api/orders - Create a order
// @access Customer only 
router.post('/rate_product', auth, (req, res) => {
    Product.updateOne({ _id: req.body.id, status: "dispatched"}, {$push: {rating: req.body.rating}}, function (err){
        if (err) return console.error(err);
    }).then(data => res.json(data))
    Product.updateOne({ _id: req.body.id, status: "dispatched"}, {$push: {review: req.body.review}}, function (err){
        if (err) return console.error(err);
    }).then(data => res.json(data))
});

router.post('/rate_vendor', auth, (req, res) => {
    User.updateOne({ _id: req.body.id }, {$push: {rating: req.body.rating}}, function (err){
        if (err) return console.error(err);
    }).then(data => res.json(data))
});

// @route GET api/orders/:id - Get a order
// @access Customer
router.get('/:id', auth, (req, res) => {
    Order.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({error: "Order not found"}))
});

// @route DELETE api/orders/:id - Delete a order
// @access Customer
router.delete('/:id', auth, (req, res) => {
    Order.findById(req.params.id)
        .then(order => order.remove().then(() => res.status(200).json({success: true})))
        .catch(err => res.status(404).json({error: "Order not found"}))
});

module.exports = router;
