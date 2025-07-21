export interface Patner {
  company: string;
  createdAt: Date;
  email: string;
  id: string;
  image: string;
  logo: string;
  name: string;
  password: string;
  phone: string;
  role: PatnerRole;
  updatedAt: Date;
}

export enum PatnerRole {
  MEMBER_FREE = 'MEMBER_FREE',
  MEMBER_PAID = 'MEMBER_PAID',
}
