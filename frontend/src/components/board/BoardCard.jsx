import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BoardCard({ board }) {
  return (
    <Link
      to={`/boards/${board._id}`}
      className="group flex min-h-48 flex-col rounded-[24px] border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-black hover:shadow-xl hover:shadow-black/25"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="line-clamp-2 text-xl font-black leading-6 text-white">
          {board.title}
        </h3>

        <ArrowRight
          size={20}
          className="mt-1 shrink-0 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-white"
        />
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
        {board.description || "No description"}
      </p>

      <div className="mt-auto pt-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">
          <span>{board.members?.length || 1} member(s)</span>
        </div>
      </div>
    </Link>
  );
}

export default BoardCard;
