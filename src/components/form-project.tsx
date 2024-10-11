"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { ProjectSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProjectAction } from "../../actions/auth-action";
import { useRouter } from "next/navigation";

const FormProject = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProjectSchema>) {
    startTransition(async () => {
      const response = await createProjectAction(values);
      console.log(response);
      if (response.error) {
        setError(response.error);
      } else {
        router.push(`/task?projectID=${response?.project.id}`);
      }
    });
  }

  return (
    <div>
      <h1>Create Project</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Project Name" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Task Description"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <FormMessage>{error}</FormMessage>}
          <Button type="submit" disabled={isPending}>
            Create Project
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormProject;