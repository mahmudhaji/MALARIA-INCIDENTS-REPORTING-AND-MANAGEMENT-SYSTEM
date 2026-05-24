
# PataMalaria - Malaria Incidents Reporting and Management System

PataMalaria is a comprehensive digital solution designed to streamline the reporting, tracking, and analysis of malaria incidents. This system empowers community health workers and medical officers with real-time data and AI-driven insights.

## 🚀 Overview

The portal provides a centralized platform for various health stakeholders to manage malaria cases from field reporting to clinical treatment.

## 👥 User Roles & Credentials

For prototype demonstration, please use the following credentials. The system starts with **zero data**—all patients and managed staff shown will be those you create during your session.

| Role | Username | Password | Key Responsibilities |
|------|----------|----------|----------------------|
| **CHW** | `chw_user` | `password123` | Field reporting and submission tracking. |
| **Doctor** | `doctor_user` | `password123` | Clinical diagnosis and treatment logging. |
| **Health Officer** | `officer_user` | `password123` | Surveillance, hotspot mapping, and alerts. |
| **Administrator** | `admin_user` | `password123` | System oversight and user management. |

## ✨ Key Features

### 1. Zero-Config Data Entry (Clean Slate)
- **Data Isolation**: All default mock records (like "Jane Doe" or "Grace Mollel") have been removed. 
- **User-Driven Storage**: The Case Registry, Treatment Records, and Map will only populate with data you add using the reporting forms.
- **Persistence**: Data is saved to your browser's local storage for continuity within your session.

### 2. Clinical Workflow
- **CHW Reporting**: Log new incidents with symptoms and GPS coordinates.
- **Doctor Assessment**: Select a Case ID to review history and prescribe medication.
- **Admin Management**: Add/Edit/Delete staff roles and monitor global activity.

### 3. PDF Reporting
- Generate professional PDF medical files for individual patients or full registry summaries directly to your machine.

### 4. AI Analytics
- Automated hotspot detection and surge alerts based on your session's reported data.

## 🛠 Setup & Installation
1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Run Development Server**: `npm run dev`
4. **Environment Variables**: Add `GOOGLE_GENAI_API_KEY` to `.env` for AI features.
