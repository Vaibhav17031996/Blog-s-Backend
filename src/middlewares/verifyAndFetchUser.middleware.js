const jwt = require("jsonwebtoken");
async function verifyAndFetchUser(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]; // bcz we need {token} only from { Bearer {token} }
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Token is required",
    });
  }
  try {
    const userData = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(userData);
    req.user = userData;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "User authorization failed",
    });
  }
}

module.exports = { verifyAndFetchUser };
