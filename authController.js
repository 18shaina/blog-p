const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require('../middleware/nodemailer');


const Register = async (req, res) => {
  try {
    const { username, email, phone, password, confirmpassword, role } = req.body;
    console.log(req.body,"aallllll")

    if (!username || !email || !phone || !password || !confirmpassword || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
     
    const user = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      role,
     });
await user.save();
    res.status(201).json({ message: "User registered successfully." });
    console.log(user,"userdetails...>>>")
  } catch (error) {
  res.status(500).json({ message: "Server error." });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password} = req.body;

 
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  const user = await User.findOne({ email, });
    console.log(user, "user>>>>>details");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
  if (!user.password) {
      return res.status(400).json({ message: "Password is missing in user data." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid, "isPasswordValid>>>>>details");
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    res.status(200).json({ message: "Logged in successfully.", token,user });
    console.log(user,"userdetails")
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const Forgotpassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    console.log(user, "user>>>>>>");

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '18h'})                   
    const resetLink = `http://localhost:3001/reset-password/${token}`;

    // Send reset email
    const mailOptions = {
        to: user.email, // Send to user's email
        subject: 'Password Reset Request',
        text: `Click the link to reset your password: ${resetLink}`,
        html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent successfully' });
} catch (err) {
    console.error('Error during password reset:', err); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
}

};

const Resetpassword = async (req, res) => {
  const { token, newpassword,confirmpassword } = req.body;

  try {
    // Verify the token
    const resetLink = `http://localhost:3001/reset-password/${token}`;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const id = decoded.id;

    // Find the user by email
    const user = await User.findOne({ _id:id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(user,'user')

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Reset token has expired' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { Login,Register,Forgotpassword,Resetpassword };
