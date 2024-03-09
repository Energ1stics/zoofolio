import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
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
          {user?.id && <AnimalsTable userId={user.id} />}
      </div>
    </main>
  );
}

async function AnimalsTable(props: { userId: string }) {
  const animals = await api.animal.getAll.query({ ownerId: props.userId });

  if (animals.length === 0)
    return (
      <div className="w-full text-center text-lg font-bold uppercase">
        No animals found
      </div>
    );

  return (
    <table className="w-full text-left rtl:text-right">
      <thead className="uppercase">
        <tr>
          <th scope="col" className="rounded-tl-lg bg-slate-600 px-6 py-3">
            Identifier
          </th>
          <th scope="col" className="bg-slate-600 px-6 py-3">
            Name
          </th>
          <th scope="col" className="bg-slate-600 px-6 py-3">
            Species
          </th>
          <th scope="col" className="bg-slate-600 px-6 py-3">
            Date of acquisition
          </th>
          <th scope="col" className="rounded-tr-lg bg-slate-600 px-6 py-3">
            Date of birth
          </th>
        </tr>
      </thead>
      <tbody>
        {animals.map((animal) => {
          return (
            <tr key={animal.id} className="group">
              <td className="border-b border-slate-500 bg-slate-700 px-6 py-4 group-last:rounded-bl-lg group-last:border-0">
                {animal.id}
              </td>
              <td className="border-b border-slate-500 bg-slate-700 px-6 py-4 group-last:border-0">
                {animal.name}
              </td>
              <td className="border-b border-slate-500 bg-slate-700 px-6 py-4 group-last:border-0">
                {animal.species}
              </td>
              <td className="border-b border-slate-500 bg-slate-700 px-6 py-4 group-last:border-0">
                {animal.dateOfAcquisition?.toDateString()}
              </td>
              <td className="border-b border-slate-500 bg-slate-700 px-6 py-4 group-last:rounded-br-lg group-last:border-0">
                {animal.dateOfBirth?.toDateString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
