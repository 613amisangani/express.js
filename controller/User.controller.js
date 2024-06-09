// const User = require('../model/user.model');
const userServices = require('../services/user.services');
const userService = new userServices();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');



exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobileNo, profileImage, DOB, gender } = req.body;
        
        const user = await userService.registerUser(firstName, lastName, email, password, mobileNo, profileImage, DOB, gender);

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
    


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const login = await userService.loginUser(email, password);

        res.json(login);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}



exports.getProfile = async (req, res) => {
    try {
        const userProfile = await userService.getProfile(req.user);
        res.json(userProfile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.updateProfile = async (req, res) => {
    try {
        const user = await userService.updateProfile(req.user, req.body);
        res.json({ user, message: "User profile updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const result = await userService.changePassword(req.user, oldPassword, newPassword, confirmPassword);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.user);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
