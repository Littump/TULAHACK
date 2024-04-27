export interface IOrganization {
  id: number;
  username: string;
  name: string;
  address: string;
  description: string;
  context: string;
  ai_using: boolean;
  kind: "user" | "company";
}
