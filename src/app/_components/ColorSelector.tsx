'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';
import { Check } from 'lucide-react';

// Colors come straight from `theme.colors` in tailwind.config.ts.
// Tailwind types the resolved colors very loosely (nested objects, functions),
// so narrow them to the flat string lookup we actually use.
const colors = resolveConfig(tailwindConfig).theme.colors as unknown as Record<
  string,
  string | undefined
>;

export interface ColorOption {
  name: string;
  /** Key in the `colors` object of tailwind.config.ts */
  value: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Cyan', value: 'cyan' },
  { name: 'Navy', value: 'navy' },
  { name: 'Red', value: 'red' },
  { name: 'Purple', value: 'purple' },
  { name: 'Turquoise', value: 'turquoise' },
  { name: 'Brown', value: 'brown' },
  { name: 'Magenta', value: 'magenta' },
  { name: 'Blue', value: 'blue' },
  { name: 'Navy Grey', value: 'navy-grey' },
  { name: 'Army Green', value: 'army-green' },
  { name: 'Pink', value: 'purple-light' },
  { name: 'Gold', value: 'gold' },
  { name: 'Orange', value: 'orange' },
];

interface DotProps {
  token: string;
}

function Dot({ token }: DotProps) {
  return (
    <span
      aria-hidden="true"
      className="h-200 w-200 shrink-0 rounded-full"
      style={{ backgroundColor: colors[token] }}
    />
  );
}

interface ColorSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: ColorOption[];
  disabled?: boolean;
}

function ColorSelect({
  label = 'Color Tag',
  value,
  onChange,
  options = COLOR_OPTIONS,
  disabled = false,
}: ColorSelectProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected: ColorOption | undefined = options[selectedIndex];

  const buttonId = `${id}-button`;
  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const openMenu = () => {
    if (disabled) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  const choose = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange?.(option.value);
    closeMenu();
  };

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  // Keep the keyboard-highlighted option visible
  useEffect(() => {
    if (!isOpen) return;
    document
      .getElementById(`${id}-option-${activeIndex}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, activeIndex, id]);

  function handleKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) openMenu();
        else setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) openMenu();
        else setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) choose(activeIndex);
        else openMenu();
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          // Stops a parent modal's Escape handler from also firing
          e.stopPropagation();
          closeMenu();
        }
        break;
      case 'Tab':
        closeMenu();
        break;
      default:
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative flex flex-col gap-50">
      <label htmlFor={buttonId} className="text-preset-5-bold text-grey-500">
        {label}
      </label>

      <button
        id={buttonId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        disabled={disabled}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        className="flex w-full items-center gap-150 rounded-lg border border-beige-500 bg-white px-250 py-150 text-left text-preset-4 text-grey-900 transition-colors hover:border-grey-500 focus-visible:border-grey-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selected ? (
          <>
            <Dot token={selected.value} />
            <span className="truncate">{selected.name}</span>
          </>
        ) : (
          <span className="text-beige-500">Select a color</span>
        )}

        <svg
          aria-hidden="true"
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="currentColor"
          className={`ml-auto shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path d="M0 0h12L6 6z" />
        </svg>
      </button>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={buttonId}
          className="absolute left-0 top-full z-10 mt-100 max-h-80 w-full overflow-y-auto rounded-lg bg-white py-50 shadow-lg"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onClick={() => choose(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative flex cursor-pointer items-center gap-150 px-250 py-150 text-preset-4 text-grey-900 after:absolute after:inset-x-250 after:bottom-0 after:h-px after:bg-grey-100 last:after:hidden ${
                  isActive ? 'bg-beige-100' : ''
                }`}
              >
                <Dot token={option.value} />
                <span className="truncate">{option.name}</span>

                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="ml-auto flex h-150 w-150 shrink-0 items-center justify-center rounded-full bg-green text-white"
                  >
                    <Check className="h-100 w-100" strokeWidth={1} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ColorSelect;

/* ---------------------------------------------------------------
   Usage

   const [color, setColor] = useState<string>('green');
   <ColorSelect value={color} onChange={setColor} />

   With react-hook-form:

   <Controller
     name="color"
     control={control}
     render={({ field }) => (
       <ColorSelect value={field.value} onChange={field.onChange} />
     )}
   />
---------------------------------------------------------------- */
