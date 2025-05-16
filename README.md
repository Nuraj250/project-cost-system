# 💼 Project Cost Estimation System

A fullstack web application that helps estimate the cost of internal projects based on staff salaries, hours, and office expenses.

Built with:
- **Backend:** Strapi v5 (REST API)
- **Frontend:** Next.js (TypeScript, Tailwind CSS)

---

## 📦 Tech Stack

| Layer      | Stack                         |
|------------|-------------------------------|
| Backend    | Strapi v5 (Node.js, REST API) |
| Frontend   | Next.js + Tailwind CSS        |
| Database   | SQLite (Strapi default)       |
| Styling    | Tailwind (glassmorphism UI)   |

---

## 🧠 Key Features

- Manage **Team Members** and their monthly salary
- Track **Office Expenses**
- Create **Projects** and assign team members
- Get dynamic **Cost Breakdown** (`/projects/:id/cost`)
- Simulate **Payments**

---

## 🗂️ Folder Structure

```

project-cost-system/
├── backend/      → Strapi CMS (API & DB)
├── frontend/     → Next.js frontend
├── README.md     → This file

````

---

## 🚀 Getting Started

### ✅ Backend Setup (Strapi)

1. **Navigate to backend folder**
```bash
cd backend
````

2. **Install dependencies**

```bash
npm install
```

3. **Run Strapi in development mode**

```bash
npm run develop
```

4. **Create your first admin user** on `http://localhost:1337/admin`

5. **Enable API permissions:**

> Go to: **Admin → Settings → Roles → Public**

Enable these:

* ✅ `TeamMember`: `find`, `create`
* ✅ `OfficeExpense`: `find`, `create`
* ✅ `Project`: `find`, `create`
* ✅ `Custom route`: `GET /projects/:id/cost`
* ✅ `Payment` collection: `create` (with `amount`, `note`, `paymentStatus`, `project` relation)

6. **Test APIs using Postman**

Import this file:
👉 `project-cost-api.postman_collection.json`

---

### ✅ Frontend Setup (Next.js)

1. **Navigate to frontend folder**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

Then visit:
📍 `http://localhost:3000`

---

## 🌐 App Pages Overview

| Route           | Description                           |
| --------------- | ------------------------------------- |
| `/`             | List of all projects                  |
| `/add-project`  | Create a new project                  |
| `/summary/[id]` | Cost breakdown for a specific project |
| `/simulate`     | Simulate a project payment            |

---

## 🧮 Cost Breakdown Logic

Cost is dynamically calculated using:

```
Staff Hourly Rate   = monthlySalary / 180
Staff Cost          = sum(Staff Hourly × project hours)
Office Hourly Rate  = sum(monthlyCosts) / 180
Office Cost         = Office Hourly × project hours
Total Cost          = Staff Cost + Office Cost
Cost Per Hour       = Total / hours
```

---

## 📁 API Endpoints

| Endpoint                 | Method   | Description                     |
| ------------------------ | -------- | ------------------------------- |
| `/api/team-members`      | GET/POST | Staff CRUD                      |
| `/api/office-expenses`   | GET/POST | Office cost entries             |
| `/api/projects`          | GET/POST | Projects                        |
| `/api/projects/:id/cost` | GET      | Custom endpoint: cost breakdown |
| `/api/payments`          | POST     | Simulated payments              |

---

## 🛠️ Technologies Used

### Backend (Strapi)

* Content-Type Builder
* Custom Controllers
* Public Permissions
* SQLite (default)

### Frontend (Next.js)

* TypeScript
* Tailwind CSS
* Axios (via `utils/api.ts`)
* Responsive layout with `Layout.tsx`

---

## 🧪 Testing via Postman

Import `project-cost-api.postman_collection.json` into Postman to try all endpoints.

---

## 📎 License

This project is open source and free to use for educational or commercial purposes.

---

## 🙌 Author

Developed by **\[Your Name]**
🔗 GitHub: [https://github.com/Nuraj250](https://github.com/Nuraj250)
