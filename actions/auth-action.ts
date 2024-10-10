"use server"

import { loginSchema, RegisterSchema } from "@/lib/zod";
import { z } from "zod";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

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