import Link from "next/link";

export default function FavoriteAuthorsPage() {
  return (
    <div>
      <h2 className="text-2xl">No favorite authors yet!</h2>
      <p>Try <Link href={'/authors/search'} className='underline'>searching</Link> for an author.</p>
    </div>
  );
}