export interface AuthInterface {
  name?: string;
  email: string;
  phone?: string;
  profile?: "USER" | "SUPER_USER";
  password: string;
}
