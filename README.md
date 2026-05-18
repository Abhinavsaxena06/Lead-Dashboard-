# 🚀 Smart Leads Dashboard

A modern **Full Stack CRM Dashboard** for managing sales leads with authentication, analytics, role-based access control, search, filtering, pagination, and CSV export.

Built using **React + TypeScript + Node.js + MongoDB** with a clean and responsive UI.

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT Authentication
- Login & Register system
- Protected Routes
- Persistent Authentication
- Role-Based Access Control (**Admin / Sales**)

### 📊 Dashboard
- Overview statistics
- Total Leads
- Qualified Leads
- Contacted Leads
- Lost Leads
- Recent Leads section
- Quick Insights panel

### 👥 Lead Management
- Create Leads
- Edit Leads
- Delete Leads
- Search Leads
- Filter by Status
- Filter by Source
- Pagination
- Sort by Latest / Oldest
- Responsive Table

### 📈 Analytics
- Lead Status Distribution
- Source Distribution
- Conversion Insights
- Top Status
- Best Source
- Analytics Cards

### 📁 Export
- Export leads as **CSV**

### 🎨 UI/UX
- Responsive Design
- Modern SaaS Dashboard UI
- Tailwind CSS Styling
- Glassmorphism Effects
- Soft Typography
- Premium Layout

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React Icons

### Backend
- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Bcrypt.js

### Database
- MongoDB Atlas
- Mongoose ODM

---

## 📂 Folder Structure

```txt
smart-leads-dashboard/
│
├── backend/
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── interfaces/
│   └── server.ts
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── context/
│   └── api/
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Variables

### Backend `.env`

Create a `.env` file inside `backend/`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### Frontend `.env`

Create a `.env` file inside `frontend/`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/smart-leads-dashboard.git
```

```bash
cd smart-leads-dashboard
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

## ▶️ Running the Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

---

### One Command Run (Recommended)

From root folder:

```bash
npm run dev
```

Runs:
- Backend
- Frontend

simultaneously.

---

## 🐳 Docker Setup

### Run using Docker

```bash
docker compose up --build
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/auth/profile` | Protected Profile |

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Get All Leads |
| POST | `/api/leads` | Create Lead |
| GET | `/api/leads/:id` | Get Single Lead |
| PUT | `/api/leads/:id` | Update Lead |
| DELETE | `/api/leads/:id` | Delete Lead |

---

## 📸 Screenshots

### Login Page
_Add Screenshot Here_

### Dashboard
_Add Screenshot Here_

### Leads Management
_Add Screenshot Here_

### Analytics
_Add Screenshot Here_

---

## 🔒 Roles

### Admin
- Full Access
- Create/Edit/Delete Leads
- View Analytics

### Sales
- Create/Edit Leads
- No Delete Access
- Limited Access

---

## 📌 Future Improvements

- Dark Mode
- Real-Time Notifications
- Charts using Recharts
- Team Collaboration
- Email Integration
- Lead Notes & Tags

---

## 👨‍💻 Author

**Abhinav Saxena**

B.Tech CSE (AI & ML)  
VIT Bhopal University

---

## ⭐ Support

If you found this project useful, give it a ⭐ on GitHub.
