import { useDroppable } from "@dnd-kit/core";
import CardItem from "./CardItem";

function BoardColumn({ title, cards }) {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[430px] rounded-[28px] border p-4 transition ${
        isOver
          ? "border-white/35 bg-white/[0.12] shadow-lg shadow-black/20"
          : "border-white/15 bg-white/[0.08]"
      }`}
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <h2 className="font-black text-white">{title}</h2>

        <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-black text-zinc-300">
          {cards.length}
        </span>
      </div>

      <div className="space-y-3">
        {cards.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/30 bg-white/10 p-5 text-center text-sm font-medium text-zinc-300">
            Drop tasks here
          </p>
        ) : (
          cards.map((card) => <CardItem key={card._id} card={card} />)
        )}
      </div>
    </div>
  );
}

export default BoardColumn;
