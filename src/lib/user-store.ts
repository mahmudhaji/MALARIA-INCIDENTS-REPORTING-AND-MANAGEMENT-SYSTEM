
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

const USERS_KEY = "pata_malaria_managed_users_v2"; // Incremented key to force-clear old prototype data

// Initial list is empty to ensure only data added by the Admin is displayed.
const INITIAL_MANAGED_USERS: ManagedUser[] = [];

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
