export type BillStatus = 'paid' | 'due-soon' | 'upcoming';

export interface RecurringBill {
  id: string;
  name: string;
  avatar: string;
  category: string;
  dueDay: number;
  amount: number;
  status: BillStatus;
}
