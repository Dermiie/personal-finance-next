interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'secondary' | 'destructive' | 'ghost';
}

export default function Button({
  children,
  onClick,
  variant = 'solid',
}: ButtonProps) {
  const variants = {
    solid: 'bg-grey-900 text-white border border-grey-900',
    outline: 'bg-transparent text-grey-900 border border-grey-900',
    secondary: 'bg-beige-100 text-grey-900 border border-beige-100',
    destructive: 'bg-red text-white',
    ghost: '',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg w-full ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
