import { ReactNode } from 'react';
import { Public_Sans } from 'next/font/google';
import '@/app/_styles/globals.css';
import MobileNavigation from './_components/MobileNavigation';
import Navigation from './_components/Navigation';

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
      <body className="bg-beige-100 flex flex-col h-screen overflow-hidden">
        <div className="flex w-screen h-screen overflow-hidden">
          <div className="hidden lg:block w-[20%] shrink-0 h-screen sticky top-0 overflow-hidden">
            <Navigation />
          </div>
          <main className="flex-1 h-screen overflow-y-auto text-grey-900">
            {children}
          </main>
        </div>
        <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
          <MobileNavigation />
        </div>
      </body>
    </html>
  );
}
