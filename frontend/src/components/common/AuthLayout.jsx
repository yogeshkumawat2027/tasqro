import heroImage from "../../assets/hero.png";

function AuthLayout({ title, description, children }) {
  return (
    <div className="min-h-screen bg-black px-4 py-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-6xl overflow-hidden rounded-[28px] border border-white/15 bg-[#0b0b0b] shadow-[0_30px_100px_rgba(255,255,255,0.1)] lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative hidden overflow-hidden bg-black p-8 lg:block">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <img
                  src="/trelloLogo.png"
                  alt="Tasqro logo"
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <p className="text-xl font-black leading-none tracking-tight text-white">
                    Tasqro
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                    Workspaces
                  </p>
                </div>
              </div>

              <h2 className="max-w-lg text-4xl font-black leading-[0.98] tracking-tight">
                Serious teams deserve serious focus.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
                Manage workspaces, tasks, deadlines, and people from one clean Tasqro control room.
              </p>
            </div>

            <div className="my-6 flex justify-center py-6">
              <img
                src={heroImage}
                alt="Tasqro workspace layers"
                className="h-56 w-56 object-contain grayscale contrast-125 drop-shadow-[0_30px_60px_rgba(255,255,255,0.18)]"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="text-sm font-bold text-white">
                Built for focused execution
              </p>
              <p className="mt-1 text-xs leading-5 text-zinc-400">
                Compact planning, clear ownership, and task movement without visual noise.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex items-center bg-white px-6 py-6 text-black sm:px-10 lg:px-12">
          <div className="w-full">
            <h1 className="text-3xl font-black tracking-tight text-black sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600">
              {description}
            </p>

            <div className="mt-6">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
