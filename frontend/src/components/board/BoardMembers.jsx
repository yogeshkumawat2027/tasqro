import { useState } from "react";
import { MailPlus, Trash2 } from "lucide-react";
import api from "../../api/axios";

function BoardMembers({ boardId, members, onMemberAdded, onMemberRemoved }) {
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setAdding(true);

      const res = await api.post(`/boards/${boardId}/members`, {
        email,
      });

      const addedUser = res.data.board.members?.find(
        (member) => member.email === email
      );

      if (addedUser) {
        onMemberAdded(addedUser);
      } else {
        const membersRes = await api.get(`/boards/${boardId}/members`);
        const newMember = membersRes.data.members.find(
          (member) => member.email === email
        );

        if (newMember) onMemberAdded(newMember);
      }

      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add member");
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await api.delete(`/boards/${boardId}/members/${userId}`);
      onMemberRemoved(userId);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove member");
    }
  };

  return (
    <div className="mb-6 rounded-[24px] border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/20">
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          <h2 className="text-xl font-black text-white">Workspace Members</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Collaborators who can work on tasks in this workspace.
          </p>

          <div className="mt-4 max-h-48 space-y-3 overflow-y-auto pr-2">
            {members.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-medium text-zinc-400">
                No members added yet.
              </p>
            ) : (
              members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-white">
                      {member.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-zinc-400">
                      {member.email}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveMember(member._id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                    title="Remove member"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <form onSubmit={handleAddMember} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <label className="mb-2 block text-sm font-bold text-white">
            Add member
          </label>
          <input
            type="email"
            placeholder="member@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/30"
          />

          <button
            disabled={adding}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700 disabled:opacity-60"
          >
            <MailPlus size={18} />
            {adding ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardMembers;
