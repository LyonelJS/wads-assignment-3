import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <main className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white sm:text-6xl">
            ToDo<span className="text-primary">App</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            A simple, secure, and powerful way to manage your daily tasks using Firebase Auth and Firestore.
          </p>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {session ? (
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/dashboard">Go to My Tasks</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/register">Create Account</Link>
              </Button>
            </>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 gap-6 pt-12 text-left sm:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-bold">Fast Setup</h3>
            <p className="text-sm text-zinc-500">Sign in with Google or your BINUS email in seconds.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Real-time</h3>
            <p className="text-sm text-zinc-500">Your tasks sync across devices via Cloud Firestore.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Secure</h3>
            <p className="text-sm text-zinc-500">Server-side session verification for your data protection.</p>
          </div>
        </div>
      </main>
    </div>
  );
}