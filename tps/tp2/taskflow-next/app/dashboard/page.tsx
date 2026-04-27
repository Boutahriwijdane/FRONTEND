/* eslint-disable @typescript-eslint/no-explicit-any */

import AddProjectForm from './AddProjectForm';
import { deleteProject } from '../actions/projects';
import Link from 'next/link';

export default async function DashboardPage() {
  const res = await fetch('http://localhost:4000/projects', { cache: 'no-store' });
  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <AddProjectForm />

      <ul>
        {projects.map((p: any) => (
          <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            
            <span style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: p.color,
              display: 'inline-block'
            }} />

            <Link href={`/projects/${p.id}`}>{p.name}</Link>

            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit">Supprimer</button>
            </form>

          </li>
        ))}
      </ul>
    </div>
  );
}