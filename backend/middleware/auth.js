const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`)
    const userId = decodedToken.userId
    console.log('id from Auth', userId)
    req.auth = { userId }
    next()
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
