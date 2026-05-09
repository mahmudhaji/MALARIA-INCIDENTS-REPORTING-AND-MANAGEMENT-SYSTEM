
# PataMalaria - Malaria Incidents Reporting and Management System

PataMalaria is a comprehensive digital solution designed to streamline the reporting, tracking, and analysis of malaria incidents. This system empowers community health workers and medical officers with real-time data and AI-driven insights to combat malaria effectively.

## Features
- **Secure Authentication**: Role-based access for CHWs, Doctors, Health Officers, and Administrators.
- **Incident Reporting**: Easy-to-use forms for field data collection (CHW).
- **Case Management**: Centralized dashboard for tracking treatment and recovery (Doctors/CHW).
- **Geospatial Mapping**: Interactive visualization of malaria hotspots (Health Officer).
- **AI Analytics**: Intelligent trend identification and surge alerting using GenAI (Health Officer/Doctor).
- **Notifications**: System-wide alerts for regional surges.

## User Roles & Credentials

For prototype demonstration, please use the following credentials:

| Role | Username | Password | Access |
|------|----------|----------|--------|
| **CHW** | `chw_user` | `password123` | Reporting, Submissions |
| **Doctor** | `doctor_user` | `password123` | Patient Cases, Prescriptions |
| **Officer** | `officer_user` | `password123` | Analytics, Hotspot Map, Alerts |
| **Admin** | `admin_user` | `password123` | User Management, Settings |

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Lucide Icons, Recharts
- **AI Integration**: Genkit with Google Gemini 2.0 Flash
- **Styling**: Tailwind CSS with custom Professional Blue theme

## Setup Steps
1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Run Development Server**: `npm run dev`
4. **Environment Variables**: Add `GOOGLE_GENAI_API_KEY` to `.env` for AI features.

The application will be available at `http://localhost:3000`.

## Project Structure
- `src/app`: Application routes and layouts
- `src/components`: Reusable UI components
- `src/ai`: Genkit flows for surge detection and hotspot analysis
- `src/lib`: Types, mock data, and utility functions
- `src/lib/auth-store.ts`: Client-side role-based authentication logic
