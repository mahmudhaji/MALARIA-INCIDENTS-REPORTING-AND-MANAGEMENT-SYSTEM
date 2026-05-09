
import { MalariaCase, Statistics } from './types';

export const MOCK_CASES: MalariaCase[] = [
  {
    id: 'CASE-001',
    patientName: 'Jane Doe',
    age: 24,
    gender: 'Female',
    symptoms: ['Fever', 'Chills', 'Headache'],
    testResult: 'Positive',
    latitude: -1.2921,
    longitude: 36.8219,
    area: 'Nairobi Central',
    status: 'Under Treatment',
    treatment: 'Artemether-lumefantrine',
    reportedBy: 'CHW-01',
    reportedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'CASE-002',
    patientName: 'John Smith',
    age: 35,
    gender: 'Male',
    symptoms: ['Sweating', 'Fatigue'],
    testResult: 'Pending',
    latitude: -1.3032,
    longitude: 36.7073,
    area: 'Dagoretti',
    status: 'Reported',
    reportedBy: 'CHW-02',
    reportedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'CASE-003',
    patientName: 'Baby Amina',
    age: 5,
    gender: 'Female',
    symptoms: ['High Fever', 'Vomiting'],
    testResult: 'Positive',
    latitude: -4.0435,
    longitude: 39.6682,
    area: 'Mombasa Port',
    status: 'Recovered',
    treatment: 'Quinine',
    reportedBy: 'CHW-05',
    reportedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const MOCK_STATS: Statistics = {
  totalCases: 1240,
  positiveRate: 15.5,
  recoveredCount: 980,
  activeSurge: true,
};

export const TREND_DATA = [
  { name: 'Mon', cases: 12 },
  { name: 'Tue', cases: 19 },
  { name: 'Wed', cases: 15 },
  { name: 'Thu', cases: 22 },
  { name: 'Fri', cases: 30 },
  { name: 'Sat', cases: 25 },
  { name: 'Sun', cases: 32 },
];
