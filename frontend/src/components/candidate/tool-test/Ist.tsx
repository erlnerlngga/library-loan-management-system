import { useEffect, useRef, useState } from "react";
import { useCountdown } from "@/hooks/use-countdown.tsx";
import { CameraComponent } from "../camera.tsx";
import FormIst from "../ist/FormIst.tsx";
import { istPhoto } from "../ist/photo.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Brain, Play, Clock } from "lucide-react";

enum IST_TEST {
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

const Ist = () => {
  const inputTime = 60;
  const formRef = useRef<HTMLFormElement | null>(null);
  const [currIndex, setCurrIndex] = useState<number>(IST_TEST.SE);

  const { formattedTime, progress, reset, setTime, start } = useCountdown({
    initialSeconds: 0,
    onComplete() {
      if (currIndex === IST_TEST.ME2) {
        handleComplete();
      } else {
        onHandleNextIndex();
      }
    },
  });
  const [begin, setBegin] = useState<boolean>(true);

  const onHandleNextIndex = () => {
    if (currIndex === IST_TEST.SE) {
      reset();
      setCurrIndex(IST_TEST.WA);
      setBegin(true);
    }
    if (currIndex === IST_TEST.WA) {
      reset();
      setCurrIndex(IST_TEST.AN);
      setBegin(true);
    }
    if (currIndex === IST_TEST.AN) {
      reset();
      setCurrIndex(IST_TEST.GE);
      setBegin(true);
    }
    if (currIndex === IST_TEST.GE) {
      reset();
      setCurrIndex(IST_TEST.RA);
      setBegin(true);
    }
    if (currIndex === IST_TEST.RA) {
      reset();
      setCurrIndex(IST_TEST.ZR);
      setBegin(true);
    }
    if (currIndex === IST_TEST.ZR) {
      reset();
      setCurrIndex(IST_TEST.FA);
      setBegin(true);
    }
    if (currIndex === IST_TEST.FA) {
      reset();
      setCurrIndex(IST_TEST.WU);
      setBegin(true);
    }
    if (currIndex === IST_TEST.WU) {
      reset();
      setCurrIndex(IST_TEST.ME);
      setBegin(true);
    }
    if (currIndex === IST_TEST.ME) {
      reset();
      setCurrIndex(IST_TEST.ME2);
    }
  };

  useEffect(() => {
    if (currIndex === IST_TEST.SE) {
      setTime(6 * inputTime);
    }
    if (currIndex === IST_TEST.WA) {
      setTime(6 * inputTime);
    }
    if (currIndex === IST_TEST.AN) {
      setTime(7 * inputTime);
    }
    if (currIndex === IST_TEST.GE) {
      setTime(8 * inputTime);
    }
    if (currIndex === IST_TEST.RA) {
      setTime(10 * inputTime);
    }
    if (currIndex === IST_TEST.ZR) {
      setTime(10 * inputTime);
    }
    if (currIndex === IST_TEST.FA) {
      setTime(7 * inputTime);
    }
    if (currIndex === IST_TEST.WU) {
      setTime(9 * inputTime);
    }
    if (currIndex === IST_TEST.ME) {
      setTime(3 * inputTime);
    }
    if (currIndex === IST_TEST.ME2) {
      setTime(6 * inputTime);
    }
  }, [currIndex, setTime, inputTime]);

  useEffect(() => {
    if (!begin) {
      start();
    }
  }, [currIndex, begin, start]);

  const handleComplete = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
      console.log("FINISH");
    }
  };

  const testNames: Record<IST_TEST, string> = {
    [IST_TEST.SE]: "Sentence Completion",
    [IST_TEST.WA]: "Word Analogies",
    [IST_TEST.AN]: "Analogies",
    [IST_TEST.GE]: "Generalization",
    [IST_TEST.RA]: "Reasoning",
    [IST_TEST.ZR]: "Number Reasoning",
    [IST_TEST.FA]: "Figure Analogies",
    [IST_TEST.WU]: "Word Understanding",
    [IST_TEST.ME]: "Memory",
    [IST_TEST.ME2]: "Memory 2",
  };

  const testInstructions: Record<IST_TEST, string> = {
    [IST_TEST.SE]: istPhoto.se_how,
    [IST_TEST.WA]: istPhoto.wa_how,
    [IST_TEST.AN]: istPhoto.an_how,
    [IST_TEST.GE]: istPhoto.ge_how,
    [IST_TEST.RA]: istPhoto.ra_how,
    [IST_TEST.ZR]: istPhoto.zr_how,
    [IST_TEST.FA]: istPhoto.fa_how,
    [IST_TEST.WU]: istPhoto.wu_how,
    [IST_TEST.ME]: istPhoto.me_how,
    [IST_TEST.ME2]: istPhoto.me_how,
  };

  if (begin) {
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
                  IST Test
                </h1>
                <p className="text-gray-600 mt-2">
                  Intelligence Structure Test
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
                    {currIndex + 1}
                  </div>
                  <h2 className="text-2xl font-medium text-black">
                    Section {currIndex + 1}: {testNames[currIndex as IST_TEST]}
                  </h2>
                </div>

                <div className="flex justify-center py-8">
                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <img
                      alt={`${testNames[currIndex as IST_TEST]} instructions`}
                      src={
                        testInstructions[currIndex as IST_TEST] ||
                        "/placeholder.svg"
                      }
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                  <Button
                    onClick={() => {
                      setBegin(false);
                    }}
                    className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start Section {currIndex + 1}
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
                    {testNames[currIndex as IST_TEST]} - Time Remaining
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
              <FormIst
                currIndex={currIndex}
                onHandleNextIndex={onHandleNextIndex}
                ref={formRef}
                umur={0}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ist;
