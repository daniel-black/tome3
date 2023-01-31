import Nav from "components/Nav";
import { LayoutProps } from "../layout";

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <Nav />
      <main className='min-h-screen px-4 py-3 w-full flex justify-center'>
        {children}
      </main>
    </div>
  );
}