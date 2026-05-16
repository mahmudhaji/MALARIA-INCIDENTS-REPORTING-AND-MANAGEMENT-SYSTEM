
# PataMalaria - Malaria Incidents Reporting and Management System

PataMalaria is a comprehensive digital solution designed to streamline the reporting, tracking, and analysis of malaria incidents. This system empowers community health workers and medical officers with real-time data and AI-driven insights to combat malaria effectively.

## 🚀 Overview

The portal provides a centralized platform for various health stakeholders to manage malaria cases from the initial report in the field to the final treatment outcome in the hospital.

## 👥 User Roles & Credentials

For prototype demonstration, please use the following credentials. Each role has a unique dashboard tailored to their specific tasks.

| Role | Username | Password | Key Responsibilities |
|------|----------|----------|----------------------|
| **CHW** | `chw_user` | `password123` | Field reporting of new cases and submission tracking. |
| **Doctor** | `doctor_user` | `password123` | Clinical diagnosis, treatment forms, and hospital case logging. |
| **Health Officer** | `officer_user` | `password123` | Regional surveillance, hotspot mapping, and analytics. |
| **Administrator** | `admin_user` | `password123` | System user management and treatment audit oversight. |

## ✨ Key Features

### 1. Multi-Role Authentication
- **Secure Login**: Professional portal with password visibility toggles and role-based redirection.
- **Session Management**: Secure client-side state with persistence.

### 2. Clinical Case Management
- **Incident Reporting**: CHWs and Doctors can report cases with geospatial coordinates and symptom lists.
- **Treatment Form**: Doctors can prescribe medications (ACTs, Quinine, etc.) and set follow-up dates.
- **Treatment Records**: A centralized registry accessible by Doctors, Health Officers, and Admins to monitor recovery outcomes.

### 3. AI-Powered Surveillance (Health Officer)
- **Surge Detection**: AI analysis comparing current case counts against historical averages to detect regional spikes.
- **Emerging Hotspots**: AI-driven geospatial clustering to identify areas requiring urgent intervention.
- **Interactive Map**: Visual representation of incidents with priority markers for critical cases.

### 4. Administrative Oversight
- **User Management**: Administrators can add, update, or deactivate accounts for CHWs, Doctors, and Officers.
- **Audit Trails**: Global access to treatment records for system-wide performance auditing.

## 🛠 Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Lucide Icons, Recharts (for trend analysis)
- **AI Integration**: Genkit with Google Gemini 2.0 Flash
- **Styling**: Professional Blue Corporate Theme

## 🏗 Setup & Installation
1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Run Development Server**: `npm run dev`
4. **Environment Variables**: Add `GOOGLE_GENAI_API_KEY` to `.env` for AI features.

The application will be available at `http://localhost:9002` (standard development port).
