export interface Patner {
  cognitoId: string;
  company: string;
  createdAt: Date;
  email: string;
  id: string;
  image: string;
  name: string;
  phone: string;
  role: string;
  updatedAt: Date;
}

export interface Admin {
  cognitoId: string;
  email: string;
  name: string;
  role: string;
}

export interface Candidate {
  address: string;
  birthOfDate: string;
  birthOfPlace: string;
  cognitoId: string;
  company: string;
  createdAt: Date;
  currentJob: string;
  education: string;
  email: string;
  gender: string;
  haveDone: boolean;
  major: string;
  maritalStatus: string;
  name: string;
  patnerId: string;
  phone: string;
  photo: string;
  position: string;
  projectId: string;
  role: string;
}

// Assuming UserRole is defined elsewhere

export type GetAuthType = {
  data: {
    userInfo: Patner;
    userPerusahaan: string;
    userRole: string;
  };
};
