import { PapiKostikScore } from '../../types/candidate/tool.ts';

export class Inventory {
  constructor() {}

  // 1	2	3	4	5
  // 0,1	2,3	4,5	6,7	8,9
  check_skala_papi(value: number) {
    if (value >= 0 && value <= 1) {
      return 1;
    }
    if (value >= 2 && value <= 3) {
      return 2;
    }
    if (value >= 4 && value <= 5) {
      return 3;
    }
    if (value >= 6 && value <= 7) {
      return 4;
    }
    if (value >= 8 && value <= 9) {
      return 5;
    }

    return 0;
  }

  papiKostik(papi: PapiKostikScore[]) {
    const data = {
      A: papi.find((val) => val.factor === 'A')?.message || '',
      B: papi.find((val) => val.factor === 'B')?.message || '',
      C: papi.find((val) => val.factor === 'C')?.message || '',
      D: papi.find((val) => val.factor === 'D')?.message || '',
      E: papi.find((val) => val.factor === 'E')?.message || '',
      F: papi.find((val) => val.factor === 'F')?.message || '',
      G: papi.find((val) => val.factor === 'G')?.message || '',
      I: papi.find((val) => val.factor === 'I')?.message || '',
      K: papi.find((val) => val.factor === 'K')?.message || '',
      L: papi.find((val) => val.factor === 'L')?.message || '',
      N: papi.find((val) => val.factor === 'N')?.message || '',
      O: papi.find((val) => val.factor === 'O')?.message || '',
      P: papi.find((val) => val.factor === 'P')?.message || '',
      R: papi.find((val) => val.factor === 'R')?.message || '',
      S: papi.find((val) => val.factor === 'S')?.message || '',
      T: papi.find((val) => val.factor === 'T')?.message || '',
      V: papi.find((val) => val.factor === 'V')?.message || '',
      W: papi.find((val) => val.factor === 'W')?.message || '',
      X: papi.find((val) => val.factor === 'X')?.message || '',
      Z: papi.find((val) => val.factor === 'Z')?.message || '',
    };

    return {
      aktivitas: [data.T, data.V],
      arah_kerja: [data.N, data.G, data.A],
      gaya_kerja: [data.R, data.D, data.C],
      kepemimpinan: [data.L, data.P, data.I],
      ketaatan: [data.F, data.W],
      pergaulan: [data.X, data.S, data.B, data.O],
      sifat: [data.Z, data.E, data.K],
    };
  }

  mbti(tipe: string) {
    const data = {
      ENFJ: {
        improvement: [
          'Jangan mengorbankan diri hanya untuk menyenangkan orang lain.',

          'Jangan mengukur harga diri Anda dari perlakuan orang lain. Jangan mudah kecewa jika mereka tidak seperti yang Anda inginkan.',

          'Belajarlah untuk tegas dan mengambil keputusan. Menghadapi kritik dan konflik.',

          'Jangan terlalu bersikap keras terhadap diri sendiri.',
        ],
        personality: [
          'Kreatif, imajinatif, peka, sensitive, loyal.',
          'Pada umumnya peduli pada apa kata orang atau apa yang orang lain inginkan dan cenderung melakukan sesuatu dengan memperhatikan perasaan orang lain.',
          'Pandai bergaul, meyakinkan, ramah, fun, populer, simpatik. Responsif pada kritik dan pujian.',
          'Menyukai variasi dan tantangan baru.',
          'Butuh apresiasi dan penerimaan.',
        ],
      },
      ENFP: {
        improvement: [
          'Belajarlah untuk fokus, disiplin, tegas dan konsisten.',
          'Belajarlah untuk menghadapi konflik dan kritik.',
          'Pikirkan kebutuhan diri sendiri. Jangan melupakannya karena terlalu peduli pada kebutuhan orang lain.',
          'Jangan terlalu boros. Belajarlah untuk mengelola keuangan sedikit demi sedikit.',
        ],
        personality: [
          'Ramah, hangat, enerjik, optimis, antusias, semangat tinggi, fun.',
          'Imaginatif, penuh ide, kreatif, inovatif.',
          'Mampu beradaptasi dengan beragam situasi dan perubahan.',
          'Pandai berkomunikasi, senang bersosialisasi & membawa suasana positif.',
          'Mudah membaca perasaan dan kebutuhan orang lain.',
        ],
      },
      ENTJ: {
        improvement: [
          'Belajarlah untuk relaks. Tidak perlu perfeksionis dan selalu kompetitif dengan semua orang.',
          'Ungkapkan perasaan Anda. Menyatakan perasaan bukanlah kelemahan.',
          'Belajarlah mengelola emosi Anda. Jangan mudah marah.',
          'Belajarlah untuk menghargai dan mengapresiasi orang lain.',
          'Jangan terlalu arogan dan menganggap remeh orang lain. Lihat sisi positifnya. Jangan hanya melihat benar dan salah saja.',
        ],
        personality: [
          'Tegas, asertif, to the point, jujur terus terang, obyektif, kritis, & punya standard tinggi.',
          'Dominan, kuat kemauannya, perfeksionis dan kompetitif.',
          'Tangguh, disiplin, dan sangat menghargai komitmen.',
          'Cenderung menutupi perasaan dan menyembunyikan kelemahan.',
          'Berkarisma, komunikasi baik, mampu menggerakkan orang.',
          'Berbakat pemimpin.',
        ],
      },
      ENTP: {
        improvement: [
          'Cobalah untuk win-win solution. Jangan ingin menang sendiri.',
          'Belajarlah untuk disiplin dan konsisten.',
          'Hindari perdebatan tidak penting.',
          'Belajarlah untuk sedikit waspada. Seimbangkan cara pandang Anda agar tidak terlalu optimis dan mengambil resiko yang tidak realistis.',
          'Belajarlah untuk memberi perhatian pada perasaan orang lain.',
        ],
        personality: [
          'Gesit, kreatif, inovatif, cerdik, logis, baik dalam banyak hal.',
          'Banyak bicara dan punya kemampuan debat yang baik. Bisa berargumentasi untuk senang-senang saja tanpa merasa bersalah.',
          'Fleksibel. Punya banyak cara untuk memecahkan masalah dan tantangan.',
          'Kurang konsisten. Cenderung untuk melakukan hal baru yang menarik hati setelah melakukan sesuatu yang lain.',
          'Punya keinginan kuat untuk mengembangkan diri.',
        ],
      },
      ESFJ: {
        improvement: [
          'Jangan mengorbankan diri hanya untuk menyenangkan orang lain.',
          'Jangan mengukur harga diri Anda dari perlakuan, penghargaan dan pujian orang lain.',
          'Mintalah pertimbangan orang lain dalam mengambil keputusan. Belajarlah untuk lebih tegas.',
          'Terima tanggungjawab hidup dan belajarlah untuk lebih dewasa. Jangan mengasihani diri sendiri.',
          'Hadapi kritik dan konflik, jangan lari.',
        ],
        personality: [
          'Hangat, banyak bicara, populer, dilahirkan untuk bekerjasama, suportif dan anggota kelompok yang aktif.',
          'Membutuhkan keseimbangan dan baik dalam menciptakan harmoni.',
          'Selalu melakukan sesuatu yang manis bagi orang lain. Kerja dengan baik dalam situasi yang mendukung dan memujinya.',
          'Santai, easy going, sederhana, tidak berfikir panjang.',
          'Teliti dan rajin merawat apa yang ia miliki.',
        ],
      },
      ESFP: {
        improvement: [
          'Jangan terburu-buru dalam mengambil keputusan. Belajarlah untuk fokus dan tidak mudah berubah-ubah terutama untuk hal yang penting.',
          'Jangan menyenangkan semua orang. Begitu pula sebaliknya, tidak semua orang bisa menyenangkan Anda.',
          'Belajarlah menghadapi kritik dan konflik. Jangan lari.',
          'Anda punya kecenderungan meterialistis. Hati-hati, tidak semua hal bisa diukur dengan materi ataupun uang.',
        ],
        personality: [
          'Outgoing, easygoing, mudah berteman, bersahabat, sangat sosial, ramah, hangat, & menyenangkan.',
          'Optimis, ceria, antusias, fun, menghibur, suka menjadi perhatian.',
          'Punya interpersonal skill yang baik, murah hati, mudah simpatik dan mengenali perasaan orang lain.',
          'Menghindari konflik dan menjaga keharmonisan suatu hubungan.',
          'Mengetahui apa yang terjadi di sekelilingnya dan ikut serta dalam kegiatan tersebut.',
          'Sangat baik dalam keadaan yang membutuhkan common sense, tindakan cepat dan ketrampilan praktis.',
        ],
      },
      ESTJ: {
        improvement: [
          'Kurangi keinginan untuk mengontrol dan memaksa orang lain.',
          'Belajarlah untuk mengontrol emosi dan amarah Anda.',
          'Cobalah untuk introspeksi diri dan meluangkan waktu sejenak untuk merenung.',
          'Belajarlah untuk lebih sabar dan rendah hati.',
          'Belajarlah untuk memahami orang lain.',
        ],
        personality: [
          'Praktis, realistis, berpegang pada fakta, dengan dorongan alamiah untuk bisnis dan mekanistis.',
          'Sangat sistematis, procedural dan terencana.',
          'Disiplin dan pekerja keras.',
          'Konservatif dan cenderung kaku.',
          'Tidak tertarik pada subject yang tidak berguna baginya, tapi dapat menyesuaikan diri jika diperlukan.',
          'Senang mengorganisir sesuatu. Bisa menjadi administrator yang baik jika mereka ingat untuk memperhatikan perasaan dan perspektif orang lain.',
        ],
      },
      ESTP: {
        improvement: [
          'Belajarlah memahami perasaan dan pemikiran orang lain terutama saat bicara dengan mereka.',
          'Belajarlah untuk sabar, menikmati proses, tidak semua hal bisa dicapai dengan cepat.',
          'Sesekali luangkan waktu untuk merenung dan merencanakan masa depan Anda.',
          'Cobalah untuk mencatat pengamatan-pengamatan Anda termasuk detailnya.',
        ],
        personality: [
          'Spontan, Aktif, Enerjik, Cekatan, Cepat, Sigap, Antusias, Fun dan penuh variasi.',
          'Komunikator, asertif, to the point, ceplas-ceplos, berkarisma, punya interpersonal skill yang baik.',
          'Baik dalam pemecahan masalah langsung di tempat. Mampu menghadapi masalah, konflik dan kritik. Tidak khawatir, menikmati apapun yang terjadi.',
          'Cenderung untuk menyukai sesuatu yang mekanistis, kegiatan bersama dan olahraga.',
          'Mudah beradaptasi, toleran, pada umumnya konservatif tentang nilai-nilai.',
          'Tidak suka penjelasan terlalu panjang. Paling baik dalam hal-hal nyata yang dapat dilakukan.',
        ],
      },
      INFJ: {
        improvement: [
          'Seimbangkan cara pandang Anda. Jangan hanya melihat sisi negatif & resiko. Namun, lihatlah sisi positif dan peluangnya.',
          'Bersabarlah, jangan mudah marah dan menyalahkan orang lain atau situasi.',
          'Rileks dan jangan terus menerus berfikir atau menyelesaikan tanggungjawab.',
        ],
        personality: [
          'Perhatian, empati, sensitif & berkomitmen terhadap sebuah hubungan.',
          'Sukses karena ketekunan, originalitas dan keinginan kuat untuk melakukan apa saja yang diperlukan termasuk memberikan yg terbaik dalam pekerjaan.',
          'Idealis, perfeksionis, memegang teguh prinsip.',
          'Visioner, penuh ide, kreatif, suka merenung dan inspiring.',
          'Biasanya diikuti dan dihormati karena kejelasan visi serta dedikasi pada hal-hal baik.',
        ],
      },
      INFP: {
        improvement: [
          'Belajarlah menghadapi kritik. Jika baik maka kritik itu bisa membangun Anda, namun jika tidak abaikan saja. Jangan ragu pula untuk bertanya dan minta saran.',
          'Belajarlah untuk bersikap tegas. Jangan selalu berperasaan dan menyenangkan orang dengan tindakan baik. Bertindak baik itu berbeda dengan bertindak benar.',
          'Jangan terlalu menyalahkan diri dan bersikap terlalu keras pada diri sendiri. Kegagalan adalah hal biasa dan semua orang pernah mengalaminya.',
          'Jangan terlalu baik pada orang lain tapi melupakan diri sendiri. Anda juga punya tanggungjawab untuk berbuat baik pada diri sendiri.',
        ],
        personality: [
          'Sangat perhatian dan peka dengan perasaan orang lain.',
          'Penuh dengan antusiasme dan kesetiaan, tapi biasanya hanya untuk orang dekat.',
          'Peduli pada banyak hal. Cenderung mengambil terlalu banyak dan menyelesaikan sebagian.',
          'Cenderung idealis dan perfeksionis.',
          'Berpikir win-win solution, mempercayai dan mengoptimalkan orang lain.',
        ],
      },
      INTJ: {
        improvement: [
          'Belajarlah mengungkapkan emosi & perasaan Anda.',
          'Cobalah untuk lebih terbuka pada dunia luar, banyak bergaul, banyak belajar, banyak membaca, mengunjungi banyak tempat, eksplorasi hal baru, & memperluas wawasan.',
          'Hindari perdebatan tidak penting.',
          'Belajarlah untuk berempati, memberi perhatian dan lebih peka terhadap orang lain.',
        ],
        personality: [
          'Visioner, punya perencanaan praktis, & biasanya memiliki ide-ide original serta dorongan kuat untuk mencapainya.',
          'Mandiri dan percaya diri.',
          'Punya kemampuan analisa yang bagus serta menyederhanakan sesuatu yang rumit dan abstrak menjadi sesuatu yang praktis, mudah difahami & dipraktekkan.',
          'Skeptis, kritis, logis, menentukan (determinatif) dan kadang keras kepala.',
          'Punya keinginan untuk berkembang serta selalu ingin lebih maju dari orang lain.',
          'Kritik & konflik tidak menjadi masalah berarti.',
        ],
      },
      INTP: {
        improvement: [
          'Belajarlah membangun hubungan dengan orang lain.',
          'Belajar berempati, mendengar aktif, memberi perhatian dan bertukar pendapat.',
          'Relaks. Jangan terlalu banyak berfikir. Nikmati hidup Anda tanpa harus bertanya mengapa dan bagaimana.',
          'Cobalah menemukan satu ide, merencanakan dan mewujudkannya.',
          'Jangan terlalu sering berganti-ganti ide tetapi tidak satupun yang terwujud.',
        ],
        personality: [
          'Sangat menghargai intelektualitas dan pengetahuan. Menikmati hal-hal teoritis dan ilmiah. Senang memecahkan masalah dengan logika dan analisa.',
          'Diam dan menahan diri. Lebih suka bekerja sendiri.',
          'Cenderung kritis, skeptis, mudah curiga dan pesimis.',
          'Tidak suka memimpin dan bisa menjadi pengikut yang tidak banyak menuntut.',
          'Cenderung memiliki minat yang jelas. Membutuhkan karir dimana minatnya bisa berkembang dan bermanfaat.',
          'Jika menemukan sesuatu yang menarik minatnya, ia akan sangat serius dan antusias menekuninya.',
        ],
      },
      ISFJ: {
        improvement: [
          'Lihat lebih dalam, lebih antusias, & lebih semangat',
          'Belajarlah mengatakan ”tidak”. Jangan menyenangkan semua orang atau Anda dianggap plin plan',
          'Jangan terjebak zona nyaman dan rutinitas',
          'Cobalah hal baru. Ada banyak hal menyenangkan yang mungkin belum pernah Anda coba',
        ],
        personality: [
          'Penuh pertimbangan, hati-hati, teliti dan akurat',
          'Serius, tenang, stabil namun sensitif',
          'Ramah, perhatian pada perasaan & kebutuhan orang lain, setia, kooperatif, pendengar yang baik',
          'Punya kemampuan mengorganisasi, detail, teliti, sangat bertanggungjawab & bisa diandalkan',
        ],
      },
      ISFP: {
        improvement: [
          'Jangan takut pada penolakan dan konflik. Anda tidak perlu menyenangkan semua orang.',
          'Cobalah untuk mulai memikirkan dampak jangka panjang dari keputusan-keputusan kecil di hari ini.',
          'Asah dan kembangkan sisi kreatifitas dan seni dalam diri Anda sebagai modal bagus dalam diri Anda.',
          'Cobalah untuk lebih terbuka dan mengekspresikan perasaan Anda.',
        ],
        personality: [
          'Berpikiran simpel & praktis, fleksibel, sensitif, ramah, tidak menonjolkan diri, rendah hati pada kemampuannya.',
          'Menghindari konflik, tidak memaksakan pendapat atau nilai-nilainya pada orang lain.',
          'Biasanya tidak mau memimpin tetapi menjadi pengikut dan pelaksana yang setia.',
          'Seringkali santai menyelesaikan sesuatu, karena sangat menikmati apa yang terjadi saat ini.',
          'Menunjukkan perhatian lebih banyak melalui tindakan dibandingkan kata-kata.',
        ],
      },
      ISTJ: {
        improvement: [
          'Belajarlah memahami perasaan & kebutuhan orang lain',
          'Kurangi keinginan untuk mengontrol orang lain atau memerintah mereka untuk menegakkan aturan',
          'Lihatlah lebih banyak sisi positif pada orang lain atau hal lainnya',
          'Terbukalah terhadap perubahan',
        ],
        personality: [
          'Serius, tenang, stabil & damai',
          'Senang pada fakta, logis, obyektif, praktis & realistis',
          'Berorientasi pada tugas, tekun, teratur, menepati janji, dapat diandalkan & bertanggung jawab',
          'Pendengar yang baik, setia, hanya mau berbagi dengan orang dekat',
          'Memegang aturan, standar & prosedur dengan teguh',
        ],
      },
      ISTP: {
        improvement: [
          'Observasilah kehidupan sosial, apa yang membuat orang marah, cinta, senang, termotivasi & terapkan pada hubungan Anda',
          'Belajarlah untuk mengenali perasaan Anda dan mengekspresikannya',
          'Jadilah orang yang lebih terbuka, keluar dari zona nyaman, eksplorasi ide baru, dan berdiskusi dengan orang lain',
          'Jangan mencari-cari kesalahan orang hanya untuk menyelesaikan masalahnya',
          'Jangan menyimpan informasi yang harusnya dibagi dan belajarlah mempercayakan tanggungjawab pada orang lain',
        ],
        personality: [
          'Tenang, pendiam, cenderung kaku, dingin, hati-hati, penuh pertimbangan',
          'Logis, rasional, kritis, obyektif, mampu mengesampingkan perasaan',
          'Mampu menghadapi perubahan mendadak dengan cepat dan tenang',
          'Percaya diri, tegas dan mampu menghadapi perbedaan maupun kritik',
          'Mampu menganalisa, mengorganisir, & mendelegasikan',
          'Problem solver yang baik terutama untuk masalah teknis & keadaan mendadak',
        ],
      },
    };

    // const mbtiTypes = Object.keys(data) as (keyof typeof data)[];

    // if (!mbtiTypes.includes(tipe as keyof typeof data)) {
    //   return undefined; // Or throw an error, depending on your needs
    // }

    const res = data[tipe as keyof typeof data];
    return res;
  }

  krapal(hanker: number, janker: number, panker: number, tianker: number) {
    return {
      keajegan_kerja:
        janker >= 0 && janker <= 8
          ? 5
          : janker >= 9 && janker <= 10
            ? 4
            : janker >= 11 && janker <= 14
              ? 3
              : janker >= 15 && janker <= 16
                ? 2
                : janker >= 17
                  ? 1
                  : 0,
      kecepatan_kerja:
        panker >= 0 && panker <= 11
          ? 1
          : panker >= 12 && panker <= 13
            ? 2
            : panker >= 14 && panker <= 18
              ? 3
              : panker >= 19 && panker <= 20
                ? 4
                : panker >= 21
                  ? 5
                  : 0,
      ketahanan_kerja:
        hanker >= 0 && hanker <= 465
          ? 1
          : hanker >= 466 && hanker <= 560
            ? 2
            : hanker >= 561 && hanker <= 750
              ? 3
              : hanker >= 751 && hanker <= 845
                ? 4
                : hanker >= 846
                  ? 5
                  : 0,
      ketelitian:
        tianker >= 0 && tianker <= 3
          ? 5
          : tianker >= 4 && tianker <= 9
            ? 4
            : tianker >= 10 && tianker <= 20
              ? 3
              : tianker >= 21 && tianker <= 26
                ? 2
                : tianker >= 27
                  ? 1
                  : 0,
    };
  }
}
