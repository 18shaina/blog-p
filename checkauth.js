const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; 

const checkAuth = (req, res, next) => {
  try {
   
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) {
      return res.status(400).json({ message: "Access Denied: No token provided" });
    

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};



module.exports = checkAuth;
