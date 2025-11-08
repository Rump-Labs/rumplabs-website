"use client";

import { useEffect } from "react";

interface SheerIDModalProps {
  open: boolean;
  onClose(): void;
  onVerified(): void;
}

const DEFAULT_SHEERID_ORIGIN = "https://services.sandbox.sheerid.com";

export function SheerIDModal({ open, onClose, onVerified }: SheerIDModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handler = (event: MessageEvent) => {
      const allowedOrigin = process.env.NEXT_PUBLIC_SHEERID_ORIGIN ?? DEFAULT_SHEERID_ORIGIN;
      if (!event.origin.startsWith(allowedOrigin)) {
        return;
      }

      const data = event.data as { eventType?: string } | undefined;

      if (data?.eventType === "verification.completed") {
        onVerified();
        onClose();
      }

      if (data?.eventType === "modal.closed") {
        onClose();
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [open, onClose, onVerified]);

  if (!open) {
    return null;
  }

  const programId = process.env.NEXT_PUBLIC_SHEERID_PROGRAM_ID;
  const origin = process.env.NEXT_PUBLIC_SHEERID_ORIGIN ?? DEFAULT_SHEERID_ORIGIN;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      <div className="relative h-[80vh] w-[90vw] max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-sm font-medium text-white transition hover:bg-slate-900"
          aria-label="Close verification"
        >
          Close
        </button>
        {programId ? (
          <iframe
            src={`${origin}/hostedverification/${programId}?response=postMessage`}
            title="SheerID verification"
            className="h-full w-full"
            allow="camera;clipboard-read;clipboard-write"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-teal-50 to-cyan-100 px-6 text-center text-slate-700">
            <p className="text-lg font-semibold text-slate-900">
              Add your SheerID program details
            </p>
            <p className="max-w-md text-sm">
              Set <code className="rounded bg-white/70 px-2 py-1 text-xs">NEXT_PUBLIC_SHEERID_PROGRAM_ID</code> in <code className="rounded bg-white/70 px-2 py-1 text-xs">.env.local</code> to embed your hosted verification experience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


