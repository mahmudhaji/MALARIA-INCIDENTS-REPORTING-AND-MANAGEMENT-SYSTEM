
'use client';

// This file now redirects to Server Actions for database interaction.
import { getManagedUsers as apiGetManagedUsers, saveManagedUser as apiSaveManagedUser, updateManagedUser as apiUpdateManagedUser, deleteManagedUser as apiDeleteManagedUser } from "@/app/actions/users";

export interface ManagedUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export async function getManagedUsers(): Promise<ManagedUser[]> {
  return apiGetManagedUsers();
}

export async function saveManagedUser(user: ManagedUser) {
  await apiSaveManagedUser(user);
}

export async function updateManagedUser(user: ManagedUser) {
  await apiUpdateManagedUser(user);
}

export async function deleteManagedUser(id: string) {
  await apiDeleteManagedUser(id);
}
