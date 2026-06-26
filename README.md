<img width="1462" height="888" alt="Screenshot 2026-06-27 041240" src="https://github.com/user-attachments/assets/e3e9e3ac-3131-4c1f-aa68-49ef42831315" />

# 💬 OpenChitChat

A modern real-time chat application built with the MERN ecosystem, Firebase Authentication, Socket.IO, JWT authentication, and Cloudinary. Users can securely sign in, chat instantly, upload profile images, and communicate in real time with a clean and responsive interface.

---

## 🚀 Live Demo

### Frontend
https://openchitchat-8b3f4.web.app/

### Backend API
https://open-chitchat-production.up.railway.app/

---

# 📖 Description

OpenChitChat is a full-stack real-time messaging platform designed with scalability, security, and modern development practices in mind.

The application combines Firebase Authentication for user identity verification with JWT-based session management using HTTP-only cookies for secure authentication. Real-time communication is powered by Socket.IO, while Cloudinary handles image storage and delivery.

The project follows a clean client-server architecture that separates authentication, API services, database operations, and real-time communication, making it suitable for learning production-level MERN application development.

---

# ✨ Features

## Authentication

- Firebase Authentication
- Google Sign In
- Email & Password Login
- Secure JWT Authentication
- HTTP-only Cookie Sessions
- Auto Login
- Logout

---

## User Features

- Create Account
- Login
- Update Profile
- Upload Profile Picture
- View Online Users
- User Presence

---

## Chat Features

- Real-time Messaging
- Instant Message Delivery
- Socket.IO Communication
- Chat History
- Responsive Chat UI

---

## Media

- Profile Image Upload
- Cloudinary Image Storage

---

## Security

- JWT Authentication
- HTTP-only Cookies
- Password Hashing using bcrypt
- Protected Routes
- Secure API Access
- CORS Configuration
- Environment Variables

---

## Performance

- Fast React UI
- Zustand Global State
- Axios API Layer
- Optimized Socket Connections

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- React Router
- Zustand for state management
- Axios
- Firebase
- Socket.IO Client
- Tailwind CSS
- DaisyUI
- React Hot Toast

---

## Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT
- Firebase Admin SDK
- Socket.IO
- Cloudinary
- bcrypt
- Cookie Parser
- CORS
- Dotenv
- Welcome Emails on Signup (Resend)
- API Rate-Limiting powered by Arcjet

---

# 📁 Project Structure

```
OpenChitChat
│
├── Frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── hooks
│   │   ├── store
│   │   ├── services
│   │   ├── utils
│   │   ├── layouts
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── sockets
│   │   ├── utils
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Coder7Raj/open-chitchat.git
```

```bash
cd OpenChitChat
```

---

# Install Frontend

```bash
cd Frontend
```

```bash
npm install
```

Start development server

```bash
npm run dev
```

---

# Install Backend

```bash
cd Backend
```

```bash
npm install
```

Run backend

```bash
npm run dev
```

---

# 🔄 Authentication Flow

```
User
    │
    ▼
Firebase Authentication
    │
    ▼
Firebase ID Token
    │
    ▼
Backend Verification
    │
    ▼
JWT Generation
    │
    ▼
HTTP-only Cookie
    │
    ▼
Protected Routes
```

---

# 📦 Deployment

Frontend

- Firebase Hosting

Backend

- Railway

Database

- MongoDB Atlas

Media Storage

- Cloudinary

---

# 🔒 Security

- Firebase Identity Verification
- JWT Authentication
- HTTP-only Cookies
- bcrypt Password Hashing
- Secure Environment Variables
- CORS Protection
- Protected API Routes

---

# 📈 Future Improvements

- Group Chat
- Voice Messages
- Video Calls
- Read Receipts
- Message Reactions
- Typing Indicator
- Push Notifications
- File Sharing
- Message Search
- Emoji Support
- Message Editing
- Message Deletion
- Dark Mode
- Admin Dashboard
- End-to-End Encryption

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.

2. Create a new feature branch.

```bash
git checkout -b feature/awesome-feature
```

3. Commit your changes.

```bash
git commit -m "Add awesome feature"
```

4. Push the branch.

```bash
git push origin feature/awesome-feature
```

5. Open a Pull Request.

---

---

# 👨‍💻 Author

**Owarasur Rahman Raj**

GitHub:
https://github.com/Coder7Raj

LinkedIn:
https://www.linkedin.com/in/owarasurrahman/

---

⭐ If you found this project useful, consider giving it a star on GitHub.
