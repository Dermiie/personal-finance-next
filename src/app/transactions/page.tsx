import financeData from '../../../data.json';
import TransactionTable from '../_components/_transactions/TransactionTable';

export default function Page() {
  const transactions = financeData.transactions;

  return (
    <div className="p-10">
      <h2 className="text-grey-900 font-bold text-preset-1">Transactions</h2>

      <TransactionTable transactions={transactions} />
    </div>
  );
}
