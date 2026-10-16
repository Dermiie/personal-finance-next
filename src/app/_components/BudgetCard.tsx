'use client';

import Link from 'next/link';
import { BudgetCardProps } from '../_types/budget';
import currency from '../_utils/FormatCurrency';
import { formatDate } from '../_utils/FormatDate';
import Avatar from './Avatar';

export default function BudgetCard({
  transactions,
  seeAllHref = '#',
  onMenuClick,
  budgets,
}: BudgetCardProps) {
  const {
    category: title,
    maximum,
    theme: accentColor,
  } = budgets || {
    category: 'Entertainment',
    maximum: 50.0,
    theme: '#277C78',
  };
  // const spent = transactions.reduce((sum, t) => sum + t.amount, 0);

  const spent = transactions
    .filter((transaction) => transaction.category === title)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  // console.log('spent', spent);
  const remaining = maximum - spent;
  // const percent = Math.min((spent / maximum) * 100, 100);

  const percent = spent > maximum ? 100 : (spent / maximum) * 100;
  console.log(percent, spent, maximum);
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.category === title,
  );

  return (
    <section className="w-full rounded-lg bg-white text-grey-900 p-4">
      {/* Header */}
      <header className="flex items-center gap-4">
        <span
          className="size-3 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <h2 className="flex-1 text-2xl font-bold">
          {title || 'Entertainment'}
        </h2>
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="More options"
          className="group flex gap-[3px] rounded p-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: accentColor }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1 rounded-full bg-grey-300 group-hover:bg-grey-500"
            />
          ))}
        </button>
      </header>

      <p className="mb-4 mt-6 text-preset-4 text-grey-300">
        Maximum of {currency.format(maximum)}
      </p>

      {/* Progress */}
      <div
        role="progressbar"
        aria-label={`${title} budget used`}
        aria-valuemin={0}
        aria-valuemax={maximum}
        aria-valuenow={spent}
        className="h-9 rounded-lg bg-beige-100 p-1"
      >
        <div
          className="h-full min-w-2 rounded-md transition-[width] duration-500"
          style={{ width: `${percent}%`, backgroundColor: accentColor }}
        />
      </div>

      {/* Stats */}
      <div className="mb-6 mt-5 grid grid-cols-2 gap-6">
        <div
          className="flex flex-col gap-2 rounded-sm border-l-4 pl-4"
          style={{ borderColor: accentColor }}
        >
          <span className="text-sm text-grey-300">Spent</span>
          <strong className="text-xl font-bold">
            {currency.format(spent)}
          </strong>
        </div>
        <div className="flex flex-col gap-2 rounded-sm border-l-4 border-beige-100 pl-4">
          <span className="text-sm text-grey-300">Remaining</span>
          <strong className="text-xl font-bold">
            {currency.format(remaining)}
          </strong>
        </div>
      </div>

      {/* Latest spending */}
      <div className="rounded-lg bg-beige-100 sm:px-5 sm:pb-1 sm:pt-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-lg font-bold">Latest Spending</h3>
          <Link
            href={seeAllHref}
            className="inline-flex items-center gap-2 text-[15px] text-grey-300 hover:text-grey-900"
          >
            See All
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
              <path d="M2 1l6 5-6 5z" fill="currentColor" />
            </svg>
          </Link>
        </div>

        <ul>
          {filteredTransactions.slice(0, 3).map((t, i) => (
            <li
              key={i}
              className="flex items-center gap-4 border-b border-beige-100 py-2 last:border-b-0"
            >
              <Avatar name={t.name} src={t.avatar} />
              <span className="flex-1 text-preset-4-bold font-semibold">
                {t.name}
              </span>
              <div className="flex flex-col items-end gap-1.5">
                <strong className="text-base font-bold">
                  {currency.format(t.amount)}
                </strong>
                <time dateTime={t.date} className="text-preset-5 text-grey-300">
                  {formatDate(t.date)}
                </time>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
