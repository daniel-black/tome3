import './globals.css';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {

  return (
    <html lang="en">
      <head />
      <body className='bg-gray-800 text-gray-100'>
        {children}
      </body>
    </html>
  );
}
