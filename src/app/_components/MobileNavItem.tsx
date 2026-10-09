'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MobileNavItemProps = {
  href: string;
  label: string;
  icon: string;
};

export default function MobileNavItem({
  href,
  label,
  icon,
}: MobileNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      className={`flex flex-col gap-2 w-full items-center justify-center border-b-4 rounded-t-lg p-2  ${
        isActive
          ? 'bg-beige-100 border-green text-grey-900'
          : 'border-transparent'
      }`}
    >
      <Link
        href={href}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
      >
        <Image
          alt=""
          src={icon}
          className="object-cover"
          height={10}
          width={20}
        />
      </Link>
      <p className="md:block hidden">{label}</p>
    </li>
  );
}
