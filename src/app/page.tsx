import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();

  const { userId } = auth();

  const animals = userId
    ? await api.animal.getAll.query({ ownerId: userId })
    : [];

  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full lg:max-w-5xl">
        <div className="p-5">
          {userId ? (
            <div>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
        <div>
          <table className="w-full text-left rtl:text-right">
            <thead className="bg-slate-600 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Identifier
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Species
                </th>
                <th scope="col" className="px-6 py-3">
                  Date of acquisition
                </th>
                <th scope="col" className="px-6 py-3">
                  Date of birth
                </th>
              </tr>
            </thead>
            <tbody className="">
              {animals.map((animal) => {
                return (
                  <tr
                    key={animal.id}
                    className="border-y border-slate-600 bg-slate-700"
                  >
                    <td className="max-w-40 overflow-hidden text-ellipsis px-6 py-4">
                      {animal.id}
                    </td>
                    <td className="px-6 py-4">{animal.name}</td>
                    <td className="px-6 py-4">{animal.species}</td>
                    <td className="px-6 py-4">
                      {animal.dateOfAcquisition?.toDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {animal.dateOfBirth?.toDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="w-full bg-slate-500 px-6 py-4 uppercase">
            Click me
          </button>
        </div>
      </div>
    </main>
  );
}
