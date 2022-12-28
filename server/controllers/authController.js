const crypto = require('crypto');

const User = require('../models/userModel');

// to use in case the MongoDB database is down/deleted
const dummyUsers = [
    { id: 1, username: 'admin@example.com', hash: 'f7b124f494c2a564651e7d190c12e0cb080a3f5e3e08e4f72fb94209f38d9cf0f3d1c923ee8b1a75c1c7f0f137b5d71137b685cb9fc4debb7dad0d897c75a4bf', salt: 's4v3y0urbr34th', role: 'admin' },
    { id: 2, username: 'guest@example.com', hash: 'd9cbce9f405e43b850ea15b34ca98ed3b64042f223fa5a6818937fdfc90c5760a9b162a97048805a88c9848ad3b0f932b945f05f7c167a825d0a723b2e3e3861', salt: 'iamagu3st', role: 'standard' }
]

const getHashedPassword = (password, salt) => {
    // Hashing password with 1000 iterations, 64 length and sha512 digest
    hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash;
};

// Find user in dummy data
async function findUserInDummyData(req, res) {

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Please enter an username and password' })
    }

    // const user = dummyUsers.find(u => u.username === req.body.username && u.hash === getHashedPassword(req.body.password, u.salt))
    const user = dummyUsers.find(u => u.username === req.body.username);

    if (!user) {
        return res.status(400).json({
            message: "User not found. Please create an account."
        });
    }
    else if (user.hash === getHashedPassword(req.body.password, user.salt)) {
        console.log("good password");
        return res.status(200).json({ username: user.username, role: user.role });    }
    else {
        return res.status(400).json({ message: 'Wrong username or password' })
    }
};

// User login api
const loginUser = async (req, res) => {

    // Find user in MongoDB
    User.findOne({ username: req.body.username }, (err, user) => {

        // catch error
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: "Database error."
            });
        }

        // user not found
        else if (user === null) {
            /* return res.status(400).json({
                message: "User not found. Please create an account."
            }); */

            // try to find user in dummy data array
            return findUserInDummyData(req, res);
        }

        // check password
        else if (user.validPassword(req.body.password)) {
            return res.status(200).json({
                username: user.username,
                role: user.role
            })
        }

        // wrong password
        else if (!user.validPassword(req.body.password)) {
            return res.status(400).json({
                message: "Wrong Password"
            });
        }

        // should never happen, but just in case
        else {
            console.log(err);
            console.log(user);
            return res.status(400).json({
                message: "Unknown error."
            });
        }
    });
};

// User register api
const registerUser = async (req, res) => {

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Please enter an username and password' })
    }

    let newUser = new User();
    newUser.username = req.body.username;
    newUser.setPassword(req.body.password);
    newUser.role = "standard";

    newUser.save((err, User) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: "Failed to register user."
            });
        }
        else {
            return res.status(201).json({
                message: "User registered successfully."
            });
        }
    });
};

module.exports = { loginUser, registerUser };

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

curl -X POST \
  'https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev/login' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=test1@example.com&password=test'
*/

// copypaste to test the register api
/*
curl -X POST \
  'https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev/register' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=test1@example.com&password=test'
*/