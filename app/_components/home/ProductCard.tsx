import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { Card } from "@/components/ui/card";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductLinks from "./ProductLinks";

interface ProductCardProps {
  product: Doc<"products">;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-row overflow-hidden">
      <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] shrink-0 relative">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="180px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 p-4 min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-foreground truncate">
              {product.title}
            </h3>
            <ProductStatusBadge status={product.status} />
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

        <div className="mt-auto pt-3">
          <ProductLinks
            serviceUrl={product.serviceUrl}
            githubUrl={product.githubUrl}
            videoUrl={product.videoUrl}
            status={product.status}
          />
        </div>
      </div>
    </Card>
  );
}
