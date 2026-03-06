export type ProductType = "web" | "app" | "toss-inapp" | "desktop";

export const PRODUCT_TYPE_OPTIONS: { value: ProductType; label: string }[] = [
  { value: "web", label: "웹" },
  { value: "app", label: "앱" },
  { value: "toss-inapp", label: "토스인앱" },
  { value: "desktop", label: "데스크탑" },
];

export interface FormValues {
  imageUrl: string;
  title: string;
  description: string;
  techDescription: string;
  serviceUrl: string;
  githubUrl: string;
  videoUrl: string;
  status: "active" | "ended";
  type: ProductType | "";
}
