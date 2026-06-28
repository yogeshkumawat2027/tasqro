function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-4 border-zinc-200 border-t-black"></div>
        <p className="text-sm font-medium text-zinc-600">{text}</p>
      </div>
    </div>
  );
}

export default Loader;
