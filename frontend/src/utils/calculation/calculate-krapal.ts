type krapalCleanType = {
  result: {
    answer: {
      right_answer: number;
      total: number;
      wrong_answer: number;
    };
    no_col: number;
    time: number;
  }[];
};

type krapalType = {
  result: {
    answer: {
      answer: number;
      no: number;
    }[];
    no_col: number;
    time: number;
  }[];
};

export class CalculateKrapal {
  krapal: krapalType;
  krapalClean: krapalCleanType | undefined;
  b: number = 0;
  x: number = 0;
  y: number = 0;
  a: number = 0;

  constructor(krapal: krapalType) {
    this.krapal = krapal;
  }

  remove_duplicate(
    arr: { answer: number; no: number }[],
  ): { answer: number; no: number }[] {
    const uniqueArr = arr.filter(
      (obj, index, self) => index === self.findIndex((t) => t.no === obj.no),
    );

    return uniqueArr;
  }

  clean_data() {
    const data = this.krapal.result.map((val) => {
      return {
        ...val,
        answer: this.remove_duplicate(val.answer),
      };
    });

    this.krapal.result = data;

    // calculate total true and false for every columns
    const result = this.krapal.result.map((val) => {
      const right_answer = val.answer.reduce((acc, val) => acc + val.answer, 0);
      const wrong_answer = 27 - right_answer;

      return {
        ...val,
        answer: {
          right_answer,
          total: 27,
          wrong_answer,
        },
      };
    });

    this.krapalClean = { result };

    const N = 50;
    const sum_x = 1275;
    const sum_y = this.krapalClean.result.reduce(
      (acc, val) => acc + val.answer.right_answer,
      0,
    );
    const sum_xy = this.krapalClean.result.reduce(
      (acc, val) => acc + val.no_col * val.answer.right_answer,
      0,
    );
    const sum_x2 = this.krapalClean.result.reduce(
      (acc, val) => acc + val.no_col * val.no_col,
      0,
    );
    const sum_x_times_sum_y = sum_x * sum_y;
    const sum_x_2 = sum_x * sum_x;
    this.b = (N * sum_xy - sum_x_times_sum_y) / (N * sum_x2 - sum_x_2);
    this.x = sum_x / N;
    this.y = sum_y / N;
    this.a = this.y - this.b * this.x;
  }

  regresion_table() {
    if (!this.krapalClean) {
      this.clean_data();
    }

    const data = this.krapalClean?.result.map((val) => {
      return {
        no: val.no_col,
        x2: val.no_col * val.no_col,
        xy: val.no_col * val.answer.right_answer,
        yregresi: this.a * this.b - val.no_col,
      };
    });

    return data;
  }

  frequency_table() {
    if (!this.krapalClean) {
      this.clean_data();
    }

    const data = Array.from({ length: 27 }).map((_, index) => {
      const f = this.krapalClean!.result.reduce((acc, val) => {
        if (val.answer.right_answer === 1) {
          return acc + 1;
        }

        return acc;
      }, 0);

      return {
        Fy: f * (index + 1),
        f,
        no: index + 1,
      };
    });

    return data;
  }

  deviation_table() {
    const data = this.frequency_table();
    const panker = this.panker();

    const result = data.map((val) => {
      const dev = val.f === 0 ? 0 : val.no - panker;
      const d = val.f === 0 ? 0 : panker > val.f ? -dev : dev;
      const Fd = val.f === 0 ? 0 : val.f * d;

      return {
        Fd,
        d,
        dev,
      };
    });

    return result;
  }

  panker() {
    const data = this.frequency_table();

    const result = data.reduce((acc, val) => acc + val.Fy, 0);

    return result / 50;
  }

  janker() {
    const data = this.deviation_table();

    const result = data.reduce((acc, val) => acc + val.Fd, 0);

    return result / 50;
  }

  hanker() {
    const y_50 =
      this.regresion_table()?.find((val) => val.no === 50)?.yregresi || 0;

    const result = this.a - y_50;

    return result;
  }

  tinker() {
    const data = this.krapalClean?.result.reduce(
      (acc, val) => acc + val.answer.wrong_answer,
      0,
    );

    return data || 0;
  }

  kualitas_kerja() {
    if (!this.krapalClean) {
      this.clean_data();
    }

    const data = this.krapalClean?.result.map((val) => {
      return {
        no: val.no_col,
        value: 1 - val.answer.wrong_answer / val.answer.total,
      };
    });

    const mean = data!.reduce((acc, val) => acc + val.value, 0) / 50;

    return { data, mean };
  }

  konsentrasi_kerja() {
    if (!this.krapalClean) {
      this.clean_data();
    }

    const data = this.krapalClean?.result.map((val) => {
      return {
        no: val.no_col,
        value: val.answer.right_answer / val.answer.total,
      };
    });

    const mean = data!.reduce((acc, val) => acc + val.value, 0) / 50;

    return { data, mean };
  }

  motivasi_kerja() {}

  kesiagaan_kerja() {}

  titik_puncak() {
    // find the highest total
    let highest = 0;
    this.krapal.result.forEach((val) => {
      if (val.answer.length > highest) {
        highest = val.answer.length;
      }
    });

    return highest;
  }

  titik_terendah() {
    let lowest = 0;
    this.krapal.result.forEach((val) => {
      if (val.answer.length < lowest) {
        lowest = val.answer.length;
      }
    });

    return lowest;
  }

  garis_timbang() {
    const titik_puncak = this.titik_puncak();
    const titik_terendah = this.titik_terendah();

    return (titik_puncak + titik_terendah) / 2;
  }

  total_hitungan() {
    const total = this.krapal.result.reduce(
      (acc, val) => acc + val.answer.length,
      0,
    );

    return total;
  }

  jumlah_jawaban_benar() {
    if (!this.krapalClean) {
      this.clean_data();
    }

    const total = this.krapalClean?.result.reduce(
      (acc, val) => acc + val.answer.right_answer,
      0,
    );

    return total;
  }

  jumlah_jawaban_salah() {
    if (!this.krapalClean) {
      this.clean_data();
    }

    const total = this.krapalClean?.result.reduce(
      (acc, val) => acc + val.answer.wrong_answer,
      0,
    );

    return total;
  }

  calculate() {
    this.clean_data();

    /**
     * To Calculate:
     * 1. Panker (Kecepatan Kerja)
     * 2. Janker (Keajegan Kerja)
     * 3. Hanker (Ketahanan Kerja)
     * 4. Tinker (Ketelitian Kerja)
     * 5. Kualitas Kerja
     * 6. Konsentrasi Kerja
     * 7. Motivasi Kerja
     * 8. Kesiagaan Kerja
     * 9. Titik Puncak (Tertinggi) => Total jawaban terbanyak dalam satu kolom
     * 10. Titik Terendah => Total jawaban yang tidak dijawab dalam satu kolom
     * 11. Garis Timbang
     * 12. Total Hitungan
     * 13. Jumlah Jawaban Benar
     * 14. Persentase Jawaban Benar
     * 15. Jumlah Jawaban Salah
     * 16. Persentase Jawaban Salah
     * **/

    const panker = this.panker();
    const janker = this.janker();
    const hanker = this.hanker();
    const tinker = this.tinker();
    const kualitasKerja = this.kualitas_kerja();
    const konsentrasiKerja = this.konsentrasi_kerja();
    const titikPuncak = this.titik_puncak();
    const titikTerendah = this.titik_terendah();
    const garisTimbang = this.garis_timbang();
    const totalHitungan = this.total_hitungan();
    const jumlahJawabanBenar = this.jumlah_jawaban_benar();
    const jumlahJawabanSalah = this.jumlah_jawaban_salah();

    return {
      garisTimbang,
      hanker,
      janker,
      jumlahJawabanBenar,
      jumlahJawabanSalah,
      konsentrasiKerja,
      krapal: this.krapalClean,
      kualitasKerja,
      panker,
      tinker,
      titikPuncak,
      titikTerendah,
      totalHitungan,
    };
  }
}
