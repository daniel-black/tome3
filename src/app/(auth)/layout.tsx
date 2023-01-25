import Link from "next/link";
import { LayoutProps } from "../layout";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="p-5">
      <Link href={'/'} className='font-bold text-blue-300 hover:text-blue-400'>Tome</Link>
      <div className="flex justify-center mt-10">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;