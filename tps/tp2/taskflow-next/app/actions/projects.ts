
'use server';

import { revalidatePath } from 'next/cache';

// ✅ ADD
export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

// ✅ RENAME
export async function renameProject(formData: FormData) {
  const id = formData.get('id');
  const newName = formData.get('newName');

  const res = await fetch(`http://localhost:4000/projects/${id}`);
  const project = await res.json();

  await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects`, { 
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: newName,
      color: project.color,
    }),
  });

  revalidatePath('/dashboard');
}

// ✅ DELETE
export async function deleteProject(formData: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = formData.get('id');

  await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
}