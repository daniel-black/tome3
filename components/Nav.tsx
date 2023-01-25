import Link from "next/link";
import { Avatar } from "./Avatar";
import { SignOut } from "./SignOut";

const Nav = () => {
  return (
    <section className="min-h-screen w-60 px-4 py-3 text-lg bg-gray-700 flex flex-col justify-between items-start">
      <Link href={"/dashboard"}>Tome</Link>
      <SignOut />
      {/* @ts-expect-error Server Component */}
      <Avatar />
    </section>
  );
}

export default Nav;