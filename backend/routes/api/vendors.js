const router = require('express').Router();
const Vendor = require('../../models/Vendor');
const bcyrpt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

// @route GET api/vendors - Get All vendors
// @access Public
router.get('/', (req, res) => {
    Vendor.find()
        .then(data => res.status(200).json(data));
});

// @route POST api/vendors - Create a vendor
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password){
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    Vendor.findOne({ email })
        .then(vendor => {
            if(vendor) return res.status(400).json({ msg: "Vendor already exists" });
            const newVendor = new Vendor({
                name: name,
                email: email,
                password: password,
            });

            bcyrpt.genSalt(10, (err, salt) => {
                bcyrpt.hash(newVendor.password, salt, (err, hash) => {
                    if (err) throw err;
                    newVendor.password = hash;
                    newVendor.save()
                        .then(vendor => {
                            jwt.sign(
                                { id: vendor.id },
                                config.get("jwtSecret"),
                                { expiresIn: 31536000 },
                                (err, token) => {
                                    if(err) throw err
                                    res.status(200).json({
                                        token,
                                        vendor: {
                                            id: vendor.id,
                                            name: vendor.name,
                                            email: vendor.email
                                        }
                                    }); 
                                }
                            )
                        });
                })
            })
        })
            
});


// @route GET api/vendors/:id - Get a vendor
// @access Public
router.get('/id', auth, (req, res) => {
    Vendor.findById(req.user.id)
        .select('-password')
        .then(data => res.json(data));
});

// @route DELETE api/vendors/:id - Delete a vendor
// @access Public
router.delete('/:id', (req, res) => {
    Vendor.findById(req.params.id)
        .then(vendor => vendor.remove().then(() => res.status(200).json({success: true})))
        .catch(err => res.status(404).json({error: "Vendor not found"}))
});


// @route POST api/vendors/login - Authenticate vendor
// @access Public
router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password){
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    Vendor.findOne({ email })
        .then(vendor => {
            if(!vendor) return res.status(400).json({ msg: "Vendor dosent exist" });
            
            bcyrpt.compare(password, vendor.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ error: "Invalid Credentials" })
                    jwt.sign(
                        { id: vendor.id },
                        config.get("jwtSecret"),
                        { expiresIn: 31536000 },
                        (err, token) => {
                            if(err) throw err
                            res.status(200).json({
                                token,
                                vendor: {
                                    id: vendor.id,
                                    name: vendor.name,
                                    email: vendor.email
                                }
                            }); 
                        }
                    )
                })
        })  
});


module.exports = router;