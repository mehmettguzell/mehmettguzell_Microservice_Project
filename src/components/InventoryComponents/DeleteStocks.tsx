export default function DeleteStocks({ onDelete }: { onDelete: () => void }) {
    return (
    <button
      onClick={onDelete}
      className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
    >
      Delete All Stocks
    </button>
  );
}