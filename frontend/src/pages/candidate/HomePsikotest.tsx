import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Target,
  Users,
  Zap,
  Compass,
  Heart,
  TrendingUp,
  CheckCircle,
  Clock,
  Camera,
  AlertTriangle,
} from "lucide-react";

const HomePsikotest = () => {
  const tests = [
    { name: "Papi Kostick", path: "/psikotest/papi-kostik", icon: Target },
    { name: "CFIT", path: "/psikotest/cfit", icon: Brain },
    { name: "DISC", path: "/psikotest/disc", icon: Users },
    { name: "IST", path: "/psikotest/ist", icon: Zap },
    { name: "Krapal", path: "/psikotest/krapal", icon: Compass },
    { name: "MBTI", path: "/psikotest/mbti", icon: Heart },
    { name: "MSDT", path: "/psikotest/msdt", icon: TrendingUp },
  ];

  const instructions = [
    {
      icon: CheckCircle,
      text: "Sebelum pengerjaan tes, harap melengkapi data diri dan foto profile.",
      highlight: "Lengkapi profil",
    },
    {
      icon: Target,
      text: "Pengerjaan tes dapat dilakukan dimana saja, namun pilihlah tempat dengan jaringan internet stabil.",
      highlight: "Jaringan stabil",
    },
    {
      icon: Camera,
      text: "Harap menggunakan perangkat yang memiliki kamera.",
      highlight: "Kamera diperlukan",
    },
    {
      icon: AlertTriangle,
      text: "Selama tes dilarang membuka atau mengaktifkan fitur lain seperti kalkulator, office, notepad, menjawab panggilan masuk dan pesan (chat) di telepon, dll karena segala aktifitas yang dilakukan selama pengerjaan tes akan tercatat oleh sistem.",
      highlight: "Tidak boleh multitasking",
    },
    {
      icon: Brain,
      text: "Mohon untuk memperhatikan dan membaca instruksi pengerjaan setiap tes, dikarenakan setiap tes memiliki instruksi pengerjaan yang berbeda.",
      highlight: "Baca instruksi",
    },
    {
      icon: Target,
      text: "Anda dipersilakan memilih tes mana yang akan dikerjakan terlebih dahulu, namun saat sudah memilih satu tes harap dikerjakan sampai tes tersebut selesai sebelum melanjutkan ke tes berikutnya.",
      highlight: "Selesaikan satu per satu",
    },
    {
      icon: Clock,
      text: "Setiap tes memilki batas waktu pengerjaan, harap mengerjakan setiap tes seefektif mungkin.",
      highlight: "Ada batas waktu",
    },
    {
      icon: Camera,
      text: 'Selama pengerjaan tes, harap aktifkan kamera (klik Allow atau izinkan) pada notifikasi yang muncul. Pastikan wajah anda terlihat jelas dikamera, Jika kamera tidak muncul silahkan refresh halaman ini dan klik "Allow" saat popup kamera muncul.',
      highlight: "Aktifkan kamera",
    },
    {
      icon: CheckCircle,
      text: "Apabila sudah siap, silakan memulai tes dengan klik tes di bawah ini.",
      highlight: "Siap memulai",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-light text-black tracking-tight">
              Psikotest
            </h1>
            <div className="w-24 h-px bg-black mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Selamat datang di platform tes psikologi profesional. Silakan baca
              instruksi dengan teliti sebelum memulai.
            </p>
          </div>
        </div>

        {/* Instructions Card */}
        <Card className="mb-16 border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-2xl font-light text-black flex items-center gap-4">
              <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-black" />
              </div>
              Instruksi Pengerjaan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {instructions.map((instruction, index) => (
                <div key={index} className="group">
                  <div className="flex gap-6 p-6 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm">
                    <div className="flex-shrink-0 pt-1">
                      <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center group-hover:border-black transition-colors duration-200">
                        <instruction.icon className="h-5 w-5 text-gray-600 group-hover:text-black transition-colors duration-200" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <Badge
                        variant="outline"
                        className="text-xs font-medium border-gray-300 text-gray-700"
                      >
                        {instruction.highlight}
                      </Badge>
                      <p className="text-gray-800 leading-relaxed font-light">
                        {instruction.text}
                      </p>
                    </div>
                    <div className="flex-shrink-0 pt-2">
                      <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tests Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-2xl font-light text-black flex items-center gap-4">
              <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center">
                <Brain className="h-4 w-4 text-black" />
              </div>
              Pilih Tes Psikologi
            </CardTitle>
            <p className="text-gray-600 mt-4 font-light">
              Klik pada tes yang ingin Anda kerjakan. Pastikan Anda telah
              membaca semua instruksi di atas.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tests.map((test, index) => (
                <Link key={test.name} to={test.path}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-black h-full">
                    <CardContent className="p-8 text-center space-y-6 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto border-2 border-gray-300 group-hover:border-black rounded-full flex items-center justify-center transition-all duration-300">
                          <test.icon className="h-8 w-8 text-gray-600 group-hover:text-black transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="font-medium text-xl text-black mb-2">
                            {test.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-light">
                            Tes Psikologi #{index + 1}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-medium"
                        size="lg"
                      >
                        Mulai Tes
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-100">
          <p className="text-gray-500 font-light text-lg">
            Pastikan Anda dalam kondisi yang optimal sebelum memulai tes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePsikotest;
