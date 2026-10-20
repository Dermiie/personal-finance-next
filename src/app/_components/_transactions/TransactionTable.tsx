'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { ITransaction } from '@/app/_types/transactions';
import { formatDate } from '@/app/_utils/FormatDate';
interface Props {
  transactions: ITransaction[];
}

const PAGE_SIZE = 8;

export default function TransactionTable({ transactions }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(transactions.length / PAGE_SIZE);
  const firstVisibleTransaction = (currentPage - 1) * PAGE_SIZE;
  const visibleTransactions = transactions.slice(
    firstVisibleTransaction,
    firstVisibleTransaction + PAGE_SIZE,
  );
  return (
    <main className="bg-white p-10 rounded-md mt-10">
      <div className="flex justify-between">
        <div className="relative w-[30%]">
          <input
            type="text"
            placeholder="Search transactions..."
            className="border py-2 w-full rounded-md pl-5 text-preset-4"
          ></input>
          <div className="size-5 absolute right-3 top-2/4 translate-y-[-50%]">
            <Image
              alt="search-icon"
              src="/icon-search.svg"
              className="object-cover"
              fill
            ></Image>
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <label htmlFor="filter" className="text-preset-4">
              Sort by:
            </label>
            <select name="filter" id="filter">
              <option value="all">Latest</option>
              <option value="income">Oldest</option>
              <option value="expense">A-Z</option>
              <option value="expense">Z-A</option>
              <option value="expense">Highest</option>
              <option value="expense">Lowest</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="text-preset-4">
              Category:
            </label>
            <select name="category" id="category">
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
      </div>

      <table className="w-full text-preset-4 text-beige-500 mt-10">
        <thead className=" border-b border-beige-500">
          <tr>
            <th className="text-left py-3 px-5">Recipient/Sender</th>
            <th className="text-left py-3 px-5">Category</th>
            <th className="text-left py-3 px-5">Transaction Date</th>
            <th className="text-left py-3 px-5">Amount</th>
          </tr>
        </thead>
        <tbody>
          {visibleTransactions.map((transaction, index) => (
            <tr key={index} className="border-b border-beige-500">
              <td className="py-5 px-5">
                <div className="flex items-center gap-3">
                  <Image
                    alt="profile-pic"
                    src={transaction?.avatar?.replace('./', '/') || ''}
                    className="object-cover rounded-full"
                    height={30}
                    width={30}
                  ></Image>
                  <span className="text-grey-900 font-semibold">
                    {transaction.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5">{transaction.category}</td>
              <td className="py-3 px-5">{formatDate(transaction.date)}</td>
              <td
                className={`py-3 px-5 text-grey-900 font-semibold ${transaction.amount < 0 ? '' : 'text-green'} `}
              >
                ${transaction.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex items-center justify-between text-preset-4">
        <span>
          Showing {firstVisibleTransaction + 1}-
          {Math.min(firstVisibleTransaction + PAGE_SIZE, transactions.length)}{' '}
          of {transactions.length}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            className="rounded border border-beige-500 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span aria-live="polite">
            Page {currentPage} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === pageCount}
            className="rounded border border-beige-500 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
