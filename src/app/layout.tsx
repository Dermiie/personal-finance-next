import Navigation from '@/app/_components/Navigation';
import { ReactNode } from 'react';
import { Public_Sans } from 'next/font/google';
import '@/app/_styles/globals.css';
import MobileNavigation from './_components/MobileNavigation';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-public-sans',
});

export const metadata = {
  title: {
    template: '%s - Personal Finance Manager',
    default: 'Welcome - Personal Finance Manager',
  },
  description: 'Increase your finance efficiency. Lets plan',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="bg-beige-100 flex flex-col h-screen overflow-y-scroll">
        <div className="flex w-screen flex-grow ">
          <div className="w-[20%] hidden lg:block">
            <Navigation />
          </div>
          <main className="w-[80%]">{children}</main>
        </div>
        <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
          <MobileNavigation />
        </div>
      </body>
    </html>
  );
}
