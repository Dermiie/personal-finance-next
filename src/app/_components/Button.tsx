interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'solid' | 'outline';
}

export default function Button({
  children,
  onClick,
  variant = 'solid',
}: ButtonProps) {
  const variants = {
    solid: 'bg-grey-900 text-white border border-grey-900',
    outline: 'bg-transparent text-grey-900 border border-grey-900',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-lg ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
