interface Props {
  amount: number;
  setAmount: (amount: number) => void;
  onAdd: (amount: number) => void;
}

export default function AddQuantitySection({
  amount,
  setAmount,
  onAdd,
}: Props) {
  return (
    <div className="mt-4 flex gap-3">
      <input
        type="number"
        min={0}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value) || 0)}
        placeholder="Amount"
        className="w-1/3 p-3 rounded-2xl border border-gray-300 bg-white/70 backdrop-blur-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
      />
      <button
        type="button"
        onClick={() => onAdd(amount)}
        className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Add Stock
      </button>
    </div>
  );
}
