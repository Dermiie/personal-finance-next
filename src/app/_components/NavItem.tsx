'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  href: string;
  label: string;
  icon: string;
};

export default function NavItem({ href, label, icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      className={`flex gap-2 w-full items-center border-l-4 rounded-r-lg px-6 py-3 ${isActive ? 'bg-beige-100 border-green text-grey-900' : 'border-transparent'}`}
    >
      <Image
        alt=""
        src={icon}
        className="object-cover"
        height={10}
        width={20}
      />

      <Link href={href} aria-current={isActive ? 'page' : undefined}>
        {label}
      </Link>
    </li>
  );
}
