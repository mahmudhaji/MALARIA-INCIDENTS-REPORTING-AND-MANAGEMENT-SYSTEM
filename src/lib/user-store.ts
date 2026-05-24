
"use client";

import { UserRole } from "./types";

export interface ManagedUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const USERS_KEY = "pata_malaria_managed_users";

// We keep these for the prototype system to function, but they won't be in the "Added by Admin" count if we strictly filter by a session flag, 
// however usually users want to see the management list populated with the base accounts.
const INITIAL_MANAGED_USERS: ManagedUser[] = [
  { id: "1", username: "asha01", fullName: "Asha Hamisi", role: "CHW", status: "Active", email: "asha@health.go.ke", createdAt: new Date().toISOString() },
  { id: "2", username: "peter01", fullName: "Dr. Peter John", role: "Doctor", status: "Active", email: "peter@health.go.ke", createdAt: new Date().toISOString() },
  { id: "3", username: "officer01", fullName: "Grace Mollel", role: "Health Officer", status: "Active", email: "grace@health.go.ke", createdAt: new Date().toISOString() },
  { id: "4", username: "admin01", fullName: "System Admin", role: "Administrator", status: "Active", email: "admin@health.go.ke", createdAt: new Date().toISOString() },
];

export function getManagedUsers(): ManagedUser[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_MANAGED_USERS));
    return INITIAL_MANAGED_USERS;
  }
  return JSON.parse(data);
}

export function saveManagedUser(user: ManagedUser) {
  const users = getManagedUsers();
  const updated = [user, ...users];
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  return updated;
}

export function updateManagedUser(user: ManagedUser) {
  const users = getManagedUsers();
  const updated = users.map((u) => (u.id === user.id ? user : u));
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteManagedUser(id: string) {
  const users = getManagedUsers();
  const updated = users.filter((u) => u.id !== id);
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  return updated;
}
