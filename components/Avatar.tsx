import { unstable_getServerSession } from "next-auth";
import Image from "next/image";

export const Avatar = async () => {
  const session = await unstable_getServerSession();

  if (session?.user?.image) {
    return (
      <div className="flex items-center space-x-3">
        <Image
          src={session?.user?.image}
          alt={'user image'}
          // image is 96px by 96px
          width={30}
          height={30}
          className='rounded-full ring ring-sky-300 shadow'
        />
        <span className="text-gray-400">
          {session.user?.name?.split(' ')[0]}
        </span>
      </div>
    );
  }

  return null;
}