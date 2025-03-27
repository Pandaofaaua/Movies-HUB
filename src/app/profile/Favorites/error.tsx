"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-row items-center justify-center bg-slate-200 dark:bg-black mx-auto max-w-lg py-1 px-4 min-h-[calc(100vh-130px)] md:min-h-[calc(100vh-180px)]">
      <h2 className="my-4 text-2xl font-bold">Something went wrong!</h2>
      <button
        className="mb-4 p-4 bg-red-500 text-white rounded-xl hover:bg-red-800"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <p className="text-xl">
        Or go back to{" "}
        <Link href="/" className="underline">
          Home.
        </Link>
        .
      </p>
    </main>
  );
}
