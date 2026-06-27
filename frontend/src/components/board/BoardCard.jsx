import { Link } from "react-router-dom";

function BoardCard({ board }) {
  return (
    <Link
      to={`/boards/${board._id}`}
      className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-slate-800">{board.title}</h3>

      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
        {board.description || "No description"}
      </p>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
        <span>{board.members?.length || 1} member(s)</span>
        {/* <span>Open →</span> */}
      </div>
    </Link>
  );
}

export default BoardCard;