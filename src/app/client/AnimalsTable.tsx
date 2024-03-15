"use client";

import React, { useState } from "react";
import { type RouterOutputs } from "~/trpc/shared";

type Animal = RouterOutputs["animal"]["getAll"][number] & {
  isSelected?: boolean;
};

const AnimalsTable = (props: { animals: Animal[] }) => {
  const [animals, setAnimals] = useState(props.animals);

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

  return (
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
            <td className="border-b border-slate-500 bg-slate-700 p-0 group-last:rounded-bl-lg group-last:border-0">
              <div className="flex h-full w-full items-center justify-center">
                <input
                  className="size-5"
                  type="checkbox"
                  checked={animal.isSelected}
                  onChange={() => handleRowSelect(animal)}
                />
              </div>
            </td>
            <td className="border-b border-slate-500 bg-slate-700 px-6 py-4 group-last:border-0">
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
        ))}
      </tbody>
    </table>
  );
};

export default AnimalsTable;
