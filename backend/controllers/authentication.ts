import AuthenticationService from "../model/authentication";
import jwt from "jsonwebtoken";
import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcrypt";

class AuthenticationController {
    private model: AuthenticationService;
    private jwtSecretKey: string;

    constructor() {
        this.model = new AuthenticationService();
        this.jwtSecretKey = process.env.JWTSECRETKEY || '';
    }
    
    jwtSign(email: string) {
        return jwt.sign({email}, this.jwtSecretKey, { expiresIn: '1h' });
    }
    
    hasAllInformation(email: string, password: string) {
        if (!email) throw new Error ("Email is empty");
        if (!password) throw new Error ("Password is empty");
    }
    
    login() {
        return new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
          },
          async (email, password, done) => {
            try {
                const user = await this.model.login(email);
                const hasCorrectPassword = bcrypt.compareSync(password, user.password);
                if (!hasCorrectPassword) throw new Error("Email or Password is wrong");
                return done(null, {
                    email: user.email,
                    token: this.jwtSign(user.email)
                });
            } catch (error) {
                done(error);
            }
        })
    }
    
    resetPassword() {
        return new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
          },
          async (email, password, done) => {
            try {
                const hashedPassword = bcrypt.hashSync(password, 10)
                const user = await this.model.resetPassword(email, hashedPassword);
        
                return done(null, {
                    email: user.email,
                    token: this.jwtSign(user.email)
                });
            } catch (error) {
                done(error);
            }
        })
    }
    
    signup() {
        return new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
          },
          async (email, password, done) => {
            try {
                const hashedPassword = bcrypt.hashSync(password, 10)
                const user = await this.model.signup(email, hashedPassword);
        
                return done(null, {
                    email: user.email,
                    token: this.jwtSign(user.email)
                });
            } catch (error) {
                done(error);
            }
        })
    }
}


export default AuthenticationController;