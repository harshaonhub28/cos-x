const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const User = require('../models/user.model');

module.exports = {
    strategy: () =>{
        const jwtOptions = {
            secretOrKey: process.env.SECRETORKEY || "avadakedavra",
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
        }
        
        return new JwtStrategy(jwtOptions,(jwtPayload,next) =>{
            console.log('Payload:',jwtPayload);
            User.find({username:jwtPayload.username}, (err,user) =>{
                if(err) next(err,false);
                if(user)
                    next(null,user);
                else 
                    next(null,false);
            })
        });


    }
}