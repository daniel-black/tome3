import Nav from "components/Nav";
import { LayoutProps } from "../layout";

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <Nav />
      {children}
    </div>
  );
}