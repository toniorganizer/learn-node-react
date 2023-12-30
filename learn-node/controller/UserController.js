import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { json } from "sequelize";

export const getUser = async(req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);        
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);        
    }
}

export const createUser = async(req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({msg: "User created"});
    } catch (error) {
        console.log(error.message);        
    }
}

export const updateUser = async(req, res) => {
    try {
        await User.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User updated"});
    } catch (error) {
        console.log(error.message);        
    }
}

export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User deleted"});
    } catch (error) {
        console.log(error.message);        
    }
}

export const Register = async(req, res) => {
    const {username, name, email, password, confirmPassword} = req.body;
    if(password !== confirmPassword) return res.status(400).json({msg: "Password tidak sama"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            username: username,
            name: name,
            email:email,
            password:hashPassword
        });
        res.json({msg: "Register berhasil"});
    } catch (error) {
        console.error(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        
        if (!match) {
            return res.status(401).json({ msg: 'Password salah' });
        }

        const userId = user.id;
        const username = user.username;
        const name = user.name;
        const email = user.email;

        const accessToken = jwt.sign({ userId, username, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({ userId, username, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.sendStatus(204);
    }

    try {
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user || !user[0]) {
            return res.sendStatus(204);
        }

        const userId = user[0].id;
        await User.update({ refresh_token: null }, {
            where: {
                id: userId
            }
        });

        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


