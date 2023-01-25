'use client';

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { DashboardIcon, SearchIcon, ShelvesIcon } from "./Icons";


export const basePaths = ['dashboard', 'search', 'shelves'] as const;
export type BasePath = typeof basePaths[number];

const icons: Record<BasePath, JSX.Element> = {
  dashboard: <DashboardIcon />,
  search: <SearchIcon />,
  shelves: <ShelvesIcon />,
}

export const ActiveNavLinks = () => {
  const [ basePath ] = useSelectedLayoutSegments();

  return (
    <div className="space-y-1.5">
      {basePaths.map(path =>
        <Link
          key={path}
          href={`/${path}`}
          className={`capitalize rounded px-3 py-1 transition-all duration-100 ease-in-out flex items-center ${path === basePath ? 'bg-gray-600 shadow' : 'hover:bg-gray-500 hover:shadow-lg'}`}
        >
          <span className={`text-gray-400 ${path === basePath ? 'text-gray-300' : ''}`}>{icons[path]}</span>
          <span className={`ml-2 text-gray-300 ${path === basePath ? 'text-gray-200' : ''}`}>{path}</span>
        </Link>
      )}
    </div>
  );
}
