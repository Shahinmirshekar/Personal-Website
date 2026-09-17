export function PlaceholderBadge({ text = "Editable placeholder" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson-700/60 bg-crimson-900/20 px-2.5 py-1 font-data text-[0.65rem] font-medium uppercase tracking-wide text-crimson-300">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crimson-500" />
      {text}
    </span>
  );
}
