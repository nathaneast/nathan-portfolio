import PersonalPageItem from "./PersonalPageItem";
import type { PageIcon } from "./types";

interface PersonalPage {
  _id: string;
  _creationTime: number;
  icon: PageIcon;
  name: string;
  url: string;
  description: string;
  order: number;
}

interface PersonalPageListProps {
  pages: PersonalPage[];
}

export default function PersonalPageList({ pages }: PersonalPageListProps) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      {pages.map((page) => (
        <PersonalPageItem
          key={page._id}
          icon={page.icon}
          name={page.name}
          url={page.url}
          description={page.description}
        />
      ))}
    </div>
  );
}
