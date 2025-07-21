/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useState } from "react";
import { CalculateCfit } from "../../../utils/calculation/calculate-cfit.ts";
import { photoCfit, PhotoCfitKey } from "./photo.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, Send } from "lucide-react";
import { useCreateCfitMutation } from "@/state/api.ts";
import { toast, Toaster } from "sonner";

interface Props {
  currIndex: number;
  onHandleNextIndex: () => void;
  pause: () => void;
}

const FormCfit = forwardRef<HTMLFormElement, Props>(function FormCfit(
  { currIndex, onHandleNextIndex, pause },
  ref
) {
  const [createCfit, { isLoading }] = useCreateCfitMutation();

  const [values, setValues] = useState({
    tes1: Array(13)
      .fill(0)
      .map((_, idx) => ({ answer: "", no: idx + 1 })),
    tes2: Array(14)
      .fill(0)
      .map((_, idx) => ({
        answer: {
          p1: { isChecked: false, value: "a" },
          p2: { isChecked: false, value: "b" },
          p3: { isChecked: false, value: "c" },
          p4: { isChecked: false, value: "d" },
          p5: { isChecked: false, value: "e" },
        },
        no: idx + 14,
      })),
    tes3: Array(13)
      .fill(0)
      .map((_, idx) => ({ answer: "", no: idx + 28 })),
    tes4: Array(10)
      .fill(0)
      .map((_, idx) => ({ answer: "", no: idx + 41 })),
  });

  const handleRadioChange = (value: string, no: number, test: string) => {
    if (test === "tes1") {
      setValues({
        ...values,
        tes1: values.tes1.map((tes) =>
          tes.no === no ? { ...tes, answer: value } : tes
        ),
      });
    }

    if (test === "tes3") {
      setValues({
        ...values,
        tes3: values.tes3.map((tes) =>
          tes.no === no ? { ...tes, answer: value } : tes
        ),
      });
    }

    if (test === "tes4") {
      setValues({
        ...values,
        tes4: values.tes4.map((tes) =>
          tes.no === no ? { ...tes, answer: value } : tes
        ),
      });
    }
  };

  const handleCheckChange = (
    checked: boolean,
    no: number,
    key: string,
    value: string
  ) => {
    setValues({
      ...values,
      tes2: values.tes2.map((tes) =>
        tes.no === no
          ? {
              ...tes,
              answer: {
                ...tes.answer,
                [key]: { isChecked: checked, value },
              },
            }
          : tes
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      pause();
      const cfit = new CalculateCfit(values);
      const result = cfit.calculate();
      console.log(result);

      await createCfit({
        cfit: {
          iq: result.iq,
          rs: result.rs,
          description: result.desc,
          candidate: "will be added",
          project: "will be added",
          cfit_score: ["subtes1", "subtes2", "subtes3", "subtes4"].map(
            (val) => ({
              label: val,
              total_correct: result.score[val as keyof typeof result.score],
            })
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

  const getSelectedValue = (testArray: any[], no: number) => {
    const found = testArray.find((item) => item.no === no);
    return found?.answer || "";
  };

  const sectionTitles = {
    1: "Series Completion",
    2: "Classification",
    3: "Matrices",
    4: "Topology",
  };

  return (
    <form onSubmit={handleSubmit} ref={ref} className="space-y-8">
      <Toaster position="bottom-right" richColors closeButton />
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-black mb-2">
          Section {currIndex}:{" "}
          {sectionTitles[currIndex as keyof typeof sectionTitles]}
        </h2>
        <div className="w-16 h-px bg-black"></div>
      </div>

      {/* Test 1 - Series Completion */}
      {currIndex === 1 &&
        values.tes1.map((field, index) => (
          <Card
            key={index}
            className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-black">
                    Question {index + 1}
                  </h3>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <img
                      alt={`Question ${field.no}`}
                      src={photoCfit[`${field.no}` as PhotoCfitKey]}
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <RadioGroup
                value={getSelectedValue(values.tes1, field.no)}
                onValueChange={(value) =>
                  handleRadioChange(value, field.no, "tes1")
                }
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {["a", "b", "c", "d", "e", "f"].map((suffix) => (
                    <div
                      key={suffix}
                      className="flex flex-col items-center space-y-4"
                    >
                      <div className="border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-300 transition-colors">
                        <img
                          alt={`Option ${suffix.toUpperCase()}`}
                          src={
                            photoCfit[`${field.no}${suffix}` as PhotoCfitKey]
                          }
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={suffix}
                          id={`question-test1-${field.no}-${suffix}`}
                          className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                        <Label
                          htmlFor={`question-test1-${field.no}-${suffix}`}
                          className="text-sm font-medium text-black cursor-pointer"
                        >
                          {suffix.toUpperCase()}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

      {/* Test 2 - Classification */}
      {currIndex === 2 &&
        values.tes2.map((field, index) => (
          <Card
            key={index}
            className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-black">
                    Question {index + 1}
                  </h3>
                  <span className="text-sm text-gray-600">
                    Select 2 different items
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { no: "p1", value: "a" },
                  { no: "p2", value: "b" },
                  { no: "p3", value: "c" },
                  { no: "p4", value: "d" },
                  { no: "p5", value: "e" },
                ].map((suffix) => (
                  <div
                    key={suffix.no}
                    className="flex flex-col items-center space-y-4"
                  >
                    <div className="border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-300 transition-colors">
                      <img
                        alt={`Option ${suffix.value.toUpperCase()}`}
                        src={
                          photoCfit[
                            `${field.no}${suffix.value}` as PhotoCfitKey
                          ]
                        }
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={
                          values.tes2.find(
                            (valField) => valField.no === field.no
                          )?.answer[
                            suffix.no as "p1" | "p2" | "p3" | "p4" | "p5"
                          ].isChecked || false
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(
                            !!checked,
                            field.no,
                            suffix.no,
                            suffix.value
                          )
                        }
                        className="border-2 border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <Label className="text-sm font-medium text-black cursor-pointer">
                        {suffix.value.toUpperCase()}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Test 3 - Matrices */}
      {currIndex === 3 &&
        values.tes3.map((field, index) => (
          <Card
            key={index}
            className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-black">
                    Question {index + 1}
                  </h3>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <img
                      alt={`Question ${field.no}`}
                      src={photoCfit[`${field.no}` as PhotoCfitKey]}
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <RadioGroup
                value={getSelectedValue(values.tes3, field.no)}
                onValueChange={(value) =>
                  handleRadioChange(value, field.no, "tes3")
                }
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {["a", "b", "c", "d", "e", "f"].map((suffix) => (
                    <div
                      key={suffix}
                      className="flex flex-col items-center space-y-4"
                    >
                      <div className="border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-300 transition-colors">
                        <img
                          alt={`Option ${suffix.toUpperCase()}`}
                          src={
                            photoCfit[`${field.no}${suffix}` as PhotoCfitKey]
                          }
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={suffix}
                          id={`question-test3-${field.no}-${suffix}`}
                          className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                        <Label
                          htmlFor={`question-test3-${field.no}-${suffix}`}
                          className="text-sm font-medium text-black cursor-pointer"
                        >
                          {suffix.toUpperCase()}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

      {/* Test 4 - Topology */}
      {currIndex === 4 &&
        values.tes4.map((field, index) => (
          <Card
            key={index}
            className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-black">
                    Question {index + 1}
                  </h3>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <img
                      alt={`Question ${field.no}`}
                      src={photoCfit[`${field.no}` as PhotoCfitKey]}
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <RadioGroup
                value={getSelectedValue(values.tes4, field.no)}
                onValueChange={(value) =>
                  handleRadioChange(value, field.no, "tes4")
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {["a", "b", "c", "d", "e"].map((suffix) => (
                    <div
                      key={suffix}
                      className="flex flex-col items-center space-y-4"
                    >
                      <div className="border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-300 transition-colors">
                        <img
                          alt={`Option ${suffix.toUpperCase()}`}
                          src={
                            photoCfit[`${field.no}${suffix}` as PhotoCfitKey]
                          }
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={suffix}
                          id={`question-test4-${field.no}-${suffix}`}
                          className="border-2 border-gray-300 text-black focus:ring-black focus:ring-offset-0 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                        <Label
                          htmlFor={`question-test4-${field.no}-${suffix}`}
                          className="text-sm font-medium text-black cursor-pointer"
                        >
                          {suffix.toUpperCase()}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
        {currIndex !== 4 && (
          <Button
            type="button"
            onClick={() => {
              pause();
              onHandleNextIndex();
            }}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 font-medium flex items-center gap-2"
          >
            Next Section
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        {currIndex === 4 && (
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

export default FormCfit;
