import { useState } from "react";
import { X } from "lucide-react";
import api from "../../api/axios";

function CardModal({ isOpen, onClose, boardId, members = [], onCardCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    column: "To Do",
    priority: "medium",
    dueDate: "",
    assignee: "",
  });

  const [creating, setCreating] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    try {
      setCreating(true);

      const payload = {
        ...form,
        assignee: form.assignee || undefined,
        dueDate: form.dueDate || undefined,
      };

      const res = await api.post(`/cards/${boardId}/cards`, payload);

      onCardCreated(res.data.card);

      setForm({
        title: "",
        description: "",
        column: "To Do",
        priority: "medium",
        dueDate: "",
        assignee: "",
      });

      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/30";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/40">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
              New task
            </p>
            <h2 className="mt-1 text-2xl font-black text-white">Create Task</h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-white/10 hover:text-white"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            className={inputClass}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className={inputClass}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <select
              name="column"
              value={form.column}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <select
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select assignee</option>

            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name} - {member.email}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className={inputClass}
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
              className="h-11 rounded-xl border border-zinc-700 bg-zinc-800 px-5 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700 disabled:opacity-60"
            >
              {creating ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardModal;
