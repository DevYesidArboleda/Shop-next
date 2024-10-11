"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { TaskSchema } from "@/lib/zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateTaskAction } from "../../actions/auth-action";
import { useRouter } from "next/navigation";
import { Task } from "../../types";

interface EditTaskFormProps {
  task: Task; 
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      projectId: task.project.id, // Asegúrate de que project.id esté presente
    },
  });

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    startTransition(async () => {
      const response = await updateTaskAction(task.id, values);
      if (response.error) {
        setError(response.error);
      } else if (response.task) {
        router.push(`/projects/${task.project.id}`); // Redirige al proyecto
        router.refresh();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Done</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormMessage>{error}</FormMessage>}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Task"}
        </Button>
      </form>
    </Form>
  );
};

export default EditTaskForm;
