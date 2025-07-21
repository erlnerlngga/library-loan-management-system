interface Papi {
  answer: string;
  no: number;
}

export class CalculatePapi {
  papi: Papi[];

  constructor(data: Papi[]) {
    this.papi = data;
  }

  N() {
    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 2 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 12 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 24 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 35 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 46 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 57 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 68 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 79 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 90 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 3) {
      return {
        msg: 'Cenderung ragu-ragu dalam situasi pengambilan keputusan, cenderung ragu-ragu, menunda atau menghindari situasi pengambilan keputusan',
        score: res,
        type: 'Arah Kerja',
      };
    }

    if (res <= 4) {
      return {
        msg: 'Berhati-hati dan cenderung ragu-ragu',
        score: res,
        type: 'Arah Kerja',
      };
    }

    if (res <= 6) {
      return {
        msg: 'Cukup bertanggung jawab terhadap pekerjaan',
        score: res,
        type: 'Arah Kerja',
      };
    }

    return {
      msg: 'Ketekunan, tanggung jawab terhadap tugas tinggi',
      score: res,
      type: 'Arah Kerja',
    };
  }

  G() {
    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 1 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 11 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 21 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 31 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 41 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 51 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 61 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 71 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 81 && curr.answer === 'A') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 4) {
      return {
        msg: 'Bekerja hanya untuk mengejar kesenangan saja bukan untuk memberikan suatu hasil yang baik',
        score: res,
        type: 'Arah Kerja',
      };
    }

    return {
      msg: 'Kemauan bekerja keras tinggi',
      score: res,
      type: 'Arah Kerja',
    };
  }

  A() {
    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 2 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 3 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 14 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 25 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 36 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 47 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 58 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 69 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 80 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 5) {
      return {
        msg: 'Mencerminkan ketidakpastian tujuan. Juga mencerminkan kepuasan dalam suatu pekerjaan, tidak perlu melanjutkan usaha untuk sukses',
        score: res,
        type: 'Arah Kerja',
      };
    }

    return {
      msg: 'Tujuan-tujuan didefinisikan secara jelas, kebutuhan untuk sukses tinggi, ambisi pribadi tinggi',
      score: res,
      type: 'Arah Kerja',
    };
  }

  L() {
    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 12 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 22 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 32 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 42 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 52 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 62 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 72 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 82 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 81 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 4) {
      return {
        msg: 'Cenderung tidak suka aktif menggunakan orang lain dalam bekerja',
        score: res,
        type: 'Arah Kepemimpinan',
      };
    }

    return {
      msg: 'Yaitu tingkat dimana seseorang memproyeksikan dirinya sebagai pemimpin suatu tingkat, dimana ia mencoba menggunakan orang lain untuk mencapai tujuannya. Nilai S menunjukkan apakah pola kepemimpinannya bersifat persuasive, demokratis, atau otoriter',
      score: res,
      type: 'Arah Kepemimpinan',
    };
  }

  P() {
    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 12 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 22 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 32 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 42 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 52 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 62 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 72 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 82 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 81 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 4) {
      return {
        msg: 'Menurunnya keinginan untuk bertanggung jawab terhadap pekerjaan dan tindakan orang lain',
        score: res,
        type: 'Arah Kepemimpinan',
      };
    }

    return {
      msg: 'Tingkat kebutuhan untuk menerima tanggung jawab orang lain, menjadi orang yang bertanggung jawab',
      score: res,
      type: 'Arah Kepemimpinan',
    };
  }

  I() {
    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 23 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 33 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 43 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 53 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 63 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 73 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 83 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 82 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 71 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 3) {
      return {
        msg: 'Ragu-ragu sampai penundaan/menolak situasi pengambilan keputusan',
        score: res,
        type: 'Arah Kepemimpinan',
      };
    }

    if (res <= 4) {
      return {
        msg: 'Berhati-hati sampai ragu-ragu dalam membuat keputusan',
        score: res,
        type: 'Arah Kepemimpinan',
      };
    }

    if (res <= 7) {
      return {
        msg: 'Mudah dan lancar sampai berhati-hati dalam membuat keputusan',
        score: res,
        type: 'Arah Kepemimpinan',
      };
    }

    return {
      msg: 'Tidak ragu-ragu dalam proses pengambilan keputusan',
      score: res,
      type: 'Arah Kepemimpinan',
    };
  }

  T() {
    // 34A + 44A + 54A + 64A + 74A + 84A + 83B + 72B + 61B
    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 34 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 44 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 54 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 64 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 74 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 84 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 83 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 72 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 61 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 3) {
      return {
        msg: 'Melakukan segala sesuatu menurut kemauannya sendiri',
        score: res,
        type: 'Aktivitas',
      };
    }

    return {
      msg: 'Tergolong aktif secara internal dan mental',
      score: res,
      type: 'Aktivitas',
    };
  }

  V() {
    // V = 45A + 55A + 65A + 75A + 85A + 84B + 73B + 62B + 51B
    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 45 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 55 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 65 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 75 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 85 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 84 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 73 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 62 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 51 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 4) {
      return {
        msg: 'Keaktifannya tergolong rendah, cenderung pasif (hanya duduk-duduk saja)',
        score: res,
        type: 'Aktivitas',
      };
    }

    return {
      msg: 'Keaktifannya secara fisik tergolong agak baik, cenderung tipe sportif',
      score: res,
      type: 'Aktivitas',
    };
  }

  X() {
    // X = 24A + 14A + 4A + 5B + 16B + 27B + 38B + 49B + 60B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 24 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 14 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 4 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 5 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 16 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 27 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 38 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 49 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 60 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 1) {
      return {
        msg: 'Cenderung pemalu, suka menyendiri',
        score: res,
        type: 'Pergaulan',
      };
    }
    if (res <= 3) {
      return {
        msg: 'Rendah hati, tulus',
        score: res,
        type: 'Pergaulan',
      };
    }
    if (res <= 5) {
      return {
        msg: 'Khusus, memiliki pola yang nyata',
        score: res,
        type: 'Pergaulan',
      };
    }

    return {
      msg: 'Membutuhkan perhatian yang nyata',
      score: res,
      type: 'Pergaulan',
    };
  }

  S() {
    // S = 56A + 66A + 76A + 86A + 85B + 74B + 63B + 52B + 41B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 56 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 66 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 76 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 86 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 85 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 74 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 63 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 52 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 41 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 5) {
      return {
        msg: 'Memiliki penilaian yang rendah terhadap hubungan sosial, cenderung kurang percaya pada orang lain',
        score: res,
        type: 'Pergaulan',
      };
    }

    return {
      msg: 'Tingkat kepercayaan dalam hubungan sosial tinggi, menyukai interaksi sosial',
      score: res,
      type: 'Pergaulan',
    };
  }

  B() {
    // B = 35A + 25A + 15A + 5A + 6B + 17B + 28B + 39B + 50B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 35 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 25 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 15 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 5 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 6 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 17 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 28 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 39 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 50 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 3) {
      return {
        msg: 'Selektif, secara umum melepaskan diri dari kelompok',
        score: res,
        type: 'Pergaulan',
      };
    }
    if (res <= 5) {
      return {
        msg: 'Ada kebutuhan untuk diterima dan diakui tetapi tidak terlalu mudah dipengaruhi oleh kelompok',
        score: res,
        type: 'Pergaulan',
      };
    }

    return {
      msg: 'Kebutuhan untuk disukai, diakui oleh semua orang. Mudah dipengaruhi kelompok',
      score: res,
      type: 'Pergaulan',
    };
  }

  O() {
    // O = 46A + 36A + 26A + 16A + 6A + 7B + 18B + 29B + 40B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 46 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 36 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 26 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 16 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 6 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 7 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 18 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 29 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 40 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 2) {
      return {
        msg: 'Tidak menyukai hubungan antar pribadi. Tidak menyukai interaksi perseorangan',
        score: res,
        type: 'Pergaulan',
      };
    }
    if (res <= 4) {
      return {
        msg: 'Sadar akan kebutuhan antar pribadi tetapi dapat melepaskan diri dari orang lain/tidak terlalu tergantung',
        score: res,
        type: 'Pergaulan',
      };
    }

    return {
      msg: 'Ketergantungan yang sangat besar akan pengakuan dan penerimaan diri',
      score: res,
      type: 'Pergaulan',
    };
  }

  R() {
    // R = 67A + 77A + 87A + 86B + 75B + 64B + 53B + 42B + 31B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 67 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 77 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 87 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 86 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 75 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 64 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 53 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 42 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 31 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 4) {
      return {
        msg: 'Kurang perhatian-praktis',
        score: res,
        type: 'Gaya Kerja',
      };
    }

    return {
      msg: 'Penekanan pada nialai-nilai penalaran tergolong tinggi',
      score: res,
      type: 'Gaya Kerja',
    };
  }

  D() {
    // D = 78A + 88A + 87B + 76B + 65B + 54B + 43B + 32B + 21B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 78 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 88 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 87 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 76 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 65 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 54 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 43 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 32 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 21 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 3) {
      return {
        msg: 'Menyadari kebutuhan akan kecermatan tetapi secara pribadi tidak berminat menangani hal-hal detail',
        score: res,
        type: 'Gaya Kerja',
      };
    }

    return {
      msg: 'Minat menangani hal-hal detail tergolong tinggi',
      score: res,
      type: 'Gaya Kerja',
    };
  }

  C() {
    // C = 89A + 88B + 77B + 66B + 55B + 44B + 33B + 22B + 11B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 89 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 88 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 77 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 66 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 55 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 44 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 33 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 22 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 11 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 2) {
      return {
        msg: 'Fleksibilitas sampai ketidak-teraturan',
        score: res,
        type: 'Gaya Kerja',
      };
    }

    if (res <= 5) {
      return {
        msg: 'Tergolong teratur tetapi dengan fleksibilitas',
        score: res,
        type: 'Gaya Kerja',
      };
    }

    return {
      msg: 'Memiliki keteraturan yang sangat tinggi, cenderung kaku',
      score: res,
      type: 'Gaya Kerja',
    };
  }

  Z() {
    // Z = 57A + 47A + 37A + 27A + 17A + 7A + 8B + 19B + 30B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 57 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 47 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 37 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 27 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 17 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 7 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 8 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 19 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 30 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 2) {
      return {
        msg: 'Tidak menyukai dan menolak perubahan. Cenderung menggunakan pendekatan-pendekatan tradisional',
        score: res,
        type: 'Sifat',
      };
    }

    if (res <= 4) {
      return {
        msg: 'Tidak suka akan perubahan jika dipaksakan kepadanya',
        score: res,
        type: 'Sifat',
      };
    }

    if (res <= 6) {
      return {
        msg: 'Mudah menyesuaikan diri',
        score: res,
        type: 'Sifat',
      };
    }
    if (res <= 7) {
      return {
        msg: 'Pembuat perubahan yang selektif. Berpikir jauh ke depan',
        score: res,
        type: 'Sifat',
      };
    }

    return {
      msg: 'Mudah gelisah, mudah frustrasi mungkin karena segala sesuatu bergerak tidak cukup cepat',
      score: res,
      type: 'Sifat',
    };
  }

  E() {
    // E = 89B + 78B + 67B + 56B + 45B + 34B + 23B +  12B + 1B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 89 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 78 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 67 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 56 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 45 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 34 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 23 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 12 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 1 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 1) {
      return {
        msg: 'Terbuka, cepat bereaksi, tidak memikirkan nilai dalam pengendalian diri',
        score: res,
        type: 'Sifat',
      };
    }

    if (res <= 3) {
      return {
        msg: 'Terbuka',
        score: res,
        type: 'Sifat',
      };
    }
    if (res <= 6) {
      return {
        msg: 'Memiliki pendekatan emosional yang seimbang. Mampu mengendalikan perasaannya',
        score: res,
        type: 'Sifat',
      };
    }

    return {
      msg: 'Sangat menepatkan nilai-nilai dalam setiap aktivitasnya. Kebutuhan pengendalian diri yang berlebih-lebihan, mungkin digunakan sebagai defence mechanisme',
      score: res,
      type: 'Sifat',
    };
  }

  K() {
    // K = 68A + 58A + 48A + 38A + 28A + 18A + 8A + 9B + 20B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 68 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 58 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 48 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 38 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 28 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 18 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 8 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 9 && curr.answer === 'B') {
        return acc + 1;
      }
      if (curr.no === 20 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 2) {
      return {
        msg: 'Selalu menghindari masalah. Cenderung mengabaikan situasi atau cenderung menolak untuk mengenali sesuatu sebagai sebuah masalah',
        score: res,
        type: 'Sifat',
      };
    }

    if (res <= 4) {
      return {
        msg: 'Lebih menyukai lingkungan yang tenang. Menghindari konflik. Cenderung menunda masalah',
        score: res,
        type: 'Sifat',
      };
    }
    if (res <= 5) {
      return {
        msg: 'Kukuh pendirian, cenderung keras kepala',
        score: res,
        type: 'Sifat',
      };
    }
    if (res <= 7) {
      return {
        msg: 'Agresi pribadi yang berkaitan dengan pekerjaan, dorongan dan semangat bersaing',
        score: res,
        type: 'Sifat',
      };
    }

    return {
      msg: 'Agresif, cenderung defensive',
      score: res,
      type: 'Sifat',
    };
  }

  F() {
    // F = 79A + 69A + 59A + 49A + 39A + 29A + 19A + 9A + 10B

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 79 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 69 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 59 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 49 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 39 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 29 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 19 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 9 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 10 && curr.answer === 'B') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 1) {
      return {
        msg: 'Cenderung egois, kemungkinan bisa bersikap memberontak',
        score: res,
        type: 'Ketaatan',
      };
    }
    if (res <= 3) {
      return {
        msg: 'Mengurus kepentingan diri sendiri',
        score: res,
        type: 'Ketaatan',
      };
    }
    if (res <= 5) {
      return {
        msg: 'Setia terhadap perusahaan',
        score: res,
        type: 'Ketaatan',
      };
    }

    return {
      msg: 'Bersikap setia dan membantu secara pribadi, ada kemungkinan bantuannya bermotivasi politis',
      score: res,
      type: 'Ketaatan',
    };
  }

  W() {
    // W = 90A + 80A + 70A + 60A + 50A + 40A + 30A + 20A + 10A

    const res = this.papi.reduce((acc, curr) => {
      if (curr.no === 90 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 80 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 70 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 60 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 50 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 40 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 30 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 20 && curr.answer === 'A') {
        return acc + 1;
      }
      if (curr.no === 10 && curr.answer === 'A') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (res <= 3) {
      return {
        msg: 'Berorientasi pada tujuan, mandiri',
        score: res,
        type: 'Ketaatan',
      };
    }
    if (res <= 5) {
      return {
        msg: 'Kebutuhan akan pengarahan dan harapan yang dirumuskan untuknya',
        score: res,
        type: 'Ketaatan',
      };
    }

    return {
      msg: 'Meningkatnya orientasi terhadap tugas dan membutuhkan instruksi yang jelas',
      score: res,
      type: 'Ketaatan',
    };
  }

  Calculate() {
    const N = this.N();
    const G = this.G();
    const A = this.A();
    const L = this.L();
    const P = this.P();
    const I = this.I();
    const T = this.T();
    const V = this.V();
    const X = this.X();
    const S = this.S();
    const B = this.B();
    const O = this.O();
    const R = this.R();
    const D = this.D();
    const C = this.C();
    const Z = this.Z();
    const E = this.E();
    const K = this.K();
    const F = this.F();
    const W = this.W();

    return {
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      I,
      K,
      L,
      N,
      O,
      P,
      R,
      S,
      T,
      V,
      W,
      X,
      Z,
    };
  }
}
