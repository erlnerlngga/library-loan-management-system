import { useRef, useState } from "react";
import { useCountdown } from "@/hooks/use-countdown.tsx";
import { CameraComponent } from "../camera.tsx";
import FormCfit from "../cfit/FormCfit.tsx";
import { cfitInstruction } from "../cfit/photo.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Brain, Play, Clock } from "lucide-react";

const Cfit = () => {
  const [inputTime] = useState(120);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [currIndex, setCurrIndex] = useState<number>(1);

  const { formattedTime, progress, restart, pause } = useCountdown({
    initialSeconds: inputTime,
    onComplete() {
      if (currIndex === 4) {
        handleComplete();
      } else {
        onHandleNextIndex();
      }
    },
  });
  const [begin, setBegin] = useState<boolean>(true);

  const onHandleNextIndex = () => {
    if (currIndex === 1) {
      setCurrIndex(2);
      setBegin(true);
    }

    if (currIndex === 2) {
      setCurrIndex(3);
      setBegin(true);
    }

    if (currIndex === 3) {
      setCurrIndex(4);
      setBegin(true);
    }
  };

  const handleComplete = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
      console.log("FINISH");
    }
  };

  const instructions = [
    {
      title: "Section 1 - Pattern Completion",
      content:
        "Pada subtes ini, Terdapat 4 buah kotak, dimana 3 kotak terdapat gambar, dan 1 kotak harus dicari jawabannya diantara a, b, c, d atau e. Tugas anda adalah mencari gambar yang hilang dan jawabannya berada diantara a, b, c, d, atau e. Dengan cara yaitu, Meneruskan pola gambar-gambar tersebut, sehingga mendapatkan gambar terakhir. Kerjakan dengan cermat dan cepat karena tes menggunakan waktu yang terbatas.",
      image: cfitInstruction.bagian1,
    },
    {
      title: "Section 2 - Classification",
      content:
        "Pada subtes ini, terdapat 5 buah gambar pada setiap soalnya. Tugas anda adalah mencari 2 gambar yang berbeda dengan gambar lainnya. Kerjakan dengan cermat dan cepat karena waktu terbatas.",
      image: cfitInstruction.bagian2,
    },
    {
      title: "Section 3 - Matrices",
      content:
        "Pada subtes ini, disediakan beberapa gambar dalam satu kotak soal. Tugas anda adalah mencari gambar yang hilang berada di sudut kanan bawah dan jawabannya diantara a, b, c, d atau e Dengan cara, setiap gambar pada soal memiliki hubungan dan keterkaitan antara satu dengan yang lainnya Kerjakan dengan cermat dan cepat karena tes menggunakan waktu yang terbatas.",
      image: cfitInstruction.bagian3,
    },
    {
      title: "Section 4 - Topology",
      content:
        "Pada subtes ini, disediakan 3 contoh soal, setiap soal berada di bagian kiri dan jawaban berada di bagian kanan. Carilah kemungkinan gambar di bagian kanan (di antara pilihan jawaban) yang letak/lokasi titiknya serupa dengan gambar pada soal (dibagian kiri). Kerjakan dengan cermat dan cepat karena tes menggunakan waktu yang terbatas.",
      image: cfitInstruction.bagian4,
    },
  ];

  if (begin) {
    const currentInstruction = instructions[currIndex - 1];

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-light text-black tracking-tight">
                  CFIT Test
                </h1>
                <p className="text-gray-600 mt-2">
                  Culture Fair Intelligence Test
                </p>
              </div>
            </div>
            <div className="w-24 h-px bg-black"></div>
          </div>

          {/* Instruction Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {currIndex}
                  </div>
                  <h2 className="text-2xl font-medium text-black">
                    {currentInstruction.title}
                  </h2>
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-800 leading-relaxed">
                    {currentInstruction.content}
                  </p>
                </div>

                <div className="flex justify-center py-8">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <img
                      alt={`Section ${currIndex} example`}
                      src={currentInstruction.image || "/placeholder.svg"}
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                  <Button
                    onClick={() => {
                      setBegin(false);
                      restart();
                    }}
                    className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start Section {currIndex}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <CameraComponent candidateId="" projectId="" psikotestId="" />

            {/* Timer Section */}
            <div className="mb-12 flex justify-center">
              <div className="text-center space-y-6">
                <div className="flex items-center gap-4 justify-center">
                  <Clock className="h-6 w-6 text-gray-600" />
                  <span className="text-lg font-medium text-black">
                    Section {currIndex} - Time Remaining
                  </span>
                </div>
                <div className="text-6xl font-light text-black tracking-tight">
                  {formattedTime}
                </div>
                <div className="w-80 mx-auto">
                  <Progress value={progress * 100} className="h-3" />
                </div>
              </div>
            </div>

            {/* Test Form */}
            <div className="w-full">
              <FormCfit
                pause={pause}
                currIndex={currIndex}
                onHandleNextIndex={onHandleNextIndex}
                ref={formRef}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cfit;
