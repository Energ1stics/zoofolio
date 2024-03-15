import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import AnimalsTable from "./client/AnimalsTable";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();

  const user = await currentUser();

  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full lg:max-w-5xl">
        <div className="flex min-h-[72px] p-5">
          {user?.id ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
        </div>
        {user?.id && (
          <AnimalsTable
            animals={await api.animal.getAll.query({ ownerId: user.id })}
          />
        )}
      </div>
    </main>
  );
}
