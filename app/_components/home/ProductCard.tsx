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
    <Card className="flex flex-row p-3 gap-3">
      <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] shrink-0 relative rounded-xl overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="120px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted rounded-xl">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
        <div>
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <h3 className="text-base font-semibold text-foreground truncate">
              {product.title}
            </h3>
            <ProductTypeBadge types={product.types} />
            {product.status === "ended" && (
              <span className="text-xs text-destructive shrink-0">서비스 종료</span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          {product.techDescription && (
            <p className="mt-1 text-xs text-muted-foreground/70 line-clamp-1 font-mono">
              {product.techDescription}
            </p>
          )}
        </div>

        {(product.serviceUrl || product.githubUrl || product.videoUrl) && (
          <div className="mt-auto pt-3">
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
