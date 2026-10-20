'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { BillStatus, RecurringBill } from '@/app/_types/bills';

type SortOption = 'latest' | 'oldest' | 'a-z' | 'z-a' | 'highest' | 'lowest';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'A to Z' },
  { value: 'z-a', label: 'Z to A' },
  { value: 'highest', label: 'Highest' },
  { value: 'lowest', label: 'Lowest' },
];

const sorters: Record<
  SortOption,
  (a: RecurringBill, b: RecurringBill) => number
> = {
  latest: (a, b) => a.dueDay - b.dueDay, // matches the order in the design
  oldest: (a, b) => b.dueDay - a.dueDay,
  'a-z': (a, b) => a.name.localeCompare(b.name),
  'z-a': (a, b) => b.name.localeCompare(a.name),
  highest: (a, b) => b.amount - a.amount,
  lowest: (a, b) => a.amount - b.amount,
};

function ordinal(n: number) {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function StatusIcon({ status }: { status: BillStatus }) {
  if (status === 'paid') {
    return (
      <svg
        role="img"
        aria-label="Paid"
        viewBox="0 0 16 16"
        className="size-4 shrink-0 text-green"
      >
        <circle cx="8" cy="8" r="8" fill="currentColor" />
        <path
          d="M4.5 8.2l2.4 2.3 4.6-4.8"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === 'due-soon') {
    return (
      <svg
        role="img"
        aria-label="Due soon"
        viewBox="0 0 16 16"
        className="size-4 shrink-0 text-red"
      >
        <circle cx="8" cy="8" r="8" fill="currentColor" />
        <rect x="7.25" y="3.5" width="1.5" height="5.5" rx=".75" fill="white" />
        <circle cx="8" cy="11.3" r=".9" fill="white" />
      </svg>
    );
  }
  return null;
}

export default function RecurringBills({ bills }: { bills: RecurringBill[] }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('latest');

  const visibleBills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bills
      .filter((bill) => bill.name.toLowerCase().includes(q))
      .sort(sorters[sort]);
  }, [bills, query, sort]);

  return (
    <section className="min-w-0 flex-1 rounded-lg bg-white py-3">
      {/* Controls */}
      <div className="flex items-center justify-between gap-6">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bills"
            aria-label="Search bills"
            className="h-11 w-full rounded-lg border border-beige-500 bg-white pl-5 pr-12 text-sm text-grey-900 placeholder:text-beige-500 focus:outline-2 focus:outline-offset-2 focus:outline-grey-900 [&::-webkit-search-cancel-button]:hidden"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-grey-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <label htmlFor="sort-bills" className="text-sm text-grey-500">
            Sort by
          </label>
          <div className="relative">
            <select
              id="sort-bills"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-11 w-44 appearance-none rounded-lg border border-beige-500 bg-white pl-5 pr-10 text-sm text-grey-900 focus:outline-2 focus:outline-offset-2 focus:outline-grey-900"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 12 6"
              className="pointer-events-none absolute right-5 top-1/2 w-3 -translate-y-1/2 text-grey-900"
            >
              <path d="M0 0h12L6 6z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 w-full">
        <div className="hidden grid-cols-[1fr_auto_auto] gap-x-8 border-b border-grey-100 px-4 pb-3 text-xs text-grey-500 md:grid md:grid-cols-[3fr_2fr_1fr]">
          <span>Bill Title</span>
          <span>Due Date</span>
          <span className="text-right">Amount</span>
        </div>

        {visibleBills.length === 0 ? (
          <p className="py-10 text-center text-sm text-grey-500">
            No bills match &ldquo;{query}&rdquo;. Try a different name.
          </p>
        ) : (
          <ul>
            {visibleBills.map((bill) => {
              const isDueSoon = bill.status === 'due-soon';
              return (
                <li
                  key={bill.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-grey-100 py-4 last:border-b-0 md:grid-cols-[3fr_2fr_1fr]"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={bill.avatar.replace('./', '/') || ''}
                      alt=""
                      width={40}
                      height={40}
                      className="size-8 rounded-full object-cover md:size-10"
                    />
                    <span className="text-preset-4-bold text-grey-900">
                      {bill.name}
                    </span>
                  </div>

                  <span
                    className={`col-start-1 row-start-2 flex items-center gap-2 pl-12 text-xs md:col-start-2 md:row-start-1 md:pl-0 md:text-sm ${
                      bill.status === 'paid' ? 'text-green' : 'text-grey-500'
                    }`}
                  >
                    Monthly - {ordinal(bill.dueDay)}
                    <StatusIcon status={bill.status} />
                  </span>

                  <span
                    className={`col-start-2 row-span-2 row-start-1 text-right text-sm font-bold md:col-start-3 md:row-span-1 ${
                      isDueSoon ? 'text-red' : 'text-grey-900'
                    }`}
                  >
                    {currency.format(bill.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
