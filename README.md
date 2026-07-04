# Tasqro - Full Stack Workspace & Task Management App

Tasqro is a full-stack workspace and task management application built with React, Express, MongoDB, and Socket.IO. It supports role-based access, workspace collaboration, board members, task assignment, drag-and-drop task movement, and an admin panel for managing users and workspaces.

## Live Demo

Live frontend: https://azentrix-fullstack-task2-eta.vercel.app/

## Demo Accounts

Use these accounts to test the deployed application.

| Role | Email | Password | Purpose |
| --- | --- | --- | --- |
| Admin | `yogesh@tasqro.com` | `123456` | Access the admin panel and manage users/workspaces |
| Workspace Creator | `arjun@gmail.com` | `123456` | Created the sample workspaces |
| Workspace Member | `priya@gmail.com` | `123456` | Member inside Arjun's workspaces |

## Demo Flow

1. Log in as `yogesh@tasqro.com` to test admin access.
2. Admin users are redirected to the admin panel instead of the workspace dashboard.
3. Log in as `arjun@gmail.com` to view the workspaces created by Arjun.
4. Open a workspace, create tasks, assign members, set priority, and move tasks between columns.
5. Log in as `priya@gmail.com` to test member access inside the shared workspaces.

## Main Features

- User registration, login, logout, and cookie-based authentication
- Protected routes for authenticated users
- Admin-only route protection
- Admin dashboard for user and workspace management
- Workspace creation and listing
- Board member management
- Task creation with title, description, priority, due date, and assignee
- Task columns: `To Do`, `In Progress`, and `Done`
- Drag-and-drop task movement using `@dnd-kit`
- Real-time updates using Socket.IO
- Profile dropdown with profile display and edit form
- Responsive Tailwind CSS UI

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Socket.IO Client
- Lucide React icons
- `@dnd-kit` for drag-and-drop

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- HTTP-only cookies
- Socket.IO
- bcryptjs

## Project Structure

```text
azentrix-fullstack-task2/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- server.js
|   `-- socket.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |   |-- admin/
|   |   |   |-- board/
|   |   |   |-- card/
|   |   |   `-- common/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- routes/
|   |   |-- utils/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   `-- vite.config.js
`-- README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd azentrix-fullstack-task2
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Start backend:

```bash
npm start
```

### 3. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Local frontend will run at:

```text
http://localhost:5173
```

## Important Routes

### Frontend Routes

| Route | Access | Description |
| --- | --- | --- |
| `/login` | Public | Login page |
| `/register` | Public | Registration page |
| `/dashboard` | Member only | Workspace dashboard |
| `/boards/:id` | Member only | Workspace board details |
| `/admin` | Admin only | Admin dashboard |

### Backend API Routes

| Base Route | Description |
| --- | --- |
| `/api/auth` | Register, login, logout, current user, profile update |
| `/api/boards` | Workspace and board member operations |
| `/api/cards` | Task create, update, move, delete operations |
| `/api/admin` | Admin user and board management |

## Role Behavior

- Members can access workspaces where they are included as board members.
- Admin users can access the admin panel.
- Admin users are redirected away from workspace pages to `/admin`.
- Workspace creators can create and manage their own workspaces and tasks.
- Board members can collaborate inside shared workspaces.

## Notes

- The deployed app uses the live backend configured for the hosted frontend.
- Authentication uses HTTP-only cookies, so API calls are made with credentials enabled.
- Socket.IO is used for real-time board updates when cards or members change.
- Demo credentials are provided only for testing this assignment deployment.
