import jwt from "jsonwebtoken";
import pool from "../db.js"; // Adjust the path to your db file

export const authenticateUser = async (req, res, next) => {
  // Get token from header
  console.log('====================================');
  console.log(req.headers);
  console.log('====================================');
  const authHeader = req.headers['authorization'];
  console.log({authHeader})
  const token = authHeader && authHeader.split(' ')[1];
  console.log('user token', token)

  if (!token) {
    return res
      .status(401)
      .json({ message: "authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.secretOrKey);

    // Extract user data from token
    const { id } = decoded;

    // Check if user exists in the database
    const result = await pool.query(
      `SELECT id, username, email from "User" WHERE id = $1`,
      [id]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add user data to request object for further use in routes
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
