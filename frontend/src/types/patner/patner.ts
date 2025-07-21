export interface UserType {
  id: string;
  email: string;
}

export interface RoleType {
  id: string;
  name: string;
}

export interface Partner {
  id: string;
  name: string;
  company: string;
  phone: string;
  color_brand: string;
  paid_until: string;
  on_trial: boolean;
  is_active: boolean;
  user: {
    id: string;
    email: string;
    roles: { id: string; name: string }[];
  };
}
