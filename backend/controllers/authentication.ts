import model from "../model/authentication";
import jwt from "jsonwebtoken";
import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcrypt";

function jwtSign(email: string) {
    return jwt.sign({email}, process.env.JWTSECRETKEY || '', { expiresIn: '1h' });
}

function hasAllInformation(email: string, password: string) {
    if (!email) throw new Error ("Email is empty");
    if (!password) throw new Error ("Password is empty");
}

const login = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
        const user = await model.login(email);
        const hasCorrectPassword = bcrypt.compareSync(password, user.password);
        if (!hasCorrectPassword) throw new Error("Email or Password is wrong");
        return done(null, {
            email: user.email,
            token: jwtSign(user.email)
        });
    } catch (error) {
        done(error);
    }
})

const resetPassword = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await model.resetPassword(email, hashedPassword);

        return done(null, {
            email: user.email,
            token: jwtSign(user.email)
        });
    } catch (error) {
        done(error);
    }
})

const signup = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await model.signup(email, hashedPassword);

        return done(null, {
            email: user.email,
            token: jwtSign(user.email)
        });
    } catch (error) {
        done(error);
    }
})

export default {
    hasAllInformation,

    login,
    resetPassword,
    signup
}