import { prisma } from '@/lib/prisma';

interface Project {
  id: number;
  name: string;
  color: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

// génération statique
export async function generateStaticParams() {
  const projects = await prisma.project.findMany();

  return projects.map((p: Project) => ({
    id: String(p.id)
  }));
}

// page
export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!project) {
    return (
      <div style={{ padding: '2rem' }}>
        Projet non trouvé
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: project.color,
            marginRight: 8
          }}
        />

        {project.name}
      </h1>

      <p>ID : {project.id}</p>

      <a href="/dashboard">
        ← Retour au Dashboard
      </a>
    </div>
  );
}