'use client';

import { Ellipsis } from 'lucide-react';
import Dropdown from './Dropdown';
import { IPot } from '../_types/pots';
import { useState } from 'react';
import { IBudget } from '../_types/budget';

interface Props {
  name: string;
  pot?: IPot;
  budget?: IBudget;
}

export default function MenuButton({ name, pot, budget }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`More options for ${pot?.name || budget?.category}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-grey-500 hover:bg-beige-100"
      >
        <Ellipsis className="size-5" aria-hidden="true" />
      </button>

      <Dropdown name={name} isOpen={isOpen} />
    </div>
  );
}
