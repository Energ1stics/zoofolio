import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();

  const { userId } = auth();

  const data = await api.post.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {userId ? (
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <SignInButton />
      )}
      <div>
        <p>Animals</p>
        {data.map((row) => {
          return (
            <div key={row.id}>
              <p>
                ID: {row.id} | name: {row.name} | animal: {row.animalName} |
                birth: {row.birthdate?.toDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
