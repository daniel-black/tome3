import Link from "next/link";
import { ActiveNavLinks } from "./ActiveNavLinks";
import { Avatar } from "./Avatar";
import { SignOut } from "./SignOut";

const Nav = () => {
  return (
    <section className="min-h-screen min-w-fit px-4 py-3 text-lg bg-gray-700 flex flex-col justify-between items-start">
      <div className="space-y-3 w-full">
        <Link href={"/dashboard"} className='text-gray-400 text-base font-bold'>☗ Tome</Link>
        <div className="h-[2px] w-full rounded-full bg-gray-600" />
        <ActiveNavLinks />
      </div>
      
      <div className="space-y-3">
        {/* @ts-expect-error Server Component */}
        <Avatar />
        <SignOut />
      </div>
    </section>
  );
}

export default Nav;