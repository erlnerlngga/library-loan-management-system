import {
  answer,
  cate_type,
  definition,
  definition_type,
  gesamt,
  rw_gesamt,
} from '../data/ist-answer.ts';

type istType = {
  AN: { answer: string; no: number }[];
  FA: { answer: string; no: number }[];
  GE: { answer: string; no: number }[];
  ME: { answer: string; no: number }[];
  RA: { answer: string; no: number }[];
  SE: { answer: string; no: number }[];
  WA: { answer: string; no: number }[];
  WU: { answer: string; no: number }[];
  ZR: { answer: string; no: number }[];
};

export class CalculateIst {
  ist: istType;
  age: number;

  constructor(ist: istType, age: number) {
    this.ist = ist;
    this.age = age;
  }

  // 1. first calculate every block to get the total just make for every method  ==> this for calculate the RW
  // 2.  and then calculate the sw
  //      2.1 make table definition to compare the data whats the total
  // 3. get data for the graphic
  // 4. interperate the number

  total_se() {
    const skor = this.ist.SE.map((val) => {
      const ans = answer.se[val.no as keyof typeof answer.se];

      if (val.answer === ans) {
        return 1;
      }

      return 0;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  total_wa() {
    const skor = this.ist.WA.map((val) => {
      const ans = answer.wa[val.no as keyof typeof answer.wa];

      if (val.answer === ans) {
        return 1;
      }

      return 0;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  total_an() {
    const skor = this.ist.AN.map((val) => {
      const ans = answer.an[val.no as keyof typeof answer.an];

      if (val.answer === ans) {
        return 1;
      }

      return 0;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  total_ge() {
    const skor = this.ist.GE.map((val) => {
      const ans = answer.ge[val.no as keyof typeof answer.ge];

      const result = ans.find(
        (val_ans) => val_ans.label === val.answer.trim().toLowerCase(),
      );

      if (!result) {
        return 0;
      }

      return result.value;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  total_ra() {
    const skor = this.ist.RA.map((val) => {
      const ans = answer.ra[val.no as keyof typeof answer.ra];

      if (val.answer.trim() === ans) {
        return 1;
      }

      return 0;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  total_zr() {
    const skor = this.ist.ZR.map((val) => {
      const ans = answer.zr[val.no as keyof typeof answer.zr];

      if (val.answer.trim() === ans) {
        return 1;
      }

      return 0;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  total_fa() {
    const skor = this.ist.FA.map((val) => {
      const ans = answer.fa[val.no as keyof typeof answer.fa];

      if (val.answer.trim() === ans) {
        return 1;
      }

      return 0;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  total_wu() {
    const skor = this.ist.WU.map((val) => {
      const ans = answer.wu[val.no as keyof typeof answer.wu];

      if (val.answer.trim() === ans) {
        return 1;
      }

      return 0;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  total_me() {
    const skor = this.ist.ME.map((val) => {
      const ans = answer.me[val.no as keyof typeof answer.me];

      if (val.answer.trim() === ans) {
        return 1;
      }

      return 0;
    }) as number[];

    const total = skor.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  calculate_sw(rw_type: definition_type, type: cate_type) {
    if (this.age <= 13) {
      const res = definition[13].rw[rw_type][type];

      return res;
    }

    if (this.age <= 18) {
      const res =
        definition[this.age as 14 | 15 | 16 | 17 | 18].rw[
          rw_type as definition_type
        ][type];

      return res;
    }

    if (this.age <= 20) {
      const res = definition.b_20.rw[rw_type as definition_type][type];

      return res;
    }

    if (this.age <= 24) {
      const res = definition.b_24.rw[rw_type as definition_type][type];

      return res;
    }

    if (this.age <= 28) {
      const res = definition.b_28.rw[rw_type as definition_type][type];

      return res;
    }

    if (this.age <= 33) {
      const res = definition.b_33.rw[rw_type as definition_type][type];

      return res;
    }

    if (this.age <= 39) {
      const res = definition.b_39.rw[rw_type as definition_type][type];

      return res;
    }

    if (this.age <= 45) {
      const res = definition.b_45.rw[rw_type as definition_type][type];

      return res;
    }

    if (this.age > 45) {
      const res = definition.a_45.rw[rw_type as definition_type][type];

      return res;
    }

    return 0;
  }

  calculate_gesamt(rw_ges: rw_gesamt) {
    if (this.age <= 13) {
      const res = gesamt.rw[rw_ges][13];

      return res;
    }

    if (this.age <= 18) {
      const res = gesamt.rw[rw_ges][this.age as 14 | 15 | 16 | 17 | 18];

      return res;
    }

    if (this.age <= 20) {
      const res = gesamt.rw[rw_ges].b_20;

      return res;
    }

    if (this.age <= 24) {
      const res = gesamt.rw[rw_ges].b_24;

      return res;
    }

    if (this.age <= 28) {
      const res = gesamt.rw[rw_ges].b_28;

      return res;
    }

    if (this.age <= 33) {
      const res = gesamt.rw[rw_ges].b_33;

      return res;
    }

    if (this.age <= 39) {
      const res = gesamt.rw[rw_ges].b_39;

      return res;
    }

    if (this.age <= 45) {
      const res = gesamt.rw[rw_ges].b_45;

      return res;
    }

    if (this.age <= 60) {
      const res = gesamt.rw[rw_ges].b_60;

      return res;
    }

    return 0;
  }

  calculate_desc(iq: number) {
    // =IF(U37<=65,"Mentally Defective",IF(U37<=79,"Borderline Defective",IF(U37<=90,"Low Average",IF(U37<=110,"Average",IF(U37<=119,"High Average",IF(U37<=127,"Superior",IF(U37<=139,"Very Superior","Genius")))))))
    if (iq <= 65) {
      return 'Mentally Defective';
    }

    if (iq <= 79) {
      return 'Borderline Defective';
    }

    if (iq <= 90) {
      return 'Low Average';
    }

    if (iq <= 110) {
      return 'Average';
    }

    if (iq <= 119) {
      return 'High Average';
    }

    if (iq <= 127) {
      return 'Superior';
    }

    if (iq <= 139) {
      return 'Very Superior';
    }

    return 'Genius';
  }

  calculate_sw_desc(sw: number) {
    // =IF(V27<=80,"Sangat Rendah",IF(V27<=94,"Rendah",IF(V27<=99,"Sedang",IF(V27<=104,"Cukup",IF(V27<=118,"Tinggi","Sangat Tinggi")))))

    if (sw <= 80) {
      return 'Sangat Rendah';
    }

    if (sw <= 94) {
      return 'Rendah';
    }

    if (sw <= 99) {
      return 'Sedang';
    }

    if (sw <= 104) {
      return 'Cukup';
    }

    if (sw <= 118) {
      return 'Tinggi';
    }

    return 'Sangat Tinggi';
  }

  calculate() {
    const rw_se = this.total_se() as definition_type;
    const rw_wa = this.total_wa() as definition_type;
    const rw_an = this.total_an() as definition_type;
    const rw_ge = this.total_ge() as definition_type;
    const rw_me = this.total_me() as definition_type;
    const rw_ra = this.total_ra() as definition_type;
    const rw_zr = this.total_zr() as definition_type;
    const rw_fa = this.total_fa() as definition_type;
    const rw_wu = this.total_wu() as definition_type;
    const total_rw = (rw_se +
      rw_wa +
      rw_an +
      rw_ge +
      rw_me +
      rw_ra +
      rw_zr +
      rw_fa +
      rw_wu) as rw_gesamt;

    const sw_se = this.calculate_sw(rw_se, 'se');
    const sw_wa = this.calculate_sw(rw_wa, 'wa');
    const sw_an = this.calculate_sw(rw_an, 'an');
    const sw_ge = this.calculate_sw(rw_ge, 'ge');
    const sw_me = this.calculate_sw(rw_me, 'me');
    const sw_ra = this.calculate_sw(rw_ra, 'ra');
    const sw_zr = this.calculate_sw(rw_zr, 'zr');
    const sw_fa = this.calculate_sw(rw_fa, 'fa');
    const sw_wu = this.calculate_sw(rw_wu, 'wu');

    const sw_se_desc = this.calculate_sw_desc(sw_se);
    const sw_wa_desc = this.calculate_sw_desc(sw_wa);
    const sw_an_desc = this.calculate_sw_desc(sw_an);
    const sw_ge_desc = this.calculate_sw_desc(sw_ge);
    const sw_me_desc = this.calculate_sw_desc(sw_me);
    const sw_ra_desc = this.calculate_sw_desc(sw_ra);
    const sw_zr_desc = this.calculate_sw_desc(sw_zr);
    const sw_fa_desc = this.calculate_sw_desc(sw_fa);
    const sw_wu_desc = this.calculate_sw_desc(sw_wu);

    const sw = this.calculate_gesamt(total_rw) as rw_gesamt;

    const iq = gesamt.rw[sw].IQ || 0;
    const desc = this.calculate_desc(iq);

    return {
      description: desc,
      iq,
      sw: {
        an: { label: sw_an_desc, value: sw_an },
        fa: { label: sw_fa_desc, value: sw_fa },
        ge: { label: sw_ge_desc, value: sw_ge },
        me: { label: sw_me_desc, value: sw_me },
        ra: { label: sw_ra_desc, value: sw_ra },
        se: { label: sw_se_desc, value: sw_se },
        wa: { label: sw_wa_desc, value: sw_wa },
        wu: { label: sw_wu_desc, value: sw_wu },
        zr: { label: sw_zr_desc, value: sw_zr },
      },
    };
  }
}
