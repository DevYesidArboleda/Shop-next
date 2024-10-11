// types/index.ts
export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface Project {
    id: string;
    name: string;
    description: string;
    owner: User;
    tasks: Task[];
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    assignee: User;
    project: Project;
  }