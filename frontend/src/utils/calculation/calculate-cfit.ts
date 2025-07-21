/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { CfitType } from '../../types/candidate/cfit.ts';
import { cfit_answer, cfit_norm } from '../data/cfit-answer.ts';

export class CalculateCfit {
  cfit: CfitType;

  constructor(data: CfitType) {
    this.cfit = data;
  }

  calculateTes1() {
    let total = 0;
    this.cfit.tes1.map((val) => {
      if (val.no === 1) {
        val.answer === cfit_answer.test1[1] ? total++ : total;
      }
      if (val.no === 2) {
        val.answer === cfit_answer.test1[2] ? total++ : total;
      }
      if (val.no === 3) {
        val.answer === cfit_answer.test1[3] ? total++ : total;
      }
      if (val.no === 4) {
        val.answer === cfit_answer.test1[4] ? total++ : total;
      }
      if (val.no === 5) {
        val.answer === cfit_answer.test1[5] ? total++ : total;
      }
      if (val.no === 6) {
        val.answer === cfit_answer.test1[6] ? total++ : total;
      }
      if (val.no === 7) {
        val.answer === cfit_answer.test1[7] ? total++ : total;
      }
      if (val.no === 8) {
        val.answer === cfit_answer.test1[8] ? total++ : total;
      }
      if (val.no === 9) {
        val.answer === cfit_answer.test1[9] ? total++ : total;
      }
      if (val.no === 10) {
        val.answer === cfit_answer.test1[10] ? total++ : total;
      }
      if (val.no === 11) {
        val.answer === cfit_answer.test1[11] ? total++ : total;
      }
      if (val.no === 12) {
        val.answer === cfit_answer.test1[12] ? total++ : total;
      }
      if (val.no === 13) {
        val.answer === cfit_answer.test1[13] ? total++ : total;
      }
    });

    return total;
  }

  calculateTes2() {
    let total = 0;
    this.cfit.tes2.map((val) => {
      const score =
        (val.answer.p1.isChecked ? val.answer.p1.value : '') +
        (val.answer.p2.isChecked ? val.answer.p2.value : '') +
        (val.answer.p3.isChecked ? val.answer.p3.value : '') +
        (val.answer.p4.isChecked ? val.answer.p4.value : '') +
        (val.answer.p5.isChecked ? val.answer.p5.value : '');

      if (val.no === 1) {
        score === cfit_answer.test2[1] ? total++ : total;
      }
      if (val.no === 2) {
        score === cfit_answer.test2[2] ? total++ : total;
      }
      if (val.no === 3) {
        score === cfit_answer.test2[3] ? total++ : total;
      }
      if (val.no === 4) {
        score === cfit_answer.test2[4] ? total++ : total;
      }
      if (val.no === 5) {
        score === cfit_answer.test2[5] ? total++ : total;
      }
      if (val.no === 6) {
        score === cfit_answer.test2[6] ? total++ : total;
      }
      if (val.no === 7) {
        score === cfit_answer.test2[7] ? total++ : total;
      }
      if (val.no === 8) {
        score === cfit_answer.test2[8] ? total++ : total;
      }
      if (val.no === 9) {
        score === cfit_answer.test2[9] ? total++ : total;
      }
      if (val.no === 10) {
        score === cfit_answer.test2[10] ? total++ : total;
      }
    });

    return total;
  }

  calculateTes3() {
    let total = 0;
    this.cfit.tes3.map((val) => {
      if (val.no === 1) {
        val.answer === cfit_answer.test3[1] ? total++ : total;
      }
      if (val.no === 2) {
        val.answer === cfit_answer.test3[2] ? total++ : total;
      }
      if (val.no === 3) {
        val.answer === cfit_answer.test3[3] ? total++ : total;
      }
      if (val.no === 4) {
        val.answer === cfit_answer.test3[4] ? total++ : total;
      }
      if (val.no === 5) {
        val.answer === cfit_answer.test3[5] ? total++ : total;
      }
      if (val.no === 6) {
        val.answer === cfit_answer.test3[6] ? total++ : total;
      }
      if (val.no === 7) {
        val.answer === cfit_answer.test3[7] ? total++ : total;
      }
      if (val.no === 8) {
        val.answer === cfit_answer.test3[8] ? total++ : total;
      }
      if (val.no === 9) {
        val.answer === cfit_answer.test3[9] ? total++ : total;
      }
      if (val.no === 10) {
        val.answer === cfit_answer.test3[10] ? total++ : total;
      }
      if (val.no === 11) {
        val.answer === cfit_answer.test3[11] ? total++ : total;
      }
      if (val.no === 12) {
        val.answer === cfit_answer.test3[12] ? total++ : total;
      }
      if (val.no === 13) {
        val.answer === cfit_answer.test3[13] ? total++ : total;
      }
    });

    return total;
  }

  calculateTes4() {
    let total = 0;
    this.cfit.tes4.map((val) => {
      if (val.no === 1) {
        val.answer === cfit_answer.test4[1] ? total++ : total;
      }
      if (val.no === 2) {
        val.answer === cfit_answer.test4[2] ? total++ : total;
      }
      if (val.no === 3) {
        val.answer === cfit_answer.test4[3] ? total++ : total;
      }
      if (val.no === 4) {
        val.answer === cfit_answer.test4[4] ? total++ : total;
      }
      if (val.no === 5) {
        val.answer === cfit_answer.test4[5] ? total++ : total;
      }
      if (val.no === 6) {
        val.answer === cfit_answer.test4[6] ? total++ : total;
      }
      if (val.no === 7) {
        val.answer === cfit_answer.test4[7] ? total++ : total;
      }
      if (val.no === 8) {
        val.answer === cfit_answer.test4[8] ? total++ : total;
      }
      if (val.no === 9) {
        val.answer === cfit_answer.test4[9] ? total++ : total;
      }
      if (val.no === 10) {
        val.answer === cfit_answer.test4[10] ? total++ : total;
      }
    });

    return total;
  }

  calculate() {
    const tes1 = this.calculateTes1();
    const tes2 = this.calculateTes2();
    const tes3 = this.calculateTes3();
    const tes4 = this.calculateTes4();

    const total = tes1 + tes2 + tes3 + tes4;

    // console.log(tes1)
    // console.log(tes2)
    // console.log(tes3)
    // console.log(tes4)
    // console.log("FINAL: ", total)
    const result = cfit_norm.find((val) => val.rs === total);
    // console.log("RESULT IQ: ", result)

    // =IF(C70<=69;"Mentally Retardation";IF(C70<=79;"Borderline Defective";IF(C70<=89;"Low Average";IF(C70<=109;"Average";IF(C70<=119;"High Average";IF(C70<=139;"Superior";IF(C70<=169;"Very Superior";"Genius")))))))

    if (!result) {
      throw new Error('Failed to process!');
    }

    const desc =
      result.iq <= 69
        ? 'Mentally Retardation'
        : result.iq <= 79
          ? 'Borderline Defective'
          : result.iq <= 89
            ? 'Low Average'
            : result.iq <= 109
              ? 'Average'
              : result.iq <= 119
                ? 'High Average'
                : result.iq <= 139
                  ? 'Superior'
                  : result.iq <= 169
                    ? 'Very Superior'
                    : 'Genius';

    const res = { ...result, desc };

    // console.log(res)
    return {
      ...res,
      score: {
        subtes1: tes1,
        subtes2: tes2,
        subtes3: tes3,
        subtes4: tes4,
      },
    };
  }
}
