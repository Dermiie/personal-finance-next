import MobileNavItem from '@/app/_components/MobileNavItem';

const navLinks = [
  { href: '/', label: 'Overview', icon: '/icon-nav-overview.svg' },
  {
    href: '/transactions',
    label: 'Transactions',
    icon: '/icon-nav-transactions.svg',
  },
  { href: '/budgets', label: 'Budgets', icon: '/icon-nav-budgets.svg' },
  { href: '/pots', label: 'Pots', icon: '/icon-nav-pots.svg' },
  { href: '/bills', label: 'Bills', icon: '/icon-nav-recurring-bills.svg' },
];

export default function MobileNavigation() {
  return (
    <div className="bg-grey-900 py-4 px-4">
      <nav className=" flex-grow">
        <ul className="flex gap-10">
          {navLinks.map((link) => (
            <MobileNavItem key={link.href} {...link} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
