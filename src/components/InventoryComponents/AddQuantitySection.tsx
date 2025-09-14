interface Props {
  amount: number;
  setAmount: (amount: number) => void;
  onAdd: (amount: number) => void;
}

export default function AddQuantitySection({ amount, setAmount, onAdd }: Props) {
  return (
    <div className="mt-4 flex gap-2">
      <input
        type="number"
        min={0}
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
        className="w-1/3 border border-gray-300 rounded-lg p-2"
        placeholder="Amount"
      />
      <button
        onClick={() => onAdd(amount)}
        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        Add Stock
      </button>
    </div>
  );
}