
'use server';

import prisma from '@/lib/prisma';
import { ManagedUser } from '@/lib/user-store';
import { revalidatePath } from 'next/cache';

export async function getManagedUsers() {
  const users = await prisma.managedUser.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return users.map(u => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  })) as ManagedUser[];
}

export async function saveManagedUser(user: ManagedUser) {
  await prisma.managedUser.create({
    data: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: new Date(user.createdAt),
    },
  });
  revalidatePath('/dashboard/users');
}

export async function updateManagedUser(user: ManagedUser) {
  await prisma.managedUser.update({
    where: { id: user.id },
    data: {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
  revalidatePath('/dashboard/users');
}

export async function deleteManagedUser(id: string) {
  await prisma.managedUser.delete({
    where: { id },
  });
  revalidatePath('/dashboard/users');
}
