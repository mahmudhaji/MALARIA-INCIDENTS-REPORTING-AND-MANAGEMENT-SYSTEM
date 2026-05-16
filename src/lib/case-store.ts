
"use client";

import { MalariaCase } from "./types";
import { MOCK_CASES } from "./mock-data";

const CASES_KEY = "pata_malaria_cases";

export function getCases(): MalariaCase[] {
  if (typeof window === "undefined") return MOCK_CASES;
  const data = localStorage.getItem(CASES_KEY);
  if (!data) {
    // Initialize with mock data if empty
    localStorage.setItem(CASES_KEY, JSON.stringify(MOCK_CASES));
    return MOCK_CASES;
  }
  return JSON.parse(data);
}

export function saveCase(newCase: MalariaCase) {
  const cases = getCases();
  const updatedCases = [newCase, ...cases];
  localStorage.setItem(CASES_KEY, JSON.stringify(updatedCases));
  return updatedCases;
}

export function updateCase(updatedCase: MalariaCase) {
  const cases = getCases();
  const updatedCases = cases.map((c) => (c.id === updatedCase.id ? updatedCase : c));
  localStorage.setItem(CASES_KEY, JSON.stringify(updatedCases));
  return updatedCases;
}

export function deleteCase(id: string) {
  const cases = getCases();
  const updatedCases = cases.filter((c) => c.id !== id);
  localStorage.setItem(CASES_KEY, JSON.stringify(updatedCases));
  return updatedCases;
}
