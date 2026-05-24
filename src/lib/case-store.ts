
'use client';

// This file now redirects to Server Actions for database interaction.
import { MalariaCase } from "./types";
import { getCases as apiGetCases, saveCase as apiSaveCase, updateCase as apiUpdateCase, deleteCase as apiDeleteCase } from "@/app/actions/cases";

export async function getCases(): Promise<MalariaCase[]> {
  return apiGetCases();
}

export async function saveCase(newCase: MalariaCase) {
  await apiSaveCase(newCase);
}

export async function updateCase(updatedCase: MalariaCase) {
  await apiUpdateCase(updatedCase);
}

export async function deleteCase(id: string) {
  await apiDeleteCase(id);
}
