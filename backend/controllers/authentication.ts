import AuthenticationService from "../model/authentication";
import jwt from "jsonwebtoken";
import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcrypt";
import ErrorMessage from "../libs/ErrorMessage";

class AuthenticationController {
    private model: AuthenticationService;
    private jwtSecretKey: string;

    constructor() {
        this.model = new AuthenticationService();
        this.jwtSecretKey = process.env.JWTSECRETKEY || '';
    }
    
    jwtSign(email: string) {
        return jwt.sign({email}, this.jwtSecretKey, { expiresIn: '1d' });
    }
    
    hasAllInformation(email: string, password: string) {
        if (!email) throw new Error (ErrorMessage.emailEmpty);
        if (!password) throw new Error (ErrorMessage.passwordEmpty);
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
                if (!hasCorrectPassword) throw new Error(ErrorMessage.emailOrPasswordWrong);
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

    async resetToken(email: string) { 
        try {
            const user = await this.model.login(email);
            return {
                email: user.email,
                token: this.jwtSign(user.email)
            };
        } catch (error: any) {
            const err: Error = error;
            throw new Error(err.message);
            
        }
    }
}


export default AuthenticationController;