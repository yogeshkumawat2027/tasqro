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
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/40"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white">Create Workspace</h2>
            <p className="mt-1 text-sm leading-6 text-zinc-400">
              Set up a focused area for a project, sprint, or client delivery.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-white/10 hover:text-white"
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
            className="h-12 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/30"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="h-12 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/30"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-white/10 bg-transparent px-4 text-sm font-bold text-zinc-300 transition hover:border-white/25 hover:text-white"
            >
              Cancel
            </button>

            <button
              disabled={creating}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700 disabled:opacity-60"
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
