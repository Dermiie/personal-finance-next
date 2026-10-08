import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="bg-grey-900 rounded-r-xl text-white h-screen p-10 flex flex-col gap-20">
      <div>
        <Image alt="logo" src="/logo-large.svg" height="100" width="140" />
      </div>
      <nav className="flex flex-col gap-10 flex-grow">
        <li className="flex gap-2 w-full items-center">
          <Image
            alt="overview-icon"
            src="/icon-nav-overview.svg"
            className="object-cover"
            height={10}
            width={20}
          ></Image>

          <Link href={'/'}>Overview</Link>
        </li>
        <li className="flex gap-2 w-full items-center">
          <Image
            alt="overview-icon"
            src="/icon-nav-transactions.svg"
            className="object-cover"
            height={10}
            width={20}
          ></Image>
          <Link href={'/transactions'}>Transactions</Link>
        </li>
        <li className="flex gap-2 w-full items-center">
          <Image
            alt="overview-icon"
            src="/icon-nav-budgets.svg"
            className="object-cover"
            height={10}
            width={20}
          ></Image>
          <Link href={'/budgets'}>Budgets</Link>
        </li>
        <li className="flex gap-2 w-full items-center">
          <Image
            alt="overview-icon"
            src="/icon-nav-pots.svg"
            className="object-cover"
            height={10}
            width={20}
          ></Image>
          <Link href={'/pots'}>Pots</Link>
        </li>
        <li className="flex gap-2 w-full items-center">
          <Image
            alt="overview-icon"
            src="/icon-nav-recurring-bills.svg"
            className="object-cover"
            height={10}
            width={20}
          ></Image>
          <Link href={'/bills'}>Recurring Bills</Link>
        </li>
      </nav>

      <div className="flex gap-2 flex-end">
        <span>
          <img alt="menu-icon" src="/icon-minimize-menu.svg" />
        </span>
        <p>Minimize Menu</p>
      </div>
    </div>
  );
}
