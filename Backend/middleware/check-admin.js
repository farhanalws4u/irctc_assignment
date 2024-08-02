export const checkIsAdmin = (req, _, next) => {
  const { auth_key } = req.headers || {};
  req.body.isAdmin = !(!auth_key || auth_key !== process.env.auth_key);
  next();
};

