"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-sign in with default credentials
    signIn("credentials", {
      email: "mxssnx@gmail.com",
      password: "00998877",
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        console.error("Auto-sign in failed:", result.error);
      } else {
        router.push("/");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-100">CTS Trading</h1>
          <p className="text-neutral-400">
            Signing in automatically...
          </p>
        </div>
        <div className="text-center">
          <Link href="/" className="hover:text-neutral-100">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}