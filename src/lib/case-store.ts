
"use client";

import { MalariaCase } from "./types";

const CASES_KEY = "pata_malaria_cases";

/**
 * Initial cases are now empty as per request to "display only data that i add".
 */
export function getCases(): MalariaCase[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CASES_KEY);
  if (!data) {
    localStorage.setItem(CASES_KEY, JSON.stringify([]));
    return [];
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
