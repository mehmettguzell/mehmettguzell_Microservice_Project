export default function DeleteInventory({
  onDeleteInventory,
  id,
}: {
  onDeleteInventory: (id: string) => void;
  id: string;
}) {
  return (
    <div>
      <button
        onClick={() => onDeleteInventory(id)}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </div>
  );
}
