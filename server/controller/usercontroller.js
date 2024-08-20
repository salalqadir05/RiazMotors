const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);

        const checkExistedUser = await User.findOne({ email });
        if (checkExistedUser) {
            return res.json({ msg: "User already exists", status: false });
        }

        const salt = await bcrypt.genSalt(10);
        const Sec_Password = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: Sec_Password
        });

        delete newUser.password; // Optional: This doesn't actually delete password from the database, only from the response

        return res.json({ status: true, newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        const checkUser = await User.findOne({ username });
        if (!checkUser) {
            return res.json({ status: false, msg: "User does not exist" });
        }

        const compare_Password = await bcrypt.compare(password, checkUser.password);
        if (!compare_Password) {
            return res.json({ error: "Invalid credentials", status: false });
        }

        const data = {
            checkUser: {
                id: checkUser.id
            }
        };
        const auth_Token = jwt.sign(data, process.env.JWT_SECRET);

        delete checkUser.password; // Optional: This doesn't actually delete password from the database, only from the response

        return res.json({ status: true, checkUser, auth_Token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Server error" });
    }
};

const fetchdetails = async (req, res) => {
    try {
        const Userlist = await User.find().select('-password');
        const count = Userlist.length;
        return res.json({ count, Userlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Server error" });
    }
};

const updatedetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                username,
                email,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found', status: false });
        }

        delete updatedUser.password; // Optional: This doesn't actually delete password from the database, only from the response

        return res.json({ status: true, updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Server error" });
    }
};

module.exports = {
    register,
    login,
    fetchdetails,
    updatedetails
};
