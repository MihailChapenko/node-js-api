import db from '../db'
import {createJWT, hashPassword, comparePasswords} from "../modules/auth"

export const createNewUser = async (req, res) => {
    const isUserExists = await db.user.findUnique({
        where: {username: req.body.username},
    });

    if (isUserExists) {
        res.status(400);
        res.send("Username is already taken");
        return;
    }

    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.status(400);
        res.send("Username and password have to be longer than 5 characters");
        return;
    }

    const user = await db.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password),
        },
    })

    const token = createJWT(user)
    res.json({token})
};

export const signIn = async (req, res) => {
    const user = await db.user.findUnique({
        where: {username: req.body.username},
    });

    if (user === null) {
        console.log("here")
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401);
        res.send("Invalid username or password");
        return;
    }

    const token = createJWT(user);
    res.json({token});
}