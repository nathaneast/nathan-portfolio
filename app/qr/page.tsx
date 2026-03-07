import { getSiteUrl } from "@/lib/site";
import QRCode from "./QRCode";

export default function QRPage() {
  const siteUrl = getSiteUrl();
  return <QRCode siteUrl={siteUrl} />;
}
