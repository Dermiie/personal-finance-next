import { useState } from 'react';
import ColorSelect from './ColorSelector';
import Button from './Button';

export default function AddBudgetForm() {
  const [color, setColor] = useState<string>('green');
  return (
    <div className="space-y-4">
      <h2 className="text-preset-1 font-medium">Add New Budget</h2>
      <p className="">
        Choose a category to set a spending budget. These category can help you
        monitor spending
      </p>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="text-preset-5-bold text-beige-500 ">
            Budget Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border py-2 px-4 w-full rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label htmlFor="name" className="text-preset-5-bold text-beige-500">
            Maximum Spending
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border py-2 px-4 w-full rounded-lg"
          />
        </div>
        <div>
          <ColorSelect value={color} onChange={setColor} />
        </div>

        <Button>Add Budget</Button>
      </form>
    </div>
  );
}
