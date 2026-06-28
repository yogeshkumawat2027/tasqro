import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { ArrowLeft } from "lucide-react";

import api from "../api/axios";
import socket from "../utils/socket";

import Navbar from "../components/common/Navbar";
import BoardHeader from "../components/card/BoardHeader";
import BoardColumn from "../components/card/BoardColumn";
import CardModal from "../components/card/CardModal";
import BoardMembers from "../components/board/BoardMembers";

const columns = ["To Do", "In Progress", "Done"];

function BoardDetails() {
  const { id } = useParams();

  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchBoardData = async () => {
    try {
      const boardRes = await api.get(`/boards/${id}`);
      const cardsRes = await api.get(`/cards/${id}/cards`);
      const membersRes = await api.get(`/boards/${id}/members`);

      setBoard(boardRes.data.board);
      setCards(cardsRes.data.cards);
      setMembers(membersRes.data.members);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch workspace");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [id]);

  useEffect(() => {
    socket.connect();

    socket.emit("join-board", id);

    socket.on("card-created", (newCard) => {
      setCards((prev) => {
        const alreadyExists = prev.some((card) => card._id === newCard._id);
        if (alreadyExists) return prev;

        return [newCard, ...prev];
      });
    });

    socket.on("card-moved", (updatedCard) => {
      setCards((prev) =>
        prev.map((card) =>
          card._id === updatedCard._id ? updatedCard : card
        )
      );
    });

    socket.on("card-updated", (updatedCard) => {
      setCards((prev) =>
        prev.map((card) =>
          card._id === updatedCard._id ? updatedCard : card
        )
      );
    });

    socket.on("card-deleted", (cardId) => {
      setCards((prev) => prev.filter((card) => card._id !== cardId));
    });

    socket.on("member-added", (data) => {
      setMembers((prev) => {
        const exists = prev.some((member) => member._id === data.member._id);
        if (exists) return prev;

        return [...prev, data.member];
      });
    });

    socket.on("member-removed", (data) => {
      setMembers((prev) =>
        prev.filter((member) => member._id !== data.userId)
      );
    });

    return () => {
      socket.emit("leave-board", id);

      socket.off("card-created");
      socket.off("card-moved");
      socket.off("card-updated");
      socket.off("card-deleted");
      socket.off("member-added");
      socket.off("member-removed");

      socket.disconnect();
    };
  }, [id]);

  const handleCardCreated = (card) => {
    setCards((prev) => {
      const alreadyExists = prev.some((item) => item._id === card._id);
      if (alreadyExists) return prev;

      return [card, ...prev];
    });
  };

  const handleMemberAdded = (member) => {
    setMembers((prev) => {
      const alreadyExists = prev.some((item) => item._id === member._id);
      if (alreadyExists) return prev;

      return [...prev, member];
    });
  };

  const handleMemberRemoved = (userId) => {
    setMembers((prev) => prev.filter((member) => member._id !== userId));
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = active.id;
    const newColumn = over.id;

    const currentCard = cards.find((card) => card._id === cardId);

    if (!currentCard || currentCard.column === newColumn) return;

    setCards((prev) =>
      prev.map((card) =>
        card._id === cardId ? { ...card, column: newColumn } : card
      )
    );

    try {
      const res = await api.patch(`/cards/${cardId}/move`, {
        column: newColumn,
      });

      setCards((prev) =>
        prev.map((card) => (card._id === cardId ? res.data.card : card))
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to move task");

      setCards((prev) =>
        prev.map((card) => (card._id === cardId ? currentCard : card))
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <p className="p-6 text-sm font-medium text-zinc-300">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-6 pt-3">
        <Link
          to="/dashboard"
          className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to workspaces
        </Link>

        <div className="mb-6 rounded-[24px] border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/20">
          <BoardHeader
            board={board}
            onOpenCreateCard={() => setIsCreateOpen(true)}
          />

          <BoardMembers
            boardId={id}
            members={members}
            onMemberAdded={handleMemberAdded}
            onMemberRemoved={handleMemberRemoved}
          />
        </div>

        <CardModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          boardId={id}
          members={members}
          onCardCreated={handleCardCreated}
        />

        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid gap-5 lg:grid-cols-3">
            {columns.map((column) => (
              <BoardColumn
                key={column}
                title={column}
                cards={cards.filter((card) => card.column === column)}
              />
            ))}
          </div>
        </DndContext>
      </main>
    </div>
  );
}
export default BoardDetails;
