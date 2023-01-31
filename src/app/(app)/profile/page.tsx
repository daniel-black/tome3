import { unstable_getServerSession } from "next-auth";
import prisma from '../../../../lib/prisma';
import Image from "next/image";
import { UserBio } from "components/UserBio";

export default async function ProfilePage() {
  const session = await unstable_getServerSession();
  console.log({session});

  if (!session || !session.user) {
    return (
      <div className="px-4 py-3">
        uh oh, no user session. this shouldn't happen
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <main className="space-y-3">
      <div className="flex space-x-4 items-end">
        {image &&
          <Image
            src={image}
            alt={'user image'}
            width={96}
            height={96}
            className='rounded shadow border-2 border-gray-400'
          />
        }
        <div>
          {name && <h1 className="text-4xl text-gray-300">{name}</h1>}
          {email && <h1 className="text2xl text-gray-400">{email}</h1>}
        </div>
      </div>
      <UserBio />
    </main>
  );
}