import { LayoutProps } from "@/app/layout";

export default function SearchLayout({ children }: LayoutProps) {
  return (
    <div className="w-full">
      search layout
      {children}
    </div>
  );
}