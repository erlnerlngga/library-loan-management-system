export type DiscDefKeys =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'
  | '32'
  | '33'
  | '34'
  | '35'
  | '36'
  | '37'
  | '38'
  | '39'
  | '40';

export interface DiscType {
  answer: {
    k1: {
      isChecked: boolean;
      value: number;
    };
    k2: {
      isChecked: boolean;
      value: number;
    };
    k3: {
      isChecked: boolean;
      value: number;
    };
    k4: {
      isChecked: boolean;
      value: number;
    };
    p1: {
      isChecked: boolean;
      value: number;
    };
    p2: {
      isChecked: boolean;
      value: number;
    };
    p3: {
      isChecked: boolean;
      value: number;
    };
    p4: {
      isChecked: boolean;
      value: number;
    };
  };
  no: number;
}

export interface scoreType {
  '1': {
    '*': {
      k: number;
      p: number;
    };
    C: {
      k: number;
      p: number;
    };
    D: {
      k: number;
      p: number;
    };
    I: {
      k: number;
      p: number;
    };
    S: {
      k: number;
      p: number;
    };
  };
  '2': {
    '*': {
      k: number;
      p: number;
    };
    C: {
      k: number;
      p: number;
    };
    D: {
      k: number;
      p: number;
    };
    I: {
      k: number;
      p: number;
    };
    S: {
      k: number;
      p: number;
    };
  };
  '3': {
    '*': {
      k: number;
      p: number;
    };
    C: {
      k: number;
      p: number;
    };
    D: {
      k: number;
      p: number;
    };
    I: {
      k: number;
      p: number;
    };
    S: {
      k: number;
      p: number;
    };
  };
}

export interface tableType {
  k: number;
  k_desc: string;
  no: string;
  p: number;
  p_desc: string;
}
