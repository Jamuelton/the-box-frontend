import { z } from "zod";

export const DocumentsSchema = z.object({
  title: z
    .string({ message: "Insira o nome do material" })
    .min(1, "Insira o título")
    .max(100, "Título pode conter apenas 100 caracteres"),
  url: z
    .string({ required_error: "Upload inválido" })
    .url({ message: "Upload inválido" }),
  description: z
    .string({ message: "Insira uma descrição" })
    .min(1, "Insira o conteúdo")
    .max(500, "Apenas 500 caracteres são permitidos no corpo do post"),
  category: z.enum(["APOIO", "MANUAL_DOS_CALOUROS"], {
    message: "Insira uma categoria válida",
  }),
});

