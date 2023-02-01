import './globals.css';

export type LayoutProps = {
  children: React.ReactNode;
};

export const revalidate = 0;

export default async function RootLayout({ children }: LayoutProps) {

  return (
    <html lang="en">
      <head />
      <body className='bg-stone-900 text-gray-100'>
        {children}
      </body>
    </html>
  );
}
