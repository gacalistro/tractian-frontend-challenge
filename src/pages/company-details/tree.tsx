import { type ChangeEvent, useState } from "react";
import { useTreeContext } from "../../context/tree-context";
import { TreeActionEnum } from "../../reducer/tree-reducer";
import { TreeNode } from "./tree-node";

export function Tree() {
  const { state, dispatch } = useTreeContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    energySensor: false,
    criticStatus: false,
  });

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchQuery(query);
    dispatch({ type: TreeActionEnum.search, query });
  };

  const handleFilter = (type: keyof typeof activeFilters) => {
    activeFilters[type] = !activeFilters[type];

    setActiveFilters(activeFilters);

    dispatch({
      type: TreeActionEnum.filter_tree,
      activeFilters,
    });
  };

  return (
    <div className="p-4 space-y-3">
      <h1>Dynamic Tree</h1>

      <input type="text" onChange={handleQuery} value={searchQuery} />

      <button
        onClick={() => handleFilter("energySensor")}
        style={{
          color: activeFilters.energySensor ? "red" : "",
        }}
      >
        Energy Sensor
      </button>

      <button
        onClick={() => handleFilter("criticStatus")}
        style={{
          color: activeFilters.criticStatus ? "red" : "",
        }}
      >
        Critic Status
      </button>

      {state.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}
