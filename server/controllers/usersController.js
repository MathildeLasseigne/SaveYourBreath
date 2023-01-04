const User = require('../models/userModel');

const validRoles = ['admin', 'standard', 'contributor'];

// api to update user role
const updateUser = async (req, res) => {
    if (req.body.role && validRoles.includes(req.body.role)) {
        User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error updating user role.' });
            }
            else {
                console.log('user role is ', user.role);
                return res.status(200).json({
                    id: user._id,
                    username: user.username,
                    role: user.role
                })
            }
        });
    } else {
        return res.status(400).json({ message: 'Invalid role argument.' });
    }
};

module.exports = { updateUser };

// copypaste to test the users api
/*
curl -X PUT \
  'http://localhost:8080/users/63a9a9f99bd7ee1c6354103f' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'role=standard'
*/
