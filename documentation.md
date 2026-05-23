# Job Portal - Next JS

A modern Job Portal application built using Next.js, Prisma, PostgreSQL, and TypeScript.

This project provides complete CRUD operations for Jobs and Companies with responsive UI cards, modal popups, API routes, Prisma ORM integration, and GitHub Actions build workflow.

---

# 🚀 Features

## ✅ Job Management
- Add Job
- View Job Details
- Edit Job
- Delete Job
- Dynamic Modal Popups
- Responsive Grid Layout

## ✅ Company Management
- Add Company
- View Company List
- Store Company Information in Database
- Real-time Data Fetching

## ✅ Backend Features
- Next.js API Routes
- Prisma ORM Integration
- PostgreSQL Database
- REST APIs
- Error Handling

## ✅ UI Features
- Alert Messages
- Modal Components
- Responsive Design
- Lucide React Icons
- Dashboard Cards

## ✅ DevOps
- GitHub Actions Build Workflow
- Automatic Build Validation on Push
- TypeScript Support

---

# 🛠️ Tech Stack

| Technology | Version |
|---|---|
| Next.js | 16 |
| React | 19 |
| TypeScript | Latest |
| Prisma ORM | 6.x |
| PostgreSQL | Latest |
| Lucide React | Latest |
| Node.js | 20+ |

---

# 📂 Project Structure

```bash
job-portal/
│
├── app/
│   ├── api/
│   │   ├── jobs/
│   │   └── company/
│   │
│   ├── jobs/
│   ├── add-job/
│   ├── company/
│   └── company-list/
│
├── components/
│   ├── AlertBanner.tsx
│   └── Modal.tsx
│
├── lib/
│   └── prisma.ts
│
├── prisma/
│   └── schema.prisma
│
├── .github/
│   └── workflows/
│       └── build.yml
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/vijaysr5672/Jobs-Portal-Next-JS.git
```

---

## 2️⃣ Move Into Project

```bash
cd Jobs-Portal-Next-JS
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🐘 PostgreSQL Setup

## Start Prisma Local Database

```bash
npx prisma dev
```

Keep this terminal running.

---

# 🔐 Environment Variables

Create `.env` file in root folder.

```env
DATABASE_URL="postgres://postgres:postgres@localhost:51214/template1"
```

---

# 🧩 Prisma Setup

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run Database Migration

```bash
npx prisma migrate dev --name init
```

---

# ▶️ Run Project

```bash
npm run dev
```

Application URL:

```txt
http://localhost:3000
```

---

# 📦 API Endpoints

## Jobs APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/jobs | Get All Jobs |
| POST | /api/jobs | Create Job |
| GET | /api/jobs/:id | Get Single Job |
| PUT | /api/jobs/:id | Update Job |
| DELETE | /api/jobs/:id | Delete Job |

---

## Company APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/company | Get All Companies |
| POST | /api/company | Create Company |

---

# 🗄️ Prisma Schema

```prisma
model Job {
  id        Int      @id @default(autoincrement())
  title     String
  company   String
  location  String
  salary    Int
  createdAt DateTime @default(now())
}

model Company {
  id          Int      @id @default(autoincrement())
  name        String
  email       String
  location    String
  website     String
  description String
  createdAt   DateTime @default(now())
}
```

---

# 🔄 GitHub Actions Workflow

Workflow automatically:
- Installs dependencies
- Builds project
- Validates TypeScript
- Checks Prisma generation

Location:

```bash
.github/workflows/build.yml
```

---

# 📋 Build Workflow Example

```yaml
name: Next JS Build

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Build Project
        run: npm run build
```

---

# 🎯 Benefits of This Project

## For Developers
- Learn Full Stack Next.js
- Understand Prisma ORM
- Practice CRUD APIs
- Learn Modal Handling
- Understand TypeScript
- Learn GitHub Actions CI/CD

## For Users
- Easy Job Tracking
- Centralized Company Information
- Fast UI Experience
- Simple Dashboard

---

# 🔮 Future Enhancements

## Authentication
- JWT Login
- Role-Based Access

## Advanced Features
- Search Jobs
- Pagination
- Filters
- Sorting

## File Upload
- Resume Upload
- Company Logo Upload

## Dashboard Analytics
- Total Jobs Count
- Active Companies Count
- Charts & Reports

## Notifications
- Email Notifications
- Toast Alerts

## Deployment
- Vercel Deployment
- Docker Support
- CI/CD Pipeline

---

# ⚠️ Known Issues

- Prisma local database sometimes closes automatically
- Turbopack cache issues may require `.next` cleanup

Fix:

```bash
rm -rf .next
npm run dev
```

Windows:

```cmd
rmdir /s /q .next
npm run dev
```

---

# 📸 Screenshots

Refer README.md for screenshots

---

# 🧠 Learning Concepts Covered

- React Hooks
- useState
- useEffect
- Next.js App Router
- Dynamic Routes
- API Routes
- Prisma ORM
- PostgreSQL
- CRUD Operations
- TypeScript
- GitHub Actions

---

# 👨‍💻 Author

## Vijay Rathod
## vijaysr5672@gmail.com

GitHub:

```txt
https://github.com/vijaysr5672
```

---

# ⭐ If You Like This Project

Give this repository a ⭐ on GitHub.

---
