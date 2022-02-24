export interface BodyCreateCompany {
  name: string;
  cnpj: string;
  email: string;
  password: string;
}

export interface BodyLogin {
  email: string;
  password: string;
}

export interface BodyUpdateCompany {
  name?: string;
  cnpj?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}
