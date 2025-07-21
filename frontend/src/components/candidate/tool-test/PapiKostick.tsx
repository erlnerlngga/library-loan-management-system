import React, { useState } from "react";
import { CalculatePapi } from "../../../utils/calculation/calculate-papi-kostick.ts";
import { papiQuestion } from "../../../utils/data/question/papi-kostick.ts";
import { CameraComponent } from "../camera.tsx";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { AlertTriangle, CheckCircle2, Clock, Users } from "lucide-react";
import { useCreatePapiKostikMutation } from "@/state/api.ts";

type PAPI_TYPE =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "I"
  | "K"
  | "L"
  | "N"
  | "O"
  | "P"
  | "R"
  | "S"
  | "T"
  | "V"
  | "W"
  | "X"
  | "Z";

const PapiKostick = () => {
  const [createPapiKostik, { isLoading }] = useCreatePapiKostikMutation();

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

      if (valueRadio.length !== 90) {
        toast.error("Terdapat soal yang belum dijawab", {
          description: "Silakan lengkapi semua 90 pertanyaan sebelum submit.",
        });
        return;
      }

      // console.log({ valueRadio });
      const papi = new CalculatePapi(valueRadio);
      const result = papi.Calculate();
      console.log({ result });

      const papiKostikScore = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "I",
        "K",
        "L",
        "N",
        "O",
        "P",
        "R",
        "S",
        "T",
        "V",
        "W",
        "X",
        "Z",
      ].map((item) => {
        return {
          factor: item,
          score: result[item as PAPI_TYPE].score,
          message: result[item as PAPI_TYPE].msg,
          category: result[item as PAPI_TYPE].type,
        };
      });

      await createPapiKostik({
        papi_kostik: {
          candidate: "will be candidate id",
          project: "will be project id",
          papi_kostik_score: papiKostikScore,
        },
      });

      toast.success("Test berhasil diselesaikan!", {
        description: "PAPI Kostick test telah berhasil disubmit.",
      });
    } catch (error) {
      toast.error("Test Gagal!", {
        description: `${error}`,
      });
    }
  };

  const progressPercentage = (valueRadio.length / 90) * 100;

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
                PAPI Kostick Test
              </h1>
              <p className="text-gray-600 mt-2">
                Personality and Preference Inventory
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
                {valueRadio.length} / 90 questions completed
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
                Di dalam buku terdapat <strong>90 pasang pernyataan</strong>.
                Pilihlah satu pernyataan dari pasangan pernyataan itu yang anda
                rasakan <strong>paling mendekati gambaran diri anda</strong>,
                atau yang paling menunjukkan perasaan anda.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
            {papiQuestion.map((val, index) => (
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
                      Question {val.no} of 90
                    </div>
                  </div>

                  <RadioGroup
                    value={getSelectedValue(val.no)}
                    onValueChange={(value) => handleValueChange(value, val.no)}
                    className="space-y-4"
                  >
                    <div className="group">
                      <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150">
                        <RadioGroupItem
                          value="A"
                          id={`question-${val.no}-A`}
                          className="mt-1 border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={`question-${val.no}-A`}
                            className="text-gray-800 leading-relaxed cursor-pointer font-normal block"
                          >
                            <span className="inline-block w-6 h-6 bg-black text-white text-xs font-medium rounded-full text-center leading-6 mr-3">
                              A
                            </span>
                            {val.a}
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150">
                        <RadioGroupItem
                          value="B"
                          id={`question-${val.no}-B`}
                          className="mt-1 border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={`question-${val.no}-B`}
                            className="text-gray-800 leading-relaxed cursor-pointer font-normal block"
                          >
                            <span className="inline-block w-6 h-6 bg-black text-white text-xs font-medium rounded-full text-center leading-6 mr-3">
                              B
                            </span>
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
              {valueRadio.length < 90 && (
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  {90 - valueRadio.length} questions remaining
                </span>
              )}
              {valueRadio.length === 90 && (
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  All questions completed
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors duration-200"
              disabled={valueRadio.length !== 90 || isLoading}
            >
              Submit Test
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PapiKostick;
