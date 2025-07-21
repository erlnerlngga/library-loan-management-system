export interface Candidate {
  id: string;
  name: string;
  company: string;
  phone: string;
  photo: string;
  cv: string;
  birth_of_place: string;
  birth_of_date: string;
  gender: string;
  marital_status: string;
  current_job: string;
  position: string;
  education: string;
  major: string;
  address: string;
  have_done: boolean;
  project: string[];
  user: { email: string; password: string; roles: { name: string }[] };
}
