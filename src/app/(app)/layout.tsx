import { Sidebar } from "@/components/nav/sidebar";
import { LayoutProps } from "../layout";

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="px-10 py-3 w-full min-h-full text-stone-300">
        {children}
      </main>
    </div>
  );
}