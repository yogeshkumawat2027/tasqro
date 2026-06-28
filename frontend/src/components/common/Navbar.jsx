import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { LogOut, X } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img
            src="/trelloLogo.png"
            alt="Tasqro logo"
            className="h-10 w-10 object-contain"
          />

          <div>
            <h1 className="text-lg font-black leading-none tracking-tight text-white">
              Tasqro
            </h1>

          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white text-sm font-black text-black transition hover:bg-zinc-200"
            title="Open profile"
          >
            {initial}
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-14 w-72 rounded-2xl border border-white/10 bg-zinc-950 p-5 pt-4 text-center shadow-xl shadow-black/30">
              <button
                onClick={() => setIsProfileOpen(false)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
                title="Close profile"
              >
                <X size={16} />
              </button>

              <p className="pr-8 text-xl font-black tracking-tight text-white">
                {user?.name || "User"}
              </p>

              <p className="mt-2 break-words text-sm font-medium text-zinc-400">
                {user?.email || "No email"}
              </p>

              <button
                onClick={logout}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 text-sm font-bold text-white transition hover:border-zinc-500 hover:bg-zinc-700"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
