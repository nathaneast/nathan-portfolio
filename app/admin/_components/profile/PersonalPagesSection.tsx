"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Id, Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { fetchYoutubeThumbnail } from "@/lib/youtube";
import { PageItemRow } from "./PageItemRow";
import { AddPageForm } from "./AddPageForm";
import { type PageIcon } from "./types";

interface PageFormState {
  icon: PageIcon;
  name: string;
  url: string;
  description: string;
  order: number;
}

type AddStatus = "idle" | "saving";

const DEFAULT_FORM: PageFormState = {
  icon: "website",
  name: "",
  url: "",
  description: "",
  order: 0,
};

function SortablePageItem({
  page,
  onRemove,
}: {
  page: Doc<"personalPages">;
  onRemove: (id: Id<"personalPages">) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: page._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-2">
      <button
        {...attributes}
        {...listeners}
        className="mt-3 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0"
        aria-label="순서 변경"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1">
        <PageItemRow page={page} onRemove={onRemove} />
      </div>
    </div>
  );
}

export default function PersonalPagesSection() {
  const pages = useQuery(api.personalPages.list);
  const create = useMutation(api.personalPages.create);
  const remove = useMutation(api.personalPages.remove);
  const reorder = useMutation(api.personalPages.reorder);

  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState<PageFormState>(DEFAULT_FORM);
  const [addStatus, setAddStatus] = useState<AddStatus>("idle");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFormChange = (updates: Partial<PageFormState>) => {
    setNewForm((prev) => ({ ...prev, ...updates }));
  };

  const handleAdd = async () => {
    if (!newForm.name.trim() || !newForm.url.trim()) return;
    setAddStatus("saving");
    try {
      const maxOrder = pages ? Math.max(0, ...pages.map((p) => p.order)) : 0;
      let thumbnailUrl: string | undefined;
      if (newForm.icon === "youtube" && newForm.url) {
        thumbnailUrl = await fetchYoutubeThumbnail(newForm.url);
      }
      await create({
        ...newForm,
        order: maxOrder + 1,
        thumbnailUrl,
      });
      setNewForm(DEFAULT_FORM);
      setIsAdding(false);
    } catch {
      toast.error("추가 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setAddStatus("idle");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewForm(DEFAULT_FORM);
  };

  const handleRemove = async (id: Id<"personalPages">) => {
    try {
      await remove({ id });
    } catch {
      toast.error("삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !pages) return;

    const oldIndex = pages.findIndex((p) => p._id === active.id);
    const newIndex = pages.findIndex((p) => p._id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(pages, oldIndex, newIndex);
    try {
      await reorder({ orderedIds: reordered.map((p) => p._id) });
    } catch {
      toast.error("순서 변경 중 오류가 발생했습니다.");
    }
  };

  if (pages === undefined) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground text-lg">개인 페이지 링크</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
          className="border-border text-foreground"
        >
          <Plus className="w-4 h-4 mr-1" />
          추가
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {isAdding && (
          <AddPageForm
            form={newForm}
            isSaving={addStatus === "saving"}
            onChange={handleFormChange}
            onAdd={handleAdd}
            onCancel={handleCancel}
          />
        )}

        {pages.length === 0 && !isAdding && (
          <p className="text-sm text-muted-foreground text-center py-4">
            개인 페이지가 없습니다. 추가 버튼을 눌러 추가하세요.
          </p>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pages.map((p) => p._id)}
            strategy={verticalListSortingStrategy}
          >
            {pages.map((page) => (
              <SortablePageItem
                key={page._id}
                page={page}
                onRemove={handleRemove}
              />
            ))}
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
