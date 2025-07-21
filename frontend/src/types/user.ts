export interface User {
  id: string;
  email: string;
  roles: { id: string; name: string }[];
}

export interface UserType {
  id: string;
  email: string;
}

export interface RoleType {
  id: string;
  name: string;
}
