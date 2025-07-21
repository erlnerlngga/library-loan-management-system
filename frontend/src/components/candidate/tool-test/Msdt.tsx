import React, { useState } from "react";
import { CalculateMsdt } from "../../../utils/calculation/calculate-msdt.ts";
import { msdtQuestion } from "../../../utils/data/question/msdt.ts";
import { CameraComponent } from "../camera.tsx";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { AlertTriangle, CheckCircle2, Clock, Target } from "lucide-react";
import { useCreateMsdtMutation } from "@/state/api.ts";

const Msdt = () => {
  const [createMsdt, { isLoading }] = useCreateMsdtMutation();

  const [valueRadio, setValueRadio] = useState<
    { answer: string; no: number }[]
  >([]);

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    no: number
  ) => {
    const curr = valueRadio.find((val) => val.no === no);
    if (curr) {
      setValueRadio(
        valueRadio.map((val) =>
          val.no === no ? { ...val, answer: e.target.value } : val
        )
      );
    } else {
      setValueRadio([...valueRadio, { answer: e.target.value, no }]);
    }
  };

  const handleValueChange = (value: string, questionNo: number) => {
    const syntheticEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>;

    handleRadioChange(syntheticEvent, questionNo);
  };

  const getSelectedValue = (questionNo: number) => {
    const found = valueRadio.find((valRadio) => valRadio.no === questionNo);
    return found?.answer || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (valueRadio.length !== 64) {
        toast.error("Terdapat soal yang belum dijawab", {
          description: "Silakan lengkapi semua 64 pertanyaan sebelum submit.",
        });
        return;
      }

      console.log({ valueRadio });
      const res = new CalculateMsdt(valueRadio);
      const result = res.calculate();
      console.log({ result });

      if (!result) {
        throw new Error("Something went wrong!");
      }

      await createMsdt({
        msdt: {
          label: result.label,
          description: result.desc,
          candidate: "candidate-id-placeholder",
          project: "project-id-placeholder",
        },
      });

      toast.success("Test berhasil diselesaikan!", {
        description: "MSDT test telah berhasil disubmit.",
      });
    } catch (error) {
      toast.success("Test berhasil diselesaikan!", {
        description: `${error}`,
      });
    }
  };

  const progressPercentage = (valueRadio.length / 64) * 100;

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
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-light text-black tracking-tight">
                MSDT Assessment
              </h1>
              <p className="text-gray-600 mt-2">
                Management Style Diagnostic Test
              </p>
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
                {valueRadio.length} / 64 questions completed
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
                Pilihlah jawaban <strong>"A"</strong> atau <strong>"B"</strong>{" "}
                pada pasangan pernyataan-pernyataan berikut. Pilih pernyataan
                yang paling sesuai dengan diri Anda.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
            {msdtQuestion.map((val, index) => (
              <Card
                key={index}
                className={`border transition-all duration-200 hover:shadow-md ${
                  getSelectedValue(val.no)
                    ? "border-black shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                        getSelectedValue(val.no)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {val.no}
                    </div>
                    <div className="text-sm text-gray-500">
                      Question {val.no} of 64
                    </div>
                  </div>

                  <RadioGroup
                    value={getSelectedValue(val.no)}
                    onValueChange={(value) => handleValueChange(value, val.no)}
                    className="space-y-4"
                  >
                    <div className="group">
                      <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150">
                        <div className="flex items-center gap-3">
                          <span className="inline-block w-6 h-6 bg-black text-white text-xs font-medium rounded-full text-center leading-6">
                            A
                          </span>
                          <RadioGroupItem
                            value="A"
                            id={`question-${val.no}-A`}
                            className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                          />
                        </div>
                        <div className="flex-1">
                          <Label
                            htmlFor={`question-${val.no}-A`}
                            className="text-gray-800 leading-relaxed cursor-pointer font-normal block"
                          >
                            {val.a}
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150">
                        <div className="flex items-center gap-3">
                          <span className="inline-block w-6 h-6 bg-black text-white text-xs font-medium rounded-full text-center leading-6">
                            B
                          </span>
                          <RadioGroupItem
                            value="B"
                            id={`question-${val.no}-B`}
                            className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                          />
                        </div>
                        <div className="flex-1">
                          <Label
                            htmlFor={`question-${val.no}-B`}
                            className="text-gray-800 leading-relaxed cursor-pointer font-normal block"
                          >
                            {val.b}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Section */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {valueRadio.length < 64 && (
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  {64 - valueRadio.length} questions remaining
                </span>
              )}
              {valueRadio.length === 64 && (
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  All questions completed
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors duration-200"
              disabled={valueRadio.length !== 64 || isLoading}
            >
              Submit Test
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Msdt;
