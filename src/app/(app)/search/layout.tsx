import { LayoutProps } from "@/app/layout";
import { SearchBar } from "components/SearchBar";

export default function SearchLayout({ children }: LayoutProps) {
  return (
    <div className="w-full">
      <SearchBar />
      {children}
    </div>
  );
}