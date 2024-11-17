"use client";

import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { productSchema } from "./productFormSchema";
import type { FormState } from "@/types";

interface ProductFormProps {
  onSubmitAction: (prevState: FormState, data: FormData) => Promise<FormState>;
  defaultValues: z.input<typeof productSchema>;
  successMessage: string;
}

export function ProductForm({ onSubmitAction, defaultValues, successMessage }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(onSubmitAction, { message: "" });
  const form = useForm<z.output<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message);
    } else if (state.success) {
      toast.success(successMessage);
      redirect("/");
    }
  }, [state.message, state.success, successMessage]);

  return (
    <Form {...form}>
      <form action={formAction} className="mx-4 space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="sku"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField name="id" control={form.control} render={({ field }) => <Input className="hidden" {...field} />} />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
