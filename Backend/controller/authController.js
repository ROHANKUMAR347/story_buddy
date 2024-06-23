const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { BlacklistToken } = require("../model/blacktoken");
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign(
      { userID: user.id, username: user.username, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "5h" }
    );

    return res.status(200).send({
      msg: "Login successful",
      token,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};

exports.logout = async (req, res) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).send({ error: "Authorization header not found" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).send({ msg: "No token provided" });
  }

  try {
    await BlacklistToken.create({ token });
    res.status(200).send({ msg: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
