import { LayoutProps } from "../layout";

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div>
      app layout
      {children}
    </div>
  );
}