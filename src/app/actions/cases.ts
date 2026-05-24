
'use server';

import prisma from '@/lib/prisma';
import { MalariaCase, CaseStatus } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function getCases() {
  const data = await prisma.malariaCase.findMany({
    orderBy: { reportedAt: 'desc' },
  });
  return data.map(c => ({
    ...c,
    symptoms: c.symptoms.split(',').map(s => s.trim()),
    status: c.status as CaseStatus,
    reportedAt: c.reportedAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  })) as MalariaCase[];
}

export async function saveCase(newCase: MalariaCase) {
  await prisma.malariaCase.create({
    data: {
      id: newCase.id,
      patientName: newCase.patientName,
      age: newCase.age,
      gender: newCase.gender,
      symptoms: newCase.symptoms.join(','),
      testResult: newCase.testResult,
      latitude: newCase.latitude,
      longitude: newCase.longitude,
      area: newCase.area,
      status: newCase.status,
      treatment: newCase.treatment,
      reportedBy: newCase.reportedBy,
      contactNumber: newCase.contactNumber,
      reportedAt: new Date(newCase.reportedAt),
    },
  });
  revalidatePath('/dashboard');
}

export async function updateCase(updatedCase: MalariaCase) {
  await prisma.malariaCase.update({
    where: { id: updatedCase.id },
    data: {
      patientName: updatedCase.patientName,
      age: updatedCase.age,
      gender: updatedCase.gender,
      symptoms: updatedCase.symptoms.join(','),
      testResult: updatedCase.testResult,
      latitude: updatedCase.latitude,
      longitude: updatedCase.longitude,
      area: updatedCase.area,
      status: updatedCase.status,
      treatment: updatedCase.treatment,
      contactNumber: updatedCase.contactNumber,
    },
  });
  revalidatePath('/dashboard');
}

export async function deleteCase(id: string) {
  await prisma.malariaCase.delete({
    where: { id },
  });
  revalidatePath('/dashboard');
}
