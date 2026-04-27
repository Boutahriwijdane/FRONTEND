import { NextResponse } from 'next/server';

// ✅ GET
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`http://localhost:4000/projects/${params.id}`);

  if (!res.ok) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// ✅ PUT
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const res = await fetch(`http://localhost:4000/projects/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

// ✅ DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await fetch(`http://localhost:4000/projects/${params.id}`, {
    method: 'DELETE',
  });

  return NextResponse.json({ message: 'Projet supprimé' });
}