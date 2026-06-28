import BoardCard from "./BoardCard";
import Loader from "../common/Loader";

function BoardGrid({ boards, loading }) {
  if (loading) {
    return <Loader text="Loading workspaces..." />;
  }

  if (boards.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-white/30 bg-white p-12 text-center shadow-[0_24px_80px_rgba(255,255,255,0.08)]">
        <h3 className="text-xl font-black text-black">No workspaces found</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Create your first workspace to start managing tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board._id} board={board} />
      ))}
    </div>
  );
}

export default BoardGrid;
