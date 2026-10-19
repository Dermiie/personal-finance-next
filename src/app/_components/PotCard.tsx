import { Ellipsis } from 'lucide-react';
import Button from './Button';

interface Pot {
  name: string;
  total: number;
  target: number;
  theme: string;
}

interface Prop {
  pot: Pot;
}

export default function PotCard({ pot }: Prop) {
  const percent = pot.total > pot.target ? 100 : (pot.total / pot.target) * 100;
  return (
    <div className="bg-white p-5 rounded-lg relative space-y-10">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: pot.theme }}
          ></div>
          <h3 className="text-lg font-bold text-grey-900">{pot.name}</h3>
        </div>
        <button
          type="button"
          aria-label={`More options for ${pot.name}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-grey-500 hover:bg-beige-100"
        >
          <Ellipsis className="size-5" aria-hidden="true" />
        </button>

        {/* <div className="absolute right-5 top-5 text-grey-300 border border-grey-900" /> */}
      </div>
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
      <div className="w-full gap-3 flex">
        <Button variant="secondary">+ Add Money</Button>

        <Button variant="secondary">Withdraw Money</Button>
      </div>
    </div>
  );
}
