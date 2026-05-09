
# PataMalaria - Malaria Incidents Reporting and Management System

PataMalaria is a comprehensive digital solution designed to streamline the reporting, tracking, and analysis of malaria incidents. This system empowers community health workers and medical officers with real-time data and AI-driven insights to combat malaria effectively.

## Features
- **Secure Authentication**: Role-based access for CHWs, Doctors, and Administrators.
- **Incident Reporting**: Easy-to-use forms for field data collection.
- **Case Management**: Centralized dashboard for tracking treatment and recovery.
- **Geospatial Mapping**: Interactive visualization of malaria hotspots.
- **AI Analytics**: Intelligent trend identification and surge alerting using GenAI.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons, Recharts
- **AI Integration**: Genkit with Google Gemini 2.0 Flash
- **Styling**: Shadcn UI (Custom Vital Green Theme)

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google AI API Key (for GenAI features)

### Setup Steps
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd patamalaria
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your Google AI credentials:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

### Database Note
For this initial version, the app uses a simulated backend with mock data and server actions. In a production environment, this can be easily connected to Firebase or a MySQL database as per project requirements.

## Project Structure
- `src/app`: Application routes and layouts
- `src/components`: Reusable UI components
- `src/ai`: Genkit flows for surge detection and hotspot analysis
- `src/lib`: Types, mock data, and utility functions
