import Image from 'next/image';
import NavItem from './NavItem';

const navLinks = [
  { href: '/', label: 'Overview', icon: '/icon-nav-overview.svg' },
  {
    href: '/transactions',
    label: 'Transactions',
    icon: '/icon-nav-transactions.svg',
  },
  { href: '/budgets', label: 'Budgets', icon: '/icon-nav-budgets.svg' },
  { href: '/pots', label: 'Pots', icon: '/icon-nav-pots.svg' },
  {
    href: '/bills',
    label: 'Recurring Bills',
    icon: '/icon-nav-recurring-bills.svg',
  },
];

export default function Navigation() {
  return (
    <div className="bg-grey-900 rounded-r-xl text-white h-screen py-10 pr-10 flex flex-col gap-20">
      <div className="pl-8">
        <Image alt="logo" src="/logo-large.svg" height="100" width="130" />
      </div>

      <nav className="flex flex-col gap-10 flex-grow">
        {navLinks.map((link) => (
          <NavItem key={link.href} {...link} />
        ))}
      </nav>

      <div className="flex gap-2 justify-end">
        <span>
          <img alt="menu-icon" src="/icon-minimize-menu.svg" />
        </span>
        <p>Minimize Menu</p>
      </div>
    </div>
  );
}
