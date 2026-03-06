interface ProfileIntroProps {
  introduction: string;
}

export default function ProfileIntro({ introduction }: ProfileIntroProps) {
  return (
    <p className="mt-5 text-base text-muted-foreground leading-relaxed whitespace-pre-line">
      {introduction}
    </p>
  );
}
