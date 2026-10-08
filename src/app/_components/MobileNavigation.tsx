import Image from 'next/image';
import Link from 'next/link';

export default function MobileNavigation() {
  return (
    <div className="bg-grey-900 py-4 px-4">
      <nav className="flex gap-10 flex-grow">
        <li className="flex flex-col gap-2 w-full items-center justify-center">
          <Link href={'/'}>
            <Image
              alt="overview-icon"
              src="/icon-nav-overview.svg"
              className="object-cover"
              height={10}
              width={20}
            ></Image>
          </Link>
          <p className="md:block hidden">Overview</p>
        </li>
        <li className="flex flex-col gap-2 w-full items-center justify-center">
          <Link href={'/transactions'}>
            <Image
              alt="overview-icon"
              src="/icon-nav-transactions.svg"
              className="object-cover"
              height={10}
              width={20}
            ></Image>
          </Link>
          <p className="md:block hidden">Transactions</p>
        </li>
        <li className="flex flex-col gap-2 w-full items-center justify-center">
          <Link href={'/budgets'}>
            <Image
              alt="overview-icon"
              src="/icon-nav-budgets.svg"
              className="object-cover"
              height={10}
              width={20}
            ></Image>
          </Link>
          <p className="md:block hidden">Budgets</p>
        </li>
        <li className="flex flex-col gap-2 w-full items-center justify-center">
          <Link href={'/pots'}>
            <Image
              alt="overview-icon"
              src="/icon-nav-pots.svg"
              className="object-cover"
              height={10}
              width={20}
            ></Image>
          </Link>
          <p className="md:block hidden">Pots</p>
        </li>
        <li className="flex flex-col gap-2 w-full items-center justify-center">
          <Link href={'/bills'}>
            <Image
              alt="overview-icon"
              src="/icon-nav-recurring-bills.svg"
              className="object-cover"
              height={10}
              width={20}
            ></Image>
          </Link>
          <p className="md:block hidden">Bills</p>
        </li>
      </nav>
    </div>
  );
}
