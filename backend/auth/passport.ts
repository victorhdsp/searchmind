import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import AuthenticationController from "../controllers/authentication";

const authenticationController = new AuthenticationController()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRETKEY || ''
}

passport.use(new JwtStrategy(options, (payload, done) => {
    done(null, payload);
}))

passport.use("login", authenticationController.login());
passport.use("resetPassword", authenticationController.resetPassword());
passport.use("signup", authenticationController.signup());