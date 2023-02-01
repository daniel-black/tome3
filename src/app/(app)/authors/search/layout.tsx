import { LayoutProps } from "@/app/layout";
import { AuthorsSearch } from "@/components/search/authors-search";

export default function AuthorsSearchLayout({ children }: LayoutProps) {
  return (
    <div>
      <AuthorsSearch />
      {children}
    </div>
  )
}