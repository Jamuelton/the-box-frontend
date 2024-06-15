export interface UserInterface {
  name: string;
  email: string;
  phone: string;
  profile?: "USER" | "SUPER_USER";
}
