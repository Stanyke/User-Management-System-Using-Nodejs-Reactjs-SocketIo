const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../bin/config");
const secret = JWT_SECRET;

exports.generateToken = async (user) => {
  const authToken = await jwt.sign({ id: user._id.toString() }, secret, {
    expiresIn: "12hrs",
  });

  return authToken;
};

exports.getToken = async (token) => {
  const tokenResult = await jwt.verify(token, secret);
  return tokenResult;
};

exports.decodeToken = (token = "") => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token.replace("Bearer", ""),
      secret,
      function (err, decodedToken) {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken);
        }
      }
    );
  });
};
