"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
      <div className="w-full rounded-2xl border card-surface p-6">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm opacity-80">{error.message || "Unable to load MoodChef at the moment."}</p>
        <button type="button" onClick={reset} className="mt-4 rounded-md border px-3 py-2">
          Retry
        </button>
      </div>
    </main>
  );
}
