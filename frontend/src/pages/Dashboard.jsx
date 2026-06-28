import { useEffect, useState } from "react";
import api from "../api/axios";

import BoardForm from "../components/board/BoardForm";
import BoardGrid from "../components/board/BoardGrid";
import Navbar from "../components/common/Navbar";
import { Plus } from "lucide-react";

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchBoards = async () => {
    try {
      const res = await api.get("/boards");
      setBoards(res.data.boards);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch workspaces");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardCreated = (board) => {
    setBoards((prev) => [board, ...prev]);
    setIsCreateOpen(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col justify-between gap-5 rounded-[28px] border border-white/10 bg-zinc-950 px-6 py-7 shadow-lg shadow-black/20 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              My Workspaces
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              Create, organize, and open focused team workspaces with a clean professional workflow.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:min-w-48">
            <p className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-center text-sm font-bold text-zinc-200">
              {boards.length} workspace{boards.length === 1 ? "" : "s"}
            </p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700"
            >
              <Plus size={18} />
              Create Workspace
            </button>
          </div>
        </div>

        <BoardForm
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onBoardCreated={handleBoardCreated}
        />

        <BoardGrid boards={boards} loading={loading} />
      </main>
    </div>
  );
}

export default Dashboard;
