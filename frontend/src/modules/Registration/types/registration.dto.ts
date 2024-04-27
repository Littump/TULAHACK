export default interface RegistrationDto {
  username: string;
  password: string;
  email: string;
  kind?: "company" | "user";
}
