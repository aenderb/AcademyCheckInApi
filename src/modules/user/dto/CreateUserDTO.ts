// CreateUserDTO

// DTO para entrada do Controller/Service (antes do hash)
export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string; // Senha sem hash
}
