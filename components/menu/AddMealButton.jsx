export default function AddMealButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-40 h-40 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50 hover:border-none transition duration-500 ease-in-out"
    >
      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
        +
      </div>
    </div>
  );
}
