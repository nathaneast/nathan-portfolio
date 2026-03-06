"use client";

import { useState } from "react";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ProductItem } from "./ProductItem";
import { ProductForm } from "./ProductForm";
import { Plus, Loader2, PackageOpen } from "lucide-react";

const INITIAL_NUM_ITEMS = 10;

export function ProductsSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { results, status, loadMore } = usePaginatedQuery(
    api.products.list,
    {},
    { initialNumItems: INITIAL_NUM_ITEMS }
  );

  const isLoading = status === "LoadingFirstPage";
  const canLoadMore = status === "CanLoadMore";
  const isLoadingMore = status === "LoadingMore";

  return (
    <section aria-labelledby="products-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="products-heading" className="text-lg font-semibold text-foreground">
          프로덕트 관리
        </h2>
        <Button
          onClick={() => setIsCreateOpen(true)}
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          프로덕트 등록
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <PackageOpen className="h-10 w-10 mb-3" />
          <p className="text-sm">등록된 프로덕트가 없습니다.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreateOpen(true)}
            className="mt-4 border-border text-foreground hover:bg-muted"
          >
            <Plus className="mr-2 h-4 w-4" />
            첫 번째 프로덕트 등록
          </Button>
        </div>
      ) : (
        <>
          <ul className="space-y-3" aria-label="프로덕트 목록">
            {results.map((product) => (
              <li key={product._id}>
                <ProductItem product={product} />
              </li>
            ))}
          </ul>

          {(canLoadMore || isLoadingMore) && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={() => loadMore(INITIAL_NUM_ITEMS)}
                disabled={isLoadingMore}
                className="border-border text-foreground hover:bg-muted"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    불러오는 중...
                  </>
                ) : (
                  "더 보기"
                )}
              </Button>
            </div>
          )}
        </>
      )}

      <ProductForm
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </section>
  );
}
