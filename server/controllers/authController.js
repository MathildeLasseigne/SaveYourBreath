const crypto = require('crypto');

// TODO
// const User = require('../models/userModel');

// to use in case the MongoDB database is down/deleted
const users = [
    { id: 1, username: 'admin@example.com', hash: 'f7b124f494c2a564651e7d190c12e0cb080a3f5e3e08e4f72fb94209f38d9cf0f3d1c923ee8b1a75c1c7f0f137b5d71137b685cb9fc4debb7dad0d897c75a4bf', salt: 's4v3y0urbr34th', role: 'admin' },
    { id: 2, username: 'guest@example.com', hash: 'd9cbce9f405e43b850ea15b34ca98ed3b64042f223fa5a6818937fdfc90c5760a9b162a97048805a88c9848ad3b0f932b945f05f7c167a825d0a723b2e3e3861', salt: 'iamagu3st', role: 'standard' }
]

const getHashedPassword = (password, salt) => {
    // Hashing password with 1000 iterations, 64 length and sha512 digest
    hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash;
};

// User login api
const loginUser = async (req, res) => {

    console.log('username is ', req.body.username);

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter an username and password' })
    }

    const user = users.find(u => u.username === req.body.username && u.hash === getHashedPassword(req.body.password, u.salt))

    if (!user) {
        return res.status(400).json({ message: 'Error. Wrong login or password'})
    }
    console.log("good password");
    return res.status(200).json({ username: user.username, role: user.role });
};

// Export module to allow it to be imported in other files
module.exports = { loginUser };

// copypaste to test the login api
/*
curl -X POST \
  'https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev/login' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=admin@example.com&password=admin'
*/
/*
curl -X POST \
  'https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev/login' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=guest@example.com&password=guest'
*/