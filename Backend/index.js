const express = require("express");
const app = express();
const port = 2000;
const cors = require("cors");
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const crypto = require("crypto");



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


// Endpoint to get notes for the logged-in user
app.get('/notes', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the notes for the user
    const notes = await prisma.note.findMany({
      where: {
        userId: decoded.userId, // Use the userId from the decoded token
      },
    });

    res.json({ notes }); // Return notes in the response
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

app.delete('/notes/:id', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    // Find the note to check if it belongs to the user
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { userId: true }, // Only retrieve userId for authorization check
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if the note belongs to the current user
    if (note.userId !== decoded.userId) {
      return res.status(403).json({ error: 'You do not have permission to delete this note' });
    }

    // Delete the note
    await prisma.note.delete({
      where: { id: noteId },
    });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: 'Error deleting note' });
  }
});

// Edit note route
app.put('/notes/:id', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { title, content } = req.body; // Get the updated title and content from the request body

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    // Find the note to check if it belongs to the user
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { userId: true }, // Only retrieve userId for authorization check
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if the note belongs to the current user
    if (note.userId !== decoded.userId) {
      return res.status(403).json({ error: 'You do not have permission to edit this note' });
    }

    // Update the note
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { title, content },
    });

    res.json({ message: 'Note updated successfully', note: updatedNote });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Error updating note' });
  }
});

// Endpoint to generate a shareable link for a single note
app.get('/notes/:id/share', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    // Find the note to check if it belongs to the user
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { userId: true }, // Only retrieve userId for authorization check
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if the note belongs to the current user
    if (note.userId !== decoded.userId) {
      return res.status(403).json({ error: 'You do not have permission to share this note' });
    }

    // Generate a unique, signed token for the shareable link
    const shareToken = jwt.sign(
      { noteId: noteId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Set an expiration time for the shareable link
    );

    // Create the shareable URL
    const shareableUrl = `http://localhost:${port}/notes/shared/${noteId}?token=${shareToken}`;
    
    res.json({ message: 'Shareable link generated successfully', url: shareableUrl });
  } catch (error) {
    console.error("Error generating shareable link:", error);
    res.status(500).json({ error: 'Error generating shareable link' });
  }
});

app.get('/notes/shared/:id', async (req, res) => {
  const { token } = req.query; 

  if (!token) {
    return res.status(401).send('Token is required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.status(400).send('Invalid note ID');
    }

    if (decoded.noteId !== noteId) {
      return res.status(403).send('Invalid token for this note');
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { title: true, content: true },
    });

    if (!note) {
      return res.status(404).send('Note not found');
    }

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shared Note</title>
        <style>
          body { font-family: Arial, sans-serif; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5; }
          .note-container { background-color: #2563eb; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); max-width: 600px; width: 100%; }
          .note-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #ffffff; }
          .note-content { font-size: 18px; line-height: 1.6; }
          .all {
          height: 100%;
          width: 100%;
          background-color: #101927;
          display: flex;
          justify-content: center;
          align-items: center;
          }
        </style>
      </head>
      <body>
      <div class="all">
        <div class="note-container">
          <div class="note-title">${note.title}</div>
          <div class="note-content">${note.content}</div>
        </div>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Error accessing shared note:", error);
    res.status(500).send('Error accessing shared note');
  }
});


// Search notes by title or content
app.get('/notes/search', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  const { query } = req.query; // The search query from the URL

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Search for notes that match the query in either the title or content
    const notes = await prisma.note.findMany({
      where: {
        userId: decoded.userId, // Ensure notes belong to the authenticated user
        OR: [
          { title: { contains: query, mode: 'insensitive' } }, // Search by title (case insensitive)
          { content: { contains: query, mode: 'insensitive' } }, // Search by content (case insensitive)
        ],
      },
    });

    if (notes.length === 0) {
      return res.status(404).json({ error: 'No notes found matching the query' });
    }

    res.json({ notes }); // Return matching notes in the response
  } catch (error) {
    console.error("Error searching notes:", error);
    res.status(500).json({ error: 'Error searching notes' });
  }
});






// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});