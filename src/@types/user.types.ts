export interface BodyCreateUser {
  name: string;
  email: string;
  password: string;
  isAdm?: boolean;
}

export interface BodyUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  isAdm?: boolean;
  isActive?: boolean;
}
