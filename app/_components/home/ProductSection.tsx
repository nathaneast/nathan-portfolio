"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductSection() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.products.list,
    {},
    { initialNumItems: 15 }
  );

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          loadMore(15);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [status, loadMore]);

  return (
    <section className="flex-1 min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {results.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {status === "LoadingMore" && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {status === "CanLoadMore" && (
        <div ref={sentinelRef} className="h-10" />
      )}
    </section>
  );
}
