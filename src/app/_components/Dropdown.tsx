interface Props {
  name: string;
  isOpen: boolean;
}

export default function Dropdown({ name, isOpen }: Props) {
  return (
    <div
      role="menu"
      className={`absolute text-nowrap font-normal text-preset-4 right-0 top-full z-10 mt-2 min-w-36 rounded-lg bg-white p-4 space-y-2 shadow-lg ${isOpen ? '' : 'hidden'}`}
    >
      <p className="border-b cursor-pointer  border-beige-100 pb-2">
        Edit {name}
      </p>
      <p className="text-red cursor-pointer ">Delete {name}</p>
    </div>
  );
}
