const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) res.status(401).json({ error: "No Auth Token"});
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch (e){
        res.status(400).json({ error: 'Invalid token' })
    }
}

module.exports = auth;