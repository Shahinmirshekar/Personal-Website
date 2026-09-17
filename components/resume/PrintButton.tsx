"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-royal-950 px-5 py-2 text-sm font-medium text-soft-white"
    >
      Print / Save as PDF
    </button>
  );
}
