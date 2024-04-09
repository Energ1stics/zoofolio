import { api } from "~/trpc/server";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";

export default async function AnimalEditPage() {
  noStore();

  const user = await currentUser();

  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full lg:max-w-5xl">
        <div className="flex min-h-[72px] p-5">
          {user?.id ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
        </div>
        <label className="flex gap-4">
          Id
          <input type="text" className="rounded-lg" disabled />
        </label>
      </div>
    </main>
  );
}
