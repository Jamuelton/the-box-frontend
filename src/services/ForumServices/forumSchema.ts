import { z } from "zod";

export const ForumPostSchema = z.object({
  title: z
    .string({ required_error: "Insira o título" })
    .min(1, "Insira o título")
    .max(20, "Título pode conter apenas 20 caractéres"),
  category: z.string({ required_error: "Selecione uma categoria" }),
  content: z
    .string({ required_error: "Insira o conteúdo" })
    .min(1, "Insira o conteúdo")
    .max(250, "Apenas 250 caractéres são permitidos no corpo do post"),
});
