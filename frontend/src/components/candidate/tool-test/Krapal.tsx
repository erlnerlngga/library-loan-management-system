import { useEffect, useState } from "react";
import { useCountdown } from "@/hooks/use-countdown.tsx";
import { CalculateKrapal } from "../../../utils/calculation/calculate-krapal.ts";
import { CameraComponent } from "../camera.tsx";
import FormKrapal from "../krapal/FormKrapal.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Brain, Clock } from "lucide-react";
import { useCreateKrapalMutation } from "@/state/api.ts";
import { toast, Toaster } from "sonner";

const TOTAL_INDEX = 28;
const inputTime = 30;

const Krapal = () => {
  const [createKrapal] = useCreateKrapalMutation();
  const [totalIndex, setTotalIndex] = useState(1);
  const [totalResult, setTotalResult] = useState<
    { answer: { answer: number; no: number }[]; no_col: number; time: number }[]
  >([]);
  const [skip, setSkip] = useState<boolean>(false);

  const { formattedTime, progress, reset, start, timeLeft } = useCountdown({
    initialSeconds: inputTime,
    onComplete() {
      if (totalIndex === TOTAL_INDEX) {
        reset();
        handleSubmit();
      } else {
        setSkip(true);
      }
    },
  });

  const handleAddTotalResult = (result: { answer: number; no: number }[]) => {
    setTotalResult([
      ...totalResult,
      { answer: result, no_col: totalIndex, time: timeLeft },
    ]);
  };

  const handleSkip = (value: boolean) => {
    setSkip(value);
  };

  useEffect(() => {
    if (totalIndex !== TOTAL_INDEX) {
      reset();
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  const handleSubmit = async () => {
    try {
      reset();
      console.log(totalResult);

      const krapal = new CalculateKrapal({ result: totalResult });
      const result = krapal.calculate();
      console.log({ final: result });

      if (!result.krapal || result.krapal.result.length === 0) {
        throw new Error("Tidak ada data krapal yang valid untuk disubmit.");
      }

      await createKrapal({
        krapal: {
          panker: result.panker,
          janker: result.janker,
          hanker: result.hanker,
          tinker: result.tinker,
          titik_puncak: result.titikPuncak,
          titik_terendah: result.titikTerendah,
          total_hitungan: result.totalHitungan,
          jumlah_jawaban_benar: result.jumlahJawabanBenar || 0,
          jumlah_jawaban_salah: result.jumlahJawabanSalah || 0,
          project: "will be added",
          candidate: "will be added",
          krapal_score: result.krapal.result.map((val) => {
            return {
              no_column: val.no_col,
              time: val.time,
              right_answer: val.answer.right_answer,
              wrong_answer: val.answer.wrong_answer,
              total: val.answer.total,
            };
          }),
        },
      });

      toast.success("Test berhasil diselesaikan!", {
        description: "DISC test telah berhasil disubmit.",
      });
    } catch (error) {
      console.log({ error });
      toast.error("Terjadi kesalahan", {
        description: `${error}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="bottom-right" richColors closeButton />
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-light text-black tracking-tight">
                Krapal Test
              </h1>
              <p className="text-gray-600 mt-2">
                Concentration and Attention Assessment
              </p>
            </div>
          </div>
          <div className="w-24 h-px bg-black"></div>
        </div>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            {/* Camera Component */}
            <div className="mb-8">
              <CameraComponent candidateId="" projectId="" psikotestId="" />
            </div>

            {/* Timer Section */}
            <div className="mb-12 flex justify-center">
              <div className="text-center space-y-6">
                <div className="flex items-center gap-4 justify-center">
                  <Clock className="h-6 w-6 text-gray-600" />
                  <span className="text-lg font-medium text-black">
                    Section {totalIndex} - Time Remaining
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
              <FormKrapal
                TOTAL_INDEX={TOTAL_INDEX}
                handleAddTotalResult={handleAddTotalResult}
                handleSubmit={handleSubmit}
                setSkip={handleSkip}
                setTotalIndex={(index: number) => setTotalIndex(index)}
                skip={skip}
                totalIndex={totalIndex}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Krapal;
