require('dotenv').config();

const JWT_SECRET = process.env.JWTSECRET;

module.exports = {
    JWT_SECRET
};