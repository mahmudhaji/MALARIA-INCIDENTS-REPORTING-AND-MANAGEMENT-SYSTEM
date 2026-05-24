
/**
 * @fileOverview This file now serves as a schema reference. 
 * Mock data is cleared to ensure the application starts with a clean slate
 * and only displays data added during the session.
 */

import { MalariaCase, Statistics } from './types';

export const MOCK_CASES: MalariaCase[] = [];

export const MOCK_STATS: Statistics = {
  totalCases: 0,
  positiveRate: 0,
  recoveredCount: 0,
  activeSurge: false,
};

export const TREND_DATA = [
  { name: 'Mon', cases: 0 },
  { name: 'Tue', cases: 0 },
  { name: 'Wed', cases: 0 },
  { name: 'Thu', cases: 0 },
  { name: 'Fri', cases: 0 },
  { name: 'Sat', cases: 0 },
  { name: 'Sun', cases: 0 },
];
