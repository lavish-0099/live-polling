# ⚡ Live Collaborative Polling App

A real-time polling application built with React, Node.js, Socket.IO, and MongoDB.

Users can create polls, share unique links, vote live, and watch results update instantly across all connected clients without refreshing the page.

## 🚀 Live Demo

Frontend:
https://live-polling-tan.vercel.app

Backend API:
https://live-polling-m6yy.onrender.com

---

## 🎥 Demo Video
First device : https://drive.google.com/file/d/1vajBX4PUyCaetRxUL11cNmKO4-Vxz-yi/view?usp=sharing

second device : https://drive.google.com/file/d/1aRzbps3UFRShIATxqvV1O2m9NCtkh1uB/view?usp=sharing

## ✨ Features

### Core Requirements

✅ Create polls with 2–6 options

✅ Unique shareable poll links

✅ Real-time voting using Socket.IO

✅ Live result updates without page refresh

✅ MongoDB data persistence

✅ Vote protection (one vote per user per poll)

✅ Responsive modern UI

---

## 🎁 Bonus Features

### Smart Poll Suggestions

Generate poll options automatically based on a topic.

Examples:

**- Best Programming Languages
- Favorite Sport
- Favorite Food
- Best Movie Genre**

### Interactive Analytics

- Animated vote bars
- Live vote percentages
- Pie chart visualization
- Total vote count

### Enhanced User Experience

- Copy poll link button
- Toast notifications
- Smooth Framer Motion animations

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Axios
- Socket.IO Client
- Framer Motion
- Recharts
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- Socket.IO
- MongoDB Atlas
- Mongoose

### Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📂 Project Structure

```
live-polling/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── components/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/lavish-0099/live-polling.git

cd live-polling
```

---

### 2. Install Frontend Dependencies

```bash
cd client

npm install
```

---

### 3. Install Backend Dependencies

```bash
cd ../server

npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

TOGETHER_API_KEY=your_api_key
```

---

## ▶️ Run Backend

```bash
cd server

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## ▶️ Run Frontend

```bash
cd client

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔄 Real-Time Workflow

1. User creates a poll
2. Poll stored in MongoDB
3. Unique poll URL generated
4. Users join poll room via Socket.IO
5. User votes
6. Vote saved in MongoDB
7. Backend emits `pollUpdated`
8. All connected clients update instantly

---

## 🗄 Database Design

### Poll

```js
{
  question: String,
  options: [
    {
      text: String,
      votes: Number
    }
  ]
}
```

### Vote

```js
{
  pollId: ObjectId,
  voterId: String
}
```

Used to prevent duplicate voting.

---

## 🎯 Design Decisions

### Why Socket.IO?

Socket.IO provides real-time bidirectional communication between client and server, allowing poll results to update instantly without polling or page refreshes.

### Why MongoDB?

MongoDB offers flexible document-based storage that naturally fits poll and vote data structures.

### Vote Integrity

Each user receives a unique `voterId` stored in localStorage. A user cannot vote twice on the same poll.

### Scalability

Socket rooms are used so updates are only broadcast to users viewing a specific poll.

---

## 📸 Screenshots

### Poll Creation

- Create custom polls
- Generate smart suggestions

### Live Voting

- Vote instantly
- Real-time updates
- Interactive charts

---

## 👨‍💻 Author

**Lavish Batra**

Full Stack Developer

GitHub:
https://github.com/lavish-0099

---

## 📄 Assessment Notes

This project was built as a technical assessment demonstrating:

- React
- Node.js
- Express
- MongoDB
- Socket.IO
- Real-time application architecture
- REST APIs
- Database design
- Deployment and production configuration
