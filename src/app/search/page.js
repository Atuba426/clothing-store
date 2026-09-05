
import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-(--background) px-6 py-12 md:px-10">
          <div className="mx-auto max-w-360">
            <div className="py-20 text-center">
              <p className="text-sm text-(--muted)">Loading search...</p>
            </div>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}