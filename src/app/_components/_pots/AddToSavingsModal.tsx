import React from 'react';
import Button from '../Button';
import { IPot } from '@/app/_types/pots';

interface Props {
  name: string;
  pot: IPot;
}

export default function AddToSavingsModal({ name, pot }: Props) {
  const percent = pot.total > pot.target ? 100 : (pot.total / pot.target) * 100;
  return (
    <div className="space-y-4 text-grey-900 max-w-lg">
      <h2 className="text-preset-2">Add to {name}</h2>
      <p className="text-preset-4 text-beige-500">
        Add money to your pot to keep it separate from your main balance. As
        soon as you add this money, it will be deducted from your current
        balance.
      </p>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-grey-500">Total Saved</p>
          <p className="text-grey-900 text-preset-2">${pot.total.toFixed(2)}</p>
        </div>

        <div
          role="progressbar"
          aria-label={`${pot.name} budget used`}
          aria-valuemin={0}
          aria-valuemax={pot.target}
          aria-valuenow={pot.total}
          className="h-2 rounded-lg bg-beige-100 "
        >
          <div
            className="h-full min-w-2 rounded-md transition-[width] duration-500"
            style={{
              width: `${percent}%`,
              backgroundColor: pot.theme,
            }}
          />
        </div>

        <div className="flex justify-between">
          <p className="text-grey-500">{Math.round(percent)}% of target</p>
          <p className="text-grey-500">Target of ${pot.target.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="text-preset-5-bold text-beige-500 ">
          Amount to Add
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border py-2 px-4 w-full rounded-lg cursor-pointer"
        />
      </div>
      <Button>Confirm Addition</Button>
    </div>
  );
}
