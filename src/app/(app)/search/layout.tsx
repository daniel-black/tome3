import { LayoutProps } from "@/app/layout";
import { SearchBar } from "components/SearchBar";

export default function SearchLayout({ children }: LayoutProps) {
  return (
    <div className="px-4 py-3 w-full">
      <SearchBar />
      {children}
    </div>
  );
}