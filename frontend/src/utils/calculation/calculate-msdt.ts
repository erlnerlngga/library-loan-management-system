interface Msdt {
  answer: string;
  no: number;
}

export class CalculateMsdt {
  msdt: Msdt[];

  constructor(data: Msdt[]) {
    this.msdt = data;
  }

  // this function will help to count
  count(type: string, no: string) {
    let total = 0;

    if (type === 'A') {
      const start =
        no === '1'
          ? 1
          : no === '2'
            ? 9
            : no === '3'
              ? 17
              : no === '4'
                ? 25
                : no === '5'
                  ? 33
                  : no === '6'
                    ? 41
                    : no === '7'
                      ? 49
                      : no === '8'
                        ? 57
                        : -1_000_000;
      const end =
        no === '1'
          ? 8
          : no === '2'
            ? 16
            : no === '3'
              ? 24
              : no === '4'
                ? 32
                : no === '5'
                  ? 40
                  : no === '6'
                    ? 48
                    : no === '7'
                      ? 56
                      : no === '8'
                        ? 64
                        : -1_000_000;

      this.msdt
        .filter((val) => val.no >= start && val.no <= end)
        .map((val) => {
          if (val.answer === 'A') {
            total++;
          }
        });
    }

    if (type === 'B') {
      const start =
        no === '1'
          ? 1
          : no === '2'
            ? 2
            : no === '3'
              ? 3
              : no === '4'
                ? 4
                : no === '5'
                  ? 5
                  : no === '6'
                    ? 6
                    : no === '7'
                      ? 7
                      : no === '8'
                        ? 8
                        : -1_000_000;

      this.msdt
        .filter(
          (val) =>
            val.no === start ||
            val.no === start + 8 ||
            val.no === start + 16 ||
            val.no === start + 32 ||
            val.no === start + 48 ||
            val.no === start + 56,
        )
        .map((val) => {
          if (val.answer === 'B') {
            total++;
          }
        });
    }

    return total;
  }

  countTotal() {
    const score = {
      '1': {
        a: this.count('A', '1'),
        b: this.count('B', '1'),
        koreksi: 1,
        total: this.count('A', '1') + this.count('B', '1') + 1,
      },
      '2': {
        a: this.count('A', '2'),
        b: this.count('B', '2'),
        koreksi: 2,
        total: this.count('A', '2') + this.count('B', '2') + 2,
      },
      '3': {
        a: this.count('A', '3'),
        b: this.count('B', '3'),
        koreksi: 1,
        total: this.count('A', '3') + this.count('B', '3') + 1,
      },
      '4': {
        a: this.count('A', '4'),
        b: this.count('B', '4'),
        koreksi: 0,
        total: this.count('A', '4') + this.count('B', '4') + 0,
      },
      '5': {
        a: this.count('A', '5'),
        b: this.count('B', '5'),
        koreksi: 3,
        total: this.count('A', '5') + this.count('B', '5') + 3,
      },
      '6': {
        a: this.count('A', '6'),
        b: this.count('B', '6'),
        koreksi: -1,
        total: this.count('A', '6') + this.count('B', '6') + -1,
      },
      '7': {
        a: this.count('A', '7'),
        b: this.count('B', '7'),
        koreksi: 0,
        total: this.count('A', '7') + this.count('B', '7') + 0,
      },
      '8': {
        a: this.count('A', '8'),
        b: this.count('B', '8'),
        koreksi: -4,
        total: this.count('A', '8') + this.count('B', '8') + -4,
      },
    };

    return score;
  }

  calculate() {
    const score = this.countTotal();

    const res = {
      e:
        score['5'].total +
        score['6'].total +
        score['7'].total +
        score['8'].total,
      o: score['1'].total,
      ro:
        score['2'].total +
        score['4'].total +
        score['6'].total +
        score['8'].total,
      to:
        score['3'].total +
        score['4'].total +
        score['7'].total +
        score['8'].total,
    };

    const konversi = {
      e:
        res.e < 30
          ? 0
          : res.e < 32
            ? 0.6
            : res.e === 32
              ? 1.2
              : res.e === 33
                ? 1.8
                : res.e === 34
                  ? 2.4
                  : res.e === 35
                    ? 3
                    : res.e < 38
                      ? 3.6
                      : 4,

      o:
        res.o < 30
          ? 0
          : res.o < 32
            ? 0.6
            : res.o === 32
              ? 1.2
              : res.o === 33
                ? 1.8
                : res.o === 34
                  ? 2.4
                  : res.o === 35
                    ? 3
                    : res.o < 38
                      ? 3.6
                      : 4,
      ro:
        res.ro < 30
          ? 0
          : res.ro < 32
            ? 0.6
            : res.ro === 32
              ? 1.2
              : res.ro === 33
                ? 1.8
                : res.ro === 34
                  ? 2.4
                  : res.ro === 35
                    ? 3
                    : res.ro < 38
                      ? 3.6
                      : 4,
      to:
        res.to < 30
          ? 0
          : res.to < 32
            ? 0.6
            : res.to === 32
              ? 1.2
              : res.to === 33
                ? 1.8
                : res.to === 34
                  ? 2.4
                  : res.to === 35
                    ? 3
                    : res.to < 38
                      ? 3.6
                      : 4,
    };

    const final = [
      // =IF($D$38>2;IF($F$38>2;IF($H$38>2;"Ok";"");"");"")
      {
        desc: `Gaya ini dianggap efektif karena dapat mengelola dengan baik antara tugas dan hubungan. Model ini adalah sisi efektif dari gaya kompromis. Pola yang dilakukan dapat mengintegrasikan antara tugas dan hubungan dengan baik, mengelola dan memanfaatkan kedua aspek dengan sinergi yang optimal. Pendekatan ini dapat dikatakan sebagai pendekatan konsultatif, interaktif dan pemecah masalah. Pendekatan ini memanfaatkan eksplorasi terhadap berbagai sumber daya, keragaman informasi dan dapat memanfaatkan isu negatif menjadi dorongan untuk hasil yang lebih optimal. Gaya ini melibatkan tim dalam perencanaan dan mengambil kesimpulan. Komunikasi dilakukan terhadap bawahan untuk meningkatkan kualitas informasi yang dapat menjadikan keputusan lebih baik. Manajer dengan gaya seperti ini dapat dianggap sebagai motivator karena terbuka dengan berbagai hal baik yang mendukung atau menentang untuk mendapakan komitmen bersama`,
        label: 'Executive',
        value:
          konversi.to > 2
            ? konversi.ro > 2
              ? konversi.e > 2
                ? 'OK'
                : ''
              : ''
            : '',
      },
      // =IF($D$38>2;IF($F$38>2;IF($H$38<2;"Ok";"");"");"")
      {
        desc: `Gaya ini mengandalkan tugas dan relasi yang seimbang, namun dianggap kurang efektif karena tidak berpendirian tetap, tidak ada keputusan yang jelas. Gaya ini akan merasa kebingungan antara pengaturan tugas dan kebutuhan untuk berinteraksi. Dalam menghadapi tekanan, maka akan cenderung kompromi sehingga berbagai tujuan seringkali menyimpang dan tidak tercapai.`,
        label: 'Compromiser',
        value:
          konversi.to > 2
            ? konversi.ro > 2
              ? konversi.e < 2
                ? 'OK'
                : ''
              : ''
            : '',
      },
      // =IF($D$38>2;IF($F$38<2;IF($H$38>2;"Ok";"");"");"")
      {
        desc: `Gaya ini dianggap efektif karena memberikan unsur komunikatif dalam melakukan gaya otokratik. Gaya ini masih mengandalkan instruksi dan intervensi. Skor tinggi dapat dilihat sebagai guru dalam memberi tugas, dimaana dapat memberikan instruksi dengan tidak mengesampingkan komunikasi kepada bawahan secara lebih fleksibel. Pola yang dilakukan memberikan kesediaan untuk bertanya, membantu apabila ada hal yang dianggap salah atau menyimpang. Pola keseharian terstruktur dalam menentukan target kerja, produktivitas dan memberi perintah, tidak ragu memberikan hukuman namun bertindak adil dalam menyikapinya. Gaya ini dapat bekerjasama dengan baik namun menghindari hubungan keterdekatan antar personal`,
        label: 'Benevolent Autocrat',
        value:
          konversi.to > 2
            ? konversi.ro < 2
              ? konversi.e > 2
                ? 'OK'
                : ''
              : ''
            : '',
      },
      // =IF($D$38>2;IF($F$38<2;IF($H$38<2;"Ok";"");"");"")
      {
        desc: `Gaya seperti ini lebih perhatian hanya pada produktivitas dan hasil. Skor tinggi dianggap sebagai manajer yang formal, memberikan tugas ke bawahan berdasarkan instruksi dan mengawasi secara ketat proses yang terjadi. Kesalahan tidak bisa ditolerir, penyimpangan harus dihindari… yang penting jangan sampai salah dalam mengerjakan sesuatu. Kebijakan adalah urusan atasan sementara bawahan cukup melaksanakan apa yang harus dikerjakan tanpa ada alasan karena dianggap tidak perlu dan membuang waktu. Gaya ini meminimalisir komunikasi, membatasi terhadap apa yang perlu saja. Bawahan akan menganggap dingin atasan dengan gaya ini, terutama bagi mereka yang membutuhkan lebih dari sekadar tugas yang harus dikerjakan seperti dorongan akan pengakuan atau dukungan. Model pendekatan pengendalian dan pengarahan dianggap kurang efektif, karena kaku, keras kepala sehingga bawahan akan merasa tertekan.`,
        label: 'Autocrat',
        value:
          konversi.to > 2
            ? konversi.ro < 2
              ? konversi.e < 2
                ? 'OK'
                : ''
              : ''
            : '',
      },
      // =IF($D$38<2;IF($F$38>2;IF($H$38>2;"Ok";"");"");"")
      {
        desc: `Gaya manajemen developer adalah sisi efektif dari gaya missionary. Tujuan dari gaya seperti ini adalah untuk bertindak secara profesional tanpa mengesampingkan aspek emosi. Bawahan diberikan kesempatan untuk memberikan ide, pandangan atau peran lebih dari kebijakan yang ada untuk mengembangkan potensi. Kontribusi diberikan dan perhatian untuk pengembangan pun diperhatikan. Skor tinggi memiliki keyakinan optimis tentang individu untuk bekerja dan menghasilkan. Sifat pendekatan berupa kolegial, bawahan sebagai partner bukan hanya sebagai “pembantu” dalam mengerjakan sesuatu. Gaya seperti ini senang untuk berbagi pengetahuan dan keahlian dan potensi bawahan dapat dioptimalkan`,
        label: 'Developer',
        value:
          konversi.to < 2
            ? konversi.ro > 2
              ? konversi.e > 2
                ? 'OK'
                : ''
              : ''
            : '',
      },
      // =IF($D$38<2;IF($F$38>2;IF($H$38<2;"Ok";"");"");"")
      {
        desc: `Pendekatan gaya manajemen seperti ini adalah menggunakan unsur afektif yang sangat kental. Missionary berupaya mendorong situasi positif dalam manajemen dengan memberikan kandungan sensitivitas, kepedulian dan hal-hal yang mungkin dianggap penting untuk meningkatkan kinerja melalui sentuhan emosi/perasaan. Model manajerial seperti ini berupaya menjaga orang lain termasuk bawahan pada situasi bahagia dalam situasi apapun. Perilaku mendorong atau mengajak menunjukkan bagian penting dari gaya yang ditunjukkan. Mengapa dikatakan kurang efektif gaya manajemen seperti ini adalah karena kurang ketersediaanya peluang konflik, berupaya tetap halus dalam bertindak dan kesulitan untuk menolak atau berkata tidak, padahal banyak pekerjaan perlu ketegasan dalam manajemen.`,
        label: 'Missionary',
        value:
          konversi.to < 2
            ? konversi.ro > 2
              ? konversi.e < 2
                ? 'OK'
                : ''
              : ''
            : '',
      },
      // =IF($D$38<2;IF($F$38<2;IF($H$38>2;"Ok";"");"");"")
      {
        desc: `Pendekatan gaya manajemen ini adalah prosedural, berdasarkan aturan atau tata pelaksanaan, menerima dengan tulus hirarki kewenangan dan menggunakan komunikasi sangat formal dalam bersikap. Skor yang tinggi berarti sistematik. Fungsi dan peran birokrat akan sangat optimal pada situasi yang terstruktur dengan pola prosedur yang jelas meskipun dapat saja prosedur yang ada sebenarnya rumit, namun birokrat akan tetap tenang menghadapi sistem yang ada. Birokrat berpegang pada sistem, gaya manajemen seperti ini tampak seperti otokrat, kaku dan dapat membosankan bagi orang-orang yang fleksibel`,
        label: 'Bureaucrat',
        value:
          konversi.to < 2
            ? konversi.ro < 2
              ? konversi.e > 2
                ? 'OK'
                : ''
              : ''
            : '',
      },
      // =IF($D$38<2;IF($F$38<2;IF($H$38<2;"Ok";"");"");"")
      {
        desc: `Pendekatan gaya manajemen tipe ini adalah suka mengabaikan masalah, cuci tangan, tidak mau bertanggung jawab (laisser-faire). Tipe gaya ini mengabaikan berbagai keterlibatan atau intervensi yang dapat menjadikan situasi dianggap sulit atau rumit. Sikapnya selalu mencoba netral terhadap apa yang terjadi di keseharian, mencari jalan untuk menghindar dari aturan yang dianggap menyulitkan. Polanya adalah mencoba tetap menyelaraskan antara atasan dan bawahan, menghindari perubahan perencanaan. Pola yang tampak secara manajerial adalah defensif, misalkan ada kebijakan yang menyulitkan bawahan maka ia mengatakan saya hanya menjalankan perintah, kebijakan dari atasan. Bukan berarti pola seperti ini buruk, deserter hanya berupaya menjaga keadaan status-quo dan menghindari perubahan drastis atau “guncangan dalam manajemen”.`,
        label: 'Deserter',
        value:
          konversi.to < 2
            ? konversi.ro < 2
              ? konversi.e < 2
                ? 'OK'
                : ''
              : ''
            : '',
      },
    ];

    // console.log(
    //   "FINAL: ",
    //   final.find((val) => val.value === "OK"),
    // );

    const result = final.find((val) => val.value === 'OK');
    return result;
  }
}
