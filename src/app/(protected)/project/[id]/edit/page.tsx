import { db } from '@/lib/db';
import EditProjectForm from '@/components/EditProjectForm';
import { notFound } from 'next/navigation';

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

// Esta función es ejecutada en el servidor automáticamente
export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = params;

  // Consulta a la base de datos para obtener el proyecto
  const project = await db.project.findUnique({
    where: { id },
    include: {
      tasks: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // Si no se encuentra el proyecto, redirige a una página de error o 404
  if (!project) {
    return notFound(); // Puedes personalizar el manejo de "Not Found"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
      {/* Renderizamos el formulario pasándole el proyecto */}
      <EditProjectForm project={project} />
    </div>
  );
}
