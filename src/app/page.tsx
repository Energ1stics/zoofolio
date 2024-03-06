import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();

  const { userId } = auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {userId ? (
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
