import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-100">CTS Trading</h1>
          <p className="text-neutral-400">
            Sign in to your account to access the dashboard
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-100 mb-1">
              Email address
            </label>
            <input id="email" name="email" type="email" required className="block w-full rounded-md border-neutral-600 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-400 focus:border-neutral-400 focus:ring-neutral-500 focus:ring-1" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-100 mb-1">
              Password
            </label>
            <input id="password" name="password" type="password" required className="block w-full rounded-md border-neutral-600 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-400 focus:border-neutral-400 focus:ring-neutral-500 focus:ring-1" />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500">
            Sign in
          </button>
        </form>
        <div className="text-center text-neutral-400">
          <Link href="/" className="hover:text-neutral-100">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}