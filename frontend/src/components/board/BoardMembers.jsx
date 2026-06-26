import { useState } from "react";
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
    <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Board Members</h2>
        <p className="text-sm text-slate-500">
          Add users to collaborate and assign cards.
        </p>
      </div>

      <form onSubmit={handleAddMember} className="mb-5 flex gap-3">
        <input
          type="email"
          placeholder="Enter member email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        <button
          disabled={adding}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        {members.map((member) => (
          <div
            key={member._id}
            className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {member.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800">
                {member.name}
              </p>
              <p className="text-xs text-slate-500">{member.email}</p>
            </div>

            <button
              onClick={() => handleRemoveMember(member._id)}
              className="ml-1 text-sm text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardMembers;