// simple auth: only allows requests with a specific token
module.exports = (req, res, next) => {
  const token = req.headers.token;

  if (token === "123abc") {
    next(); // allow the request
  } else {res.status(401).json({ error: "Unauthorized. Invalid or missing token." });}};
