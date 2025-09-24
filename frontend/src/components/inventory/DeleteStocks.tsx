export default function DeleteStocks({ onDelete }: { onDelete: () => void }) {
  return (
    <button
      onClick={onDelete}
      className="mt-4 w-full bg-red-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-red-600 hover:shadow-xl active:scale-95 transition-all duration-300"
    >
      Delete All Stocks
    </button>
  );
}
