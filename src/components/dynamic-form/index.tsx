/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ZodType, infer as zodInfer } from "zod";
import clsx from "clsx";
import { RenderField } from "./render-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export interface DynamicField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "textarea"
    | "number"
    | "checkbox"
    | "password"
    | "select"
    | "file"
    | "date";
  placeholder?: string;
  options?: { label: string; value: string }[];
  rows?: number;
  multiple?: boolean;
  accept?: string;
  defaultValue?: any;
  hidden?: boolean;
}

type Schema = ZodType<any, any, any>;

interface DynamicFormProps<T extends Schema> {
  title?: string;
  description?: string;
  schema: T;
  fields: DynamicField[];
  onSubmit: (data: zodInfer<T>) => Promise<void> | void;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  buttonLabel?: string;
}

export default function DynamicForm<T extends Schema>({
  title,
  description,
  schema,
  fields,
  onSubmit,
  successMessage = "Enviado com sucesso!",
  errorMessage = "Ocorreu um erro. Tente novamente.",
  className,
  buttonLabel = "Enviar",
}: DynamicFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<zodInfer<T>>({
    resolver: zodResolver(schema) as any,
    mode: "onBlur",
  });

  async function handleFormSubmit(data: zodInfer<T>) {
    try {
      await onSubmit(data);
      toast.success(successMessage);
      reset();
    } catch (err: any) {
      toast.error(err.message || errorMessage);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={clsx("max-w-2xl mx-auto", className)}>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {fields.map((field) =>
              field.hidden ? null : (
                <RenderField
                  key={field.name}
                  field={field}
                  register={register}
                  errorMsg={(errors as any)?.[field.name]?.message}
                  watch={watch}
                  setValue={setValue}
                />
              )
            )}

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Limpar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : buttonLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
