
export type UserRole = 'CHW' | 'Doctor' | 'Health Officer' | 'Administrator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
}

export type CaseStatus = 'Reported' | 'Under Treatment' | 'Recovered' | 'Deceased';

export interface MalariaCase {
  id: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  symptoms: string[];
  testResult: 'Positive' | 'Negative' | 'Pending';
  latitude: number;
  longitude: number;
  area: string;
  status: CaseStatus;
  treatment?: string;
  reportedBy: string;
  reportedAt: string;
  updatedAt: string;
  contactNumber?: string;
}

export interface Statistics {
  totalCases: number;
  positiveRate: number;
  recoveredCount: number;
  activeSurge: boolean;
}
