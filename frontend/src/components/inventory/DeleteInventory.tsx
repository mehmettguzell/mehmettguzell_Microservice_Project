export default function DeleteInventory({
  onDeleteInventory,
  id,
}: {
  onDeleteInventory: (id: string) => void;
  id: string;
}) {
  return (
    <button
      onClick={() => onDeleteInventory(id)}
      className="text-sm bg-red-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-red-600 hover:shadow-xl active:scale-95 transition-all duration-300"
    >
      Delete
    </button>
  );
}
