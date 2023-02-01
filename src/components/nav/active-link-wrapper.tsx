'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { z } from 'zod';
import { AuthorIcon } from '../icons/author-icon';
import { DashboardIcon } from '../icons/dashboard-icon';
import { LibraryIcon } from '../icons/library-icon';

const PATHS = [
  'dashboard',
  'books',
  'authors',
] as const;
const BasePathSchema = z.enum(PATHS);
type BasePath = z.infer<typeof BasePathSchema>;

type PathIcon = Record<BasePath, JSX.Element>;
const pathIcon: PathIcon = {
  dashboard: <DashboardIcon />,
  books: <LibraryIcon />,
  authors: <AuthorIcon />
};

export const ActiveLinkWrapper = () => {
  const basePath = useSelectedLayoutSegments()[0];
  const parsedBasePath = BasePathSchema.parse(basePath);
  
  return (
    <div className='space-y-1.5 text-xl'>
      {PATHS.map(path =>
        <Link
          href={`/${path}`}
          className={`${path === parsedBasePath ? 'bg-stone-700 shadow rounded-l-sm border-amber-600':'border-stone-800 hover:bg-stone-600 hover:border-stone-600'} transition-all duration-150 ease-in-out border-l-2 capitalize px-3 py-1.5 rounded flex items-center space-x-2`}
        >
          <span className='text-stone-500'>{pathIcon[path]}</span>
          <span className='text-stone-400'>{path}</span>
        </Link>  
      )}
    </div>
  );
}