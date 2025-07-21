export interface Mbti {
  candidateId: string;
  createdAt: Date;
  id: string;
  result: string;
  scoreExtrovert: number;
  scoreFeeling: number;
  scoreIntrovert: number;
  scoreIntuition: number;
  scoreJudging: number;
  scorePerceiving: number;
  scoreSensing: number;
  scoreThinking: number;
}

export interface Msdt {
  candidateId: string;
  createdAt: Date;
  description: string;
  id: string;
  label: string;
}

export interface PapiKostik {
  PapiKostikScore: PapiKostikScore[];
  candidateId: string;
  createdAt: Date;
  id: string;
}

export interface PapiKostikScore {
  category: string;
  factor: string;
  id: string;
  message: string;
  papikostikId: string;
  score: number;
}

export interface Cfit {
  CfitScore: CfitScore[];
  candidateId: string;
  createdAt: Date;
  description: string;
  id: string;
  iq: number;
  rs: number;
}

export interface CfitScore {
  cfitId: string;
  id: string;
  label: string;
  totalCorrect: number;
}

export interface Disc {
  DiscScore: DiscScore[];
  behavior: string;
  candidateId: string;
  createdAt: Date;
  description: string;
  id: string;
  jobs: string;
  label: string;
  name: string;
  type: string;
}

export interface DiscScore {
  cScore: number;
  dScore: number;
  discId: string;
  iScore: number;
  id: string;
  sScore: number;
}

export interface Ist {
  IstScore: IstScore[];
  candidateId: string;
  createdAt: Date;
  description: string;
  id: string;
  iq: number;
}

export interface IstScore {
  description: string;
  id: string;
  istId: string;
  label: string;
  score: number;
}

export interface Krapal {
  KrapalScore: KrapalScore[];
  candidateId: string;
  createdAt: Date;
  hanker: number;
  id: string;
  janker: number;
  jumlahJawabanBenar: number;
  jumlahJawabanSalah: number;
  panker: number;
  tinker: number;
  titikPuncak: number;
  titikTerendah: number;
  totalHitungan: number;
}

export interface KrapalScore {
  id: string;
  krapalId: string;
  noColumn: number;
  rightAnswer: number;
  time: number;
  total: number;
  wrongAnswer: number;
}
