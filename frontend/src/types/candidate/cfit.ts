export type CfitType = {
  tes1: { answer: string; no: number }[];
  tes2: {
    answer: {
      p1: {
        isChecked: boolean;
        value: string;
      };
      p2: {
        isChecked: boolean;
        value: string;
      };
      p3: {
        isChecked: boolean;
        value: string;
      };
      p4: {
        isChecked: boolean;
        value: string;
      };
      p5: {
        isChecked: boolean;
        value: string;
      };
    };
    no: number;
  }[];
  tes3: { answer: string; no: number }[];
  tes4: { answer: string; no: number }[];
};
