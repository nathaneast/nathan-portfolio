import Image from "next/image";
import { User } from "lucide-react";

interface ProfileImageProps {
  imageUrl: string;
}

export default function ProfileImage({ imageUrl }: ProfileImageProps) {
  if (!imageUrl) {
    return (
      <div className="w-40 h-40 rounded-full border-2 border-border flex items-center justify-center bg-muted">
        <User className="w-20 h-20 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt="프로필 이미지"
      width={160}
      height={160}
      priority
      className="w-40 h-40 rounded-full object-cover border-2 border-border"
    />
  );
}
