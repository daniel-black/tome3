import { LayoutProps } from "@/app/layout";
import { AuthorsNavbar } from "@/components/nav/authors-navbar";

export default function AuthorsLayout({ children }: LayoutProps) {
  return (
    <div className="space-y-8">
      <AuthorsNavbar />
      {children}
    </div>
  );
}