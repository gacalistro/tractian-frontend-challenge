import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { UnitTitle } from "./unit-title";
import { ActiveFiltersButtons } from "./active-filters-buttons";

import CompanyIcon from "../assets/icons/company.svg?react";

export function Layout() {
  const { data: companies } = useLoaderData() as {
    data: { id: string; name: string }[];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-12 px-4 flex items-center justify-between bg-blue-950">
        <img src="/logo.svg" />

        <div className="flex items-center gap-[10px]">
          {companies.map((company) => (
            <NavLink
              to={`/${company.id}`}
              key={company.id}
              className={({ isActive }) =>
                `px-2 py-1  text-white font-semibold text-xs flex items-center gap-2 rounded-sm ${
                  isActive ? "bg-blue-600" : "bg-blue-900"
                }`
              }
            >
              <CompanyIcon />
              {company.name} Unit
            </NavLink>
          ))}
        </div>
      </header>

      <main className="flex-1 flex p-2">
        <section className="bg-white flex-1 p-4 border rounded space-y-3 flex flex-col">
          <header className="flex items-center justify-between">
            <UnitTitle companies={companies} />
            <ActiveFiltersButtons />
          </header>

          <Outlet />
        </section>
      </main>
    </div>
  );
}
