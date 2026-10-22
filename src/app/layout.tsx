import { ReactNode } from 'react';
import { Public_Sans } from 'next/font/google';
import '@/app/_styles/globals.css';

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
        {children}
      </body>
    </html>
  );
}
