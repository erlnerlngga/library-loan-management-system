/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useState } from "react";
import { CalculateIst } from "../../../utils/calculation/calculate-ist.ts";
import {
  an_question,
  fa_question,
  ge_question,
  me_question,
  ra_question,
  se_question,
  wa_question,
  wu_question,
  zr_question,
} from "../../../utils/data/question/ist/question.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, ChevronRight, Send } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useCreateIstMutation } from "@/state/api.ts";

export enum IST_TEST {
  SE,
  WA,
  AN,
  GE,
  RA,
  ZR,
  FA,
  WU,
  ME,
  ME2,
}

type ist_arr = "se" | "wa" | "an" | "ge" | "ra" | "zr" | "fa" | "wu" | "me";

type Props = {
  currIndex: IST_TEST;
  onHandleNextIndex: () => void;
  umur: number;
};

const FormIst = forwardRef<HTMLFormElement, Props>(function FormIst(
  { currIndex, onHandleNextIndex, umur },
  ref
) {
  const [createIst, { isLoading }] = useCreateIstMutation();

  const [values, setValues] = useState({
    AN: an_question.map((val) => ({ answer: "", no: val.no })),
    FA: fa_question.map((val) => ({ answer: "", no: val.no })),
    GE: ge_question.map((val) => ({ answer: "", no: val.no })),
    ME: me_question.map((val) => ({ answer: "", no: val.no })),
    RA: ra_question.map((val) => ({ answer: "", no: val.no })),
    SE: se_question.map((val) => ({ answer: "", no: val.no })),
    WA: wa_question.map((val) => ({ answer: "", no: val.no })),
    WU: wu_question.map((val) => ({ answer: "", no: val.no })),
    ZR: zr_question.map((val) => ({ answer: "", no: val.no })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("test");
      const ist = new CalculateIst(values, umur);
      const result = ist.calculate();
      console.log(result);

      await createIst({
        ist: {
          iq: result.iq,
          description: result.description,
          candidate: "will be candidate",
          project: "will be project",
          ist_score: ["se", "wa", "an", "ge", "ra", "zr", "fa", "wu", "me"].map(
            (test) => {
              return {
                score: result.sw[test as ist_arr].value,
                label: test,
                description: result.sw[test as ist_arr].label,
              };
            }
          ),
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

  const handleRadioChange = (value: string, no: number, test: string) => {
    setValues((prev) => ({
      ...prev,
      [test]: prev[test as keyof typeof prev].map((tes: any) =>
        tes.no === no ? { ...tes, answer: value } : tes
      ),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    no: number,
    test: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [test]: prev[test as keyof typeof prev].map((tes: any) =>
        tes.no === no ? { ...tes, answer: e.target.value } : tes
      ),
    }));
  };

  const getSelectedValue = (testArray: any[], no: number) => {
    const found = testArray.find((item) => item.no === no);
    return found?.answer || "";
  };

  const sectionTitles: Record<IST_TEST, string> = {
    [IST_TEST.SE]: "Sentence Completion",
    [IST_TEST.WA]: "Word Analogies",
    [IST_TEST.AN]: "Analogies",
    [IST_TEST.GE]: "Generalization",
    [IST_TEST.RA]: "Reasoning",
    [IST_TEST.ZR]: "Number Reasoning",
    [IST_TEST.FA]: "Figure Analogies",
    [IST_TEST.WU]: "Word Understanding",
    [IST_TEST.ME]: "Memory",
    [IST_TEST.ME2]: "Memory Recall",
  };

  return (
    <form onSubmit={handleSubmit} ref={ref} className="space-y-8">
      <Toaster position="bottom-right" richColors closeButton />
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-black mb-2">
          Section {currIndex + 1}: {sectionTitles[currIndex]}
        </h2>
        <div className="w-16 h-px bg-black"></div>
      </div>

      {/* SE - Sentence Completion */}
      {currIndex === IST_TEST.SE && (
        <div className="space-y-6">
          {values.SE.map((field, index) => {
            const data = se_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <p className="text-lg font-medium text-black">{`Question ${data.no}`}</p>
                    </div>

                    <RadioGroup
                      value={getSelectedValue(values.SE, field.no)}
                      onValueChange={(value) =>
                        handleRadioChange(value, field.no, "SE")
                      }
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {["a", "b", "c", "d", "e"].map((suffix) => (
                          <div
                            key={suffix}
                            className="flex items-center space-x-3"
                          >
                            <RadioGroupItem
                              value={suffix}
                              id={`question-SE-${field.no}-${suffix}`}
                              className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                            />
                            <Label
                              htmlFor={`question-SE-${field.no}-${suffix}`}
                              className="text-gray-800 cursor-pointer font-normal flex-1"
                            >
                              {
                                data.choice[
                                  suffix as "a" | "b" | "c" | "d" | "e"
                                ]
                              }
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* WA - Word Analogies */}
      {currIndex === IST_TEST.WA && (
        <div className="space-y-6">
          {values.WA.map((field, index) => {
            const data = wa_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <p className="text-lg font-medium text-black">{`Question ${data.no}`}</p>
                    </div>

                    <RadioGroup
                      value={getSelectedValue(values.WA, field.no)}
                      onValueChange={(value) =>
                        handleRadioChange(value, field.no, "WA")
                      }
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {["a", "b", "c", "d", "e"].map((suffix) => (
                          <div
                            key={suffix}
                            className="flex items-center space-x-3"
                          >
                            <RadioGroupItem
                              value={suffix}
                              id={`question-WA-${field.no}-${suffix}`}
                              className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                            />
                            <Label
                              htmlFor={`question-WA-${field.no}-${suffix}`}
                              className="text-gray-800 cursor-pointer font-normal flex-1"
                            >
                              {
                                data.choice[
                                  suffix as "a" | "b" | "c" | "d" | "e"
                                ]
                              }
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* AN - Analogies */}
      {currIndex === IST_TEST.AN && (
        <div className="space-y-6">
          {values.AN.map((field, index) => {
            const data = an_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <p className="text-lg font-medium text-black">{`${data.no}. ${data.question}`}</p>
                    </div>

                    <RadioGroup
                      value={getSelectedValue(values.AN, field.no)}
                      onValueChange={(value) =>
                        handleRadioChange(value, field.no, "AN")
                      }
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {["a", "b", "c", "d", "e"].map((suffix) => (
                          <div
                            key={suffix}
                            className="flex items-center space-x-3"
                          >
                            <RadioGroupItem
                              value={suffix}
                              id={`question-AN-${field.no}-${suffix}`}
                              className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                            />
                            <Label
                              htmlFor={`question-AN-${field.no}-${suffix}`}
                              className="text-gray-800 cursor-pointer font-normal flex-1"
                            >
                              {
                                data.choice[
                                  suffix as "a" | "b" | "c" | "d" | "e"
                                ]
                              }
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* GE - Generalization */}
      {currIndex === IST_TEST.GE && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.GE.map((field, index) => {
            const data = ge_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <p className="text-lg font-medium text-black">{`${data.no}. ${data.question}`}</p>
                    </div>
                    <Input
                      value={getSelectedValue(values.GE, field.no)}
                      onChange={(e) => handleInputChange(e, field.no, "GE")}
                      placeholder="Type your answer here"
                      className="border-gray-200 focus:border-black focus:ring-1 focus:ring-black h-11 bg-white"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* RA - Reasoning */}
      {currIndex === IST_TEST.RA && (
        <div className="space-y-6">
          {values.RA.map((field, index) => {
            const data = ra_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <p className="text-lg font-medium text-black">{`${data.no}. ${data.question}`}</p>
                    </div>
                    <Input
                      value={getSelectedValue(values.RA, field.no)}
                      onChange={(e) => handleInputChange(e, field.no, "RA")}
                      placeholder="Type your answer here"
                      className="border-gray-200 focus:border-black focus:ring-1 focus:ring-black h-11 bg-white"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ZR - Number Reasoning */}
      {currIndex === IST_TEST.ZR && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.ZR.map((field, index) => {
            const data = zr_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <p className="text-lg font-medium text-black">{`${data.no}. ${data.question}`}</p>
                    </div>
                    <Input
                      value={getSelectedValue(values.ZR, field.no)}
                      onChange={(e) => handleInputChange(e, field.no, "ZR")}
                      placeholder="Type your answer here"
                      className="border-gray-200 focus:border-black focus:ring-1 focus:ring-black h-11 bg-white"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* FA - Figure Analogies */}
      {currIndex === IST_TEST.FA && (
        <div className="space-y-8">
          {values.FA.map((field, index) => {
            const data = fa_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <h3 className="text-lg font-medium text-black">
                        Question {data.no}
                      </h3>
                    </div>

                    <div className="flex justify-center mb-8">
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <img
                          alt={`Question ${data.no}`}
                          src={data.img || "/placeholder.svg"}
                          className="max-w-full h-auto"
                        />
                      </div>
                    </div>

                    <RadioGroup
                      value={getSelectedValue(values.FA, field.no)}
                      onValueChange={(value) =>
                        handleRadioChange(value, field.no, "FA")
                      }
                    >
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {["a", "b", "c", "d", "e"].map((suffix) => (
                          <div
                            key={suffix}
                            className="flex flex-col items-center space-y-4"
                          >
                            <div className="border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-300 transition-colors">
                              <img
                                alt={`Option ${suffix.toUpperCase()}`}
                                src={
                                  data.choice[
                                    suffix as "a" | "b" | "c" | "d" | "e"
                                  ] || "/placeholder.svg"
                                }
                                className="w-24 h-24 object-contain"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={suffix}
                                id={`question-FA-${field.no}-${suffix}`}
                                className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                              />
                              <Label
                                htmlFor={`question-FA-${field.no}-${suffix}`}
                                className="text-sm font-medium text-black cursor-pointer"
                              >
                                {suffix.toUpperCase()}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* WU - Word Understanding */}
      {currIndex === IST_TEST.WU && (
        <div className="space-y-8">
          {values.WU.map((field, index) => {
            const data = wu_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <h3 className="text-lg font-medium text-black">
                        Question {data.no}
                      </h3>
                    </div>

                    <div className="flex justify-center mb-8">
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <img
                          alt={`Question ${data.no}`}
                          src={data.img || "/placeholder.svg"}
                          className="max-w-full h-auto"
                        />
                      </div>
                    </div>

                    <RadioGroup
                      value={getSelectedValue(values.WU, field.no)}
                      onValueChange={(value) =>
                        handleRadioChange(value, field.no, "WU")
                      }
                    >
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {["a", "b", "c", "d", "e"].map((suffix) => (
                          <div
                            key={suffix}
                            className="flex flex-col items-center space-y-4"
                          >
                            <div className="border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-300 transition-colors">
                              <img
                                alt={`Option ${suffix.toUpperCase()}`}
                                src={
                                  data.choice[
                                    suffix as "a" | "b" | "c" | "d" | "e"
                                  ] || "/placeholder.svg"
                                }
                                className="w-24 h-24 object-contain"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={suffix}
                                id={`question-WU-${field.no}-${suffix}`}
                                className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                              />
                              <Label
                                htmlFor={`question-WU-${field.no}-${suffix}`}
                                className="text-sm font-medium text-black cursor-pointer"
                              >
                                {suffix.toUpperCase()}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ME - Memory */}
      {currIndex === IST_TEST.ME && (
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-4">
                <Clock className="h-8 w-8 text-gray-600" />
                <h3 className="text-2xl font-medium text-black">
                  Memory Section
                </h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h4 className="text-xl font-semibold text-black mb-6">
                  Hafalkan kata-kata di bawah ini selama 3 menit.
                </h4>

                <div className="space-y-4 text-left max-w-2xl mx-auto">
                  <div className="flex items-start gap-4">
                    <span className="font-medium text-black min-w-[120px]">
                      BUNGA:
                    </span>
                    <span className="text-gray-800">
                      SOKA, LARAT, FLAMBOYAN, YASMIN, DAHLIA
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-medium text-black min-w-[120px]">
                      PERKAKAS:
                    </span>
                    <span className="text-gray-800">
                      WAJAN, JARUM, KIKIR, CANGKUL, PALU
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-medium text-black min-w-[120px]">
                      BURUNG:
                    </span>
                    <span className="text-gray-800">
                      ITIK, ELANG, WALET, TEKUKUR, NURI
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-medium text-black min-w-[120px]">
                      KESENIAN:
                    </span>
                    <span className="text-gray-800">
                      QUINTET, ARCA, OPERA, UKIRAN, GAMELAN
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-medium text-black min-w-[120px]">
                      BINATANG:
                    </span>
                    <span className="text-gray-800">
                      RUSA, MUSANG, BERUANG, HARIMAU, ZEBRA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ME2 - Memory Recall */}
      {currIndex === IST_TEST.ME2 && (
        <div className="space-y-6">
          {values.ME.map((field, index) => {
            const data = me_question.find((val) => val.no === field.no);
            if (!data) return null;

            return (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {data.no}
                      </div>
                      <p className="text-lg font-medium text-black">{`${data.no}. ${data.question}`}</p>
                    </div>

                    <RadioGroup
                      value={getSelectedValue(values.ME, field.no)}
                      onValueChange={(value) =>
                        handleRadioChange(value, field.no, "ME")
                      }
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {["a", "b", "c", "d", "e"].map((suffix) => (
                          <div
                            key={suffix}
                            className="flex items-center space-x-3"
                          >
                            <RadioGroupItem
                              value={suffix}
                              id={`question-ME-${field.no}-${suffix}`}
                              className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                            />
                            <Label
                              htmlFor={`question-ME-${field.no}-${suffix}`}
                              className="text-gray-800 cursor-pointer font-normal flex-1"
                            >
                              {
                                data.choice[
                                  suffix as "a" | "b" | "c" | "d" | "e"
                                ]
                              }
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
        {currIndex !== IST_TEST.ME2 && (
          <Button
            type="button"
            onClick={onHandleNextIndex}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 font-medium flex items-center gap-2"
          >
            Next Section
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        {currIndex === IST_TEST.ME2 && (
          <Button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium flex items-center gap-2"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
            Submit Test
          </Button>
        )}
      </div>
    </form>
  );
});

export default FormIst;
