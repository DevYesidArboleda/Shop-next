import { object, string, z } from "zod"
 
export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const RegisterSchema = object({
    email: string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(6, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
      name: string({ required_error: "Name is required" })
      .min(1, "Name is required")
      .max(32, "Name must be less than 32 characters"),
  })

  export const ProjectSchema = z.object({
    name: z.string().min(3, "El nombre del proyecto debe tener al menos 3 caracteres"),
  });
  
  export const TaskSchema = z.object({
    title: z.string().min(3, "El título de la tarea debe tener al menos 3 caracteres"),
    description: z.string().optional(),
    projectId: z.string(),
    assignedToId: z.number().optional(),
    status: z.enum(["pending", "in_progress", "completed"]),
  });