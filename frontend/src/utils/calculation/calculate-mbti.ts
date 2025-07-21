interface Mbti {
  answer: string;
  no: number;
}

export class CalculateMbti {
  mbti: Mbti[];

  constructor(data: Mbti[]) {
    this.mbti = data;
  }

  introvert() {
    const res = this.mbti.reduce((acc, curr) => {
      if (curr.no === 2 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 5 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 7 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 10 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 11 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 15 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 20 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 28 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 29 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 31 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 35 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 38 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 45 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 52 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 60 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const cal = (res / 15).toFixed(2);
    return Number(cal) * 100;
  }

  extrovert() {
    const res = this.mbti.reduce((acc, curr) => {
      if (curr.no === 2 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 5 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 7 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 10 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 11 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 15 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 20 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 28 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 29 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 31 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 35 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 38 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 45 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 52 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 60 && curr.answer === 'A') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const cal = (res / 15).toFixed(2);
    return Number(cal) * 100;
  }

  sensing() {
    const res = this.mbti.reduce((acc, curr) => {
      if (curr.no === 6 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 8 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 13 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 16 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 18 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 22 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 25 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 27 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 34 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 36 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 41 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 43 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 46 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 51 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 53 && curr.answer === 'A') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const cal = (res / 15).toFixed(2);
    return Number(cal) * 100;
  }

  intuition() {
    const res = this.mbti.reduce((acc, curr) => {
      if (curr.no === 6 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 8 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 13 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 16 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 18 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 22 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 25 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 27 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 34 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 36 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 41 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 43 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 46 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 51 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 53 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const cal = (res / 15).toFixed(2);
    return Number(cal) * 100;
  }

  thinking() {
    const res = this.mbti.reduce((acc, curr) => {
      if (curr.no === 4 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 9 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 14 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 17 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 23 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 30 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 32 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 37 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 39 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 42 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 48 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 49 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 55 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 57 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 58 && curr.answer === 'A') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const cal = (res / 15).toFixed(2);
    return Number(cal) * 100;
  }

  feeling() {
    const res = this.mbti.reduce((acc, curr) => {
      if (curr.no === 4 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 9 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 14 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 17 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 23 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 30 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 32 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 37 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 39 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 42 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 48 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 49 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 55 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 57 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 58 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const cal = (res / 15).toFixed(2);
    return Number(cal) * 100;
  }

  judging() {
    const res = this.mbti.reduce((acc, curr) => {
      if (curr.no === 1 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 3 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 12 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 19 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 21 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 24 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 26 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 33 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 40 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 44 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 47 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 50 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 54 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 56 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 59 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const cal = (res / 15).toFixed(2);
    return Number(cal) * 100;
  }

  perceiving() {
    const res = this.mbti.reduce((acc, curr) => {
      if (curr.no === 1 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 3 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 12 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 19 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 21 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 24 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 26 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 33 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 40 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 44 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 47 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 50 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 54 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 56 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 59 && curr.answer === 'A') {
        return acc + 1;
      }

      return acc;
    }, 0);

    // console.log("perceiving: ", res / 15);
    const cal = (res / 15).toFixed(2);
    return Number(cal) * 100;
  }

  Calculate() {
    const introvert = this.introvert();
    const extrovert = this.extrovert();
    const sensing = this.sensing();
    const intuition = this.intuition();
    const thinking = this.thinking();
    const feeling = this.feeling();
    const judging = this.judging();
    const perceiving = this.perceiving();

    let result = '';

    result = introvert > extrovert ? result + 'I' : result + 'E';

    result = sensing > intuition ? result + 'S' : result + 'N';

    result = thinking > feeling ? result + 'T' : result + 'F';

    result = judging > perceiving ? result + 'J' : result + 'P';

    return {
      result,
      score: {
        extrovert,
        feeling,
        introvert,
        intuition,
        judging,
        perceiving,
        sensing,
        thinking,
      },
    };
  }
}
