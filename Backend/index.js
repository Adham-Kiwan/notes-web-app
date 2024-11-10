const express = require("express");
const app = express();
const port = 2000;
const cors = require("cors");
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));

// Basic route for testing
app.post("/", (req, res) => {
  res.send("Hello World!");
});

// User registration route
app.post('/user/create', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds value

    // Create the user with the hashed password
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    newUser.password = ''; // Don't return the password in the response
    res.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// User login route
app.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Define your JWT secret key securely
    const JWT_SECRET = process.env.JWT_SECRET;
    
    // Generate JWT token including user name
    const token = jwt.sign(
      { userId: user.id, userName: user.name }, // Add userName to token payload
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Return the token in the response
    res.json({ message: 'Login successful', name:user.name, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});


// Note creation route
app.post('/note/create', async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the token
    const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWT_SECRET);

    // Create the note associated with the user
    const newNote = await prisma.note.create({
      data: {
        title,
        content, // Use "content" field as defined in your schema
        userId: decoded.userId, // Link note to the user
      },
    });

    res.json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Error creating note' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
