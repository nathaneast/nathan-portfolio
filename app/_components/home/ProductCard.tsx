import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { Card } from "@/components/ui/card";
import ProductTypeBadge from "./ProductTypeBadge";
import ProductLinks from "./ProductLinks";

interface ProductCardProps {
  product: Doc<"products">;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative w-full aspect-video bg-muted">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <ImageIcon className="w-10 h-10 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <h3 className="text-base font-semibold text-foreground">
            {product.title}
          </h3>
          <ProductTypeBadge types={product.types} />
          {product.status === "ended" && (
            <span className="text-xs text-destructive shrink-0">서비스 종료</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
        {product.techDescription && (
          <p className="text-xs text-muted-foreground/70 font-mono">
            {product.techDescription}
          </p>
        )}
        {(product.serviceUrl || product.githubUrl || product.videoUrl) && (
          <div className="mt-1">
            <ProductLinks
              serviceUrl={product.serviceUrl}
              githubUrl={product.githubUrl}
              videoUrl={product.videoUrl}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
