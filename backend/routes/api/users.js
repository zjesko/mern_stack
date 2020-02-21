const router = require('express').Router();
const User = require('../../models/User');
const bcyrpt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

// @route GET api/users - Get All users
// @access Public
router.get('/', (req, res) => {
    User.find()
        .then(data => res.status(200).json(data));
});

// @route POST api/users - Create a user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, vendor } = req.body
    console.log(vendor)
    if (!name || !email || !password){
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: "User already exists" });
            
            const newUser = new User({
                name: name,
                email: email,
                password: password,
                vendor: vendor,
            });
            console.log(newUser)
            bcyrpt.genSalt(10, (err, salt) => {
                bcyrpt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id, vendor: user.vendor },
                                config.get("jwtSecret"),
                                { expiresIn: 31536000 },
                                (err, token) => {
                                    if(err) throw err
                                    res.status(200).json({token, newUser}); 
                                }
                            )
                        });
                })
            })
        })
            
});


// @route GET api/users/:id - Get a user
// @access Public
router.get('/id', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(data => res.json(data));
});

// @route DELETE api/users/:id - Delete a user
// @access Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.status(200).json({success: true})))
        .catch(err => res.status(404).json({error: "User not found"}))
});


// @route POST api/users/login - Authenticate user
// @access Public
router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password){
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: "User dosent exist" });
            
            bcyrpt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ error: "Invalid Credentials" })
                    jwt.sign(
                        { id: user.id },
                        config.get("jwtSecret"),
                        { expiresIn: 31536000 },
                        (err, token) => {
                            if(err) throw err
                            res.status(200).json({token ,user}); 
                        }
                    )
                })
        })  
});


module.exports = router;
