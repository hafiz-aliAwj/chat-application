const User = require("../Models/newUser");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const findUsername = await User.findOne({ username });
        if(findUsername){
            return res.status(400).json({ error: "Username already exists", status: false });
        }
        const findEmail = await User.findOne({ email });
        if(findEmail){
            return res.status(400).json({ error: "Email already exists", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.json({staus: true, user});
    } catch (error) {
        next(error);
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const findUsername = await User.findOne({ username });
        if(!findUsername){
            return res.status(404).json({ error: "Invalid username or password", status: false });
        }
        const validPassword = await bcrypt.compare(password, findUsername.password);
        if(!validPassword){
            return res.status(404).json({ error: "Invalid username or password", status: false });
        }
        return res.json({staus: true, findUsername});
    } catch (error) {
        next(error);
    }
};