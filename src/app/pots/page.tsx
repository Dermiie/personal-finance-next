import React from 'react';

import financeData from '../../../data.json';
import PotCard from '../_components/PotCard';
import AddPot from '../_components/AddPot';

export default function page() {
  const pots = financeData.pots;
  return (
    <div className="p-10 space-y-10">
      <div className="flex justify-between">
        <h2 className="text-grey-900 font-bold text-preset-1">Pots</h2>
        <div>
          <AddPot />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pots.map((pot, i) => (
          <PotCard key={i} pot={pot} />
        ))}
      </div>
    </div>
  );
}
