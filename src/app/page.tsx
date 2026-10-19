import Image from 'next/image';
import financeData from '../../data.json';
import currency from './_utils/FormatCurrency';
import { SpendingCategory } from './_types/budget';
import { formatDate } from './_utils/FormatDate';

const wholeCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

// Donut geometry (viewBox units)
const SIZE = 360;
const C = SIZE / 2;
const OUTER = { r: 128, width: 40 }; // solid outer band
const INNER = { r: 119, width: 48 }; // lighter inner band

function Donut({ categories }: { categories: SpendingCategory[] }) {
  const total = categories.reduce((s, c) => s + c.spent, 0);

  // The last category starts at 12 o'clock, then the rest follow clockwise.
  const ordered =
    categories.length > 1
      ? [categories[categories.length - 1], ...categories.slice(0, -1)]
      : categories;

  let offset = 0;
  const arcs = ordered.map((c) => {
    const pct = total > 0 ? (c.spent / total) * 100 : 0;
    const arc = { id: c.id, color: c.color, pct, offset };
    offset += pct;
    return arc;
  });

  const ring = (band: { r: number; width: number }, opacity?: number) =>
    arcs.map((a) => (
      <circle
        key={a.id}
        cx={C}
        cy={C}
        r={band.r}
        fill="none"
        stroke={a.color}
        strokeWidth={band.width}
        strokeOpacity={opacity}
        pathLength={100}
        strokeDasharray={`${a.pct} ${100 - a.pct}`}
        strokeDashoffset={-a.offset}
      />
    ));

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="size-full"
      role="img"
      aria-label="Spending by category"
    >
      <g transform={`rotate(-90 ${C} ${C})`}>
        {ring(OUTER)}
        {ring(INNER, 0.55)}
      </g>
    </svg>
  );
}

export default function Home() {
  const balance = financeData.balance;
  const pots = financeData.pots;
  const budgets = financeData.budgets;
  const transactions = financeData.transactions;
  const bills = financeData.recurringBills;

  const totals = bills.reduce<Record<'paid' | 'dueSoon' | 'upcoming', number>>(
    (summary, bill) => {
      summary[bill.status as keyof typeof summary] += bill.amount;
      return summary;
    },
    {
      paid: 0,
      dueSoon: 0,
      upcoming: 0,
    },
  );

  const saved = pots.reduce((acc, curr) => acc + curr.total, 0);

  const spentByCategory = transactions.reduce<Record<string, number>>(
    (acc, t) => {
      if (t.amount < 0) {
        acc[t.category] = (acc[t.category] ?? 0) + Math.abs(t.amount);
      }
      return acc;
    },
    {},
  );

  const spendingSummary = budgets.map((budget) => ({
    id: budget.category,
    name: budget.category,
    maximum: budget.maximum,
    color: budget.theme,
    spent: spentByCategory[budget.category] ?? 0,
  }));
  const totalSpent = spendingSummary.reduce((s, c) => s + c.spent, 0);
  const totalLimit = spendingSummary.reduce((s, c) => s + c.maximum, 0);
  const visibleTransactions = transactions.slice(0, 5);

  return (
    <div className="p-10 space-y-4">
      <h2 className="text-grey-900 font-bold text-preset-1 mb-10">Overview</h2>
      <div className="grid grid-cols-3 gap-3 ">
        <div className="bg-grey-900 text-white p-5 space-y-3 rounded-lg">
          <p className="font-light">Current Balance</p>
          <p className="text-preset-1">{currency.format(balance.current)}</p>
        </div>
        <div className=" bg-white p-5 space-y-3 rounded-lg">
          <p className="font-light">Income</p>
          <p className="text-preset-1">{currency.format(balance.income)}</p>
        </div>
        <div className=" bg-white p-5 space-y-3 rounded-lg">
          <p className="font-light">Expenses</p>
          <p className="text-preset-1">{currency.format(balance.expenses)}</p>
        </div>
      </div>

      <main className="flex gap-4 w-full">
        <div className="w-[48%] space-y-4">
          <div className="bg-white rounded-lg p-5 space-y-3">
            <div className="flex justify-between">
              <p className="text-preset-4-bold">Pots</p>
              <button className="text-beige-500 text-preset-5">
                See Details
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-beige-100 flex items-center gap-4 px-4 w-full rounded-lg">
                <div className="size-10 relative">
                  <Image
                    src={'icon-pot.svg'}
                    alt="money-icon"
                    className="object-contain absolute"
                    fill
                  ></Image>
                </div>

                <div className="flex-col flex gap-5 pr-5">
                  <p className="text-preset-4 text-beige-500">Total Saved</p>
                  <p className="text-preset-2 font-semibold">
                    {wholeCurrency.format(saved)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {pots.map((pot, i) => (
                  <div
                    key={i}
                    className="border-l-4 items-center pl-4"
                    style={{ borderLeftColor: pot.theme }}
                  >
                    <p className="text-beige-500 text-preset-5-bold">
                      {pot.name}
                    </p>
                    <p className="text-preset-4-bold">
                      {wholeCurrency.format(pot.total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 space-y-5">
            <div className="flex justify-between">
              <p className="text-preset-4-bold">Transactions</p>
              <button className="text-beige-500 text-preset-5">
                See Details
              </button>
            </div>

            <div className="space-y-8">
              {visibleTransactions.map((transaction, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="size-10 relative rounded-full overflow-hidden">
                    <Image
                      src={transaction.avatar.replace('./', '/') || ''}
                      className="object-contain absolute"
                      fill
                      alt="transaction_avatar"
                    ></Image>
                  </div>
                  <p className="flex-grow">{transaction.name}</p>
                  <div className="text-preset-4 space-y-2 text-end">
                    <p>{currency.format(transaction.amount)}</p>
                    <p className="text-beige-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[52%] space-y-4">
          <div className="bg-white rounded-lg p-5">
            <div className="flex justify-between">
              <p className="text-preset-4-bold">Budgets</p>
              <button className="text-beige-500 text-preset-5">
                See Details
              </button>
            </div>
            <div className="flex items-center w-full justify-between">
              <div className="relative aspect-square w-full max-w-[270px] shrink-0 p-2">
                <Donut categories={spendingSummary} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-5xl font-bold tracking-tight">
                    {wholeCurrency.format(totalSpent)}
                  </span>
                  <span className="text-base text-grey-500">
                    of {wholeCurrency.format(totalLimit)} limit
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 h-fit ">
                {budgets.map((budget, i) => (
                  <div
                    key={i}
                    className="border-l-4 items-center pl-4 h-fit"
                    style={{ borderLeftColor: budget.theme }}
                  >
                    <p className="text-beige-500 text-preset-4">
                      {budget.category}
                    </p>
                    <p className="text-preset-4-bold">
                      {wholeCurrency.format(budget.maximum)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-5 space-y-4">
            <div className="flex justify-between">
              <p className="text-preset-4-bold">Recurring Bills</p>
              <button className="text-beige-500 text-preset-5">
                See Details
              </button>
            </div>
            <div className="space-y-3">
              <div className="w-full rounded-lg border-l-4 py-4 px-4 border-green flex justify-between items-center bg-beige-100">
                <p className="text-beige-500">Paid Bills</p>
                <p className="font-semibold">{currency.format(totals.paid)}</p>
              </div>
              <div className="w-full rounded-lg border-l-4 py-4 px-4 border-cyan flex justify-between items-center bg-beige-100">
                <p className="text-beige-500">Upcoming Bills</p>
                <p className="font-semibold">
                  {currency.format(totals.upcoming)}
                </p>
              </div>
              <div className="w-full rounded-lg border-l-4 py-4 px-4 border-beige-500 flex justify-between items-center bg-beige-100">
                <p className="text-beige-500">Due Soon</p>
                <p className="font-semibold">
                  {currency.format(totals.dueSoon)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
