import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen p-5 text-white">
      <section
        className="hidden rounded-lg overflow-hidden shrink-0 bg-cover bg-center md:flex md:w-1/2 lg:w-2/5 p-5 relative flex-col"
        style={{
          backgroundImage: "url('/illustration-authentication.svg')",
        }}
      >
        <div className="h-10 w-40 absolute">
          <Image
            alt="logo"
            src="/logo-large.svg"
            fill
            className="object-contain "
          />
        </div>
        <div className="mt-auto space-y-4">
          <p className="text-preset-1">
            Keep track of your money and save for your future
          </p>
          <p>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </section>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </main>
  );
}
