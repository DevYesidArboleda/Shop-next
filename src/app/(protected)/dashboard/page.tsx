import LogoutButton from "@/components/logout-button";
import { auth } from "../../../../auth";
import Navbar from "@/app/Navbar";
import { db } from "@/lib/db";
import ProjectsAndTasksList from "@/components/projectsAndTasksList";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const projects = await db.project.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        { tasks: { some: { assigneeId: session.user.id } } },
      ],
    },
    include: {
      owner: true,
      tasks: {
        include: {
          assignee: true,
        },
      },
    },
  });


  return (
    <div className="container">
      <Navbar />
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Projects and Tasks Dashboard
        </h1>
        <ProjectsAndTasksList projects={projects} />
      </div>
    </div>
  );
}
