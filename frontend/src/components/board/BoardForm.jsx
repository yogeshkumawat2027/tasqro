import { useState } from "react";
import { Plus, X } from "lucide-react";
import api from "../../api/axios";

function BoardForm({ isOpen, onClose, onBoardCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  if (!isOpen) return null;

  const handleCreateBoard = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setCreating(true);

      const res = await api.post("/boards", {
        title,
        description,
      });

      onBoardCreated(res.data.board);
      setTitle("");
      setDescription("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create workspace");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <form
        onSubmit={handleCreateBoard}
        className="w-full max-w-md rounded-[28px] border border-zinc-200 bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-black">Create Workspace</h2>
            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Set up a focused area for a project, sprint, or client delivery.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-black hover:text-white"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Workspace title"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-4 focus:ring-black/10"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-4 focus:ring-black/10"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-700 transition hover:border-black hover:text-black"
            >
              Cancel
            </button>

            <button
              disabled={creating}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-bold text-white transition hover:bg-zinc-800 disabled:opacity-60"
            >
              <Plus size={18} />
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BoardForm;
