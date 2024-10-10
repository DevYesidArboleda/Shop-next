"use server"

import { loginSchema, ProjectSchema, RegisterSchema, TaskSchema } from "@/lib/zod";
import { z } from "zod";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { auth } from "../auth"

export const loginAction = async(
    values: z.infer<typeof loginSchema>
) => {
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          })
          return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
          }
          return { error: "error 500" };
    }
}

export const registerAction = async(
    values: z.infer<typeof RegisterSchema>
) => {
    try {
        const { data, success } = RegisterSchema.safeParse(values);
    if (!success) {
      return {
        error: "Invalid data",
      };
    }

    // verificar si el usuario ya existe
    const user = await db.user.findUnique({
        where: {
          email: data.email,
        },
        include: {
          accounts: true, // Incluir las cuentas asociadas
        },
      });

      if(user){
        return {
            error : "user already exists"
        }
      }

      // hashear de la contraseña
        const passwordHash = await bcrypt.hash(data.password, 10);

      //crear usuario 
      await db.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: passwordHash,
        },
      });

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
  
      return { success: true };

    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
          }
          return { error: "error 500" };
    }
}

export const createProjectAction = async(
  values: z.infer<typeof ProjectSchema>
) => {
  const { data, success } = ProjectSchema.safeParse(values);
  if (!success) {
    return { error: "Datos inválidos" };
  }

  const session = await auth()
  

  try {

    // Primero, obtenemos el usuario actual usando su email
    const user = await db.user.findUnique({
      where: { 
        email: session?.user.email 
      },
    });

    // Crear el proyecto
    const project =await db.project.create({
      data: {
        name: data.name,
        ownerId : user?.id 
      },
    });

    return { success: true, project };
  } catch (error) {
    return { error: "Error creando el proyecto" };
  }
};

export const createTaskAction = async(
  values: z.infer<typeof TaskSchema>
) => {
  const { data, success } = TaskSchema.safeParse(values);
  if (!success) {
    return { error: "Datos inválidos" };
  }

  const session = await auth()

  try {
    // Primero, obtenemos el usuario actual usando su email
    const user = await db.user.findUnique({
      where: { 
        email: session?.user.email 
      },
    });

    // Crear la tarea
    await db.task.create({
      data: {
        title: data.title,
        description: data.description || "",
        projectId: data.projectId,
        assigneeId: user?.id,
        status: data.status,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Error creando la tarea" };
  }
};