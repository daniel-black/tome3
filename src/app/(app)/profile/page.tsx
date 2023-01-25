import { unstable_getServerSession } from "next-auth";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await unstable_getServerSession();

  if (!session || !session.user) {
    return (
      <div className="px-4 py-3">
        uh oh, no user session. this shouldn't happen
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <main className="px-4 py-3">
      {image &&
        <Image
          src={image}
          alt={'user image'}
          width={96}
          height={96}
          className='rounded shadow border-2 border-gray-400'
        />
      }
      {name && <h1>{name}</h1>}
      {email && <h1>{email}</h1>}
    </main>
  );
}