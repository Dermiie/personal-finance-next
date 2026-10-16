import { Budget, SpendingCategory, Transaction } from '../_types/budget';
import currency from '../_utils/FormatCurrency';

export interface SpendingSummaryProps {
  // categories: SpendingCategory[];
  budgets: Budget[];
  transactions: Transaction[];
  title?: string;
}

const moneyWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

// Donut geometry (viewBox units)
const SIZE = 360;
const C = SIZE / 2;
const OUTER = { r: 148, width: 50 }; // solid outer band
const INNER = { r: 129, width: 38 }; // lighter inner band

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

export default function SpendingSummary({
  budgets,
  transactions,
  title = 'Spending Summary',
}: SpendingSummaryProps) {
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

  return (
    <section className="flex w-full max-w-[995px] flex-col items-center gap-10 rounded-lg bg-white p-8 text-grey-900 md:gap-16 md:p-10">
      {/* Chart */}
      <div className="relative aspect-square w-full max-w-[270px] shrink-0 p-2">
        <Donut categories={spendingSummary} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="text-5xl font-bold tracking-tight">
            {moneyWhole.format(totalSpent)}
          </span>
          <span className="text-base text-grey-500">
            of {moneyWhole.format(totalLimit)} limit
          </span>
        </div>
      </div>

      {/* List */}
      <div className="w-full flex-1">
        <h2 className="mb-3 text-preset-2 font-bold leading-tight">{title}</h2>
        <ul>
          {spendingSummary.map((c) => (
            <li
              key={c.id}
              className="flex items-center gap-4 border-b border-beige-100 py-4 last:border-b-0"
            >
              <span
                className="h-5 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              <span className="flex-1 text-lg text-[#696767]">{c.name}</span>
              <span className="text-xl font-bold">
                {currency.format(c.spent)}
              </span>
              <span className="w-[88px] text-sm text-[#696767]">
                of {currency.format(c.maximum)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
