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
            <th scope="col" className="rounded-tr-lg bg-slate-600 px-6 py-3">
              Date of birth
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
                className={`border-b-2 border-slate-600 px-6 py-4 transition-all group-last:rounded-br-lg group-last:border-0 ${animal.isSelected ? "bg-slate-800" : "bg-slate-700"}`}
              >
                {animal.dateOfBirth?.toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AnimalsTable;
