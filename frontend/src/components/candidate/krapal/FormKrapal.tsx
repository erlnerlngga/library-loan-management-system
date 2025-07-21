import { useEffect, useState } from "react";
import { Numpad } from "./numpad.tsx";
import { Card, CardContent } from "@/components/ui/card";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type Props = {
  TOTAL_INDEX: number;
  handleAddTotalResult: (result: { answer: number; no: number }[]) => void;
  handleSubmit: () => void;
  setSkip: (value: boolean) => void;
  setTotalIndex: (index: number) => void;
  skip: boolean;
  totalIndex: number;
};

const FormKrapal = ({
  TOTAL_INDEX,
  handleAddTotalResult,
  handleSubmit,
  setSkip,
  setTotalIndex,
  skip,
  totalIndex,
}: Props) => {
  const [index, setIndex] = useState(1);
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [result, setResult] = useState<{ answer: number; no: number }[]>([]);

  const handleNext = () => {
    setA(b);
    setB(getRandomInt(10));
    setIndex(index + 1);
  };

  const handleDisplay = (value: number) => {
    const res = value === total ? 1 : 0;
    setResult([...result, { answer: res, no: index }]);

    setTimeout(() => {
      handleNext();
    }, 300);
  };

  useEffect(() => {
    if (skip) {
      handleAddTotalResult(result);
      setResult([]);
      setTotalIndex(totalIndex + 1);
      setIndex(1);
      setSkip(false);
    }
  }, [handleAddTotalResult, result, setSkip, setTotalIndex, skip, totalIndex]);

  useEffect(() => {
    if (index === 28) {
      setSkip(true);
    }
  }, [index, setSkip]);

  useEffect(() => {
    if (totalIndex === TOTAL_INDEX) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalIndex]);

  useEffect(() => {
    setA(getRandomInt(10));
    setB(getRandomInt(10));
  }, []);

  useEffect(() => {
    const res = a + b;
    setTotal(res % 10);
  }, [a, b]);

  return (
    <div className="flex justify-center">
      {totalIndex !== TOTAL_INDEX ? (
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-12">
            <div className="space-y-8">
              {/* Instructions */}
              <div className="text-center space-y-4">
                <h3 className="text-xl font-medium text-black">
                  Question {index} of 27
                </h3>
                <p className="text-gray-600">
                  Add the two numbers and enter the last digit of the result
                </p>
                <div className="w-16 h-px bg-black mx-auto"></div>
              </div>

              {/* Math Problem */}
              <div className="flex items-center justify-center gap-12">
                <div className="text-center space-y-6">
                  <div className="space-y-4">
                    <div className="text-6xl font-light text-black tracking-tight">
                      {a}
                    </div>
                    <div className="text-4xl font-light text-gray-400">+</div>
                    <div className="text-6xl font-light text-black tracking-tight">
                      {b}
                    </div>
                    <div className="w-16 h-px bg-black mx-auto"></div>
                    <div className="text-2xl font-medium text-gray-600">
                      Last digit = ?
                    </div>
                  </div>
                </div>

                {/* Numpad */}
                <div className="ml-8">
                  <Numpad handleDisplay={handleDisplay} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">😊</span>
              </div>
              <h1 className="text-4xl font-light text-black tracking-tight">
                Thank you!
              </h1>
              <p className="text-gray-600">
                The Krapal test has been completed successfully.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FormKrapal;
