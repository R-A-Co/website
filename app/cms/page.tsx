import { redirect } from "next/navigation";

export const metadata = {
  title: "CMS",
  robots: { index: false, follow: false },
};

export default function CmsPage() {
  redirect("/admin");
}
