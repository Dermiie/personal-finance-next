export interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

export interface Transaction {
  // id: string;
  name: string;
  amount: number; // positive number, rendered as a negative spend
  date: string; // ISO date string
  category: string;
  avatar?: string; // omit to show the purple icon avatar
}

export interface BudgetCardProps {
  transactions: Transaction[];
  seeAllHref?: string;
  onMenuClick?: () => void;
  /** Tailwind bg class for the accent (dot, bar) */
  budgets: Budget;
}

export interface SpendingCategory {
  id: string;
  name: string;
  spent: number;
  maximum: number;
  /** Any CSS color, e.g. "#94c8d6" */
  color: string;
}
