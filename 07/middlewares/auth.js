const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next)=> {
  let token;
  // req.headers.authorization : Beaere eyxxxxxx
  if(req.headers.authorization){
    token = req.headers.authorization.split(' ')[1];
  };
  if (!token){
    return re;s.status(401).json({message : "not authorized"});
  }
  jwt.verify(token, 'access_token', (err, user) =>{
     if(err) {
        return res.status(401).json({message:"not author authorized"})
     }
     req.user = user;
     next(); 
  });
};

module.exports = { authenticate, };