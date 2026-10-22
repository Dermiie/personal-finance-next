// import { redirect } from 'next/navigation';
// import { verifySession } from '@/lib/dal';

import MobileNavigation from '../_components/MobileNavigation';
import Navigation from '../_components/Navigation';

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await verifySession();

//   if (!session) {
//     redirect('/login');
//   }

//   return (
//     <div className="flex min-h-screen">
//       <main className="flex-1">{children}</main>
//     </div>
//   );
// }

// src/app/(protected)/layout.tsx
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
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
    </div>
  );
}
