import { Plus } from "lucide-react";

function BoardHeader({ board, onOpenCreateCard }) {
  return (
    <div className="border-b border-white/10 pb-5">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            {board?.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            {board?.description || "No description"}
          </p>
        </div>

        <button
          onClick={onOpenCreateCard}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-5 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>
    </div>
  );
}

export default BoardHeader;
