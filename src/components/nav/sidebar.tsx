import Link from "next/link";
import { ActiveLinkWrapper } from "./active-link-wrapper";

export const Sidebar = () => {
  return (
    <nav className="min-h-screen max-h-fit w-60 bg-stone-800 text-stone-500 p-3 space-y-3">
      <Link href={'/dashboard'} className='font-bold'>☗ Tome</Link>
      <div className="h-[2px] bg-stone-700 rounded-full"/>
      <ActiveLinkWrapper />
    </nav>
  );
}