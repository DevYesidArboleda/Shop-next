// components/ProjectsAndTasksList.tsx
import React from "react";
import { Project, Task } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface ProjectsAndTasksListProps {
  projects: Project[];
}

const ProjectsAndTasksList: React.FC<ProjectsAndTasksListProps> = ({
  projects,
}) => {
  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <Card key={project.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{project.name}</span>
              <Badge variant="outline">{project.tasks.length} tasks</Badge>
              <Link
                href={`/project/${project.id}/edit?projectID=${project.id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">{project.description}</p>
            <div className="flex items-center mb-4">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${project.owner.email}`}
                />
                <AvatarFallback>{project.owner.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">Created by {project.owner.name}</span>
            </div>
            <div className="space-y-4">
              {project.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const statusColors = {
    TODO: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    DONE: "bg-green-100 text-green-800",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <h4 className="font-semibold">{task.title}</h4>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Badge className={statusColors[task.status]}>{task.status}</Badge>
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={`https://avatar.vercel.sh/${task.assignee.email}`}
          />
          <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
        </Avatar>
        <Link
          href={`/project/cm2462xdn00074p96oq7xuts4/task/${task.id}/edit`}
          className="text-blue-500 hover:underline"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ProjectsAndTasksList;
