import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CalendarDays, GripVertical, UserRound } from "lucide-react";

function CardItem({ card }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card._id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.55 : 1,
  };

  const priorityClasses = {
    low: "bg-zinc-900 text-zinc-300",
    medium: "bg-zinc-800 text-white",
    high: "bg-white text-black",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-lg shadow-black/20 transition hover:border-white/25 hover:bg-black active:cursor-grabbing"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-black leading-5 text-white">{card.title}</h3>

        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${
            priorityClasses[card.priority] || priorityClasses.medium
          }`}
        >
          {card.priority}
        </span>
      </div>

      {card.description && (
        <p className="line-clamp-3 text-sm leading-5 text-zinc-400">
          {card.description}
        </p>
      )}

      <div className="mt-4 space-y-2 border-t border-white/10 pt-3 text-xs font-medium text-zinc-400">
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2">
            <UserRound size={14} />
            <span className="truncate">
              {card.assignee?.name ? `@${card.assignee.name}` : "Unassigned"}
            </span>
          </span>

          <GripVertical size={16} className="shrink-0 text-zinc-600" />
        </div>

        <span className="flex items-center gap-2">
          <CalendarDays size={14} />
          {card.dueDate
            ? new Date(card.dueDate).toLocaleDateString()
            : "No due date"}
        </span>
      </div>
    </div>
  );
}

export default CardItem;
