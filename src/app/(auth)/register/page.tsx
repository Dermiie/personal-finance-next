import Button from '@/app/_components/Button';

export default function page() {
  return (
    <div className="bg-white text-grey-900 p-8 rounded-lg w-[70%] space-y-8">
      <h2 className="text-preset-1">Sign Up</h2>

      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="text-preset-5-bold text-beige-500 ">
            Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            className="border py-2 px-4 w-full rounded-lg cursor-pointer"
          />
        </div>
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
        <div>
          <label
            htmlFor="confirm-password"
            className="text-preset-5-bold text-beige-500"
          >
            Confirm Password
          </label>
          <input
            type="text"
            name="confirm-password"
            id="confirm-password"
            className="border py-2 px-4 w-full rounded-lg"
          />
        </div>

        <Button>Create Account</Button>

        <p className="text-center">
          Already have an account?{' '}
          <span className="text-preset-3 underline ">Login</span>
        </p>
      </form>
    </div>
  );
}
