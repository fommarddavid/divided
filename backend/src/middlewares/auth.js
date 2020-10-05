import 'dotenv/config';
import jwt from 'jsonwebtoken';

const getTokenFromHeader = (req) => {
  if(
    req.headers.authorization
    &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
};

const verifyToken = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if(!token) {
    return res.status(403).json({
      message: 'No token provided'
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }  
  });

  next();
};


export default {
  getTokenFromHeader,
  verifyToken,
};