export const Numpad = ({
  handleDisplay,
}: {
  handleDisplay: (value: number) => void;
}) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid grid-cols-2 gap-4 max-w-xs">
      {numbers.map((num) => (
        <button
          key={num}
          onClick={() => handleDisplay(num)}
          className="w-16 h-16 bg-white border-2 border-gray-300 hover:border-black hover:bg-gray-50 rounded-lg text-2xl font-medium text-black transition-all duration-200 flex items-center justify-center"
        >
          {num}
        </button>
      ))}
    </div>
  );
};
