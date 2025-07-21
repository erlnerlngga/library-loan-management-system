export interface User {
  company: string;
  createdAt: Date;
  email: string;
  id: string;
  image: string;
  name: string;
  password: string;
  phone: string;
  role: UserRole;
  updatedAt: Date;
}

// Assuming UserRole is defined elsewhere
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
