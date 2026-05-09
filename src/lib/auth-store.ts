
"use client";

import { User, UserRole } from "./types";

const AUTH_KEY = "pata_malaria_auth";

const MOCK_USERS: Record<string, User & { password: string }> = {
  "chw_user": {
    id: "user_1",
    name: "John CHW",
    email: "john.chw@health.go.ke",
    role: "CHW",
    password: "password123"
  },
  "doctor_user": {
    id: "user_2",
    name: "Dr. Alice Smith",
    email: "alice.s@health.go.ke",
    role: "Doctor",
    password: "password123"
  },
  "officer_user": {
    id: "user_3",
    name: "Sarah Mwangi",
    email: "sarah.m@health.go.ke",
    role: "Health Officer",
    password: "password123"
  },
  "admin_user": {
    id: "user_4",
    name: "Admin User",
    email: "admin@health.go.ke",
    role: "Administrator",
    password: "password123"
  }
};

export function login(username: string, password: string): User | null {
  const user = MOCK_USERS[username];
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  return null;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}
