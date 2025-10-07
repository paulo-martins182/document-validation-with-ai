"use client";

import DynamicForm, { DynamicField } from "@/components/dynamic-form";
import z from "zod";

const documentSchema = z.object({
  title: z.string().min(3, "Título obrigatório"),
  upload: z.any().refine((file) => !!file, "Arquivo é obrigatório"),
  expiration: z.date().optional(),
});

const documentFields: DynamicField[] = [
  {
    name: "title",
    label: "Título do Documento",
    type: "text",
    placeholder: "RG, CNH...",
  },
  {
    name: "upload",
    label: "Envie o Arquivo",
    type: "file",
    accept: ".pdf,.jpg,.png",
  },
  { name: "expiration", label: "Data de Validade", type: "date" },
];

export default function AddDocumentPage() {
  return (
    <DynamicForm
      title="Envio de Documentos"
      description="Anexe seu documento e preencha as informações abaixo."
      schema={documentSchema}
      fields={documentFields}
      onSubmit={async (data) => {
        console.log("Dados enviados:", data);
      }}
    />
  );
}
