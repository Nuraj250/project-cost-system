# 📦 Project Cost Estimation API (Strapi)

This is the **backend** for the Project Cost Estimation System built with **Strapi**. It exposes RESTful endpoints to manage team members, office expenses, projects, and simulated payments.

---

## 🚀 Quick Start

### 1. Clone the project and navigate into the backend

```bash
git clone https://github.com/Nuraj250/project-cost-system.git
cd project-cost-system/backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run Strapi in development mode

```bash
npm run develop
```

It will start on [http://localhost:1337](http://localhost:1337)

### 4. Create an admin user

The first time you visit `/admin`, you'll be prompted to create a new admin account.

---

## 🔑 Public Role Setup (Enable API Access)

To allow the frontend or Postman to access the API:

1. Go to **Strapi Admin → Settings → Users & Permissions Plugin → Roles → Public**
2. Enable the following permissions:

### ✅ `TeamMember`

* `find`
* `findOne`
* `create`

### ✅ `OfficeExpense`

* `find`
* `findOne`
* `create`

### ✅ `Project`

* `find`
* `findOne`
* `create`

### ✅ `Custom Routes`

* `GET /projects/:id/cost` → `calculateCost`
* `POST /payments` (if using custom route) **OR** use Payment Collection type with:

  * `amount`
  * `note`
  * `paymentStatus` (enum)
  * `project` (relation to Project)
* Allow `create` on `Payment` under `Public` if using collection

Then click **Save**

---

## 📬 Postman Collection

You can test the API using the provided Postman collection.

### 🔗 Import this JSON in Postman:

```json
{
  "info": {
    "name": "Project Cost API",
    "_postman_id": "uuid-here",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Team Members",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:1337/api/team-members" }
      }
    },
    {
      "name": "Create Team Member",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{ \"data\": { \"name\": \"Alice\", \"monthlySalary\": 3000 } }"
        },
        "url": { "raw": "http://localhost:1337/api/team-members" }
      }
    },
    {
      "name": "Create Office Expense",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{ \"data\": { \"title\": \"WiFi\", \"monthlyCost\": 150 } }"
        },
        "url": { "raw": "http://localhost:1337/api/office-expenses" }
      }
    },
    {
      "name": "Create Project",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{ \"data\": { \"title\": \"CRM Revamp\", \"hours\": 100, \"team\": [1, 2] } }"
        },
        "url": { "raw": "http://localhost:1337/api/projects" }
      }
    },
    {
      "name": "Get Project Cost",
      "request": {
        "method": "GET",
        "url": { "raw": "http://localhost:1337/api/projects/1/cost" }
      }
    },
    {
      "name": "Simulate Payment",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{ \"data\": { \"amount\": 1000, \"note\": \"Testing\", \"project\": 1, \"paymentStatus\": \"success\" } }"
        },
        "url": { "raw": "http://localhost:1337/api/payments" }
      }
    }
  ]
}
```

Or export from Postman and save as `project-cost.postman_collection.json`

---

## 📁 Folder Reference

* `src/api/team-member/`: CRUD for team salaries
* `src/api/office-expense/`: Monthly fixed costs
* `src/api/project/`: Project model + `/cost` route
* `src/api/payment/`: Simulated payments

---

## 🧠 Cost Formula Logic

* `Staff Hourly = monthlySalary / 180`
* `Staff Cost = Σ (staff hourly × project hours)`
* `Office Cost = (Σ monthlyCosts / 180) × project hours`
* `Total = Staff Cost + Office Cost`