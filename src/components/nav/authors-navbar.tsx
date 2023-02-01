import Link from "next/link";
import { HeartIcon } from "../icons/heart-icon";
import { SearchIcon } from "../icons/search-icon";

export const AuthorsNavbar = () => {
  return (
    <nav className="w-full rounded space-x-10 text-stone-600 flex">
      <Link href={'/authors/favorites'} className='flex items-center space-x-1'>
        <span className="scale-75"><HeartIcon/></span>
        <span>Favorites</span>
      </Link>
      <Link href={'/authors/search'} className='flex items-center space-x-1'>
        <span className="scale-75"><SearchIcon /></span>
        <span>Search</span>
      </Link>
    </nav>
  );
}