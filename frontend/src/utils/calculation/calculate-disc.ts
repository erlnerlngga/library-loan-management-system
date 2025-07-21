import {
  DiscDefKeys,
  DiscType,
  scoreType,
  tableType,
} from '../../types/candidate/disc.ts';
import { disc_def } from '../data/disc-def.ts';
import { index_1, index_2, index_3 } from '../data/disc-score.ts';

export class CalculateDISC {
  disc: DiscType[];
  discTable: tableType[];
  discScore: scoreType;

  constructor(data: DiscType[]) {
    this.disc = data;
    this.discTable = [];
    this.discScore = {
      '1': {
        '*': {
          k: 0,
          p: 0,
        },
        C: {
          k: 0,
          p: 0,
        },
        D: {
          k: 0,
          p: 0,
        },
        I: {
          k: 0,
          p: 0,
        },
        S: {
          k: 0,
          p: 0,
        },
      },

      '2': {
        '*': {
          k: 0,
          p: 0,
        },
        C: {
          k: 0,
          p: 0,
        },
        D: {
          k: 0,
          p: 0,
        },
        I: {
          k: 0,
          p: 0,
        },
        S: {
          k: 0,
          p: 0,
        },
      },
      '3': {
        '*': {
          k: 0,
          p: 0,
        },
        C: {
          k: 0,
          p: 0,
        },
        D: {
          k: 0,
          p: 0,
        },
        I: {
          k: 0,
          p: 0,
        },
        S: {
          k: 0,
          p: 0,
        },
      },
    };
  }
  convertToDisc(no: string, col: string, value: number): string {
    //1p =IF(C6=1;"S";(IF(C6=2;"I";(IF(C6=3;"*";(IF(C6=4;"C";"*")))))))
    //1k = =IF(D6=1;"S";(IF(D6=2;"I";(IF(D6=3;"D";(IF(D6=4;"C";"*")))))))
    if (no === '1' && col === 'p') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? 'I'
            : value === 3
              ? '*'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    if (no === '1' && col === 'k') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? 'I'
            : value === 3
              ? 'D'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    // 2p =IF(C7=1;"C";(IF(C7=2;"D";(IF(C7=3;"*";(IF(C7=4;"S";"*")))))))
    // 2k =IF(D7=1;"*";(IF(D7=2;"D";(IF(D7=3;"I";(IF(D7=4;"S";"*")))))))
    if (no === '2' && col === 'p') {
      const data =
        value === 1
          ? 'C'
          : value === 2
            ? 'D'
            : value === 3
              ? '*'
              : value === 4
                ? 'S'
                : '*';
      return data;
    }

    if (no === '2' && col === 'k') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'D'
            : value === 3
              ? 'I'
              : value === 4
                ? 'S'
                : '*';
      return data;
    }

    // 3p =IF(C8=1;"I";(IF(C8=2;"*";(IF(C8=3;"*";(IF(C8=4;"D";"*")))))))
    // 3k =IF(D8=1;"I";(IF(D8=2;"C";(IF(D8=3;"S";(IF(D8=4;"*";"*")))))))
    if (no === '3' && col === 'p') {
      const data =
        value === 1
          ? 'I'
          : value === 2
            ? '*'
            : value === 3
              ? '*'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    if (no === '3' && col === 'k') {
      const data =
        value === 1
          ? 'I'
          : value === 2
            ? 'C'
            : value === 3
              ? 'S'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    // 4p =IF(C9=1;"C";(IF(C9=2;"S";(IF(C9=3;"*";(IF(C9=4;"D";"*")))))))
    // 4k =IF(D9=1;"C";(IF(D9=2;"S";(IF(D9=3;"I";(IF(D9=4;"D";"*")))))))
    if (no === '4' && col === 'p') {
      const data =
        value === 1
          ? 'C'
          : value === 2
            ? 'S'
            : value === 3
              ? '*'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    if (no === '4' && col === 'k') {
      const data =
        value === 1
          ? 'C'
          : value === 2
            ? 'S'
            : value === 3
              ? 'I'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    // 5p =IF(C10=1;"I";(IF(C10=2;"D";(IF(C10=3;"S";(IF(C10=4;"*";"*")))))))
    // 5k =IF(D10=1;"*";(IF(D10=2;"D";(IF(D10=3;"S";(IF(D10=4;"C";"*")))))))
    if (no === '5' && col === 'p') {
      const data =
        value === 1
          ? 'I'
          : value === 2
            ? 'D'
            : value === 3
              ? 'S'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    if (no === '5' && col === 'k') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'D'
            : value === 3
              ? 'S'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    // 6p =IF(C11=1;"C";(IF(C11=2;"D";(IF(C11=3;"I";(IF(C11=4;"S";"*")))))))
    // 6k =IF(D11=1;"*";(IF(D11=2;"D";(IF(D11=3;"I";(IF(D11=4;"S";"*")))))))
    if (no === '6' && col === 'p') {
      const data =
        value === 1
          ? 'C'
          : value === 2
            ? 'D'
            : value === 3
              ? 'I'
              : value === 4
                ? 'S'
                : '*';
      return data;
    }

    if (no === '6' && col === 'k') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'D'
            : value === 3
              ? 'I'
              : value === 4
                ? 'S'
                : '*';
      return data;
    }

    // 7p =IF(C12=1;"S";(IF(C12=2;"I";(IF(C12=3;"*";(IF(C12=4;"*";"*")))))))
    // 7k =IF(D12=1;"*";(IF(D12=2;"I";(IF(D12=3;"C";(IF(D12=4;"D";"*")))))))
    if (no === '7' && col === 'p') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? 'I'
            : value === 3
              ? '*'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    if (no === '7' && col === 'k') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'I'
            : value === 3
              ? 'C'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    // 8p =IF(C13=1;"I";(IF(C13=2;"S";(IF(C13=3;"C";(IF(C13=4;"D";"*")))))))
    // 8k =IF(D13=1;"I";(IF(D13=2;"S";(IF(D13=3;"C";(IF(D13=4;"D";"*")))))))
    if (no === '8' && col === 'p') {
      const data =
        value === 1
          ? 'I'
          : value === 2
            ? 'S'
            : value === 3
              ? 'C'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    if (no === '8' && col === 'k') {
      const data =
        value === 1
          ? 'I'
          : value === 2
            ? 'S'
            : value === 3
              ? 'C'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    // 9p =IF(H6=1;"D";(IF(H6=2;"C";(IF(H6=3;"*";(IF(H6=4;"*";"*")))))))
    // 9k =IF(I6=1;"D";(IF(I6=2;"C";(IF(I6=3;"I";(IF(I6=4;"S";"*")))))))
    if (no === '9' && col === 'p') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? 'C'
            : value === 3
              ? '*'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    if (no === '9' && col === 'k') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? 'C'
            : value === 3
              ? 'I'
              : value === 4
                ? 'S'
                : '*';
      return data;
    }

    // 10p =IF(H7=1;"*";(IF(H7=2;"D";(IF(H7=3;"S";(IF(H7=4;"I";"*")))))))
    // 10k =IF(I7=1;"C";(IF(I7=2;"D";(IF(I7=3;"S";(IF(I7=4;"*";"*")))))))
    if (no === '10' && col === 'p') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'D'
            : value === 3
              ? 'S'
              : value === 4
                ? 'I'
                : '*';
      return data;
    }

    if (no === '10' && col === 'k') {
      const data =
        value === 1
          ? 'C'
          : value === 2
            ? 'D'
            : value === 3
              ? 'S'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    // 11p =IF(H8=1;"S";(IF(H8=2;"*";(IF(H8=3;"D";(IF(H8=4;"C";"*")))))))
    // 11k =IF(I8=1;"*";(IF(I8=2;"I";(IF(I8=3;"D";(IF(I8=4;"C";"*")))))))
    if (no === '11' && col === 'p') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? '*'
            : value === 3
              ? 'D'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    if (no === '11' && col === 'k') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'I'
            : value === 3
              ? 'D'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    // 12p =IF(H9=1;"*";(IF(H9=2;"C";(IF(H9=3;"I";(IF(H9=4;"D";"*")))))))
    // 12k =IF(I9=1;"S";(IF(I9=2;"*";(IF(I9=3;"I";(IF(I9=4;"D";"*")))))))
    if (no === '12' && col === 'p') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'C'
            : value === 3
              ? 'I'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    if (no === '12' && col === 'k') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? '*'
            : value === 3
              ? 'I'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    // 13p =IF(H10=1;"D";(IF(H10=2;"S";(IF(H10=3;"I";(IF(H10=4;"*";"*")))))))
    // 13k =IF(I10=1;"D";(IF(I10=2;"*";(IF(I10=3;"*";(IF(I10=4;"C";"*")))))))
    if (no === '13' && col === 'p') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? 'S'
            : value === 3
              ? 'I'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    if (no === '13' && col === 'k') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? '*'
            : value === 3
              ? '*'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    // 14p =IF(H11=1;"C";(IF(H11=2;"I";(IF(H11=3;"S";(IF(H11=4;"D";"*")))))))
    // 14k =IF(I11=1;"C";(IF(I11=2;"I";(IF(I11=3;"*";(IF(I11=4;"D";"*")))))))
    if (no === '14' && col === 'p') {
      const data =
        value === 1
          ? 'C'
          : value === 2
            ? 'I'
            : value === 3
              ? 'S'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    if (no === '14' && col === 'k') {
      const data =
        value === 1
          ? 'C'
          : value === 2
            ? 'I'
            : value === 3
              ? '*'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    // 15p =IF(H12=1;"S";(IF(H12=2;"C";(IF(H12=3;"I";(IF(H12=4;"D";"*")))))))
    // 15k =IF(I12=1;"S";(IF(I12=2;"*";(IF(I12=3;"I";(IF(I12=4;"D";"*")))))))
    if (no === '15' && col === 'p') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? 'C'
            : value === 3
              ? 'I'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    if (no === '15' && col === 'k') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? '*'
            : value === 3
              ? 'I'
              : value === 4
                ? 'D'
                : '*';
      return data;
    }

    // 16p =IF(H13=1;"*";(IF(H13=2;"C";(IF(H13=3;"I";(IF(H13=4;"S";"*")))))))
    // 16k =IF(I13=1;"D";(IF(I13=2;"*";(IF(I13=3;"I";(IF(I13=4;"S";"*")))))))
    if (no === '16' && col === 'p') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'C'
            : value === 3
              ? 'I'
              : value === 4
                ? 'S'
                : '*';
      return data;
    }

    if (no === '16' && col === 'k') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? '*'
            : value === 3
              ? 'I'
              : value === 4
                ? 'S'
                : '*';
      return data;
    }

    // 17p =IF(M6=1;"*";(IF(M6=2;"D";(IF(M6=3;"S";(IF(M6=4;"I";"*")))))))
    // 17k =IF(N6=1;"C";(IF(N6=2;"D";(IF(N6=3;"S";(IF(N6=4;"*";"*")))))))
    if (no === '17' && col === 'p') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'D'
            : value === 3
              ? 'S'
              : value === 4
                ? 'I'
                : '*';
      return data;
    }

    if (no === '17' && col === 'k') {
      const data =
        value === 1
          ? 'C'
          : value === 2
            ? 'D'
            : value === 3
              ? 'S'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    // 18p =IF(M7=1;"D";(IF(M7=2;"*";(IF(M7=3;"*";(IF(M7=4;"C";"*")))))))
    // 18k =IF(N7=1;"D";(IF(N7=2;"I";(IF(N7=3;"S";(IF(N7=4;"*";"*")))))))
    if (no === '18' && col === 'p') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? '*'
            : value === 3
              ? '*'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    if (no === '18' && col === 'k') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? 'I'
            : value === 3
              ? 'S'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    // 19p =IF(M8=1;"D";(IF(M8=2;"S";(IF(M8=3;"I";(IF(M8=4;"*";"*")))))))
    // 19k =IF(N8=1;"D";(IF(N8=2;"*";(IF(N8=3;"I";(IF(N8=4;"C";"*")))))))
    if (no === '19' && col === 'p') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? 'S'
            : value === 3
              ? 'I'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    if (no === '19' && col === 'k') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? '*'
            : value === 3
              ? 'I'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    // 20p =IF(M9=1;"D";(IF(M9=2;"S";(IF(M9=3;"I";(IF(M9=4;"C";"*")))))))
    // 20k =IF(N9=1;"*";(IF(N9=2;"S";(IF(N9=3;"I";(IF(N9=4;"*";"*")))))))
    if (no === '20' && col === 'p') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? 'S'
            : value === 3
              ? 'I'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    if (no === '20' && col === 'k') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'S'
            : value === 3
              ? 'I'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    // 21p =IF(M10=1;"S";(IF(M10=2;"D";(IF(M10=3;"I";(IF(M10=4;"*";"*")))))))
    // 21k =IF(N10=1;"S";(IF(N10=2;"D";(IF(N10=3;"I";(IF(N10=4;"C";"*")))))))
    if (no === '21' && col === 'p') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? 'D'
            : value === 3
              ? 'I'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    if (no === '21' && col === 'k') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? 'D'
            : value === 3
              ? 'I'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    // 22p =IF(M11=1;"S";(IF(M11=2;"*";(IF(M11=3;"D";(IF(M11=4;"C";"*")))))))
    // 22k =IF(N11=1;"S";(IF(N11=2;"I";(IF(N11=3;"D";(IF(N11=4;"C";"*")))))))
    if (no === '22' && col === 'p') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? '*'
            : value === 3
              ? 'D'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    if (no === '22' && col === 'k') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? 'I'
            : value === 3
              ? 'D'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    // 23p =IF(M12=1;"*";(IF(M12=2;"I";(IF(M12=3;"S";(IF(M12=4;"*";"*")))))))
    // 23k =IF(N12=1;"D";(IF(N12=2;"*";(IF(N12=3;"S";(IF(N12=4;"C";"*")))))))
    if (no === '23' && col === 'p') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'I'
            : value === 3
              ? 'S'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    if (no === '23' && col === 'k') {
      const data =
        value === 1
          ? 'D'
          : value === 2
            ? '*'
            : value === 3
              ? 'S'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    // 24p =IF(M13=1;"*";(IF(M13=2;"I";(IF(M13=3;"D";(IF(M13=4;"C";"*")))))))
    // 24k =IF(N13=1;"S";(IF(N13=2;"I";(IF(N13=3;"*";(IF(N13=4;"*";"*")))))))
    if (no === '24' && col === 'p') {
      const data =
        value === 1
          ? '*'
          : value === 2
            ? 'I'
            : value === 3
              ? 'D'
              : value === 4
                ? 'C'
                : '*';
      return data;
    }

    if (no === '24' && col === 'k') {
      const data =
        value === 1
          ? 'S'
          : value === 2
            ? 'I'
            : value === 3
              ? '*'
              : value === 4
                ? '*'
                : '*';
      return data;
    }

    return '';
  }

  countData(
    data: {
      k: number;
      k_desc: string;
      no: string;
      p: number;
      p_desc: string;
    }[],
    start: number,
    end: number,
    col: string,
    type: string,
  ): number {
    let counter = 0;

    data.slice(start, end).map((val) => {
      if (col === 'p') {
        if (val.p_desc === type) {
          counter++;
        }
      }

      if (col === 'k') {
        if (val.k_desc === type) {
          counter++;
        }
      }
    });

    return counter;
  }

  convertData() {
    const data = this.disc.map((val) => {
      const { answer } = val;

      const p = answer.p1.isChecked
        ? answer.p1.value
        : answer.p2.isChecked
          ? answer.p2.value
          : answer.p3.isChecked
            ? answer.p3.value
            : answer.p4.isChecked
              ? answer.p4.value
              : -1;

      const p_desc = this.convertToDisc(`${val.no}`, 'p', p);

      const k = answer.k1.isChecked
        ? answer.k1.value
        : answer.k2.isChecked
          ? answer.k2.value
          : answer.k3.isChecked
            ? answer.k3.value
            : answer.k4.isChecked
              ? answer.k4.value
              : -1;

      const k_desc = this.convertToDisc(`${val.no}`, 'k', k);

      return { k, k_desc, no: `${val.no}`, p, p_desc };
    });

    const discData = {
      '1': {
        '*': {
          k: this.countData(data, 0, 8, 'k', '*'),
          p: this.countData(data, 0, 8, 'p', '*'),
        },
        C: {
          k: this.countData(data, 0, 8, 'k', 'C'),
          p: this.countData(data, 0, 8, 'p', 'C'),
        },
        D: {
          k: this.countData(data, 0, 8, 'k', 'D'),
          p: this.countData(data, 0, 8, 'p', 'D'),
        },
        I: {
          k: this.countData(data, 0, 8, 'k', 'I'),
          p: this.countData(data, 0, 8, 'p', 'I'),
        },
        S: {
          k: this.countData(data, 0, 8, 'k', 'S'),
          p: this.countData(data, 0, 8, 'p', 'S'),
        },
      },

      '2': {
        '*': {
          k: this.countData(data, 8, 16, 'k', '*'),
          p: this.countData(data, 8, 16, 'p', '*'),
        },
        C: {
          k: this.countData(data, 8, 16, 'k', 'C'),
          p: this.countData(data, 8, 16, 'p', 'C'),
        },
        D: {
          k: this.countData(data, 8, 16, 'k', 'D'),
          p: this.countData(data, 8, 16, 'p', 'D'),
        },
        I: {
          k: this.countData(data, 8, 16, 'k', 'I'),
          p: this.countData(data, 8, 16, 'p', 'I'),
        },
        S: {
          k: this.countData(data, 8, 16, 'k', 'S'),
          p: this.countData(data, 8, 16, 'p', 'S'),
        },
      },
      '3': {
        '*': {
          k: this.countData(data, 16, 24, 'k', '*'),
          p: this.countData(data, 16, 24, 'p', '*'),
        },
        C: {
          k: this.countData(data, 16, 24, 'k', 'C'),
          p: this.countData(data, 16, 24, 'p', 'C'),
        },
        D: {
          k: this.countData(data, 16, 24, 'k', 'D'),
          p: this.countData(data, 16, 24, 'p', 'D'),
        },
        I: {
          k: this.countData(data, 16, 24, 'k', 'I'),
          p: this.countData(data, 16, 24, 'p', 'I'),
        },
        S: {
          k: this.countData(data, 16, 24, 'k', 'S'),
          p: this.countData(data, 16, 24, 'p', 'S'),
        },
      },
    };

    // console.log(discData);
    this.discTable = data;
    this.discScore = discData;
  }

  calculate() {
    const calDisc = {
      '1': {
        '*':
          this.discScore['1']['*'].p +
          this.discScore['2']['*'].p +
          this.discScore['3']['*'].p,
        c:
          this.discScore['1'].C.p +
          this.discScore['2'].C.p +
          this.discScore['3'].C.p,
        d:
          this.discScore['1'].D.p +
          this.discScore['2'].D.p +
          this.discScore['3'].D.p,
        i:
          this.discScore['1'].I.p +
          this.discScore['2'].I.p +
          this.discScore['3'].I.p,
        s:
          this.discScore['1'].S.p +
          this.discScore['2'].S.p +
          this.discScore['3'].S.p,
        total: -1,
      },
      '2': {
        '*':
          this.discScore['1']['*'].k +
          this.discScore['2']['*'].k +
          this.discScore['3']['*'].k,
        c:
          this.discScore['1'].C.k +
          this.discScore['2'].C.k +
          this.discScore['3'].C.k,
        d:
          this.discScore['1'].D.k +
          this.discScore['2'].D.k +
          this.discScore['3'].D.k,
        i:
          this.discScore['1'].I.k +
          this.discScore['2'].I.k +
          this.discScore['3'].I.k,
        s:
          this.discScore['1'].S.k +
          this.discScore['2'].S.k +
          this.discScore['3'].S.k,
        total: -1,
      },
      '3': {
        c: 0,
        d: 0,
        i: 0,
        s: 0,
      },
    };

    calDisc['1'].total =
      calDisc['1'].d +
      calDisc['1'].i +
      calDisc['1'].s +
      calDisc['1'].c +
      calDisc['1']['*'];

    calDisc['2'].total =
      calDisc['2'].d +
      calDisc['2'].i +
      calDisc['2'].s +
      calDisc['2'].c +
      calDisc['2']['*'];

    calDisc['3'] = {
      c: calDisc['1'].c - calDisc['2'].c,
      d: calDisc['1'].d - calDisc['2'].d,
      i: calDisc['1'].i - calDisc['2'].i,
      s: calDisc['1'].s - calDisc['2'].s,
    };

    // console.log(calDisc);

    const discLine = {
      '1': {
        c: index_1.C.find((val) => val.no === calDisc['1'].c)!.value,
        d: index_1.D.find((val) => Number(val.no) === calDisc['1'].d)!.value,
        i: index_1.I.find((val) => val.no === calDisc['1'].i)!.value,
        s: index_1.S.find((val) => val.no === calDisc['1'].s)!.value,
      },
      '2': {
        c: index_2.C.find((val) => val.no === calDisc['2'].c)!.value,
        d: index_2.D.find((val) => val.no === calDisc['2'].d)!.value,
        i: index_2.I.find((val) => val.no === calDisc['2'].i)!.value,
        s: index_2.S.find((val) => val.no === calDisc['2'].s)!.value,
      },
      '3': {
        c: index_3.C.find((val) => val.no === calDisc['3'].c)!.value,
        d: index_3.D.find((val) => val.no === calDisc['3'].d)!.value,
        i: index_3.I.find((val) => val.no === calDisc['3'].i)!.value,
        s: index_3.S.find((val) => val.no === calDisc['3'].s)!.value,
      },
    };

    const finalScore = {
      '1': [
        {
          no: 1,
          type: 'C',
          value:
            discLine['1'].d < 0 &&
            discLine['1'].i < 0 &&
            discLine['1'].s < 0 &&
            discLine['1'].c > 0
              ? 1
              : 0,
        },
        {
          no: 2,
          type: 'D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 3,
          type: 'C-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].d
              ? 1
              : 0,
        },
        {
          no: 4,
          type: 'I-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].i >= discLine['1'].d
              ? 1
              : 0,
        },
        {
          no: 5,
          type: 'I-D-C',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].i >= discLine['1'].d &&
            discLine['1'].d >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 6,
          type: 'I-D-S',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].i >= discLine['1'].d &&
            discLine['1'].d >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 7,
          type: 'I-S-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].i >= discLine['1'].s &&
            discLine['1'].s >= discLine['1'].d
              ? 1
              : 0,
        },
        {
          no: 8,
          type: 'S-D-C',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].s >= discLine['1'].d &&
            discLine['1'].d >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 9,
          type: 'D-I',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].d >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 10,
          type: 'D-I-S',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].d >= discLine['1'].i &&
            discLine['1'].i >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 11,
          type: 'D-S',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].d >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 12,
          type: 'C-I-S',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].i &&
            discLine['1'].i >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 13,
          type: 'C-S-I',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].s &&
            discLine['1'].s >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 14,
          type: 'I-S-C/I-C-S',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].i >= discLine['1'].s &&
            discLine['1'].i >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 15,
          type: 'S',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 16,
          type: 'C-S',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 17,
          type: 'S-C',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].s >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 18,
          type: 'D-C',
          value:
            discLine['1'].i <= 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].d > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].d >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 19,
          type: 'D-I-C',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].d >= discLine['1'].i &&
            discLine['1'].i >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 20,
          type: 'D-S-I',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].d >= discLine['1'].s &&
            discLine['1'].s >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 21,
          type: 'D-S-C',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].d >= discLine['1'].s &&
            discLine['1'].s >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 22,
          type: 'D-C-I',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].d >= discLine['1'].c &&
            discLine['1'].c >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 23,
          type: 'D-C-S',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].d >= discLine['1'].c &&
            discLine['1'].c >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 24,
          type: 'I',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 25,
          type: 'I-S',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].i >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 26,
          type: 'I-C',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].i >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 27,
          type: 'I-C-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].i >= discLine['1'].c &&
            discLine['1'].c >= discLine['1'].d
              ? 1
              : 0,
        },
        {
          no: 28,
          type: 'I-C-S',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].i >= discLine['1'].c &&
            discLine['1'].c >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 29,
          type: 'S-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].s >= discLine['1'].d
              ? 1
              : 0,
        },
        {
          no: 30,
          type: 'S-I',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].s >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 31,
          type: 'S-D-I',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].s >= discLine['1'].d &&
            discLine['1'].d >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 32,
          type: 'S-I-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c <= 0 &&
            discLine['1'].s >= discLine['1'].i &&
            discLine['1'].i >= discLine['1'].d
              ? 1
              : 0,
        },
        {
          no: 33,
          type: 'S-I-C',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].s >= discLine['1'].i &&
            discLine['1'].i >= discLine['1'].c
              ? 1
              : 0,
        },
        {
          no: 34,
          type: 'S-C-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].s >= discLine['1'].c &&
            discLine['1'].c >= discLine['1'].d
              ? 1
              : 0,
        },
        {
          no: 35,
          type: 'S-C-I',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].s >= discLine['1'].c &&
            discLine['1'].c >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 36,
          type: 'C-I',
          value:
            discLine['1'].d <= 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 37,
          type: 'C-D-I',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].d &&
            discLine['1'].d >= discLine['1'].i
              ? 1
              : 0,
        },
        {
          no: 38,
          type: 'C-D-S',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].d &&
            discLine['1'].d >= discLine['1'].s
              ? 1
              : 0,
        },
        {
          no: 39,
          type: 'C-I-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i > 0 &&
            discLine['1'].s <= 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].i &&
            discLine['1'].i >= discLine['1'].d
              ? 1
              : 0,
        },
        {
          no: 40,
          type: 'C-S-D',
          value:
            discLine['1'].d > 0 &&
            discLine['1'].i <= 0 &&
            discLine['1'].s > 0 &&
            discLine['1'].c > 0 &&
            discLine['1'].c >= discLine['1'].s &&
            discLine['1'].s >= discLine['1'].d
              ? 1
              : 0,
        },
      ],
      '2': [
        {
          no: 1,
          type: 'C',
          value:
            discLine['2'].d < 0 &&
            discLine['2'].i < 0 &&
            discLine['2'].s < 0 &&
            discLine['2'].c > 0
              ? 1
              : 0,
        },
        {
          no: 2,
          type: 'D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 3,
          type: 'C-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].d
              ? 1
              : 0,
        },
        {
          no: 4,
          type: 'I-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].i >= discLine['2'].d
              ? 1
              : 0,
        },
        {
          no: 5,
          type: 'I-D-C',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].i >= discLine['2'].d &&
            discLine['2'].d >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 6,
          type: 'I-D-S',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].i >= discLine['2'].d &&
            discLine['2'].d >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 7,
          type: 'I-S-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].i >= discLine['2'].s &&
            discLine['2'].s >= discLine['2'].d
              ? 1
              : 0,
        },
        {
          no: 8,
          type: 'S-D-C',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].s >= discLine['2'].d &&
            discLine['2'].d >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 9,
          type: 'D-I',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].d >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 10,
          type: 'D-I-S',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].d >= discLine['2'].i &&
            discLine['2'].i >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 11,
          type: 'D-S',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].d >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 12,
          type: 'C-I-S',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].i &&
            discLine['2'].i >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 13,
          type: 'C-S-I',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].s &&
            discLine['2'].s >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 14,
          type: 'I-S-C/I-C-S',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].i >= discLine['2'].s &&
            discLine['2'].i >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 15,
          type: 'S',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 16,
          type: 'C-S',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 17,
          type: 'S-C',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].s >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 18,
          type: 'D-C',
          value:
            discLine['2'].i <= 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].d > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].d >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 19,
          type: 'D-I-C',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].d >= discLine['2'].i &&
            discLine['2'].i >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 20,
          type: 'D-S-I',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].d >= discLine['2'].s &&
            discLine['2'].s >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 21,
          type: 'D-S-C',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].d >= discLine['2'].s &&
            discLine['2'].s >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 22,
          type: 'D-C-I',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].d >= discLine['2'].c &&
            discLine['2'].c >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 23,
          type: 'D-C-S',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].d >= discLine['2'].c &&
            discLine['2'].c >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 24,
          type: 'I',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 25,
          type: 'I-S',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].i >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 26,
          type: 'I-C',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].i >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 27,
          type: 'I-C-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].i >= discLine['2'].c &&
            discLine['2'].c >= discLine['2'].d
              ? 1
              : 0,
        },
        {
          no: 28,
          type: 'I-C-S',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].i >= discLine['2'].c &&
            discLine['2'].c >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 29,
          type: 'S-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].s >= discLine['2'].d
              ? 1
              : 0,
        },
        {
          no: 30,
          type: 'S-I',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].s >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 31,
          type: 'S-D-I',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].s >= discLine['2'].d &&
            discLine['2'].d >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 32,
          type: 'S-I-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c <= 0 &&
            discLine['2'].s >= discLine['2'].i &&
            discLine['2'].i >= discLine['2'].d
              ? 1
              : 0,
        },
        {
          no: 33,
          type: 'S-I-C',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].s >= discLine['2'].i &&
            discLine['2'].i >= discLine['2'].c
              ? 1
              : 0,
        },
        {
          no: 34,
          type: 'S-C-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].s >= discLine['2'].c &&
            discLine['2'].c >= discLine['2'].d
              ? 1
              : 0,
        },
        {
          no: 35,
          type: 'S-C-I',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].s >= discLine['2'].c &&
            discLine['2'].c >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 36,
          type: 'C-I',
          value:
            discLine['2'].d <= 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 37,
          type: 'C-D-I',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].d &&
            discLine['2'].d >= discLine['2'].i
              ? 1
              : 0,
        },
        {
          no: 38,
          type: 'C-D-S',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].d &&
            discLine['2'].d >= discLine['2'].s
              ? 1
              : 0,
        },
        {
          no: 39,
          type: 'C-I-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i > 0 &&
            discLine['2'].s <= 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].i &&
            discLine['2'].i >= discLine['2'].d
              ? 1
              : 0,
        },
        {
          no: 40,
          type: 'C-S-D',
          value:
            discLine['2'].d > 0 &&
            discLine['2'].i <= 0 &&
            discLine['2'].s > 0 &&
            discLine['2'].c > 0 &&
            discLine['2'].c >= discLine['2'].s &&
            discLine['2'].s >= discLine['2'].d
              ? 1
              : 0,
        },
      ],
      '3': [
        {
          no: 1,
          type: 'C',
          value:
            discLine['3'].d < 0 &&
            discLine['3'].i < 0 &&
            discLine['3'].s < 0 &&
            discLine['3'].c > 0
              ? 1
              : 0,
        },
        {
          no: 2,
          type: 'D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 3,
          type: 'C-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].d
              ? 1
              : 0,
        },
        {
          no: 4,
          type: 'I-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].i >= discLine['3'].d
              ? 1
              : 0,
        },
        {
          no: 5,
          type: 'I-D-C',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].i >= discLine['3'].d &&
            discLine['3'].d >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 6,
          type: 'I-D-S',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].i >= discLine['3'].d &&
            discLine['3'].d >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 7,
          type: 'I-S-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].i >= discLine['3'].s &&
            discLine['3'].s >= discLine['3'].d
              ? 1
              : 0,
        },
        {
          no: 8,
          type: 'S-D-C',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].s >= discLine['3'].d &&
            discLine['3'].d >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 9,
          type: 'D-I',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].d >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 10,
          type: 'D-I-S',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].d >= discLine['3'].i &&
            discLine['3'].i >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 11,
          type: 'D-S',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].d >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 12,
          type: 'C-I-S',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].i &&
            discLine['3'].i >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 13,
          type: 'C-S-I',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].s &&
            discLine['3'].s >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 14,
          type: 'I-S-C/I-C-S',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].i >= discLine['3'].s &&
            discLine['3'].i >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 15,
          type: 'S',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 16,
          type: 'C-S',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 17,
          type: 'S-C',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].s >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 18,
          type: 'D-C',
          value:
            discLine['3'].i <= 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].d > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].d >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 19,
          type: 'D-I-C',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].d >= discLine['3'].i &&
            discLine['3'].i >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 20,
          type: 'D-S-I',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].d >= discLine['3'].s &&
            discLine['3'].s >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 21,
          type: 'D-S-C',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].d >= discLine['3'].s &&
            discLine['3'].s >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 22,
          type: 'D-C-I',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].d >= discLine['3'].c &&
            discLine['3'].c >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 23,
          type: 'D-C-S',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].d >= discLine['3'].c &&
            discLine['3'].c >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 24,
          type: 'I',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c <= 0
              ? 1
              : 0,
        },
        {
          no: 25,
          type: 'I-S',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].i >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 26,
          type: 'I-C',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].i >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 27,
          type: 'I-C-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].i >= discLine['3'].c &&
            discLine['3'].c >= discLine['3'].d
              ? 1
              : 0,
        },
        {
          no: 28,
          type: 'I-C-S',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].i >= discLine['3'].c &&
            discLine['3'].c >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 29,
          type: 'S-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].s >= discLine['3'].d
              ? 1
              : 0,
        },
        {
          no: 30,
          type: 'S-I',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].s >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 31,
          type: 'S-D-I',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].s >= discLine['3'].d &&
            discLine['3'].d >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 32,
          type: 'S-I-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c <= 0 &&
            discLine['3'].s >= discLine['3'].i &&
            discLine['3'].i >= discLine['3'].d
              ? 1
              : 0,
        },
        {
          no: 33,
          type: 'S-I-C',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].s >= discLine['3'].i &&
            discLine['3'].i >= discLine['3'].c
              ? 1
              : 0,
        },
        {
          no: 34,
          type: 'S-C-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].s >= discLine['3'].c &&
            discLine['3'].c >= discLine['3'].d
              ? 1
              : 0,
        },
        {
          no: 35,
          type: 'S-C-I',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].s >= discLine['3'].c &&
            discLine['3'].c >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 36,
          type: 'C-I',
          value:
            discLine['3'].d <= 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 37,
          type: 'C-D-I',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].d &&
            discLine['3'].d >= discLine['3'].i
              ? 1
              : 0,
        },
        {
          no: 38,
          type: 'C-D-S',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].d &&
            discLine['3'].d >= discLine['3'].s
              ? 1
              : 0,
        },
        {
          no: 39,
          type: 'C-I-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i > 0 &&
            discLine['3'].s <= 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].i &&
            discLine['3'].i >= discLine['3'].d
              ? 1
              : 0,
        },
        {
          no: 40,
          type: 'C-S-D',
          value:
            discLine['3'].d > 0 &&
            discLine['3'].i <= 0 &&
            discLine['3'].s > 0 &&
            discLine['3'].c > 0 &&
            discLine['3'].c >= discLine['3'].s &&
            discLine['3'].s >= discLine['3'].d
              ? 1
              : 0,
        },
      ],
    };

    type valueType = {
      behavior: string;
      desc: string;
      jobs: string;
      name: string;
      type: string;
    };

    const final = {
      '1': {
        line: discLine['1'],
        name: 'Kepribadian yang biasa ditunjukan',
        value: disc_def[
          finalScore['1']
            .find((val) => val.value === 1)
            ?.no.toString() as DiscDefKeys
        ] as valueType,
      },
      '2': {
        line: discLine['2'],
        name: 'Kepribadian ketika dibawah tekanan',
        value: disc_def[
          finalScore['2']
            .find((val) => val.value === 1)
            ?.no.toString() as DiscDefKeys
        ] as valueType,
      },
      '3': {
        line: discLine['3'],
        name: 'Kepribadian asli yang tersembunyi',
        value: disc_def[
          finalScore['3']
            .find((val) => val.value === 1)
            ?.no.toString() as DiscDefKeys
        ] as valueType,
      },
    };

    // console.log("final: ", final);

    return final;
  }
}
