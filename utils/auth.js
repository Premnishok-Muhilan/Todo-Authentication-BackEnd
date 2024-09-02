const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const auth = {
  verifyToken: (request, response, next) => {
    try {
      // get the token from the request cookies
      const token = request.cookies.token;

      // if the token does not exist, return an error
      if (!token) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      // verify the token
      try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // set the user data in the request object
        request.userId = decoded.id;

        // call the next middleware
        next();
      } catch (error) {
        return response.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = auth;
