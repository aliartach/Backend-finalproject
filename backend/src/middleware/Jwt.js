import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

export const RequireAuth = (req, res, next) => {
  const token = req.cookies.token;
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    return res.redirect('/login');
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return res.redirect('/login')
    }

    console.log(decodedToken);
    next();
  })
};
