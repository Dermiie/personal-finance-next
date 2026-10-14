import financeData from '../../../data.json';
import BudgetCard from '../_components/BudgetCard';
import Button from '../_components/Button';

export default function page() {
  const budgets = financeData.budgets;
  const transactions = financeData.transactions;

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-grey-900 font-bold text-preset-1">Budgets</h2>
        <Button>+ Add New Budget</Button>
      </div>

      <div className="flex gap-4 w-full">
        <div className="bg-beige-100 w-1/2"></div>
        <div className=" w-1/2 p-5 rounded-md space-y-4">
          {budgets.map((budget, i) => (
            <BudgetCard key={i} budgets={budget} transactions={transactions} />
          ))}
        </div>
      </div>
    </div>
  );
}
