import React from "react";

export default function LoaderOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex items-end gap-2">
        <div className="w-3 h-6 bg-yellow-500 rounded animate-bounce [animation-delay:-0.3s] shadow-[0_0_10px_rgba(234,179,8,0.9)]"></div>
        <div className="w-3 h-10 bg-yellow-500 rounded animate-bounce [animation-delay:-0.15s] shadow-[0_0_10px_rgba(234,179,8,0.9)]"></div>
        <div className="w-3 h-14 bg-yellow-500 rounded animate-bounce shadow-[0_0_10px_rgba(234,179,8,0.9)]"></div>
        <div className="w-3 h-9 bg-yellow-500 rounded animate-bounce [animation-delay:-0.2s] shadow-[0_0_10px_rgba(234,179,8,0.9)]"></div>
        <div className="w-3 h-12 bg-yellow-500 rounded animate-bounce [animation-delay:-0.1s] shadow-[0_0_10px_rgba(234,179,8,0.9)]"></div>
      </div>
      <p className="mt-6 text-yellow-400 font-bold text-lg tracking-widest uppercase drop-shadow-lg">
        One moment, please...
      </p>
    </div>
  );
}
