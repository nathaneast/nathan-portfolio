import Image from "next/image";
import { User } from "lucide-react";

interface ProfileImageProps {
  imageUrl: string;
}

export default function ProfileImage({ imageUrl }: ProfileImageProps) {
  if (!imageUrl) {
    return (
      <div className="w-24 h-24 rounded-full border-2 border-border flex items-center justify-center bg-muted">
        <User className="w-12 h-12 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt="프로필 이미지"
      width={96}
      height={96}
      priority
      className="w-24 h-24 rounded-full object-cover border-2 border-border"
    />
  );
}
