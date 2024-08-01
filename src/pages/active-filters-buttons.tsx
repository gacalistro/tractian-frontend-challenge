import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTreeContext } from "../context/tree-context";
import { TreeActionEnum } from "../reducer/tree-reducer";

import CriticIcon from "../assets/icons/critic.svg?react";
import EnergyIcon from "../assets/icons/energy.svg?react";

enum FiltersTitleEnum {
  energySensor = "Energy Sensor",
  criticStatus = "Critic Status",
}

export function ActiveFiltersButtons() {
  const [activeFilters, setActiveFilters] = useState({
    energySensor: false,
    criticStatus: false,
  });

  const { dispatch } = useTreeContext();

  const { companyId } = useParams();

  const filtersButtonInfo = Object.entries(activeFilters) as [
    filterName: keyof typeof activeFilters,
    isActive: boolean
  ][];

  const handleFilter = (type: keyof typeof activeFilters) => {
    activeFilters[type] = !activeFilters[type];

    setActiveFilters(activeFilters);

    dispatch({
      type: TreeActionEnum.filter_tree,
      activeFilters,
    });
  };

  return (
    companyId && (
      <div className="flex items-center gap-2">
        {filtersButtonInfo.map(([filter, isActive]) => {
          return (
            <button
              key={filter}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 border rounded font-semibold text-sm ${
                isActive ? "text-white bg-blue-500" : "text-gray-600"
              }`}
              onClick={() => handleFilter(filter)}
            >
              {filter === "criticStatus" ? (
                <CriticIcon className={`${!isActive && "text-blue-500"}`} />
              ) : (
                <EnergyIcon className={`${!isActive && "text-blue-500"}`} />
              )}
              {FiltersTitleEnum[filter]}
            </button>
          );
        })}
      </div>
    )
  );
}
