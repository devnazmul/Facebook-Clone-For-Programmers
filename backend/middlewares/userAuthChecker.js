const jwt = require('jsonwebtoken');

module.exports =  userAuthCheck = (req,res,next) => {
    const {jwt_header_token} = req.headers;
    try {
        const token = jwt_header_token.split(" ")[1];
        const decoded_token = jwt.verify(token,process.env.JWT_SECRET);
        const {userId, userName} = decoded_token;
        req.userId = userId;
        req.userName = userName;
        next()
    } catch (error) {
        next("Unauthenticated User!");
    }
}
