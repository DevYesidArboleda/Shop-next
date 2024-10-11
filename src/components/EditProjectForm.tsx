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
import { updateProjectAction } from "../../actions/auth-action";
import { useRouter } from "next/navigation";

interface EditProjectFormProps {
  project: {
    id: string;
    name: string;
    description: string;
    tasks?: any[];
    owner?: {
      id: string;
      name: string;
      email: string;
    };
  };
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ project }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });

  async function onSubmit(values: z.infer<typeof ProjectSchema>) {
    startTransition(async () => {
      const response = await updateProjectAction(project.id, values);
      if (response.error) {
        setError(response.error);
      } else if (response.project) {
        router.push(`/dashboard`);
        router.refresh();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Project"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProjectForm;
