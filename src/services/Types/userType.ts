import { z } from "zod";

export interface UserInterface {
  name: string;
  email: string;
  phone: string;
  profile?: "USER" | "SUPER_USER";
}

export const UserSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(2, { message: "Necessário mais de 2 caracteres no nome" })
    .max(80, { message: "Apenas 80 caracteres permitidos no nome" }),
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email(),
  phone: z
    .string({
      required_error: "O número é obrigatório",
    })
    .min(8, { message: "Necessário pelo menos 11 caracteres" }),
});
