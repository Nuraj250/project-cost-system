# 💡 Project Cost Estimator (Frontend)

This is the **Next.js frontend** for the Project Cost Estimation System. It connects to a Strapi backend via REST API and allows users to:

- Create projects
- View all projects
- Get detailed cost breakdowns
- Simulate payments

---

## 🚀 Getting Started

### 1. Navigate into the frontend folder

```bash
cd frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then open your browser at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 Pages Overview

| Route           | Description                           |
| --------------- | ------------------------------------- |
| `/`             | List all projects                     |
| `/add-project`  | Create a new project                  |
| `/summary/[id]` | Cost breakdown for a specific project |
| `/simulate`     | Simulate a payment for a project      |

---

## 🔌 Backend Integration

Make sure your Strapi backend is:

* Running at `http://localhost:1337`
* Has public permissions enabled for:

  * `TeamMember`: `find`, `create`
  * `OfficeExpense`: `find`, `create`
  * `Project`: `find`, `create`
  * Custom route: `GET /projects/:id/cost`
  * `Payment`: `create`

---

## 🛠️ Technologies Used

* **Next.js** (Pages Router)
* **TypeScript**
* **Tailwind CSS** (glassmorphism styling)
* **Axios** for API calls
* **Reusable Components** (`Layout`, `ProjectCard`, `ProjectForm`)

---

## 📁 Key Files

| Path                         | Purpose                          |
| ---------------------------- | -------------------------------- |
| `components/Layout.tsx`      | Shared navbar and layout wrapper |
| `components/ProjectCard.tsx` | UI for project listing           |
| `components/ProjectForm.tsx` | Form to create new projects      |
| `utils/api.ts`               | Preconfigured Axios instance     |
| `pages/index.tsx`            | Project list page                |
| `pages/add-project.tsx`      | Form to create a project         |
| `pages/summary/[id].tsx`     | Project cost summary view        |
| `pages/simulate.tsx`         | Simulate payment screen          |

---

## ✅ Final Checklist

* [x] Clean modern UI
* [x] API-connected forms
* [x] Dynamic routes and data handling
* [x] Fully responsive with Tailwind CSS
