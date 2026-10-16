import React from 'react';
import Button from '../_components/Button';

export default function page() {
  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-grey-900 font-bold text-preset-1">Pots</h2>
        <Button>+ Add New Pot</Button>
      </div>
    </div>
  );
}
