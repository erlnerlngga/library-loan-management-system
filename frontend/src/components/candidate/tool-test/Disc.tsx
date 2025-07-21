import React, { useState } from "react";
import { DiscType } from "../../../types/candidate/disc.ts";
import { CalculateDISC } from "../../../utils/calculation/calculate-disc.ts";
import { discQuestion } from "../../../utils/data/question/disc.ts";
import { CameraComponent } from "../camera.tsx";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast, Toaster } from "sonner";
import { AlertTriangle, CheckCircle2, Clock, Users } from "lucide-react";
import { useCreateDiscMutation } from "@/state/api.ts";

const Disc = () => {
  const [createDisc, { isLoading }] = useCreateDiscMutation();

  const [field, setField] = useState<DiscType[]>(
    discQuestion.map((val) => ({
      answer: {
        k1: { isChecked: false, value: 0 },
        k2: { isChecked: false, value: 0 },
        k3: { isChecked: false, value: 0 },
        k4: { isChecked: false, value: 0 },
        p1: { isChecked: false, value: 0 },
        p2: { isChecked: false, value: 0 },
        p3: { isChecked: false, value: 0 },
        p4: { isChecked: false, value: 0 },
      },
      no: val.no,
    }))
  );

  const checkValidAnswers = (data: DiscType[]) => {
    return data.every((item) => {
      const { answer } = item;
      const isPChecked =
        answer.p1.isChecked ||
        answer.p2.isChecked ||
        answer.p3.isChecked ||
        answer.p4.isChecked;
      const isKChecked =
        answer.k1.isChecked ||
        answer.k2.isChecked ||
        answer.k3.isChecked ||
        answer.k4.isChecked;
      return isPChecked && isKChecked;
    });
  };

  const checkSameAnswers = (data: DiscType[]) => {
    return data.filter((item) => {
      const { answer } = item;
      const pair1 = answer.k1.isChecked && answer.p1.isChecked;
      const pair2 = answer.k2.isChecked && answer.p2.isChecked;
      const pair3 = answer.k3.isChecked && answer.p3.isChecked;
      const pair4 = answer.k4.isChecked && answer.p4.isChecked;
      return pair1 || pair2 || pair3 || pair4;
    });
  };

  const checkOne = (data: DiscType[]) => {
    return data.every((item) => {
      const { answer } = item;
      const kValues = [
        answer.k1.isChecked,
        answer.k2.isChecked,
        answer.k3.isChecked,
        answer.k4.isChecked,
      ];
      const kCheckedCount = kValues.filter(Boolean).length;
      const pValues = [
        answer.p1.isChecked,
        answer.p2.isChecked,
        answer.p3.isChecked,
        answer.p4.isChecked,
      ];
      const pCheckedCount = pValues.filter(Boolean).length;
      return kCheckedCount === 1 && pCheckedCount === 1;
    });
  };

  const handleCheckChange = (
    checked: boolean,
    no: number,
    key: string,
    value: number
  ) => {
    const curr = field.find((val) => val.no === no);
    if (curr) {
      setField(
        field.map((val) =>
          val.no === no
            ? {
                ...val,
                answer: {
                  ...val.answer,
                  [key]: {
                    isChecked: checked,
                    value: checked ? value : 0,
                  },
                },
              }
            : val
        )
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allValid = checkValidAnswers(field);
    const checkSame = checkSameAnswers(field);
    const one = checkOne(field);

    if (!one) {
      toast.error("Pilih salah satu antara P dan K", {
        description:
          "Setiap nomor harus memiliki tepat satu pilihan P dan satu pilihan K.",
      });
      return;
    }

    if (!allValid) {
      toast.error("Terdapat soal belum dijawab", {
        description: "Silakan lengkapi semua pertanyaan sebelum submit.",
      });
      return;
    }

    if (checkSame.length > 0) {
      toast.error("Tidak boleh memilih P dan K secara bersamaan", {
        description: "P dan K tidak boleh dipilih pada pernyataan yang sama.",
      });
      return;
    }

    if (one && allValid && checkSame.length === 0) {
      try {
        const disc = new CalculateDISC(field);
        disc.convertData();
        const result = disc.calculate();
        console.log({ result });

        await Promise.all(
          ["1", "2", "3"].map((val) => {
            return createDisc({
              disc: {
                label: result[val as "1" | "2" | "3"].name,
                behavior: result[val as "1" | "2" | "3"].value.behavior,
                description: result[val as "1" | "2" | "3"].value.desc,
                jobs: result[val as "1" | "2" | "3"].value.jobs,
                type: result[val as "1" | "2" | "3"].value.type,
                name: result[val as "1" | "2" | "3"].value.name,
                candidate: "will be filled with candidate_id",
                project: "will be filled with project_id",
                disc_score: {
                  d_score: result[val as "1" | "2" | "3"].line.d,
                  i_score: result[val as "1" | "2" | "3"].line.i,
                  s_score: result[val as "1" | "2" | "3"].line.s,
                  c_score: result[val as "1" | "2" | "3"].line.c,
                },
              },
            });
          })
        );

        toast.success("Test berhasil diselesaikan!", {
          description: "DISC test telah berhasil disubmit.",
        });
      } catch (error: unknown) {
        console.log(error);
        toast.error("Terjadi kesalahan", {
          description: "Silakan coba lagi.",
        });
      }
    }
  };

  const completedQuestions = field.filter((item) => {
    const { answer } = item;
    const isPChecked =
      answer.p1.isChecked ||
      answer.p2.isChecked ||
      answer.p3.isChecked ||
      answer.p4.isChecked;
    const isKChecked =
      answer.k1.isChecked ||
      answer.k2.isChecked ||
      answer.k3.isChecked ||
      answer.k4.isChecked;
    return isPChecked && isKChecked;
  }).length;

  const progressPercentage = (completedQuestions / discQuestion.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Toaster position="bottom-right" richColors closeButton />

        {/* Camera Component */}
        <div className="mb-8">
          <CameraComponent candidateId="" projectId="" psikotestId="" />
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-light text-black tracking-tight">
                DISC Assessment
              </h1>
              <p className="text-gray-600 mt-2">Behavioral Style Assessment</p>
            </div>
          </div>
          <div className="w-24 h-px bg-black"></div>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-black">Progress</span>
              </div>
              <span className="text-sm text-gray-600">
                {completedQuestions} / {discQuestion.length} questions completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Instructions Section */}
        <Alert className="mb-12 border-gray-200 bg-gray-50">
          <AlertTriangle className="h-5 w-5 text-black" />
          <AlertDescription className="text-black">
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-black">Instruksi:</h2>
              <p className="leading-relaxed">
                Setiap nomor di bawah ini memuat{" "}
                <strong>4 (empat) kalimat</strong>.
              </p>
              <div className="space-y-2">
                <p>
                  <strong>1.</strong> Beri tanda [✓] pada kolom di bawah huruf{" "}
                  <strong>[P]</strong> di samping kalimat yang{" "}
                  <strong>PALING menggambarkan diri anda</strong>
                </p>
                <p>
                  <strong>2.</strong> Beri tanda [✓] pada kolom di bawah huruf{" "}
                  <strong>[K]</strong> di samping kalimat yang{" "}
                  <strong>PALING TIDAK menggambarkan diri anda</strong>
                </p>
              </div>
              <p className="font-medium">
                <strong>PERHATIKAN:</strong> Setiap nomor hanya ada{" "}
                <strong>1 (satu)</strong> tanda [✓] di bawah masing-masing kolom
                P dan K.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
            {discQuestion.map((val, index) => (
              <Card
                key={index}
                className={`border transition-all duration-200 hover:shadow-md ${
                  completedQuestions > index
                    ? "border-black shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                        completedQuestions > index
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {val.no}
                    </div>
                    <div className="text-sm text-gray-500">
                      Question {val.no}
                    </div>
                  </div>

                  {/* Column Headers */}
                  <div className="flex gap-4 mb-4 pl-4">
                    <div className="w-6 text-center">
                      <span className="text-sm font-medium text-black">P</span>
                      <div className="text-xs text-gray-500 mt-1">Most</div>
                    </div>
                    <div className="w-6 text-center">
                      <span className="text-sm font-medium text-black">K</span>
                      <div className="text-xs text-gray-500 mt-1">Least</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Option A */}
                    <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150">
                      <Checkbox
                        checked={
                          field.find((valField) => valField.no === val.no)
                            ?.answer.p1.isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(!!checked, val.no, "p1", 1)
                        }
                        className="mt-1"
                      />
                      <Checkbox
                        checked={
                          field.find((valField) => valField.no === val.no)
                            ?.answer.k1.isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(!!checked, val.no, "k1", 1)
                        }
                        className="mt-1"
                      />
                      <Label className="text-gray-800 leading-relaxed cursor-pointer flex-1 font-normal">
                        {val.ques.a}
                      </Label>
                    </div>

                    {/* Option B */}
                    <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150">
                      <Checkbox
                        checked={
                          field.find((valField) => valField.no === val.no)
                            ?.answer.p2.isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(!!checked, val.no, "p2", 2)
                        }
                        className="mt-1"
                      />
                      <Checkbox
                        checked={
                          field.find((valField) => valField.no === val.no)
                            ?.answer.k2.isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(!!checked, val.no, "k2", 2)
                        }
                        className="mt-1"
                      />
                      <Label className="text-gray-800 leading-relaxed cursor-pointer flex-1 font-normal">
                        {val.ques.b}
                      </Label>
                    </div>

                    {/* Option C */}
                    <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150">
                      <Checkbox
                        checked={
                          field.find((valField) => valField.no === val.no)
                            ?.answer.p3.isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(!!checked, val.no, "p3", 3)
                        }
                        className="mt-1"
                      />
                      <Checkbox
                        checked={
                          field.find((valField) => valField.no === val.no)
                            ?.answer.k3.isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(!!checked, val.no, "k3", 3)
                        }
                        className="mt-1"
                      />
                      <Label className="text-gray-800 leading-relaxed cursor-pointer flex-1 font-normal">
                        {val.ques.c}
                      </Label>
                    </div>

                    {/* Option D */}
                    <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150">
                      <Checkbox
                        checked={
                          field.find((valField) => valField.no === val.no)
                            ?.answer.p4.isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(!!checked, val.no, "p4", 4)
                        }
                        className="mt-1"
                      />
                      <Checkbox
                        checked={
                          field.find((valField) => valField.no === val.no)
                            ?.answer.k4.isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(!!checked, val.no, "k4", 4)
                        }
                        className="mt-1"
                      />
                      <Label className="text-gray-800 leading-relaxed cursor-pointer flex-1 font-normal">
                        {val.ques.d}
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Section */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {completedQuestions < discQuestion.length && (
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  {discQuestion.length - completedQuestions} questions remaining
                </span>
              )}
              {completedQuestions === discQuestion.length && (
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  All questions completed
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors duration-200"
              disabled={completedQuestions !== discQuestion.length || isLoading}
            >
              Submit Test
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Disc;
