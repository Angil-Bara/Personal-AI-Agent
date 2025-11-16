//Import the verifyToken function from the auth module
const {verifyToken} = require('../src/auth');

//Middleware function to authenticate requests
function authMiddleware(request, response, next){
    //Get the token from the request headers
    const token = request.headers['authorization']?.split(' ')[1]; //extract token from "Bearer <token>" format
    if(!token){
        return response.status(401).send({message: 'No token provided!'}); //send 401 if no token is provided
    }
    //verify the token
    try{
        const decoded = verifyToken(token); //verify the token using the verifyToken funtion
        request.user = decoded; //attach the decoded token data to the request object
        next(); //proceed to the next middle ware or route handler
    }catch(error){
        return response.status(401).send({message: 'Failed to authenticate token!'}); //send 401 if token verification fails
    } 
    
};

//Export the middleware function for use in other modules
module.exports = authMiddleware;