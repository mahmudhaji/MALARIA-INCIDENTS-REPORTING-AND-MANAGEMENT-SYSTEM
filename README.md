
# PataMalaria - Local SQL Setup Guide

This application has been migrated to a professional full-stack architecture using **Next.js**, **Prisma ORM**, and **SQL** (MySQL or PostgreSQL). Follow these steps to run the application on your local machine with persistent database storage.

## 🚀 Step-by-Step Local Setup

### 1. Prerequisites
- **Node.js** (v18 or newer installed)
- **Git**
- **A SQL Database**: Install [PostgreSQL](https://www.postgresql.org/download/) (Recommended) or [MySQL](https://dev.mysql.com/downloads/installer/).

### 2. Database Creation
1. Open your SQL terminal (e.g., pgAdmin for Postgres or MySQL Workbench).
2. Create a new empty database named `patamalaria`:
   ```sql
   CREATE DATABASE patamalaria;
   ```

### 3. Environment Configuration
1. Open the `.env` file in the project root.
2. Update the `DATABASE_URL` with your local credentials:

   **For PostgreSQL:**
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/patamalaria?schema=public"
   ```

   **For MySQL:** (Also change `provider = "postgresql"` to `provider = "mysql"` in `prisma/schema.prisma`)
   ```
   DATABASE_URL="mysql://username:password@localhost:3306/patamalaria"
   ```

3. (Optional) Add your `GOOGLE_GENAI_API_KEY` for AI features.

### 4. Installation & Migration
Open your terminal in the project folder and run:

```bash
# Install all dependencies
npm install

# Push the schema to your local database
npx prisma db push

# Generate the Prisma client
npx prisma generate
```

### 5. Start the Application
```bash
npm run dev
```
The app will be running at [http://localhost:9002](http://localhost:9002).

## 👥 User Roles & Persistence
Unlike the prototype version, all data is now saved to your **Local SQL Server**.

| Role | Username | Password |
|------|----------|----------|
| **CHW** | `chw_user` | `password123` |
| **Doctor** | `doctor_user` | `password123` |
| **Health Officer** | `officer_user` | `password123` |
| **Administrator** | `admin_user` | `password123` |

## ✨ Features
- **SQL Persistence**: Real database storage for all cases and users.
- **Server Actions**: Secure data fetching and mutations.
- **AI Analytics**: Hotspot detection powered by Genkit.
- **PDF Export**: Generate medical reports locally.
