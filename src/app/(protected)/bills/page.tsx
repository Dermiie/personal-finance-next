import { ReceiptText } from 'lucide-react';
import React from 'react';

import financeData from '../../../../data.json';
import { RecurringBill } from '@/app/_types/bills';
import RecurringBills from '@/app/_components/_bills/RecurringBills';

// import Button from '../_components/Button';

export default function page() {
  const bills = financeData.recurringBills as RecurringBill[];
  return (
    <div className="p-10 space-y-6">
      <h2 className="text-grey-900 font-bold text-preset-1">Bills</h2>

      <main className="w-full grid grid-cols-3 gap-4">
        <div className="space-y-7">
          <div className="bg-grey-900 text-white p-7 rounded-lg space-y-6">
            <ReceiptText size={40} />
            <div className="space-y-3">
              <p>Total bills</p>
              <p className="text-preset-1">$0.00</p>
            </div>
          </div>
          <div className="bg-white text-grey-900 p-7 rounded-lg space-y-6">
            <p className="text-preset-3">Summary</p>
            <div className="space-y-7 divide-opacity-5">
              <div className="flex justify-between border-b pb-5 border-grey-300">
                <p className="text-preset-4 text-beige-500">Paid Bills</p>
                <p className="text-preset-2">$0.00</p>
              </div>
              <div className="flex justify-between border-b pb-5 border-grey-300">
                <p className="text-preset-4 text-beige-500">Total Bills</p>
                <p className="text-preset-2">$0.00</p>
              </div>
              <div className="flex justify-between text-preset-4 text-red">
                <p>Due Soon</p>
                <p className="text-preset-2">$0.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-lg px-8 py-5">
          <div className="flex gap-5">
            <RecurringBills bills={bills} />
          </div>
        </div>
      </main>
    </div>
  );
}
