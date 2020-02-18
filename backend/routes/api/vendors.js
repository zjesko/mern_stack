const router = require('express').Router()

const Vendor = require('../../models/Vendor');

// @route GET api/vendors - Get All vendors
// @access Public
router.get('/', (req, res) => {
    Vendor.find()
        .then(data => res.status(200).json(data));
});

// @route POST api/vendors - Create a vendor
// @access Public
router.post('/', (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    newVendor.save().then(data => res.status(201).json(data));
});


// @route GET api/vendors/:id - Get a vendor
// @access Public
router.get('/:id', (req, res) => {
    Vendor.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({error: "Vendor not found"}))
});

// @route DELETE api/vendors/:id - Delete a vendor
// @access Public
router.delete('/:id', (req, res) => {
    Vendor.findById(req.params.id)
        .then(vendor => vendor.remove().then(() => res.status(200).json({success: true})))
        .catch(err => res.status(404).json({error: "Vendor not found"}))
});

module.exports = router;