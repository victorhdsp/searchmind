import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import controllerAuthentication from "../controllers/authentication";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRETKEY || ''
}

passport.use(new JwtStrategy(options, (payload, done) => {
    done(null, payload);
}))

passport.use("login", controllerAuthentication.login);
passport.use("resetPassword", controllerAuthentication.resetPassword);
passport.use("signup", controllerAuthentication.signup);