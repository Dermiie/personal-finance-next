import Button from '@/app/_components/Button';

export default function page() {
  return (
    <div className="bg-white text-grey-900 p-8 rounded-lg w-[70%] space-y-8">
      <h2 className="text-preset-1">Login</h2>

      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="text-preset-5-bold text-beige-500 ">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border py-2 px-4 w-full rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-preset-5-bold text-beige-500"
          >
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            className="border py-2 px-4 w-full rounded-lg"
          />
        </div>

        <Button>Login</Button>

        <p className="text-center">
          Need to create an account?{' '}
          <span className="text-preset-3 underline ">Sign Up</span>
        </p>
      </form>
    </div>
  );
}
