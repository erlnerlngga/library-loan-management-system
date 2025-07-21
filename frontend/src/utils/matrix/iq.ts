import { CfitScore, IstScore } from '../../types/candidate/tool.ts';

/**
 * SKALA Keterangan	Sangat Kurang	Kurang	Cukup	Baik	Sangat Baik
 * Penilain	              1	           2	  3	      4	          5
 */

export class MatrixIQ {
  constructor() {}

  // =IF(V31<=80,"Sangat Rendah",IF(V31<=94,"Rendah",IF(V31<=99,"Sedang",IF(V31<=104,"Cukup",IF(V31<=118,"Tinggi","Sangat Tinggi")))))
  check_skala_ist(value: number) {
    // 58-86	87-92	93-106	117-112	113-140

    if (value <= 80) {
      return 1;
    }

    if (value >= 81 && value <= 94) {
      return 2;
    }

    if (value >= 95 && value <= 99) {
      return 3;
    }

    if (value >= 100 && value <= 104) {
      return 4;
    }

    if (value >= 105) {
      return 5;
    }

    return 0;
  }

  /**
   *  Kemampuan Berhitung	RA, ZR
   *  Kemampuan Berbahasa	SE, WA, AN, GE
   *  Kemampuan Figural/Spasial	FA, WU
   *  Daya Ingat	ME
   *  Daya Tangkap	WA
   *  Fleksibilitas Berpikir	(GE+RA) – (AN+ZR)
   *  Kemampuan Analisa	AN, WU, FA, GE
   *  Fleksibilitas Berpikir (GE+RA) – (AN+ZR)
   */
  Ist(score: Omit<IstScore, 'istId'>[]) {
    const sw = {
      an: score.find((val) => val.label === 'an')?.score || 0,
      fa: score.find((val) => val.label === 'fa')?.score || 0,
      ge: score.find((val) => val.label === 'ge')?.score || 0,
      me: score.find((val) => val.label === 'me')?.score || 0,
      ra: score.find((val) => val.label === 'ra')?.score || 0,
      se: score.find((val) => val.label === 'se')?.score || 0,
      wa: score.find((val) => val.label === 'wa')?.score || 0,
      wu: score.find((val) => val.label === 'wu')?.score || 0,
      zr: score.find((val) => val.label === 'zr')?.score || 0,
    };

    // < +10	+6 s.d + 10	+5 s.d -5	-6 s.d -10	> -11
    // const fleks = (sw.ge.value + sw.ra.value) - (sw.an.value + sw.zr.value)
    // const total_fleks = fleks

    return {
      an: this.check_skala_ist(sw.an),
      fa: this.check_skala_ist(sw.fa),
      ge: this.check_skala_ist(sw.ge),
      me: this.check_skala_ist(sw.me),
      ra: this.check_skala_ist(sw.ra),
      se: this.check_skala_ist(sw.se),
      wa: this.check_skala_ist(sw.wa),
      wu: this.check_skala_ist(sw.wu),
      zr: this.check_skala_ist(sw.zr),
    };
  }

  normaIst(iq: number) {
    if (iq > 130) {
      return {
        kategori: 'Very Superior',
        skala: 'Sangat Baik',
      };
    }

    if (iq >= 120 && iq <= 129) {
      return {
        kategori: 'Superior',
        skala: 'Sangat Baik',
      };
    }

    if (iq >= 110 && iq <= 119) {
      return {
        kategori: 'Diatas Rata-rata',
        skala: 'Baik',
      };
    }

    if (iq >= 90 && iq <= 109) {
      return {
        kategori: 'Rata-rata',
        skala: 'Cukup',
      };
    }

    if (iq >= 80 && iq <= 89) {
      return {
        kategori: 'Dibawah Rata-rata',
        skala: 'Kurang',
      };
    }

    if (iq >= 71 && iq <= 79) {
      return {
        kategori: 'Borderline',
        skala: 'Sangat Kurang',
      };
    }

    if (iq <= 70) {
      return {
        kategori: 'Mental Defective',
        skala: 'Sangat Kurang',
      };
    }
  }

  /**
   *  Sistematika berpikir	0-3	4-5	6-7	8-9	10-13	Subtes 1
   *  Ketajaman Diferensiasi	0-3	4-5	6-7	8-9	10-14	Subtes 2
   *  Asosiasi	0-3	4-5	6-6	7-9	10-13	Subtes 3
   *  Pemahaman Konsep	0-2	3-3	4-5	6-7	8-10	Subtes 4
   */
  Cfit(score: Omit<CfitScore, 'cfitId'>[]) {
    const data = {
      subtes1: score.find((val) => val.label === 'subtes1')?.totalCorrect || 0,
      subtes2: score.find((val) => val.label === 'subtes2')?.totalCorrect || 0,
      subtes3: score.find((val) => val.label === 'subtes3')?.totalCorrect || 0,
      subtes4: score.find((val) => val.label === 'subtes4')?.totalCorrect || 0,
    };

    return {
      asosiasi:
        data.subtes3 >= 0 && data.subtes3 <= 3
          ? 1
          : data.subtes3 >= 4 && data.subtes3 <= 5
            ? 2
            : data.subtes3 === 6
              ? 3
              : data.subtes3 >= 7 && data.subtes3 <= 9
                ? 4
                : data.subtes3 >= 10 && data.subtes3 <= 13
                  ? 5
                  : 0,
      ketajaman_diferensiasi:
        data.subtes2 >= 0 && data.subtes2 <= 3
          ? 1
          : data.subtes2 >= 4 && data.subtes2 <= 5
            ? 2
            : data.subtes2 >= 6 && data.subtes2 <= 7
              ? 3
              : data.subtes2 >= 8 && data.subtes2 <= 9
                ? 4
                : data.subtes2 >= 10 && data.subtes2 <= 14
                  ? 5
                  : 0,
      pemahaman_konsep:
        data.subtes4 >= 0 && data.subtes4 <= 2
          ? 1
          : data.subtes4 === 3
            ? 2
            : data.subtes4 >= 4 && data.subtes4 <= 5
              ? 3
              : data.subtes4 >= 6 && data.subtes4 <= 7
                ? 4
                : data.subtes4 >= 8 && data.subtes4 <= 10
                  ? 5
                  : 0,
      sistematika_berpikir:
        data.subtes1 >= 0 && data.subtes1 <= 3
          ? 1
          : data.subtes1 >= 4 && data.subtes1 <= 5
            ? 2
            : data.subtes1 >= 6 && data.subtes1 <= 7
              ? 3
              : data.subtes1 >= 8 && data.subtes1 <= 9
                ? 4
                : data.subtes1 >= 10 && data.subtes1 <= 13
                  ? 5
                  : 0,
    };
  }

  // Rentang IQ	Kategori IQ	Skala
  // 120-183	Superior	Sangat Baik
  // 110-119	High Average	Baik
  // 90-109	Average	Cukup
  // 80-89	Low Average	Kurang
  // 38-79	Borderline MR	Sangat Kurang
  normaCfit(iq: number) {
    if (iq >= 120 && iq <= 183) {
      return {
        kategori: 'Superior',
        skala: 'Sangat Baik',
      };
    }

    if (iq >= 110 && iq <= 119) {
      return {
        kategori: 'Diatas Rata-rata',
        skala: 'Baik',
      };
    }

    if (iq >= 90 && iq <= 109) {
      return {
        kategori: 'Rata-rata',
        skala: 'Cukup',
      };
    }

    if (iq >= 80 && iq <= 89) {
      return {
        kategori: 'Dibawah Rata-rata',
        skala: 'Kurang',
      };
    }

    if (iq >= 38 && iq <= 79) {
      return {
        kategori: 'Borderline',
        skala: 'Sangat Kurang',
      };
    }
  }
}
