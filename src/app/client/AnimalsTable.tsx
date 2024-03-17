"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";

type Animal = RouterOutputs["animal"]["getAll"][number] & {
  isSelected?: boolean;
};

const AnimalsTable = (props: { animals: Animal[] }) => {
  const [animals, setAnimals] = useState(props.animals);

  const { mutate: deleteManyAnimals } = api.animal.deleteMany.useMutation();

  if (animals.length === 0)
    return (
      <div className="w-full text-center text-lg font-bold uppercase">
        No animals found
      </div>
    );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAnimals(animals.map((animal) => ({ ...animal, isSelected: checked })));
  };

  const handleRowSelect = (animal: Animal) => {
    const id = animal.id;
    setAnimals(
      animals.map((animal) =>
        animal.id === id
          ? { ...animal, isSelected: !animal.isSelected }
          : animal,
      ),
    );
  };

  const deleteSelectedRows = () => {
    deleteManyAnimals({
      animalIds: animals.filter((a) => a.isSelected).map((a) => a.id),
    });
    setAnimals(animals.filter((a) => !a.isSelected));
  };

  return (
    <>
      <div className="flex gap-x-4 p-5">
        <button
          className="rounded-3xl border-2 border-slate-600 px-3 py-2 transition-all hover:bg-slate-600"
          type="button"
        >
          <div className="flex items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <div className="text-sm font-semibold">New</div>
          </div>
        </button>
        <button
          className="rounded-3xl border-2 border-slate-600 px-3 py-2 transition-all hover:bg-slate-600"
          type="button"
          onClick={deleteSelectedRows}
        >
          <div className="flex items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <div className="text-sm font-semibold">Delete</div>
          </div>
        </button>
      </div>
      <table className="w-full text-left rtl:text-right">
        <thead className="uppercase">
          <tr>
            <th scope="col" className="rounded-tl-lg bg-slate-600 px-6 py-3">
              <div className="flex h-full w-full items-center justify-center">
                <input
                  className="size-5"
                  type="checkbox"
                  checked={animals.every((a) => a.isSelected)}
                  onChange={handleSelectAll}
                />
              </div>
            </th>
            <th scope="col" className="bg-slate-600 px-6 py-3">
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
            <th scope="col" className="bg-slate-600 px-6 py-3">
              Date of birth
            </th>
            <th scope="col" className="rounded-tr-lg bg-slate-600 px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id} className="group">
              <td
                className={`border-b-2 border-slate-600 p-0 transition-all group-last:rounded-bl-lg group-last:border-0 ${animal.isSelected ? "bg-slate-800" : "bg-slate-700"}`}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <input
                    className="size-5"
                    type="checkbox"
                    checked={animal.isSelected}
                    onChange={() => handleRowSelect(animal)}
                  />
                </div>
              </td>
              <td
                className={`border-b-2 border-slate-600 px-6 py-4 transition-all group-last:border-0 ${animal.isSelected ? "bg-slate-800" : "bg-slate-700"}`}
              >
                {animal.id}
              </td>
              <td
                className={`border-b-2 border-slate-600 px-6 py-4 transition-all group-last:border-0 ${animal.isSelected ? "bg-slate-800" : "bg-slate-700"}`}
              >
                {animal.name}
              </td>
              <td
                className={`border-b-2 border-slate-600 px-6 py-4 transition-all group-last:border-0 ${animal.isSelected ? "bg-slate-800" : "bg-slate-700"}`}
              >
                {animal.species}
              </td>
              <td
                className={`border-b-2 border-slate-600 px-6 py-4 transition-all group-last:border-0 ${animal.isSelected ? "bg-slate-800" : "bg-slate-700"}`}
              >
                {animal.dateOfAcquisition?.toDateString()}
              </td>
              <td
                className={`border-b-2 border-slate-600 px-6 py-4 transition-all group-last:border-0 ${animal.isSelected ? "bg-slate-800" : "bg-slate-700"}`}
              >
                {animal.dateOfBirth?.toDateString()}
              </td>
              <td
                className={`border-b-2 border-slate-600 px-6 py-4 transition-all group-last:rounded-br-lg group-last:border-0 ${animal.isSelected ? "bg-slate-800" : "bg-slate-700"}`}
              >
                <div id="row-actions" className="flex gap-3">
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 transition-all hover:scale-125 hover:fill-green-400"
                    >
                      <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>
                  </button>
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 transition-all hover:scale-125 hover:fill-red-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AnimalsTable;
