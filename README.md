# Notes Web Application

A full-stack web application for creating, managing, and sharing notes. Built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features

- 🔐 **User Authentication** - Secure signup and login with JWT tokens
- 📝 **Note Management** - Create, read, update, and delete notes
- 🔍 **Search Functionality** - Search notes by title or content
- 🔗 **Note Sharing** - Generate shareable links for your notes
- 🌓 **Dark/Light Mode** - Toggle between themes
- 💾 **Persistent Storage** - PostgreSQL database with Prisma ORM
- 🔒 **Secure** - Password hashing with bcrypt and JWT authentication

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **NextUI** - UI components
- **Axios** - HTTP client
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM for database management
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
notes-web-app/
├── Backend/
│   ├── index.js          # Express server and API routes
│   ├── package.json      # Backend dependencies
│   └── prisma/
│       ├── schema.prisma # Database schema
│       └── migrations/   # Database migrations
└── Frontend/
    └── notes-application/
        ├── src/
        │   ├── App.tsx        # Main app component
        │   ├── Login.tsx      # Login page
        │   ├── Signup.tsx     # Signup page
        │   ├── MainPage.tsx   # Main notes page
        │   ├── Note.tsx       # Note component
        │   ├── AddNote.tsx    # Add note component
        │   └── store.jsx      # Zustand store
        ├── package.json       # Frontend dependencies
        └── vite.config.ts     # Vite configuration
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd notes-web-app
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

### 3. Database Setup

1. Create a PostgreSQL database
2. Create a `.env` file in the `Backend` directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
DIRECT_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-secret-key-here"
```

3. Run Prisma migrations:

```bash
npx prisma migrate dev
```

4. Generate Prisma Client:

```bash
npx prisma generate
```

### 4. Frontend Setup

```bash
cd Frontend/notes-application
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd Backend
node index.js
```

The backend server will run on `http://localhost:2000`

### Start the Frontend Development Server

```bash
cd Frontend/notes-application
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /user/create` - Create a new user account
  - Body: `{ name, email, password }`

- `POST /user/login` - Login user
  - Body: `{ email, password }`
  - Returns: JWT token

### Notes

- `GET /notes` - Get all notes for authenticated user
  - Headers: `Authorization: Bearer <token>`

- `POST /note/create` - Create a new note
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, content }`

- `PUT /notes/:id` - Update a note
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, content }`

- `DELETE /notes/:id` - Delete a note
  - Headers: `Authorization: Bearer <token>`

- `GET /notes/search?query=<search_term>` - Search notes
  - Headers: `Authorization: Bearer <token>`

- `GET /notes/:id/share` - Generate shareable link for a note
  - Headers: `Authorization: Bearer <token>`

- `GET /notes/shared/:id?token=<share_token>` - Access shared note (public)

## Database Schema

### User
- `id` - Integer (Primary Key)
- `email` - String (Unique)
- `name` - String (Optional)
- `password` - String (Hashed)

### Note
- `id` - Integer (Primary Key)
- `title` - String
- `content` - String
- `createdAt` - DateTime
- `userId` - Integer (Foreign Key)

## Development

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend

The backend uses Express and Prisma. Make sure to run migrations after schema changes:

```bash
npx prisma migrate dev
npx prisma generate
```

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for authentication
- Token-based authorization for protected routes
- User-specific note access (users can only access their own notes)
- Shareable links expire after 24 hours

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.

## Author

Adham Kiwan


