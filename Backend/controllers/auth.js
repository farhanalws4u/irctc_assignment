import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js"; // Adjust the path to your db file
import validateRegisterInput from "../validation/register.js";
import validateLoginInput from "../validation/login.js";

export const registerUser = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    console.log('errors in register fields',errors)
    return res.json({errors});
  }
  const {email, username, password } = req.body || {}
  // Check if email already exists
  pool.query(
    'SELECT * FROM "User" WHERE email = $1',
    [email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.rows.length > 0) {
        return res.json({errors:{ email: "Email already exists" }});
      } else {
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error generating salt" });
          }

          bcrypt.hash(password, salt, async(err, hash) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Error hashing password" });
            }

            // Insert new user into the database
            pool.query(
              'INSERT INTO "User" (username, email,password) VALUES ($1, $2, $3) RETURNING *',
              [username, email, hash],
              (err, result) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ error: "Error saving user" });
                }
                const newUser = { status: 'Account successfully created"',status_code:200,id:result.rows[0].id };
                res.json(newUser);
              }
            );
          });
        });
      }
    }
  );
};

export const loginUser = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  let isAdmin = false;
  if (!isValid) {
    return res.json({errors});
  }

  const { email, password,authKey } = req.body;

  try {
    const result = await pool.query('SELECT * FROM "User" WHERE email = $1', [
      email,
    ]);
    const user = result.rows[0];

    if(authKey !== "" && user.auth_key !== authKey){
      return res.json({errors:{adminAuthKeyError:"Admin Key is wrong!"}})
    }

    if(authKey !== '' && user.auth_key === authKey){
      isAdmin = true;
    }

    if (!user) {
      return res.json({ errors: {emailNotFound:"Email not found"}} );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // User matched
      // Create JWT Payload
      const payload = {
        id: user.id,
        name: user.username, // Assuming your table has a 'username' field
        email: user.email,
      };

      // Sign token
      jwt.sign(
        payload,
        process.env.secretOrKey, // Use the correct environment variable
        {
          expiresIn: 31556926, // 1 year in seconds
        },
        (err, token) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error signing token" });
          }
          res.json({
            success: true,
            token: "Bearer " + token,
            isAdmin
          });
        }
      );
    } else {
      return res.json({ errors:{incorrectPassword:"Password incorrect" }});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

