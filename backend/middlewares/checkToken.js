import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  // Try to get token from cookie first
  const cookieToken = req.cookies.token;

  // Then check Authorization header
  const bearerToken = req.headers.authorization?.split(" ")[1];

  const token = cookieToken || bearerToken;

  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      if (cookieToken) {
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
      }
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

export default checkToken;