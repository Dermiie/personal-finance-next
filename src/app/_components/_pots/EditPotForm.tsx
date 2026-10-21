import { useState } from 'react';
import ColorSelect from '../ColorSelector';
import Button from '../Button';

export default function AddPotForm() {
  const [color, setColor] = useState<string>('green');
  return (
    <div className="space-y-4 text-grey-900">
      <h2 className="text-preset-1 font-medium">Edit Pot</h2>
      <p className="">
        If your savings target changes, feel free to update your pots
      </p>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="text-preset-5-bold text-beige-500 ">
            Pot Name
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
            Target
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

        <Button>Update Pot</Button>
      </form>
    </div>
  );
}
