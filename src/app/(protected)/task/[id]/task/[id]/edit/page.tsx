// app/project/[projectId]/task/[taskId]/edit/page.tsx
import { db } from '@/lib/db';
import EditTaskForm from '@/components/EditTaskForm';
import { Task } from '@/types';
import { notFound } from 'next/navigation';

interface EditTaskPageProps {
  params: {
    projectId: string; // Asegúrate de incluir esto si lo necesitas
    taskId: string;    // Este es el ID de la tarea
  };
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { taskId } = params; // Asegúrate de que estás extrayendo correctamente el taskId

  console.log('Task ID:', taskId); // Para depuración

  // Consultamos la tarea en la base de datos usando Prisma
  const task = await db.task.findUnique({
    where: { id: taskId }, // Aquí estamos usando el taskId
    include: {
      project: {
        select: {
          id: true,
        },
      },
    },
  });

  // Si no encontramos la tarea, redirigimos a una página 404
  if (!task) {
    return notFound(); // O puedes manejar esto de otra forma
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Task</h1>
      <EditTaskForm task={task} />
    </div>
  );
}
