const express = require("express");
const app = express();
const port = 2000;
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));


app.post("/", (req, res) => {
  res.send("Hello World!");
});

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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user with the hashed password
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    newUser.password = '';
    res.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
